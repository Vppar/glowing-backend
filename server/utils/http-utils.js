//=============================================================================
// UTILS METHODS TO HANDLE REQUESTS AND RESPONSES
//=============================================================================
'use strict';

var prop = require('app-config');
var i18n = require('i18n');
var jsonUtils = require('./json-utils');
var errorUtils = require('./error-utils');
var HTTPUtils = {};

/**
 * Validate request body.
 * @param req - HTTP Request object.
 * @throws error.
 */
HTTPUtils.validateBody = function(req) {

	if (!req || !req.body) {
		throw errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').http_utils_invalid_request_parameters);
	} else {
		if (req.body._id) {
			throw errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').http_utils_invalid_request_parameter_id);
		}
		if (req.body.changeDateTime) {
			throw errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').http_utils_invalid_request_parameter_changeDateTime);
		}
		if (req.body.createDateTime) {
			throw errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').http_utils_invalid_request_parameter_createDateTime);
		}
	}
};

/**
 * Validate request id parameter.
 * @param req - HTTP Request object.
 * @throws error.
 */
HTTPUtils.validateIdParam = function(req) {
	if (!req || !req.params || !req.params.id) {
		throw errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').http_utils_invalid_request_parameters);
	}
};

/**
 * Get request criteria.
 * @param query - HTTP Request params.
 * @throws error.
 */
HTTPUtils.getChangeAfter = function(req) {
	if (req && req.query && req.query.changeAfter) {
		if (req.query.changeAfter.match(/^[0-9]+$/)) {
			return req.query.changeAfter;
		} else {
			throw errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').http_utils_invalid_request_parameters_changeAfter);
		}
	}
	return;
};

/**
 * Get request fromPage parameter.
 * @param query - HTTP Request params.
 * @throws error.
 */
HTTPUtils.getFromPage = function(req) {
	if (req && req.query && req.query.fromPage) {
		if (req.query.fromPage.match(/^[0-9]+$/)) {
			return req.query.fromPage;
		} else {
			throw errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').http_utils_invalid_request_parameters_fromPage);
		}
	}
	return prop.config.database.default_fromPage;
};

/**
 * Validate request body.
 * @param req - HTTP Request object.
 * @throws error.
 */
HTTPUtils.validateToken = function(req) {
	if (!req || !req.body) {
		throw i18n.__('validation').http_utils_invalid_request_parameters;
	} else {
		if (req.body.token) {
			throw errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').http_utils_invalid_request_parameter_token);
		}
	}
};

exports = module.exports = HTTPUtils;