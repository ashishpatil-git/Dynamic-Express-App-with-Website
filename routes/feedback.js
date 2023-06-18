/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const { check, validationResult } = require('express-validator');

const validatins = [
    check('name').trim().isLength({ min: 3 }).escape().withMessage('Name required'),
    check('email').trim().isEmail().normalizeEmail().withMessage('Enter valid'),
    check('title').trim().isLength({ min: 3 }).escape().withMessage('title required'),
    check('message').trim().isLength({ min: 5 }).escape().withMessage('message required')]

const router = express.Router();

module.exports = (params) => {
    const { feedbackService } = params;
    router.get('/', async (req, res, next) => {
        try {
            const feedback = await feedbackService.getList();
            const errors = req.session.feedback ? req.session.feedback.errors : false;
            const successMessage = req.session.feedback ? req.session.feedback.message : false;
            req.session.feedback = {};
            return res.render('layout', { pageTitle: 'Feedback', template: 'feedback', feedback, errors, successMessage });
        } catch (error) {
            return next(error);
        }
    });

    router.post('/', validatins,
        async (req, res, next) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    req.session.feedback = {
                        errors: errors.array(),
                    }
                    return res.redirect('/feedback');
                }
                const { name, email, title, message } = req.body;
                await feedbackService.addEntry(name, email, title, message);
                req.session.feedback = {
                    message: "Thanks for the feedback"
                }
                return res.redirect('/feedback');
            } catch (error) {
                return next(error);
            }
        });
    return router;
};