const router = require('express').Router();
const crypto = require('crypto');



router.get("/", (req, res) => {

    const oauth2Client = req.oauth2Client;
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
module.exports = router;