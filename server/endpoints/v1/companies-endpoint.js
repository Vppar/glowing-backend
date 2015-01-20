//=============================================================================
// COMPANY SERVICE
//=============================================================================
'use strict';

var prop = require('app-config');
var i18n = require('i18n');
var jsonUtils = require('../../utils/json-utils');
var httpUtils = require('../../utils/http-utils');
var defaultStorage = require('../../database/default-storage');
var companiesService = require('./services/companies-service');
var CompaniesEndpoint = {};

/**
 * Find one company by id.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
CompaniesEndpoint.findById = function(req, res, next) {

  companiesService.findById(req.params.id, function(err, company) {
    if (err) {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').companies_findById_error, 'CompaniesEndpoint.findById', next, err);
    } else {
      if (company) {
        return jsonUtils.returnSuccess(null, company, res, next);
      } else {
        return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').companies_not_found, 'CompaniesEndpoint.findById', next, err);
      }
    }
  });
};

/**
 * List all companies.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
CompaniesEndpoint.findAll = function(req, res, next) {

  var changeAfter;
  var fromPage;
  try {
    changeAfter = httpUtils.getChangeAfter(req);
    fromPage = httpUtils.getFromPage(req);
  } catch (err) {
    return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').companies_invalid_parameters, 'CompaniesEndpoint.findAll', next, err);
  }

  companiesService.findAll(fromPage, changeAfter, function(err, companies) {
    if (err) {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').companies_findAll_error, 'CompaniesEndpoint.findAll', next, err);
    } else {
      return jsonUtils.returnSuccess(null, companies, res, next);
    }
  });
};

/**
 * Save a company.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
CompaniesEndpoint.save = function(req, res, next) {

  companiesService.save(req.body, function(err, company) {
    if (err) {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').companies_save_error, 'CompaniesEndpoint.save', next, err);
    } else {
      return jsonUtils.returnSuccess(company._id, null, res, next);
    }
  });
};

/**
 * Update a compnay.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 */
CompaniesEndpoint.update = function(req, res, next) {

  companiesService.update(req.params.id, req.body, function(err, companyId) {
    if (err) {
      return jsonUtils.returnError(prop.config.http.bad_request, i18n.__('validation').companies_update_error, 'CompaniesEndpoint.update', next, err);
    } else {
      return jsonUtils.returnSuccess(companyId, null, res, next);
    }
  });

};

module.exports = CompaniesEndpoint;