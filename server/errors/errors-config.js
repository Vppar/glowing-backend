//=============================================================================
// DEFINE APP ERROS HANDLERS
//=============================================================================
'use strict';
var prop = require('app-config');
var i18n = require('i18n');
var errorsConfig = {};

/**
* Configure application error handlers.
* @param app - Express instance initialized.
*/
errorsConfig.init = function(app) {

   if (!app) {
     throw(prop.config.message.routes.missing_application);
   }

   app.use(function(err, req, res, next) {        
   		var responseBody = { errorMessage: err.message };
   		var responseStatus = err.status || prop.config.http.bad_request;
        
        console.log('REQUEST:  '+ req.method + ' '+ req.url+ ' Body: '+ JSON.stringify(req.body));
   	    console.log('RESPONSE: ' + responseStatus+ ' Body: ' + JSON.stringify(responseBody));
   	    
   	    res.status(responseStatus).send(responseBody);
   });

};

module.exports = errorsConfig;