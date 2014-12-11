//=============================================================================
// UTILS METHODS TO HANDLE ERRORS
//=============================================================================
'use strict';

var prop = require('app-config');
var ErrorUtils = {};

/**
 * Define error object to response messages.
 * @param status - Status to set error object.
 * @param errorMessage - Message to set error object.
 * @return error object.
 */
ErrorUtils.getError = function(status, errorMessage) {

    if (errorMessage) {
        var error = new Error(errorMessage);

        if (status && isNaN(status)) {
            error.status(status);
        }

        return error;

    } else {
        throw (prop.config.message.error.error_message_null);
    }
};

module.exports = ErrorUtils;