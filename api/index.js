if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { google } = require('googleapis');
const crypto = require('crypto');
const express = require('express');
const session = require('express-session');
const supabase = require('./supabaseClient.js');


// create auth client object 
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI,
);

// server 
const app = express()
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }    // true only with HTTPS
}));

app.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  if (error) return res.status(500).json(error);
  console.log(data)
  res.json(data);
})

app.get('/insert', async (req, res) => {
  // const {email,password} = req.body;
  const { data, error } = await supabase
    .from('users')
    .insert({ name: 'Honey', email: 'honey@gmail.com', hash_password: '5678' })
  if (error) return res.status(500).json(error);
  res.json(data);
})

app.get('/addEvent', async(req, res) => {

  // fetching refresh token from database
    const {data, error} = await supabase
    .from('users')
    .select('google_refresh_token')
    .eq('email', 'honey@gmail.com');
    oauth2Client.setCredentials({
      refresh_token: data[0].google_refresh_token
    });
  if (error) return res.status(500).json(error);


        let event = {
        summary: 'Google Calendar API Quickstart',
        description: 'This is a test event',
        start: {
          dateTime: '2026-05-06T12:00:00',// YYYY/MM/DDTHH:MM:SS
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: '2026-05-06T23:59:00',
          timeZone: 'Asia/Kolkata', 
        },
      };

      /*
      This call calendar api and create event
      */
      const calendar = google.calendar({version: 'v3',auth: oauth2Client});
      const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    })
  res.send(`<h1>this is add event page <a target="_blank" href = ${response.data.htmlLink}> Calendar link </a></h1>`)

})

app.get("/login", (req, res) => {

  // GOOGLE OAUTH authorizationURL parameters
  // The scope for reading calendar events. 
  const SCOPES = 'https://www.googleapis.com/auth/calendar';
  // Generate a secure random state value.
  const state = crypto.randomBytes(32).toString('hex');
  // Store state in the session
  req.session.state = state;

  // Google Oauth authorizationURL generation
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // only for testing 'send refresh token on every authentiction'
    scope: SCOPES,
    include_granted_scopes: true,
    // Include the state parameter to reduce the risk of CSRF attacks.
    state: state,
  });
  res.redirect(authorizationUrl);
})

app.get('/oauth2callback', async (req, res) => {

  // accessing tokens for api
  try {
    const code = req.query.code;
    if (!code) return res.status(400).send('Missing authorization code');
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const refresh_token = tokens.refresh_token;

    // updating supabase with refresh token
    const { error } = await supabase 
      .from('users')
      .update({ google_refresh_token: refresh_token })
      .eq('email', 'honey@gmail.com') // change hard code value to dynamic value
    if (error) return res.status(500).json(error);
    res.redirect("/addEvent")

  } catch (err) {
    console.error('Error retrieving tokens:', err);
    res.status(500).send('Authentication failed: ' + err.message);
  }

});


app.listen(8000, () => {
  console.log("Server is running on port 8000")
})