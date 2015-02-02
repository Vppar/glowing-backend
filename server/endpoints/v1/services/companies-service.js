//=============================================================================
// COMPANIES SERVICE
//=============================================================================
'use strict';

var prop = require('app-config');
var i18n = require('i18n');
var mongoose = require('mongoose');
var defaultStorage = require('../../../database/default-storage');
var errorUtils = require('../../../utils/error-utils');
var CompaniesSchema = require('../schemas/companies-schema');
var CompaniesService = {};

/**
 * Find company by id.
 * @param companyId - Company id object.
 * @param callback - Callback function.
 * @return company object from database.
 */
CompaniesService.findById = function(companyId, callback) {
  return defaultStorage.findById(companyId, CompaniesSchema, callback);
};

/**
 * Find all companies.
 * @param fromPage - Page number.
 * @param changeAfter - Filter by change date.
 * @param callback - Callback function.
 * @return companies objects from database.
 */
CompaniesService.findAll = function(fromPage, changeAfter, callback) {
  return defaultStorage.findAll(fromPage, changeAfter, CompaniesSchema, callback);
};

/**
 * Save one company.
 * @param companyJSON - Company object to save.
 * @param callback - Callback function.
 * @return company object from database.
 */
CompaniesService.save = function(companyJSON, callback) {
  return defaultStorage.save(new CompaniesSchema(companyJSON), callback);
};

/**
 * Update one company.
 * @param companyId - Company id.
 * @param companyJSON - Company object to save.
 * @param callback - Callback function.
 * @return companyId - Updated company id.
 */
CompaniesService.update = function(companyId, companyJSON, callback) {
  new CompaniesSchema(companyJSON).validate(function(err) {
    if (err) {
      callback(err);
      return;
    } else {
      defaultStorage.findById(companyId, CompaniesSchema, function(err, company) {
        if (err) {
          callback(err);
          return;
        } else {
          if (!company) {
            callback(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').companies_not_found));
            return;
          } else {
            defaultStorage.findOneByCriteria({
              $or: [{
                'name': companyJSON.name
              }, {
                'cnpj': companyJSON.cnpj
              }, {
                'externalCompanyId': companyJSON.externalCompanyId
              }]
            }, CompaniesSchema, function(err, company) {
              if (err) {
                callback(err);
                return;
              } else {
                if (company && company._id.toString() !== companyId.toString()) {
                  callback(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').companies_update_cnpj_name_externalCompanyId_duplicated));
                  return;
                } else {
                  companyJSON.changeDateTime = new Date().getTime();
                  defaultStorage.update(companyId, companyJSON, CompaniesSchema, function(err) {
                    if (err) {
                      callback(err);
                      return;
                    } else {
                      callback(null, companyId);
                      return;
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  });
};

module.exports = CompaniesService;