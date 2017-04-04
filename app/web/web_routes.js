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
        pathUser = Path.join(__dirname, '../../', '/config/app/web/routes'),
        utils = require('../app/utils'),
        routes = {};

    Object.assign(routes, utils.requireDir(path), utils.requireDir(pathUser));
    for (var i in routes) {
        routes[i](database, settings, express, sockets);
    }

    if (settings.web.debug) {
        console.log('[Web]', 'all routes loaded.');
    }
}

module.exports = Routes;