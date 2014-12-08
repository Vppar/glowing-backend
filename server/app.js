//=============================================================================
// DEFINE APP INITIALIZATION
//=============================================================================
(function () {
  'use strict';
  
  var express = require('express');
  var logger = require('morgan');
  var bodyParser = require('body-parser');  
  var prop = require('app-config');    
  var routes = require('./routes');  
  var db = require('./db');
  var pkg = require('../package.json');  
  var i18nConfig = require('./i18n');
  var app = express();

  i18nConfig.config(); 

  function init() {

    app.disable('x-powered-by');
    
    app.set('title', prop.config.title);
    app.set('name', pkg.name);
    app.set('version', pkg.version); 

    app.use(logger(prop.config.logger.level));
    app.use(bodyParser.json()); 
    
    routes(app);

    i18nConfig.init(app);

    db();

    return app;
  }  

  exports = module.exports = init;

})();