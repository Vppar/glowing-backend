//=============================================================================
// USER SERVICE
//=============================================================================
'use strict';

var prop = require('app-config');
var i18n = require('i18n');
var mongoose = require('mongoose');
var defaultStorage = require('../../database/default-storage');
var UserSchema = require('./schemas/user-schema');
var UserService = {};

UserService.findByName = function(name, callback) {
  defaultStorage.findOne({'username': name}, UserSchema,callback);
};

UserService.save = function(user, callback) {
  defaultStorage.save(new UserSchema(user), callback);
};

UserService.registerToken = function(user, callback) {	
  defaultStorage.findOneAndUpdate(user.id, {'token':user.token}, UserSchema, callback);
};

UserService.findByToken = function(token, callback) {	
  defaultStorage.findOne({'token': token}, UserSchema, callback);
};

module.exports = UserService;