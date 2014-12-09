//=============================================================================
// MIDDLEWARE TO REQUIRE API CALLS WITH A VALID TOKEN
//=============================================================================
'use strict';
var prop = require('app-config');
var jwt = require('jwt-simple');
var jsonUtils = require('../utils/json-utils');
var i18n = require('i18n');
var UserService = require('../services/v1/user');

module.exports = function(req, res, next) {

  var token = (req.query && req.query.token);

  if (token) {
    try {
      var decoded = jwt.decode(token, prop.config.auth.jwt_token_secret);
      if (decoded.exp <= Date.now()) {
        res.status(prop.config.http.bad_request);
        res.json(jsonUtils.getReturnMessage(prop.config.http.bad_request, i18n.__('validation').token_expired));         
        return;
      } else {
          UserService.findByToken(token, function (err, dbUserObj) {
            if(err) {
              console.log('[Validate-Request][Error:'+err+']');
              return false;
            } else {             
              if (!dbUserObj || !dbUserObj.username) {
                res.status(prop.config.http.unauthorized);
                res.json(jsonUtils.getReturnMessage(prop.config.http.unauthorized, i18n.__('validation').invalid_user));
                return;
              } else {
                next();
              }
            }
          });
      }      

    } catch (err) {
      res.status(prop.config.http.internal_server_error);
      res.json(jsonUtils.getReturnMessage(prop.config.http.internal_server_error, i18n.__('validation').something_wrong, err));       
    }
  } else {
    res.status(prop.config.http.unauthorized);
    res.json(jsonUtils.getReturnMessage(prop.config.http.unauthorized, i18n.__('validation').invalid_token));
    return;
  }

};