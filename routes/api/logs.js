const express = require('express');
const router = express.Router();

//Route:    GET api/logs/test
//Desc:     tests logs router
//Access:   Public
router.get('/test', (req, res) => res.json({ msg: "logs works" }));

module.exports = router;