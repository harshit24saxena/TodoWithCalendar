const router = require('express').Router();
const { google } = require('googleapis');
const { supabase } = require('../utilities/supabaseClient.js');

router.get('/', async (req, res) => {

    const oauth2Client = req.oauth2Client;
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
module.exports = router;