//=============================================================================
// DATABASE CONFIGURATION FOR MONGODB
//=============================================================================
'use strict';
var prop = require('app-config');
var mongoose = require('mongoose');
var db = mongoose.connection;
var dbConfig = {};

dbConfig.init = function(app) {
  db.on('error', console.error);

  db.once('open', function() {
    console.log(prop.config.message.database.mongo_connected);
  });

  mongoose.connect(prop.config.database.mongo_url, function (error) {
      if (error) {
          console.log(error);
      }
  });
};

module.exports = dbConfig;