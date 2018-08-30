const express = require('express');
const router = express.Router();

//Route:    GET api/users/test
//Desc:     tests users router
//Access:   Public
router.get('/test', (req, res) => res.json({ msg: "users works" }));

module.exports = router;