//=============================================================================
// AUTHENTICATION SERVICE
//=============================================================================
'use strict';

var jwt = require('jwt-simple');
var prop = require('app-config');
var i18n = require('i18n');
var errorUtils = require('../utils/error-utils');
var UserService = require('./v1/user');

/**
* Verify if user exists before generate token.
* @param req - HTTP Request object.
* @param res - HTTP Response object.
* @param next - Node next function.
*/
module.exports = function(req, res, next) {

    if (!req || !res || !req.body) {
      next(errorUtils.getError(prop.config.http.bad_request, i18n.__('validation').authentication_invalid_request_parameters));
      return;
    }

    var username = req.body.username || '';
    var password = req.body.password || '';

    // Verify if user send a correct json in the body of request
    if (username === '' || password === '') {
      next(errorUtils.getError(prop.config.http.unauthorized, i18n.__('validation').authentication_invalid_request_parameters));
      return;
    }

    // Verify if user is registered on application database.
    UserService.findByNameAndPassword(username, password, function (err, userFromDB) {
      if(err) {
        console.error('[AuthenticationService][Error:'+err+']');
        next(errorUtils.getError(prop.config.http.internal_server_error, i18n.__('validation').authentication_user_not_found));
        return;
      } else { 
        if (!userFromDB || !userFromDB.username) {          
          next(errorUtils.getError(prop.config.http.unauthorized, i18n.__('validation').authentication_user_not_have_permission));
          return;
        } else {
          try {     
            generateToken(userFromDB, function (err, token) {
              if(err) {
                throw err;
              } else {
                res.json(token);
                next();
                return;
              }
            });
          }
          catch(err) {
              console.error('[AuthenticationService.genToken][Error:'+err+']');
              next(errorUtils.getError(prop.config.http.internal_server_error, i18n.__('validation').authentication_fail_to_generate_token));
              return;
          }          
        }
      }
    });
};

/**
* Generate a token for registered users.
* @param userFromDB - User object from database.
* @return Json with a valid token and the expiration date.
*/
function generateToken(userFromDB, callback) {

  if (!userFromDB) {
    callback(i18n.__('internal_error').authentication_fail_to_generate_token);
  }

  var expDate = expiresIn();
  var tokenToReturn;

  //Generate token
  userFromDB.token = jwt.encode({exp: expDate}, prop.config.auth.jwt_token_secret);

  if (!userFromDB.token) {
    callback(i18n.__('internal_error').authentication_generate_invalid_token);
  }

  //Register token generated on database
  UserService.registerToken(userFromDB, function (err) {
    if(err) {
      callback(i18n.__('internal_error').authentication_user_required_to_generate_token);
    } else {      
      callback(null, { token: userFromDB.token, expires: expDate });
    }
  });
}

/**
* Define how long token will be valid.
* @return token expiration date.
*/
function expiresIn() {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + prop.config.auth.daysOfTokenValidate);
}