//=============================================================================
// DEFINE APP ROUTES
//=============================================================================
'use strict';
var i18n = require('i18n');
var prop = require('app-config');
var endpoints = require('../endpoints');
var authUsersEndpoint = require('../endpoints/users/auth/auth-users-endpoint');
var authAdminEndpoint = require('../endpoints/admin/auth/auth-admin-endpoint');
var usersEndpoint = require('../endpoints/admin/users-endpoint');

var routesConfig = {};


/**
 * Configure application routes.
 * @param app - Express instance initialized.
 */
routesConfig.init = function(app) {

  if (!app) {
    throw (prop.config.message.routes.missing_application);
  }

  // Define basic HTTP configuration for rest endpoints
  app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', prop.config.http.allow_origin);
    res.header('Access-Control-Allow-Methods', prop.config.http.allowed_methods);
    res.header('Access-Control-Allow-Headers', prop.config.http.allowed_headers);
    //res.setHeader("content-type", "application/json")
    //res.end(JSON.stringify(res));
    if (req.method == 'OPTIONS') {
      res.status(prop.config.http.ok).end();
    } else {
      next();
    }
  });


  // Apply a middleware to validate backoffice admin users operations
  app.all('/backoffice/users', [require('../middlewares/auth-admin-middleware')]);

  //Define routes for backoffice admin operations
  app.post('/backoffice/authentication', authAdminEndpoint);
  app.get('/backoffice/users', usersEndpoint.findAll);
  app.get('/backoffice/users/:id', usersEndpoint.findById);
  app.post('/backoffice/users', usersEndpoint.save);
  app.put('/backoffice/users/:id', usersEndpoint.update);
  app.delete('/backoffice/users/:id', usersEndpoint.remove);

  // Apply a middleware to validate backoffice users operations
  app.all(prop.config.path.apply_authentication_all_endpoints, [require('../middlewares/auth-users-middleware')]);

  //Define routes for users operations
  app.post('/api/authentication', authUsersEndpoint);
  app.get('/api/:version/:endpoint', endpoints.findAll);
  app.get('/api/:version/:endpoint/:id', endpoints.findById);
  app.post('/api/:version/:endpoint', endpoints.save);
  app.put('/api/:version/:endpoint/:id', endpoints.update);

};

module.exports = routesConfig;