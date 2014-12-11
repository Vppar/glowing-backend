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

/**
* Find one user by name and password.
* @param username - Username to filter result.
* @param password - Password to filter result.
* @param callback - Callback function.
* @return user object from database.
*/
UserService.findByNameAndPassword = function(username, password, callback) {
  return defaultStorage.findOne({'username': username, 'password': password }, UserSchema,callback);
};

/**
* Save one user.
* @param user - User object to save.
* @param callback - Callback function.
* @return user object from database.
*/
UserService.save = function(user, callback) {
  return defaultStorage.save(new UserSchema(user), callback);
};

/**
* Associate a token to one user.
* @param user - User object to save.
* @param callback - Callback function.
* @return user object from database.
*/
UserService.registerToken = function(user, callback) {	
  return defaultStorage.findOneAndUpdate(user.id, {'token':user.token}, UserSchema, callback);
};

/**
* Find one user by token.
* @param user - User object to save.
* @param callback - Callback function.
* @return user object from database.
*/
UserService.findByToken = function(token, callback) {	
  return defaultStorage.findOne({'token': token}, UserSchema, callback);
};

module.exports = UserService;