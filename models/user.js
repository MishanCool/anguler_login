const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');//bcrypt is password hashing algorithem
const config = require('../models/database');

//User Schema
const UserSchema = mongoose.Schema({

    name:{
        type: String
    },

    email:{
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
});