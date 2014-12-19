//=============================================================================
// UTILS METHODS TO HANDLE JSON
//=============================================================================
'use strict';

var JSONUtils = {};

/**
 * Define a JSON structure for return messages.
 * @param status - Status to return in JSON structure.
 * @param message - Message to return JSON structure.
 * @param error - Error to return in JSON structure.
 * @return json - JSON with messege structure.
 */
/*JSONUtils.getReturnMessage = function(status, message, error) {
    var returnObj = {};

    if(status) {
    	returnObj.status = status;
    }

    if(message && message.length > 0) {
    	returnObj.message = message;
    }

    if(error) {
    	var err = new String(error);
    	if(err.length > 0) {
           returnObj.error = err;
    	}
    }

    return JSON.stringify(returnObj);
};*/

JSONUtils.returnSuccess = function(objToReturn, next) {

    if (!objId || !next) {
        //throw i18n.__('validation').error_utils_invalid_parameters;
    }

    res.json(objToReturn);
    return next();
};

JSONUtils.returnError = function(httpStatus, errorMessage, logMessage, next, errorObj) {

    if (!httpStatus || !errorMessage || !logMessage || !next) {
        //throw i18n.__('validation').error_utils_invalid_parameters;
    }

    if (errorObj && errorObj.name === prop.config.error.validation_error) {
        console.log(logMessage + '[' + errorObj + ']');
        return next(errorObj);
    } else {
        console.log(logMessage + '[' + errorMessage + ']');
        return next(errorUtils.getError(httpStatus, errorMessage));
    }
};

exports = module.exports = JSONUtils;


//FIX ME