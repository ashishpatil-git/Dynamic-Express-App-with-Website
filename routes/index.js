const express = require('express');
const speakerRoutes = require('./speakers');
const feedbackRoutes = require('./feedback');

const router = express.Router()
module.exports = (params) => {
    const { speakerService } = params;
    // Welcome Page
    router.get('/', async (req, res) => {
        const topSpeakers = await speakerService.getList();
        const artwork = await speakerService.getAllArtwork();
        res.render('layout', { pageTitle: "MyPage", template: 'index', topSpeakers, artwork });
    });

    router.use('/speakers', speakerRoutes(params));
    router.use('/feedback', feedbackRoutes(params));
    return router;
}