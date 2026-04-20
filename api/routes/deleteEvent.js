const router = require('express').Router();

router.post("/", async (req, res) => {
    const { id } = req.body;

    // fetching calendar from middleware
    const calendar = req.calendar;

    try {
        await calendar.events.delete({
            calendarId: 'primary',
            eventId: id,
        });
        res.status(200).json({ message: 'Event deleted successfully.' });
    }
    catch (err) {
        console.log(err)
    }

})
module.exports = router;