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

CompanyService.findOne = function(req, res) {
  var criteria = ''; //FIXME
  defaultStorage.findOne(criteria, CompanySchema, function(err, companies) {
      if (err) {
           console.log('[CompanyService.findAll][Error:'+err+']');
           res.json({'message': 'Error retrieving companies.'});
       } else {
          res.json(companies);
       }
  });
};

CompanyService.findAll = function(req, res) {
  defaultStorage.findAll(CompanySchema, function(err, companies) {
      if (err) {
           console.log('[CompanyService.findAll][Error:'+err+']');
           res.json({'message': 'Error retrieving companies.'});
       } else {
          res.json(companies);
       }
  });
};

CompanyService.save = function(req, res) {
  defaultStorage.save(new CompanySchema(req.body), function(err, company) {
      if (err) {
           console.log('[CompanyService.save][Error:'+err+']');
           res.json({'message': 'Error saving company.'});
       } else {
          res.json(company.id);
       }
  });
};


CompanyService.update = function(req, res) {
  res.json();
};

CompanyService.remove = function(req, res) {
  res.json();
};

module.exports = CompanyService;