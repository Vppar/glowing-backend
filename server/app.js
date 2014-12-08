//=============================================================================
// DEFINE APP INITIALIZATION
//=============================================================================
(function () {
  'use strict';
  
  var express = require('express');
  var logger = require('morgan');
  var bodyParser = require('body-parser');  
  var prop = require('app-config');  
  var routesConfig = require('./routes/routes-config');  
  var dbConfig = require('./database/db-config');  
  var i18nConfig = require('./resources/i18n-config');
  var pkg = require('../package.json');
  var app = express();

  i18nConfig.config(); 

  function init() {

    app.disable('x-powered-by');
    
    app.set('title', prop.config.title);
    app.set('name', pkg.name);
    app.set('version', pkg.version); 

    app.use(logger(prop.config.logger.level));
    app.use(bodyParser.json()); 
    
    routesConfig.init(app);

    i18nConfig.init(app);

    dbConfig.init();

    return app;
  }  

  exports = module.exports = init;

})();