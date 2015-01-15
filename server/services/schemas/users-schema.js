'use strict';
var i18n = require('i18n');
var prop = require('app-config');
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var errorUtils = require('../../utils/error-utils');

//=============================================================================
// BACKOFFICE USER VALIDATORS
//=============================================================================
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

var domainValidator = [
    validate({
        validator: 'isLength',
        arguments: [4, 20],
        message: 'Domain should have between 4 and 20 characters.'
    })
];

//=============================================================================
// BACKOFFICE USER SCHEMA
//=============================================================================
var UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: usernameValidator
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidator
    },
    domain: {
        type: String,
        required: true,
        validate: domainValidator
    },
    role: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false,
        select: false
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

UsersSchema.index({ username: 1, domain: 1 }, { unique: true });

var UsersModel = mongoose.model('UsersSchema', UsersSchema);

//=============================================================================
// COMPANY MIDDLEWARES
//=============================================================================
//Define change date time when schema is saved
UsersSchema.pre('save', function(next) {
    this.createDateTime = new Date().getTime();
    this.changeDateTime = new Date().getTime();
    next();
});

//Validate duplicated cnpj, name or externalCompanyId.
UsersSchema.pre('save', function(next) {
    UsersModel.findOne({
              $and: [{
                'username': this.username
              }, {
                'domain': this.domain
              }]
            }, function(err, user) {
        if (err) {
            next(err);
        } else {
            if (user && user.username) {
                next(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').users_save_username_duplicated));
            } else {
                next();
            }
        }
    });
});

module.exports = UsersModel;