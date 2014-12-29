//=============================================================================
// DEFINE SERVICES ROUTES
//=============================================================================
'use strict';
var prop = require('app-config');
var i18n = require('i18n');
var errorUtils = require('../utils/error-utils');
var Service = {};

/**
 * Define generic service for retrieve one information from database.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
Service.findById = function(req, res, next) {
  try {
    validateIdParam(req, '[CompanyService.findById]', next);
    return getFunc('findById', req, res, next);
  } catch (err) {
    console.error('[IndexService][FindById]['+err+']');
    next(errorUtils.getError(prop.config.http.bad_request, i18n.__('validation').index_error_retrieving_func));
    return;
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
    return getFunc('findAll', req, res, next);
  } catch (err) {
    console.error('[IndexService][FindAll]['+err+']');
    next(errorUtils.getError(prop.config.http.bad_request, i18n.__('validation').index_error_retrieving_func));
    return;
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
    validateBody(req, '[CompanyService.save]', next);
    return getFunc('save', req, res, next);
  } catch (err) {
    console.error('[IndexService][Save]['+err+']');
    next(errorUtils.getError(prop.config.http.bad_request, i18n.__('validation').index_error_retrieving_func));
    return;
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
      validateBody(req, '[CompanyService.update]', next);
  validateIdParam(req, '[CompanyService.update]', next);
    return getFunc('update', req, res, next);
  } catch (err) {
    console.error('[IndexService][Update]['+err+']');
    next(errorUtils.getError(prop.config.http.bad_request, i18n.__('validation').index_error_retrieving_func));
    return;
  }
};

module.exports = Service;

/**
 * Get correct function do handle requests based on service an version informed.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 * @param method - Method used to call the service.
 * @throws error.
 * @return function to handle request.
 */
function getFunc(method, req, res, next) {

  validateAtributes(req, method);

  var func = loadFunc(getVersion(req), getService(req));

  // Return function by version of request path
  if (!func) {
    throw prop.config.message.server.index_invalid_func;
  }

  switch (method) {
    case 'findById':
      func.findById(req, res, next);
      break;
    case 'findAll':
      func.findAll(req, res, next);
      break;
    case 'save':
      func.save(req, res, next);
      break;
    case 'update':
      func.update(req, res, next);
      break;
    default:
      throw prop.config.message.server.index_method_not_implemented;
      break;
  }
}

/**
 * Load a function based on service and version parameters.
 * @param version - Informed version of service to load.
 * @param service - informed service to load.
 * @param module loaded by parameters.
 * @throws error.
 */
function loadFunc(version, service) {
  try {
    return require('./' + version + '/' + service);
  } catch (e) {
    throw e;
  }
}

/**
 * Get a service based on request parameter.
 * @param req - HTTP Request object.
 * @param service name to load.
 * @throws error.
 * @return service.
 */
function getService(req) {
  var service = req.params.service;
  if (!service || service === '') {
    throw '[ServiceIndex][Error: Fail whilist preparing to load modules by requested service. Service: ' + service + ']';
  }
  return service;
}

/**
 * Get a version based on request parameter.
 * @param req - HTTP Request object.
 * @param version of service to load.
 * @return version.
 */
function getVersion(req) {
  return req.params.version || prop.config.path.default_version;
}

/**
 * Validate request parameters.
 * @param req - HTTP Request object.
 * @param method - Application method.
 * @param version of service to load.
 * @throws error.
 */
function validateAtributes(req, method) {
  if (!req) {
    throw prop.config.message.server.index_invalid_req;
  }

  if (!method || method === '') {
    throw prop.config.message.server.index_invalid_method;
  }
}

/**
 * Validate request body.
 * @param req - HTTP Request object.
 * @param logFunc - log function.
 * @param next - callback.
 */
function validateBody(req, logFunc, next) {
  if (!req || !req.body) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').company_invalid_request_parameters, logFunc, next);
  } else {
    if (req.body._id) {
      delete req.body._id;
    }
    if (req.body.changeDateTime) {
      delete req.body.changeDateTime;
    }
    if (req.body.createDateTime) {
      delete req.body.createDateTime;
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
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').company_invalid_request_parameters, logFunc, next);
  }
}