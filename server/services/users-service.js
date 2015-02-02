//=============================================================================
// USER SERVICE
//=============================================================================
'use strict';

var prop = require('app-config');
var i18n = require('i18n');
var mongoose = require('mongoose');
var randomstring = require('just.randomstring');
var defaultStorage = require('../database/default-storage');
var UsersSchema = require('./schemas/users-schema');
var errorUtils = require('../utils/error-utils');
var UserService = {};

/**
 * Find user by id.
 * @param userId - User id object.
 * @param callback - Callback function.
 * @return user object from database.
 */
UserService.findById = function(userId, callback) {
	return defaultStorage.findById(userId, UsersSchema, callback);
};

/**
 * Find all users.
 * @param fromPage - Page number.
 * @param changeAfter - Filter by change date.
 * @param callback - Callback function.
 * @return users objects from database.
 */
UserService.findAll = function(fromPage, changeAfter, callback) {
	return defaultStorage.findAll(fromPage, changeAfter, UsersSchema, callback);
};

/**
 * Save one user.
 * @param userJSON - User object to save.
 * @param callback - Callback function.
 * @return user object from database.
 */
UserService.save = function(userJSON, callback) {
	userJSON.password = randomstring(6);
	return defaultStorage.save(new UsersSchema(userJSON), callback);
};

/**
 * Save one user.
 * @param userJSON - User object to save.
 * @param callback - Callback function.
 * @return user object from database.
 */
UserService.renewPassword = function(userId, callback) {
	defaultStorage.findById(userId, UsersSchema, function(err, userFromDB) {
		if (err) {
			callback(err);
			return;
		} else {
			if (!userFromDB || !userFromDB.username) {
				callback(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').users_not_found));
				return;
			} else {
				userFromDB.password = randomstring(6);
				defaultStorage.update(userId, userFromDB, UsersSchema, function(err) {
					if (err) {
						callback(err);
						return;
					} else {
						callback(null, userId);
						return;
					}
				});
			}
		}
	});
};

/**
 * Update one user.
 * @param userId - User id.
 * @param userJSON - User object to save.
 * @param callback - Callback function.
 * @return userId - Updated user id.
 */
UserService.update = function(userId, userJSON, callback) {
	new UsersSchema(userJSON).validate(function(err) {
		if (err) {
			callback(err);
			return;
		} else {
			defaultStorage.findById(userId, UsersSchema, function(err, user) {
				if (err) {
					callback(err);
					return;
				} else {
					if (!user) {
						callback(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').users_not_found));
						return;
					} else {
						defaultStorage.findOneByCriteria({
							$and: [{
								'username': userJSON.username
							}, {
								'domain': userJSON.domain
							}]
						}, UsersSchema, function(err, user) {
							if (err) {
								callback(err);
								return;
							} else {
								if (user && user._id.toString() !== userId.toString()) {
									callback(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').users_update_username_duplicated));
									return;
								} else {
									userJSON.changeDateTime = new Date().getTime();
									defaultStorage.update(userId, userJSON, UsersSchema, function(err) {
										if (err) {
											callback(err);
											return;
										} else {
											callback(null, userId);
											return;
										}
									});
								}
							}
						});
					}
				}
			});
		}
	});
};

/**
 * Remove one user.
 * @param userId - User id to remove.
 * @param callback - Callback function.
 * @return userId - Removed user id.
 */
UserService.remove = function(userId, callback) {
	defaultStorage.remove(userId, UsersSchema, function(err, result) {
		if (err) {
			callback(err);
		} else {
			if (result === 0) {
				callback(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').users_not_found));
				return;
			} else {
				callback(null, userId);
				return;
			}
		}
	});
};

/**
 * Find one user by name and password.
 * @param username - Username to filter result.
 * @param password - Password to filter result.
 * @param callback - Callback function.
 * @return user object from database.
 */
UserService.findByCriteria = function(criteria, callback) {
	//FIX ME password should be encrypted
	return defaultStorage.findOneByCriteria(criteria, UsersSchema, callback);
};

/**
 * Associate a token to one user.
 * @param user - User object to save.
 * @param callback - Callback function.
 * @return user object from database.
 */
UserService.registerToken = function(user, callback) {
	return defaultStorage.findOneAndUpdate(user.id, {
		'token': user.token
	}, UsersSchema, callback);
};

/**
 * Find one user by token.
 * @param user - User object to save.
 * @param callback - Callback function.
 * @return user object from database.
 */
UserService.findByToken = function(token, callback) {
	return defaultStorage.findOneByCriteria({
		'token': token
	}, UsersSchema, callback);
};

module.exports = UserService;