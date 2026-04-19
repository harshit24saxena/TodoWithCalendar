if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { google } = require('googleapis');
const crypto = require('crypto');
const express = require('express');
const session = require('express-session');
const { supabase } = require('./utilities/supabaseClient.js');
const SetOauth2ClientCredentials = require('./utilities/googleAuth.js');

// server 
const app = express()
app.use(express.json())

//Access-Control-Allow-Origin CONFIG
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// SESSION CONFIG
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' ? true : false }    // true only with HTTPS
}));
 

// GET EVENTS ENDPOINT
app.get('/', SetOauth2ClientCredentials, async (req, res) => {
  
const oauth2Client = req.oauth2Client;

const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
const start = new Date(`${today}T00:00:00+05:30`).toISOString();
const end = new Date(`${today}T23:59:59+05:30`).toISOString();
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  {
    const {data, error} = await calendar.events.list({ 
      calendarId: 'primary',
      timeMin: start,
      timeMax: end,
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    if(data.items.length == 0) return res.json({message: 'No events found.'})
    if (error) return res.status(500).json(error);
    res.json(data.items)
  }
})

//  ADD EVENT ENDPOINT
app.post('/addEvent', SetOauth2ClientCredentials, async (req, res) => {
  
  const { title, date, startTime, endTime, user } = req.body;
  
  // fetching oauth2Client from middleware
  const oauth2Client = req.oauth2Client;

  let event = {
    summary: `${title}`,
    start: {
      dateTime: `${date}T${startTime}:00`, // YYYY/MM/DDTHH:MM:SS
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: `${date}T${endTime}:00`,
      timeZone: 'Asia/Kolkata',
    },
  };

  // This calls the calendar API and creates an event
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
  }
  catch (err) {
    console.log(err)
  }
  res.status(200).json({ message: 'Event added successfully.' });
})

// DELETE EVENT ENDPOINT
app.post("/deleteEvent",SetOauth2ClientCredentials,async (req, res) => {
  const {id} = req.body;
  // fetching oauth2Client from middleware
  const oauth2Client = req.oauth2Client;
  try{
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: id,
    });
    res.status(200).json({ message: 'Event deleted successfully.' });
  }
  catch(err){
    console.log(err)
  }
  
  
})

// COMPLETE EVENT ENDPOINT
app.post("/completeEvent",SetOauth2ClientCredentials,async (req, res) => {
  const {id} = req.body;
 // fetching refresh token from database
  const oauth2Client = req.oauth2Client;

  try{
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    await calendar.events.patch({
      calendarId: 'primary',
      eventId: id,
      requestBody: {
        colorId: '2',
      },
    });
    res.status(200).json({ message:'Event deleted successfully.' });
  }
  catch(err){
    console.log(err)
  }

  
})

// LOGIN ENDPOINT
app.get('/login', (req, res) => {
  // GOOGLE OAUTH authorizationURL parameters
  // Request calendar + user profile info scopes
  const SCOPES = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/userinfo.email', 
    'https://www.googleapis.com/auth/userinfo.profile',
  ];
  // Generate a secure random state value.
  const state = crypto.randomBytes(32).toString('hex');
  // Store state in the session
  req.session.state = state;

  // Google Oauth authorizationURL generation
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // only for testing 'send refresh token on every authentiction' ***
    scope: SCOPES,
    include_granted_scopes: true,
    // Include the state parameter to reduce the risk of CSRF attacks.
    state: state,
  });
  res.redirect(authorizationUrl);
})

// OAUTHCALLBACK URL
app.get('/oauth2callback', async (req, res) => {
  
  // accessing tokens for api
  try {
    const code = req.query.code;
    if (!code) return res.status(400).send('Missing authorization code');
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const refresh_token = tokens.refresh_token;
    
    // --- Fetch current user info from Google ---
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: googleUser } = await oauth2.userinfo.get();
    
    req.session.user = googleUser.email;
    
    // hash_password is null for upcoming implementation
    const { error } = await supabase
      .from('users')
      .upsert(
        { name: googleUser.name, email: googleUser.email, hash_password: null, google_refresh_token: refresh_token },
        { onConflict: 'email' }
      );
    if (error) return res.status(500).json(error);

    res.redirect(process.env.FRONTEND_URL + "/?user=" + googleUser.email)
    
  } catch (err) {
    console.error('Error retrieving tokens:', err);
    res.status(500).send('Authentication failed: ' + err.message);
  }
  
});


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is running on port " + port)
  console.log(process.env.FRONTEND_URL)
})