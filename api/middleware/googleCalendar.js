const { google } = require('googleapis');

function googleCalendar(req, res, next) {
    // fetching oauth2Client from middleware
    const oauth2Client = req.oauth2Client;
    
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    req.calendar = calendar;
    next();
}

module.exports = googleCalendar;