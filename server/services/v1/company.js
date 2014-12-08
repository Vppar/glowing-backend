//=============================================================================
// COMPANY SERVICE
//=============================================================================
'use strict';

var prop = require('app-config');
var i18n = require('i18n');
var mongoose = require('mongoose');
var storage = require('../../storage');
var CompanySchema = require('./schemas/company-schema');
var CompanyService = {};

CompanyService.findAll = function(req, res) {  
  storage.findAll(CompanySchema, function(err, companies) {
      if (err) {
           console.log('[CompanyService.getAll][Error: '+err+']');
           res.json({'message': 'Fail to retrieve all companies'});  //FIXME PATH
       } else {
          res.json(companies);
       }
  });    
};

CompanyService.findOne = function(req, res) {
};

CompanyService.save = function(req, res) {
  console.log(req.body);
  var company = new CompanySchema(req.body);
  storage.save(company, function(err, companies) {
      if (err) {
           //console.log('');
           res.json({'message': ''});
       } else {
          res.json(companies);
       }
  });
};

CompanyService.update = function(req, res) {
};

CompanyService.remove = function(req, res) {
};

module.exports = CompanyService;