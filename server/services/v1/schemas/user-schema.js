//=============================================================================
// COMPANY SCHEMA
//=============================================================================
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define user structure
var UserSchema = new Schema({
    username:       { type: String,  required: true, unique: true, min: 3, max: 25},
    password:       { type: String,  required: true, min: 8, max: 15 },
    role:           { type: String,  required: false },
    token:          { type: String,  required: false },
    active:         { type: Boolean, required: true, default: true },
    createDateTime: { type: Date,    required: true, default: Date.now },
    changeDateTime: { type: Date,    required: true, default: Date.now },
    __v:            { type: Number,  select: false }
});

//Define change date time when schema is saved
UserSchema.pre('save', function (next) {
    this.changeDateTime = new Date();
    next();
});

//Define change date time when schema is updated
UserSchema.pre('update', function (next) {
    this.changeDateTime = new Date();
    next();
});

module.exports = mongoose.model('UserSchema', UserSchema);