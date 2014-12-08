//=============================================================================
// AUTHENTICATION SERVICE
//=============================================================================
'use strict';
var jwt = require('jwt-simple');
var prop = require('app-config');
var i18n = require('i18n');
var jsonUtils = require('../utils/json-utils');

module.exports = function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username === '' || password === '') {
      res.status(prop.config.http.unauthorized);
      res.json(jsonUtils.getReturnMessage(prop.config.http.unauthorized, i18n.__('route').invalid_credentials));
      return;
    }

    var dbUserObj = validate(username, password);
   
    if (!dbUserObj) {
      res.status(prop.config.http.unauthorized);
      res.json(jsonUtils.getReturnMessage(prop.config.http.unauthorized, i18n.__('route').invalid_credentials));
      return;
    }

    if (dbUserObj) {
      res.json(genToken(dbUserObj));
    }

};

function validate(username, password) {
    var dbUserObj = { 
      name: 'aa',
      role: 'admin',
      username: 'aa@ccc.com'
    };

    return dbUserObj;
}

function genToken(user) {
  var expires = expiresIn(prop.config.auth.daysOfTokenValidate);
  var token = jwt.encode({
     exp: expires
  }, prop.config.auth.jwt_token_secret);

  return {
    token: token,
    expires: expires
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}