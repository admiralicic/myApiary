var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var authCtrl = require('../controllers/auth.controller');

var auth = jwt({
    secret: process.env.JWT_SECRET
});

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);

module.exports = router;