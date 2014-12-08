//=============================================================================
// DEFINE APP ROUTES
//=============================================================================
'use strict';
var prop = require('app-config');
var services = require('../services');
var i18n = require('i18n');
var authenticationService = require('../services/authentication');
var routesConfig = {};

routesConfig.init = function(app) {

   if (!app) {
     throw(prop.config.message.routes.missing_application);
   }

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
   
   app.all(prop.config.path.apply_authentication, [require('../middlewares/validate-request')]);
   
   app.post('/api/authentication', authenticationService);
   app.get('/api/:version/:service', services.findAll);
   app.get('/api/:version/:service/:uuid', services.findOne);
   app.post('/api/:version/:service', services.save);
   app.put('/api/:version/:service/:uuid', services.update);
   app.delete('/api/:version/:service/:uuid', services.remove);

   app.use(function(req, res, next) {
       var err = new Error(i18n.__('route').path_not_found);
       err.status = prop.config.http.not_found;
       next(err);
       //next();
   });
};

module.exports = routesConfig;