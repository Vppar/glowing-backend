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
        throw (prop.config.message.routes.missing_application);
    }
    app.use(function(err, req, res, next) {
        var responseBody = getResponseBody(err);
        var responseStatus = getResponseStatus(err);
        res.status(responseStatus).send(responseBody);
        showLogForDevs(req, responseBody, responseStatus);
    });
};

module.exports = errorsConfig;

/**
 * Define response body by error.
 * @param err - Application error.
 * @return Json with error message.
 */
function getResponseBody(err) {
    if (err && err.name === prop.config.error.validation_error) {
        return err;
    } else {
        return {
            message: err.message
        };
    }
}

/**
 * Define response status by error.
 * @param err - Application error.
 * @return Error status code.
 */
function getResponseStatus(err) {
    return err.status || prop.config.http.bad_request;
}

/**
 * Show tidy logs in console for development environment.
 * @param req - Request.
 * @param responseBody - Response body.
 * @param responseStatus - Repsonse status.
 */

function showLogForDevs(req, responseBody, responseStatus) {
    //FIX ME
    if (process.env.NODE_ENV !== 'prd') {
        console.log('REQUEST: ' + req.method + ' ' + req.url + ' Body: ' + JSON.stringify(req.body));
        console.log('RESPONSE: ' + responseStatus + ' Body: ' + JSON.stringify(responseBody));
    }
}