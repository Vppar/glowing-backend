//=============================================================================
// MIDDLEWARE TO VALIDATE BACKOFFICE ADMIN USERS OPERATIONS
//=============================================================================
'use strict';
var prop = require('app-config');
var i18n = require('i18n');
var jsonUtils = require('../utils/json-utils');

/**
 * Validate token in API calls for backoffice admin
 * users operations.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Next function to execute.
 */
module.exports = function(req, res, next) {

  //Verify if there is a token on request path
  var token = (req.query && req.query.token);

  if (token) {
    if (token === prop.config.auth_admin.token) {
      return next();
    } else {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').auth_admin_request_token_invalid, 'AuthAdminMiddleware', next);
    }
  } else {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').auth_admin_request_token_null, 'AuthAdminMiddleware', next);
  }

};