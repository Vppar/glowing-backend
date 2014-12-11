//=============================================================================
// MIDDLEWARE TO VALIDATE TOKEN IN API CALLS
//=============================================================================
'use strict';
var prop = require('app-config');
var jwt = require('jwt-simple');
var i18n = require('i18n');
var errorUtils = require('../utils/error-utils');
var UserService = require('../services/v1/user');

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
    try {
      //Decoded token sent by user
      var decoded = jwt.decode(token, prop.config.auth.jwt_token_secret);

      //Validate expiration date of token
      if (decoded.exp <= Date.now()) {
        next(errorUtils.getError(prop.config.http.bad_request, i18n.__('validation').validate_request_token_expired));
        return;     
      } else {
          //Verify token on application database
          UserService.findByToken(token, function (err, userFromDB) {
            if(err) {
              console.error('[ValidateRequest][Error: '+err+']');
              next(errorUtils.getError(prop.config.http.internal_server_error, i18n.__('validation').validate_request_user_not_found));
              return; 
            } else {             
              if (!userFromDB || !userFromDB.username) {
                //Return a error to user               
                next(errorUtils.getError(prop.config.http.unauthorized, i18n.__('validation').validate_request_do_not_have_permission));
                return;
              } else {
                //If everything is OK, inform Node to execute next function
                next();
                return;
              }
            }
          });
      }      

    } catch (err) {
      console.error('[ValidateRequest][Error: '+err+']');      
      next(errorUtils.getError(prop.config.http.internal_server_error, i18n.__('validation').validate_request_internal_error_try_again));
      return;
    }
  } else {
    next(prop.config.http.bad_request, i18n.__('validation').validate_request_token_null);
    return;
  }

};