//=============================================================================
// COMPANY SERVICE
//=============================================================================
'use strict';

var prop = require('app-config');
var i18n = require('i18n');
var mongoose = require('mongoose');
var defaultStorage = require('../../database/default-storage');
var CompanySchema = require('./schemas/company-schema');
var CompanyService = {};

/**
 * Find one company by id.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 * @return Company found in database.
 */
CompanyService.findOne = function(req, res, next) {
  var criteria = ''; // FIX ME
  defaultStorage.findOne(criteria, CompanySchema, function(err, companies) {
    if (err) {
      console.log('[CompanyService.findAll][Error:' + err + ']');
      res.json({
        'message': 'Error retrieving companies.'
      });
    } else {
      res.json(companies);
    }
  });
};

/**
 * Find all companies.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 * @return All companies found in database.
 */
CompanyService.findAll = function(req, res, next) {
  defaultStorage.findAll(CompanySchema, function(err, companies) {
    if (err) {
      console.log('[CompanyService.findAll][Error:' + err + ']');
      res.json({
        'message': 'Error retrieving companies.'
      });
    } else {
      res.json(companies);
    }
  });
};

/**
 * Save one company.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 * @return Company id generated by application.
 */
CompanyService.save = function(req, res, next) {
  
  if (!req || !req.body) {
    next(errorUtils.getError(prop.config.http.bad_request, i18n.__('validation').company_invalid_request_parameters));
    return;
  }

  defaultStorage.save(new CompanySchema(req.body), function(err, company) {
    if (err) {
      console.log('[CompanyService.save][Error:' + err + ']');
      res.json({
        'message': 'Error saving company.'
      });
    } else {
      res.json(company.id);
    }
  });
};

/**
 * Update one company.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 * @return Updated company id.
 */
CompanyService.update = function(req, res, next) {
  //FIX ME
  res.json();
};

/**
 * Remove one company.
 * @param req - HTTP Request object.
 * @param res - HTTP Response object.
 * @param next - Node next function.
 * @return Removed company id.
 */
CompanyService.remove = function(req, res, next) {
  //FIX ME
  res.json();
};

module.exports = CompanyService;