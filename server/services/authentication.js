//=============================================================================
// AUTHENTICATION SERVICE
//=============================================================================
'use strict';
var jwt = require('jwt-simple');
var prop = require('app-config');
var i18n = require('i18n');
var jsonUtils = require('../utils/json-utils');
var UserService = require('./v1/user');

module.exports = function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username === '' || password === '') {
      res.status(prop.config.http.unauthorized);
      res.json(jsonUtils.getReturnMessage(prop.config.http.unauthorized, i18n.__('route').invalid_credentials));
      return;
    }

    UserService.findByName(username, function (err, dbUserObj) {
      if(err) {
        console.log('[Authentication][Error:'+err+']');
        return;
      } else {        
        if (!dbUserObj || !dbUserObj.username) {
          res.status(prop.config.http.unauthorized);
          res.json(jsonUtils.getReturnMessage(prop.config.http.unauthorized, i18n.__('route').invalid_credentials));
          return;
        } else {
          res.json(genToken(dbUserObj));
        }
      }
    });
};

function genToken(dbUserObj) {
  var expires = expiresIn(prop.config.auth.daysOfTokenValidate);
  dbUserObj.token = jwt.encode({
     exp: expires
  }, prop.config.auth.jwt_token_secret);
  UserService.registerToken(dbUserObj, function (err, user) {
    if(err) {
      console.log('[Authentication.genToken][Error:'+err+']');
      return;
    }
  });  

  return {
    token: dbUserObj.token,
    expires: expires
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}