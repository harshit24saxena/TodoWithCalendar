const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const calendar = req.calendar;

    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
    const start = new Date(`${today}T00:00:00+05:30`).toISOString();
    const end = new Date(`${today}T23:59:59+05:30`).toISOString();
    {
        const { data, error } = await calendar.events.list({
            calendarId: 'primary',
            timeMin: start,
            timeMax: end,
            singleEvents: true,
            orderBy: 'startTime',
        });

        if (data.items.length == 0) return res.json({ message: 'No events found.' })
        if (error) return res.status(500).json(error);
        res.json(data.items)
    }
})

module.exports = router;