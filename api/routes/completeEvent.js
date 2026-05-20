const router = require('express').Router();

router.post("/",  async (req, res) => {
    const { id } = req.body;

    const calendar = req.calendar;
    try {
        await calendar.events.patch({
            calendarId: 'primary',
            eventId: id,
            requestBody: {
                colorId: '2',
            },
        });
        res.status(200).json({ message: 'Event completed successfully.' });
    }
    catch (err) {
        console.log('error from completed event endpoing', err, new Date().getHours())
    }
})

module.exports = router;