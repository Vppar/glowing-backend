//=============================================================================
// COMPANY SCHEMA
//=============================================================================
'use strict';
var i18n = require('i18n');
var prop = require('app-config');
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var errorUtils = require('../../utils/error-utils');

var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [4, 20],
        message: 'Username should have between 4 and 20 characters.'
    })
];

var passwordValidator = [
    validate({
        validator: 'isLength',
        arguments: [4, 20],
        message: 'Password should have between 4 and 20 characters.'
    })
];

//Define user structure
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: usernameValidator
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidator
    },
    role: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    createDateTime: {
        type: Number
    },
    changeDateTime: {
        type: Number
    },
    __v: {
        type: Number,
        select: false
    }
});

//Define change date time when schema is saved
UserSchema.pre('save', function(next) {
    this.createDateTime = new Date().getTime();
    this.changeDateTime = new Date().getTime();
    next();
});


//Define change date time when schema is updated
UserSchema.pre('update', function(next) {
    this.changeDateTime = new Date().getTime();
    next();
});

module.exports = mongoose.model('UserSchema', UserSchema);