/**
 * Helper function for easier Database access
 * 
 * @param {Object} database 
 * @returns {Object[]}
 */
var Functions = function(database, settings) {
    var Path = require('path'),
        path = Path.join(__dirname, 'functions'),
        functions = {},
        utils = require('../app/utils');

    functions = utils.requireDir(path);
    for (var i in functions) {
        functions[i] = functions[i](database);
    }

    if (settings.database.debug) {
        console.log('[DB]', 'all functions loaded.');
    }
    return functions;
}

module.exports = Functions;