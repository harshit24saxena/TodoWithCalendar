const { google } = require('googleapis');
const { fetchRefreshToken } = require('./supabaseClient.js');

async function SetOauth2ClientCredentials(req, res, next){
    const user = req.query.user;

    // create auth client object 
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI,
    );
    
    //  FETCH REFRESH TOKEN FROM DATABASE
    if(user){
      const { data, error } = await fetchRefreshToken(user);
      if (error) return res.status(404).json({ message: 'User not found' });

        // SET CREDENTIALS
        oauth2Client.setCredentials({
            refresh_token: data.google_refresh_token
        });
    }


    req.oauth2Client = oauth2Client;

    next()
}

module.exports = SetOauth2ClientCredentials;