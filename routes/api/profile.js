const express = require('express');
const router = express.Router();


//Route:    GET api/profile/test
//Desc:     tests profile router
//Access:   Public
router.get('/test', (req, res) => res.json({ msg: "profile works" }));

module.exports = router;