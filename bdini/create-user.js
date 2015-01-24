//=============================================================================
// SERVICE FOR BACKOFFICE ADMIN CREATE, RETRIEVE, UPDATE AND DELETE USERS
//=============================================================================
(function() {
  'use strict';

  var mongoose = require('mongoose');

  exports = module.exports = addUser;

  function addUser() {

    mongoose.connect('mongodb://localhost/test');

    var conn = mongoose.connection;

    var user = {
      username: 'admin',
      password: 'admin',
      role: 'admin',
      domain: 'admin'
    };

    conn.collection('usersschemas').insert(user, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('User created.');
      }

    });
    return true;
  }

  addUser();

})();