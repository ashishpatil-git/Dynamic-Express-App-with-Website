const express = require('express');


const router = express.Router();

module.exports = (params) => {
    const { speakerService } = params;

    router.get('/', async (req, res) => {
        const speakers = await speakerService.getList();
        const artwork = await speakerService.getAllArtwork();
        res.render('layout', { pageTitle: "Speakers", template: 'speakers', speakers, artwork });
    });

    router.get('/:name', async (req, res) => {
        const { name } = req.params;
        const artwork = await speakerService.getArtworkForSpeaker(name);
        const speaker = await speakerService.getSpeaker(name);
        res.render('layout', { pageTitle: 'Speaker', template: 'speaker-details', speaker, artwork });
    });

    return router;
};