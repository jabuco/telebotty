/**
 * Webserver router
 * applies all routes to injected webserver
 * 
 * @param {Object} database 
 * @param {Object} settings 
 * @param {Object} express 
 * @param {Object} sockets 
 */
function Routes(database, settings, express, sockets) {
    var Path = require('path'),
        path = Path.join(__dirname, 'routes'),
        utils = require('../app/utils');

    var routes = utils.requireDir(path);
    for (var i in routes) {
        routes[i](database, settings, express, sockets);
    }


    if (settings.web.debug) {
        console.log('[Web]', 'all routes loaded.');
    }
}

module.exports = Routes;