//=============================================================================
// STORAGE
//=============================================================================
'use strict';

var Storage = {};

Storage.findOne = function(creteria, schema, callback) {
    schema.findOne(creteria, function(err, obj) {
    	if (err) {
		    callback(err);
		} else {
            callback(null, obj);
        }
    });
};

Storage.findAll = function(schema, callback) {
    schema.find(function(err, objs) {
    	if (err) {
		    callback(err);
		} else {
            callback(null, objs);
        }
    });
};

Storage.save = function(schema, callback) {
    schema.save(function(err, obj) {
    	if (err) {
		    callback(err);
		}
        else {
            callback(null, obj);
        }
    });
};

Storage.findOneAndUpdate = function(id, objToUpdate, schema, callback) {
    schema.findOneAndUpdate({ _id: id }, objToUpdate, function(err, obj) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, obj);
        }
    });
};

Storage.remove = function(id, schema, callback) {
    schema.remove({_id:id}, function(err, obj) {
    	if (err) {
		    callback(err);
		}
        else {
            callback(null, obj);
        }
    });
};

module.exports = Storage;