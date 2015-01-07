//=============================================================================
// STORAGE
//=============================================================================
'use strict';

var errorUtils = require('../utils/error-utils');
var prop = require('app-config');
var i18n = require('i18n');
var Storage = {};

/**
 * Find one resource by id.
 * @param objectId - ObjectId.
 * @param schema - Schema to be executed.
 * @param callback - Callback function.
 * @return resource from database.
 */
Storage.findById = function(objectId, schema, callback) {
    if (!objectId || !objectId.match(/^[0-9a-fA-F]{24}$/)) {
        callback(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').storage_objectId_invalid));
        return;
    }
    return schema.findById(objectId, callback);
};


/**
 * Find by one resource by criteria.
 * @param criteria - Criteria.
 * @param schema - Schema to be executed.
 * @param callback - Callback function.
 * @return resource from database.
 */
Storage.findOneByCriteria = function(criteria, schema, callback) {

    if (!criteria) {
        callback(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').storage_findByCriteria_null));
        return;
    }

    return schema.findOne(criteria, callback);
};

/**
 * Find all resources.
 * @param schema - Schema to be executed.
 * @param callback - Callback function.
 * @return resources from database.
 */
Storage.findAll = function(query, schema, callback) {

    var fromPage = getFromPage(query, callback);
    if (fromPage && fromPage === -1) {
        callback(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').storage_invalid_fromPage_parameter));
        return;
    }

    var changeAfter = getChangeAfter(query, callback);
    if (changeAfter) {
        if (changeAfter === -1) {
            callback(errorUtils.getValidationError(prop.config.http.bad_request, i18n.__('validation').storage_invalid_changeAfter_parameter));
            return;
        } else {
            schema.find({
                'changeDateTime': {
                    $gt: changeAfter
                }
            }).skip(fromPage).limit(prop.config.database.max_result).exec(function(err, result) {
                if (err) {
                    callback(err);
                    return;
                } else {
                    callback(null, result);
                    return;
                }
            });
        }
    } else {
        schema.find({}).skip(fromPage).limit(prop.config.database.max_result).exec(function(err, result) {
            if (err) {
                callback(err);
                return;
            } else {
                callback(null, result);
                return;
            }
        });
    }
};

/**
 * Save one resource.
 * @param schema - Schema to be executed.
 * @param callback - Callback function.
 * @return resource saved on database.
 */
Storage.save = function(schema, callback) {
    return schema.save(callback);
};

/**
 * Find one resource and update.
 * @param objectId - Resource id to be updated.
 * @param objToUpdate - Object to be updated.
 * @param schema - Schema to be executed.
 * @param callback - Callback function.
 * @return resource updated on database.
 */
Storage.findOneAndUpdate = function(objectId, objToUpdate, schema, callback) {
    return schema.findOneAndUpdate({
        _id: objectId
    }, objToUpdate, callback);
};

/**
 * Update one resource.
 * @param objectId - Resource id to be updated.
 * @param objToUpdate - Object to be updated.
 * @param schema - Schema to be executed.
 * @param callback - Callback function.
 * @return resource updated on database.
 */
Storage.update = function(objectId, objToUpdate, schema, callback) {
    return schema.update({
        _id: objectId
    }, objToUpdate, null, callback);
};

/**
 * Remove one resource.
 * @param objectId - Resource id to be removed.
 * @param schema - Schema to be executed.
 * @param callback - Callback function.
 * @return resource removed from database.
 */
Storage.remove = function(objectId, schema, callback) {
    return schema.remove({
        _id: objectId
    }, callback);
};

module.exports = Storage;

/**
 * Get request criteria.
 * @param query - HTTP Request params.
 * @param callback - callback.
 */
function getChangeAfter(query, callback) {
    if (query && query.changeAfter) {
        if (query.changeAfter.match(/^[0-9]+$/)) {
            return query.changeAfter;
        } else {
            return -1;
        }
    }
    return;
}

/**
 * Get request fromPage parameter.
 * @param query - HTTP Request params.
 * @param callback - callback.
 */
function getFromPage(query, callback) {
    if (query && query.fromPage) {
        if (query.fromPage.match(/^[0-9]+$/)) {
            return query.fromPage;
        } else {
            return -1;
        }
    }
    return prop.config.database.default_fromPage;
}