'use strict';
var i18n = require('i18n');
var prop = require('app-config');
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var errorUtils = require('../../../utils/error-utils');

//=============================================================================
// COMPANY VALIDATORS
//=============================================================================
var cnpjValidator = [
    validate({
        validator: 'isLength',
        arguments: [14, 14],
        message: 'CNPJ should have 14 characters.'
    }),
    validate({
        validator: 'isNumeric',
        passIfEmpty: false,
        message: 'CNPJ should contain only numeric characters.'
    })
];

var externalCompanyIdValidator = [
    validate({
        validator: 'isLength',
        arguments: [4, 20],
        message: 'External Company Id should have between 4 and 20 characters.'
    })
];

var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [4, 30],
        message: 'Name should have between 5 and 30 characters.'
    })
];

//=============================================================================
// COMPANY SCHEMA
//=============================================================================
var CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: nameValidator
    },
    externalCompanyId: {
        type: String,
        required: true,
        validate: externalCompanyIdValidator
    },
    cnpj: {
        type: String,
        required: true,
        unique: true,
        validate: cnpjValidator
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    createDateTime: {
        type: Date
    },
    changeDateTime: {
        type: Date
    },
    __v: {
        type: Number,
        select: false
    }
});

var CompanyModel = mongoose.model('CompanySchema', CompanySchema);

//=============================================================================
// COMPANY MIDDLEWARES
//=============================================================================
//Define change date time when schema is saved
CompanySchema.pre('save', function(next) {
    this.createDateTime = new Date();
    this.changeDateTime = new Date();
    next();
});

//Validate duplicated cnpj
CompanySchema.pre('save', function(next) {
    CompanyModel.findOne({
        cnpj: this.cnpj
    }, function(err, company) {
        if (err) {
            next(err);
        } else {
            if (company && company.name) {
                next(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').company_save_cnpj_duplicated));
            } else {
                next();
            }
        }
    });
});

//Validate duplicated name
CompanySchema.pre('save', function(next) {
    CompanyModel.findOne({
        name: this.name
    }, function(err, company) {
        if (err) {
            next(err);
        } else {
            if (company && company.name) {
                next(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').company_save_name_duplicated));
            } else {
                next();
            }
        }
    });
});

//Define change date time when schema is updated
CompanySchema.pre('update', function(next) {
    this.changeDateTime = new Date();
    next();
});

module.exports = CompanyModel;