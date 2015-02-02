//=============================================================================
// SERVICE FOR BACKOFFICE ADMIN CREATE, RETRIEVE, UPDATE AND DELETE USERS
//=============================================================================
'use strict';

var prop = require('app-config');
var i18n = require('i18n');
var jsonUtils = require('../../utils/json-utils');
var defaultStorage = require('../../database/default-storage');
var usersService = require('../../services/users-service');
var httpUtils = require('../../utils/http-utils');
var UsersEndpoint = {};

/**
 * Find one backoffice user by id.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
UsersEndpoint.findById = function(req, res, next) {

  try {
    httpUtils.validateIdParam(req);
  } catch (err) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').users_invalid_parameters, 'UsersEndpoint.findById', next, err);
  }

  usersService.findById(req.params.id, function(err, user) {
    if (err) {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').users_findById_error, 'UsersEndpoint.findById', next, err);
    } else {
      if (user) {
        return jsonUtils.returnSuccess(null, user, res, next);
      } else {
        return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').users_not_found, 'UsersEndpoint.findById', next, err);
      }
    }
  });
};

/**
 * List all backoffice users.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
UsersEndpoint.findAll = function(req, res, next) {

  var changeAfter;
  var fromPage;
  try {
    changeAfter = httpUtils.getChangeAfter(req);
    fromPage = httpUtils.getFromPage(req);
  } catch (err) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').users_invalid_parameters, 'UsersEndpoint.findAll', next, err);
  }

  usersService.findAll(fromPage, changeAfter, function(err, users) {
    if (err) {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').users_findAll_error, 'UsersEndpoint.findAll', next, err);
    } else {
      return jsonUtils.returnSuccess(null, users, res, next);
    }
  });
};

/**
 * Save a backoffice user.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
UsersEndpoint.save = function(req, res, next) {

  try {
    httpUtils.validateBody(req);
    httpUtils.validateToken(req);
  } catch (err) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').users_invalid_parameters, 'UsersEndpoint.save', next, err);
  }

  usersService.save(req.body, function(err, user) {
    if (err) {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').users_save_error, 'UsersEndpoint.save', next, err);
    } else {
      return jsonUtils.returnSuccess(user._id, null, res, next);
    }
  });
};

/**
 * Update a backoffice user.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
UsersEndpoint.update = function(req, res, next) {
  try {
    httpUtils.validateIdParam(req);
    httpUtils.validateBody(req);
    httpUtils.validateToken(req);
  } catch (err) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').users_invalid_parameters, 'UsersEndpoint.update', next, err);
  }

  usersService.update(req.params.id, req.body, function(err, userId) {
    if (err) {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').users_update_error, 'UsersEndpoint.update', next, err);
    } else {
      return jsonUtils.returnSuccess(userId, null, res, next);
    }
  });
};

/**
 * Remove a backoffice user.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
UsersEndpoint.remove = function(req, res, next) {
  try {
    httpUtils.validateIdParam(req);
  } catch (err) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').users_invalid_parameters, 'UsersEndpoint.remove', next, err);
  }

  usersService.remove(req.params.id, function(err, userId) {
    if (err) {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').users_delete_error, 'UsersEndpoint.remove', next, err);
    } else {
      return jsonUtils.returnSuccess(userId, null, res, next);
    }
  });
};

module.exports = UsersEndpoint;