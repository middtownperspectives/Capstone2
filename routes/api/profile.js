const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Validation
const validateProfileInput = require('../../validation/profile');
const validateTournamentInput = require('../../validation/tournament');
//Load Profile & User model
const Profile = require('../../models/Profile');
const User = require('../../models/User');


//Route:    GET api/profile/test
//Desc:     tests profile router
//Access:   Public
router.get('/test', (req, res) => res.json({ msg: "profile works" }));

//Route:    GET api/profile
//Desc:     get current user's profile
//Access:   Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .populate('user', 'name')
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

//Route:    GET api/profile/all
//Desc:     Get all profiles
//Access:   Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', 'name')
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err =>
            res.status(404).json({ profile: 'There are no profiles' })
        );
});

//Route:    GET api/profile/handle/:handle
//Desc:     Get profile by handle
//Access:   Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
        .populate('user', 'name')
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

//Route:    GET api/profile/user/:user_id
//Desc:     Get profile by userID
//Access:   Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
        .populate('user', 'name')
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
});

//Route:    POST api/profile
//Desc:     Create or Edit user's profile
//Access:   Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);

        //Check Validation
        if (!isValid) {
            //Return any errors w/ 400 status
            return res.status(400).json(errors);
        }


        //GET fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.dominantHand) profileFields.dominantHand = req.body.dominantHand;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.NTRP) profileFields.NTRP = req.body.NTRP;

        //Strengths - Split into array
        if (typeof req.body.strengths !== 'undefined') {
            profileFields.strengths = req.body.strengths.split(',');
        }
        if (typeof req.body.areasOfOpp !== 'undefined') {
            profileFields.areasOfOpp = req.body.areasOfOpp.split(',');
        }

        //Social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    //Update
                    Profile.findOneAndUpdate(
                        { user: req.user.id },
                        { $set: profileFields },
                        { new: true }
                    )
                        .then(profile => res.json(profile));
                } else {
                    //Create


                    //Check if handle exists
                    Profile.findOne({ handle: profileFields.handle })
                        .then(profile => {
                            if (profile) {
                                errors.handle = 'That handle already exists';
                                res.status(400).json(errors);
                            }

                            //Save Profile
                            new Profile(profileFields).save().then(profile => res.json(profile));
                        });
                }
            });
    }
);

//Route:    POST api/profile/tournaments
//Desc:     Add tournaments
//Access:   Private
router.post('/tournaments', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateTournamentInput(req.body);

    //Check Validation
    if (!isValid) {
        //Return any errors w/ 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newTournament = {
                tournament: req.body.tournament,
                date: req.body.date,
                location: req.body.location,
                score: req.body.score,
                partner: req.body.partner
            }
            //Add to tournament array
            profile.tournaments.unshift(newTournament);

            profile.save().then(profile => res.json(profile));
        })
});

//Route:    DELETE api/profile/tournaments/:tournament_id
//Desc:     Delete tournaments from profile
//Access:   Private
router.delete(
    '/tournaments/:tournament_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        Profile.findOne({ user: req.user.id })
            .then(profile => {

                //Get remove index
                const removeIndex = profile.tournaments
                    .map(item => item.id)
                    .indexOf(req.params.tournament_id);

                //splice out of array
                profile.tournaments.splice(removeIndex, 1);

                //Save
                profile.save().then(profile => res.json(profile));

            })
            .catch(err => res.status(404).json(err));
    }
);

//Route:    DELETE api/profile
//Desc:     Delete user and profile
//Access:   Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
            User.findOneAndRemove({ _id: req.user.id }).then(() =>
                res.json({ success: true })
            )
        });
    }
);

module.exports = router;