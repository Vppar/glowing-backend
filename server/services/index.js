//=============================================================================
// DEFINE SERVICES ROUTES
//=============================================================================
'use strict'; 
var prop = require('app-config');
var Service = {};

Service.findOne = function(req, res) { 
  getFunc(req,res,'findOne');
};

Service.findAll = function(req, res) { 
  getFunc(req,res,'findAll');
};

Service.save = function(req, res) { 
  getFunc(req,res,'save');
};

Service.update = function(req, res) { 
  getFunc(req,res,'update');
};

Service.remove = function(req, res) { 
  getFunc(req,res,'remove');
};

module.exports = Service;

function getFunc(req, res, method) {
  
    var version = req.params.version || prop.config.path.default_version;
    var service = req.params.service;
    var uuid = req.params.uuid;
    if(service && service !== '') {
      var rq;
      var func;
      try {
        rq = './' + version + '/' + service;
        func = require(rq);
      } catch ( e ) {
        console.log('[Fail][Invalid request: ' + rq+']');
        fail();
        return;
      }
  
      if(func) {        
        switch (method) {
            case 'findOne':
                func.findOne(req,res);
                break;
            case 'findAll':
                func.findAll(req,res);
                break;
            case 'save':
                func.save(req,res);
                break;
            case 'update':
                func.update(req,res);
                break;
            case 'remove': 
                func.remove(req,res);
                break;           
            default:
                fail();
                break;
        }
      }
    
    } else {
      console.log('[Services][Invalid request.]');
      fail();
    }

  function fail() {
    res.sendStatus(prop.config.http.not_found);
  }
}