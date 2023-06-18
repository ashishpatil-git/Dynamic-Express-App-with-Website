/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieSession = require('cookie-session')
const SpeakerServices = require('./services/SpeakerService');
const FeedbackServices = require('./services/FeedbackService');
const routes = require('./routes');

const speakerService = new SpeakerServices(path.join(__dirname, 'data', 'speakers.json'));
const feedbackService = new FeedbackServices(path.join(__dirname, 'data', 'feedback.json'));

const app = express();
// Adding trust proxy
app.set('trust proxy', 1);

// Adding session management middleware
app.use(cookieSession({
    name: 'session',
    keys: ['Ghuahdfuih2334', 'DIjuifhi2389dc89']
}))

// Setting view engine type
app.set("view engine", "ejs");

// set middleware for parsing post-request body.
app.use(bodyParser.urlencoded({ extended: true }));

// Setting path to views folder
app.set("views", path.join(__dirname, './views'));

// setting a local variable within Express app.
app.locals.siteName = "Roux Meetups";

// Global middleware to fetch speakersName
app.use(async (req, res, next) => {
    try {
        const names = await speakerService.getNames();
        res.locals.speakerNames = names;
        return next();
    } catch (error) {
        return next(error)
    }
});

// Adding middleware to use static files.
app.use(express.static(path.join(__dirname, './static')));

// Setting router middleware
app.use('/', routes({ speakerService, feedbackService }));

// Error middle if any error occurs.
app.use((req, res, next) => next(createError(404, 'Page Not Found')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500;
    res.locals.status = status;
    res.status(status);
    res.render('error');
});

// Initializing server on port 3000
app.listen(3000, () => {
    console.log("Server Started on Port 3000");
});