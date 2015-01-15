//=============================================================================
// SERVICE FOR BACKOFFICE ADMIN AUTHENTICATION
//=============================================================================
'use strict';
var prop = require('app-config');
var i18n = require('i18n');
var jsonUtils = require('../../../utils/json-utils');

/**
 * Return admin token for backoffice operation.
 * With this token admin user can create, retrieve,
 * update and delete backoffice users.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 * @return Json with a valid token and the expiration date.
 */
module.exports = function(req, res, next) {

  if (!req || !res || !req.body) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').auth_admin_invalid_request_parameters, 'AuthAdminService', next);
  }

  var username = req.body.username || '';
  var password = req.body.password || '';

  // Verify if user send a correct json in the body of request
  if (username === '' || password === '') {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').auth_admin_null_username_and_password, 'AuthAdminService', next);
  } else {
    if (username === prop.config.auth_admin.username && password === prop.config.auth_admin.password) {
      return jsonUtils.returnSuccess(null, {
        'token': prop.config.auth_admin.token
      }, res, next);
    } else {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').auth_admin_invalid_username_or_password, 'AuthAdminService', next);
    }
  }
};