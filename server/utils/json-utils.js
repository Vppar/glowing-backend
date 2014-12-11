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
};

exports = module.exports = JSONUtils;*/


//FIX ME