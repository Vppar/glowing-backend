//=============================================================================
// DEFINE SERVICES ROUTES
//=============================================================================
'use strict';
var prop = require('app-config');
var i18n = require('i18n');
var jsonUtils = require('../utils/json-utils');
var errorUtils = require('../utils/error-utils');
var funcUtils = require('../utils/func-utils');
var Service = {};

/**
 * Define generic service for retrieve one information from database.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
Service.findById = function(req, res, next) {
  try {
    validateIdParam(req, '[IndexService.findById]', next);
    return funcUtils.getFunc('findById', req, res, next);
  } catch (err) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').index_error_retrieving_func, '[IndexService.findById]', next, err);
  }
};

/**
 * Define generic service for retrieve a list of information from database.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
Service.findAll = function(req, res, next) {
  try {
    return funcUtils.getFunc('findAll', req, res, next);
  } catch (err) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').index_error_retrieving_func, '[IndexService.findAll]', next, err);
  }
};

/**
 * Define generic service for create database structures.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
Service.save = function(req, res, next) {
  try {
    validateBody(req, '[IndexService.save]', next);
    return funcUtils.getFunc('save', req, res, next);
  } catch (err) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').index_error_retrieving_func, '[IndexService.save]', next, err);
  }
};

/**
 * Define generic service for update database structures.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
Service.update = function(req, res, next) {
  try {
    validateBody(req, '[IndexService.update]', next);
    validateIdParam(req, '[IndexService.update]', next);
    return funcUtils.getFunc('update', req, res, next);
  } catch (err) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').index_error_retrieving_func, '[IndexService.update]', next, err);
  }
};

module.exports = Service;

/**
 * Validate request body.
 * @param req - HTTP Request object.
 * @param logFunc - log function.
 * @param next - callback.
 */
function validateBody(req, logFunc, next) {
  if (!req || !req.body) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').index_invalid_request_parameters, logFunc, next);
  } else {
    if (req.body._id) {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').index_invalid_request_parameter_id, logFunc, next);
    }
    if (req.body.changeDateTime) {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').index_invalid_request_parameter_changeDateTime, logFunc, next);
    }
    if (req.body.createDateTime) {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').index_invalid_request_parameter_createDateTime, logFunc, next);
    }
  }
}

/**
 * Validate request id parameter.
 * @param req - HTTP Request object.
 * @param logFunc - log function.
 * @param next - callback.
 */
function validateIdParam(req, logFunc, next) {
  if (!req || !req.params || !req.params.id) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').index_invalid_request_parameters, logFunc, next);
  }
}