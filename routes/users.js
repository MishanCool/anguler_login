const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Register
router.get('/register', (req, res, next) => {
    //res.send('REGISTER');
    let newUser = new User({
        name: req.body.name,
        email:req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to register user'});
        }
        else{
            res.json({success: true, msg:'User register'});
        }
    });
});


//Authentication
router.post('/authenticate', (req, res, next) => {
    //res.send('AUTHENTICATE');
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err,user) => {
        if(err) throw err;

        if(!user)
        {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch)
            {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 //one week
                });

                res.json({
                    success: true,
                    token: 'JWT'+token,

                    user: {
                        id:user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });

            }
            else
            {
                return res.json({success: false, msg: 'Wrong password'});
            }
              
        });   
    });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    //res.send('PROFILE');
    res.json({user: req.user});
});

//validate
router.get('/validate', (req, res, next) => {
    res.send('VALIDATE');
});


 module.exports = router;