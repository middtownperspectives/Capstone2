const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

//Route:    GET api/users/test
//Desc:     tests users router
//Access:   Public
router.get('/test', (req, res) => res.json({ msg: "users works" }));

//Route:    GET api/users/register
//Desc:     Register user
//Access:   Public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' });
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

//Route:    GET api/users/login
//Desc:     Login user/Returning JWT Token
//Access:   Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({ email })
        .then(user => {
            //check for user
            if (!user) {
                return res.status(404).json({ email: 'User not found' });
            }

            //check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        res.json({ msg: 'Login Success' });
                    } else {
                        return res.status(400).json({ password: 'Password incorrect' });
                    }
                })
        });
})

module.exports = router;