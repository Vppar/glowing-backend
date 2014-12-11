//=============================================================================
// COMPANY SCHEMA
//=============================================================================
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define company structure
var CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    externalCompanyId: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        //required: true,
        min: 14,
        max: 14,
        unique: true,
        validate: [validate({message: 'Name cannot be blank' }, 'required')]
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    createDateTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    changeDateTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    __v: {
        type: Number,
        select: false
    }
});

//Define change date time when schema is saved
CompanySchema.pre('save', function(next) {
    this.changeDateTime = new Date();
    next();
});

//Define change date time when schema is updated
CompanySchema.pre('update', function(next) {
    this.changeDateTime = new Date();
    next();
});

module.exports = mongoose.model('CompanySchema', CompanySchema);