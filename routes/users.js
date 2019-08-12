const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//Register
router.get('/register', (req, res, next) => {
    res.send('REGISTER');
});


//Authentication
router.post('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE');
});

//Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

//validate
router.get('/validate', (req, res, next) => {
    res.send('VALIDATE');
});


 module.exports = router;