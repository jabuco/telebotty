/**
 * 
 * 
 * @param {Object} database 
 * @returns {Object[]}
 */
var Model = function(database, settings) {
    var Path = require('path'),
        path = Path.join(__dirname, 'models'),
        utils = require('../app/utils');

    models = utils.requireDir(path);
    for (var i in models) {
        models[i] = models[i](database)
    }

    if (settings.database.debug) {
        console.log('[DB]', 'all models loaded.');
    }
    return models;
};

module.exports = Model;