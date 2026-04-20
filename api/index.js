if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express');
const session = require('express-session');

// middleware imports
const SetOauth2ClientCredentials = require('./middleware/googleAuth.js');
const googleCalendar = require('./middleware/googleCalendar.js');

// route imports
const homeRoute = require('./routes/homeRoute.js');
const addEventRoute = require('./routes/addEvent.js');
const deleteEventRoute = require('./routes/deleteEvent.js');
const completeEventRoute = require('./routes/completeEvent.js');
const loginRoute = require('./routes/login.js');
const oauth2callbackRoute = require('./routes/oauth2callback.js');

// server 
const app = express()
app.use(express.json())

// middleware
  //Access-Control-Allow-Origin middleware CONFIG
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });
  // SESSION CONFIG
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' ? true : false }    // true only with HTTPS
  }));
  // SET GOOGLE OAUTH2CLIENT CREDENTIALS
  app.use(SetOauth2ClientCredentials)
  // SET GOOGLE CALENDAR
  app.use(googleCalendar)

// GET EVENTS ENDPOINT - " / " route
app.use('/', homeRoute)

//  ADD EVENT ENDPOINT - " /addEvent " route
app.use('/addEvent', addEventRoute)

// DELETE EVENT ENDPOINT - " /deleteEvent " route
app.use("/deleteEvent", deleteEventRoute)

// COMPLETE EVENT ENDPOINT - " /completeEvent " route
app.use("/completeEvent", completeEventRoute)

// LOGIN ENDPOINT - " /login " route
app.use('/login', loginRoute)

// OAUTHCALLBACK URL - " /oauth2callback " route
app.use('/oauth2callback', oauth2callbackRoute);


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is running on port " + port)
  console.log(process.env.FRONTEND_URL)
})