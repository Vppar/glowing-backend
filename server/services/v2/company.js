//=============================================================================
// COMPANY SERVICE
//=============================================================================
'use strict';

var prop = require('app-config');
var i18n = require('i18n');
var CompanyService = {};

CompanyService.findAll = function(req, res) {  
  res.json({'message': i18n.__('validation').do_not_have_permission});    
};

CompanyService.findOne = function(req, res) {
  res.json({'message': i18n.__('validation').do_not_have_permission});
};

CompanyService.save = function(req, res) {
  res.json({'message': i18n.__('validation').do_not_have_permission});
};

CompanyService.update = function(req, res) {
  res.json({'message': i18n.__('validation').do_not_have_permission});
};

CompanyService.remove = function(req, res) {
  res.json({'message': i18n.__('validation').do_not_have_permission});
};

module.exports = CompanyService;