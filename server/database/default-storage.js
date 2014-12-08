//=============================================================================
// STORAGE
//=============================================================================
'use strict';

var Storage = {};

Storage.findOne = function(uuid, schema, callback) {
    schema.find({'uuid':uuid}, function(err, obj) {
    	if (err) {
		    callback(err);
		}
        callback(null, obj);
    });
};

Storage.findAll = function(schema, callback) {
    schema.find(function(err, objs) {
    	if (err) {
		    callback(err);
		}
        callback(null, objs);
    });
};

Storage.save = function(schema, callback) {
    schema.save(function(err, obj) {
    	if (err) {
		    callback(err);
		}
        callback(null, obj);
    });
};

Storage.update = function(schema, callback) {
    schema.update(function(err, obj) {
    	if (err) {
		    callback(err);
		}
        callback(null, obj);
    });
};

Storage.remove = function(uuid, schema, callback) {
    schema.remove({_id:id}, function(err, obj) {
    	if (err) {
		    callback(err);
		}
        callback(null, obj);
    });
};

module.exports = Storage;