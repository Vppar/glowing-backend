'use strict';
var i18n = require('i18n');
var prop = require('app-config');
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var errorUtils = require('../../../../utils/error-utils');

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
var CompaniesSchema = new mongoose.Schema({
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

var CompaniesModel = mongoose.model('CompaniesSchema', CompaniesSchema);

//=============================================================================
// COMPANY MIDDLEWARES
//=============================================================================
//Define change date time when schema is saved
CompaniesSchema.pre('save', function(next) {
    this.createDateTime = new Date().getTime();
    this.changeDateTime = new Date().getTime();
    next();
});

//Validate duplicated cnpj, name or externalCompanyId.
CompaniesSchema.pre('save', function(next) {
    CompaniesModel.findOne({ $or:[ {name: this.name}, {externalCompanyId: this.externalCompanyId}, {cnpj: this.cnpj} ]}, function(err, company) {
        if (err) {
            next(err);
        } else {
            if (company && company.name) {
                next(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').companies_save_cnpj_name_externalCompanyId_duplicated));
            } else {
                next();
            }
        }
    });
});

module.exports = CompaniesModel;