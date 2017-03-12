/**
 * Webserver helper functions, e.g. request wrapper
 * 
 * @param {Object} database 
 * @param {Object} settings 
 * @param {Object} http 
 * @param {Object} express 
 * @returns {Object}
 */
function Tools(database, settings, http, express) {
    var Path = require('path'),
        path = Path.join(__dirname, 'tools'),
        utils = require('../app/utils');

    var tools = utils.requireDir(path);
    for (var i in tools) {
        tools[i] = tools[i](database, settings, http, express);
    }


    if (settings.web.debug) {
        console.log('[Web]', 'all tools loaded.');
    }
    return tools;
}

module.exports = Tools;