const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Log Model
const Log = require('../../models/Log');

//Profile Model
const Profile = require('../../models/Profile');

//Valiadtion
const validateLogInput = require('../../validation/log');

//Route:    GET api/logs/test
//Desc:     tests logs router
//Access:   Public
router.get('/test', (req, res) => res.json({ msg: "logs works" }));

//Route:    GET api/logs/
//Desc:     Create log 
//Access:   Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    Log.find()
        .sort({ date: -1 })
        .then(logs => res.json(logs))
        .catch(err => res.status(404).json({ nologsfound: 'No logs found with that ID' }));
});

//Route:    GET api/logs/:id
//Desc:     Create log 
//Access:   Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Log.findById(req.params.id)
        .then(log => res.json(log))
        .catch(err => res.status(404).json({ nologfound: 'No log found with that ID' }));
});

//Route:    POST api/logs/
//Desc:     Create log 
//Access:   Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateLogInput(req.body);

    //Check validation
    if (!isValid) {
        //if any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const newLog = new Log({
        user: req.user.id,
        location: req.body.location,
        sessionDate: req.body.sessionDate,
        sessionType: req.body.sessionType,
        sessionFocus: req.body.sessionFocus,
        coach: req.body.coach,
        otherParticipants: req.body.otherParticipants,
        positiveTakeAways: req.body.positiveTakeAways,
        areasOfOpportunity: req.body.areasOfOpportunity
    });

    newLog.save().then(log => res.json(log));
});

//Route:    DELETE api/logs/:id
//Desc:     Delete log 
//Access:   Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Log.findById(req.params.id)
                .then(log => {
                    //Check for log owner
                    if (log.user.toString() !== req.user.id) {
                        return res.status(401).status({ notauthorized: 'User not authorized' });
                    }

                    //Delete
                    post.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ lognotfound: 'No log found' }));
        })
});

module.exports = router;