//=============================================================================
// MIDDLEWARE TO VALIDATE TOKEN IN API CALLS
//=============================================================================
'use strict';
var prop = require('app-config');
var jwt = require('jwt-simple');
var i18n = require('i18n');
var jsonUtils = require('../utils/json-utils');
var UserService = require('../services-internal/user');

/**
 * Validate token in API calls.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Next function to execute.
 */
module.exports = function(req, res, next) {

  //Verify if there is a token on request path
  var token = (req.query && req.query.token);

  if (token) {
    var decoded;
    try {
      //Decoded token sent by user
      decoded = jwt.decode(token, prop.config.auth.jwt_token_secret);
    } catch (err) {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').validate_request_token_invalid, '[ValidateRequest]', next, err);
    }
    try {
      //Validate expiration date of token
      if (decoded.exp <= Date.now()) {
        return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').validate_request_token_expired, '[ValidateRequest]', next);
      } else {
        //Verify token on application database
        UserService.findByToken(token, function(err, userFromDB) {
          if (err) {
            return jsonUtils.returnError(prop.config.http.internal_server_error, i18n.__('validation').validate_request_internal_error_try_again, '[ValidateRequest]', next, err);
          } else {
            if (!userFromDB || !userFromDB.username) {
              //Return a error to user
              return jsonUtils.returnError(prop.config.http.unauthorized, i18n.__('validation').validate_request_do_not_have_permission, '[ValidateRequest]', next);
            } else {
              //If everything is OK, inform Node to execute next function
              return next();
            }
          }
        });
      }

    } catch (err) {
      return jsonUtils.returnError(prop.config.http.internal_server_error, i18n.__('validation').validate_request_internal_error_try_again, '[ValidateRequest]', next, err);
    }
  } else {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').validate_request_token_null, '[ValidateRequest]', next);
  }

};