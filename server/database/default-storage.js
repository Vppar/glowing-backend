//=============================================================================
// STORAGE
//=============================================================================
'use strict';

var Storage = {};

/**
* Find one resource by criteria.
* @param creteria - Resorce criteria.
* @param schema - Schema to be executed.
* @param callback - Callback function.
* @return resource from database.
*/
Storage.findOne = function(creteria, schema, callback) {
    schema.findOne(creteria, function(err, obj) {
    	if (err) {
		    callback(err);
		} else {
            callback(null, obj);
        }
    });
};

/**
* Find all resources.
* @param schema - Schema to be executed.
* @param callback - Callback function.
* @return resources from database.
*/
Storage.findAll = function(schema, callback) {
    schema.find(function(err, objs) {
    	if (err) {
		    callback(err);
		} else {
            callback(null, objs);
        }
    });
};

/**
* Save one resource.
* @param schema - Schema to be executed.
* @param callback - Callback function.
* @return resource saved on database.
*/
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

/**
* Update one resource.
* @param id - Resource id to be updated.
* @param objToUpdate - Object to be updated.
* @param schema - Schema to be executed.
* @param callback - Callback function.
* @return resource updated on database.
*/
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

/**
* Remove one resource.
* @param id - Resource id to be removed.
* @param schema - Schema to be executed.
* @param callback - Callback function.
* @return resource removed from database.
*/
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