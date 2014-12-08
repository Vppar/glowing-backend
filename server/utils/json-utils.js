//=============================================================================
// UTILS METHODS TO HANDLE JSON
//=============================================================================
'use strict';
var JSONUtils = {};
exports = module.exports = JSONUtils;

JSONUtils.getReturnMessage = function(status, message, error) {


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