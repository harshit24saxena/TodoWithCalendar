if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const {google} = require('googleapis');
const crypto = require('crypto');
const express = require('express');
const session = require('express-session');


// The scope for reading calendar events. 
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// Generate a secure random state value.
const state = crypto.randomBytes(32).toString('hex');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI, 
); 
console.log('REDIRECT_URI:', process.env.REDIRECT_URI)
console.log('CLIENT_ID loaded:', !!oauth2Client._clientId)

// server 
const app = express()
app.use(express.json())

app.get("/", (req, res) => {


// Generate a url that asks permissions for the Drive activity and Google Calendar scope
const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  /** Pass in the scopes array defined above. 
    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: SCOPES,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true,
});
res.redirect(authorizationUrl);
})  
app.get('/oauth2callback', async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).send('Missing authorization code');

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Now you can call Google Calendar API
    
/**
 * Lists the next 10 events on the user's primary calendar.
*/
async function listEvents() {
  // Create a new Calendar API client.
  const calendar = google.calendar({version: 'v3', auth});
  // Get the list of events.
  const result = await calendar.events.list({
      calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = result.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log('Upcoming 10 events:');

  // Print the start time and summary of each event.
  for (const event of events) {
      const start = event.start?.dateTime ?? event.start?.date;
      console.log(`${start} - ${event.summary}`);
    }
}

listEvents();

    res.send('Authentication successful! You can close this tab.');
  } catch (err) {
    console.error('Error retrieving tokens:', err);
    res.status(500).send('Authentication failed: ' + err.message);
  }
  
});
app.listen(8000, () => {
    console.log("Server is running on port 8000") 
})