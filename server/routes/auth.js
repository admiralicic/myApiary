var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var authCtrl = require('../controllers/auth.controller');

var authorize = jwt({
    secret: process.env.JWT_SECRET
});

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);
router.get('/secured', authorize, function (req, res) {
    res.status(200).send('Secured area');
});

module.exports = router;