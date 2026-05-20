const router = require('express').Router();

router.post('/', async (req, res) => {

    const { title, date, startTime, endTime } = req.body;
    // fetching calendar from middleware
    const calendar = req.calendar;

    let event = {
        summary: `${title}`,
        start: {
            dateTime: `${date}T${startTime}:00`, // YYYY/MM/DDTHH:MM:SS
            timeZone: 'Asia/Kolkata',
        },
        end: {
            dateTime: `${date}T${endTime}:00`,
            timeZone: 'Asia/Kolkata',
        },
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });
        res.status(200).json(response.data);
    }
    catch (err) {
        console.log('error from add event endpoing', err.message)
    }
})

module.exports = router;
