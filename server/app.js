//=============================================================================
// DEFINE APP INITIALIZATION
//=============================================================================
(function() {
  'use strict';

  var prop = require('app-config');
  var express = require('express');
  var morgan = require('morgan');
  var bodyParser = require('body-parser');
  var routesConfig = require('./routes/routes-config');
  var dbConfig = require('./database/db-config');
  var i18nConfig = require('./resources/i18n-config');
  var errorsConfig = require('./errors/errors-config');
  var pkg = require('../package.json');
  //FIX ME var favicon = require('express-favicon');
  var app = express();

  function init() {

    app.disable('x-powered-by');
    app.set('title', prop.config.title);
    app.set('name', pkg.name);
    app.set('version', pkg.version);
    //app.use(logger(prop.config.logger.level));
    app.use(bodyParser.json());
    app.use(morgan(':method :url :status :response-time ms')); // FIX ME

    // FIX ME app.use(app.methodOverride());
    // FIX ME app.use(express.favicon(__dirname + '/public/favicon.ico'));

    //Configure application language resource bundle
    i18nConfig.init(app);

    //Configure application routes
    routesConfig.init(app);
    //Congigure application error handlers
    errorsConfig.init(app);
    //Configure application database
    dbConfig.init();

    return app;
  }

  exports = module.exports = init;

})();