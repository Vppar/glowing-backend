//=============================================================================
// MIDDLEWARE TO VALIDATE ADMIN TOKEN FOR USERS SERVICE
//=============================================================================
'use strict';
var prop = require('app-config');
var jwt = require('jwt-simple');
var i18n = require('i18n');
var jsonUtils = require('../utils/json-utils');
var errorUtils = require('../utils/error-utils');
var UserService = require('../services/users-service');

/**
 * Validate token in API calls.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Next function to execute.
 */
module.exports = function(req, res, next) {

  var token = (req.query && req.query.token);

  if (token) {
    try {
      UserService.findByToken(token, function(err, userFromDB) {
        if (err) {
          return jsonUtils.returnError(prop.config.http.internal_server_error, i18n.__('validation').users_service_middleware_internal_error_try_again, 'UsersSeviceMiddleware', next, err);
        } else {
          if (!userFromDB || !userFromDB.username) {
            return jsonUtils.returnError(prop.config.http.unauthorized, i18n.__('validation').users_service_middleware_do_not_have_permission, 'UsersSeviceMiddleware', next);
          } else {
            if (userFromDB.role !== 'admin') {
              return jsonUtils.returnError(prop.config.http.unauthorized, i18n.__('validation').users_service_middleware_do_not_have_permission, 'UsersSeviceMiddleware', next);
            } else {
              return next();
            }
          }
        }
      });
    } catch (err) {
      return jsonUtils.returnError(prop.config.http.internal_server_error, i18n.__('validation').users_service_middleware_internal_error_try_again, 'UsersSeviceMiddleware', next, err);
    }
  } else {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').users_service_middleware_token_null, 'UsersSeviceMiddleware', next);
  }

};