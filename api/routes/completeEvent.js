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
        res.status(200).json({ message: 'Event deleted successfully.' });
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router;