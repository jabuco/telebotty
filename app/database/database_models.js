/**
 * 
 * 
 * @param {Object} database 
 * @returns {Object[]}
 */
var Model = function(database, settings) {
    var Path = require('path'),
        path = Path.join(__dirname, 'models'),
        pathUser = Path.join(__dirname, '../../config/app/db/models'),
        models = {},
        utils = require('../app/utils');

    Object.assign(models, utils.requireDir(path), utils.requireDir(pathUser));
    for (var i in models) {
        models[i] = models[i](database)
    }

    if (settings.database.debug) {
        console.log('[DB]', 'all models loaded.');
    }
    return models;
};

module.exports = Model;