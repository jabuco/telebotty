/**
 * Socket.io wrapper class
 * 
 * applies websocket functionality to webserver wrapper
 * 
 * @param {Object} database 
 * @param {Object} settings 
 * @param {Object} server 
 * @returns {Object} 
 */
function Sockets(database, settings, server) {
    var Path = require('path'),
        path = Path.join(__dirname, 'sockets'),
        pathUser = Path.join(__dirname, '../../config/app/web/sockets'),
        socket = require('socket.io')(server),
        utils = require('../app/utils'),
        socks = {};

    // load all socket listeners
    socket.on('connection', function(s) {
        Object.assign(socket, utils.requireDir(path), utils.requireDir(pathUser));
        for (var i in socks) {
            socks[i](database, s);
        }
    });

    if (settings.web.debug) {
        console.log('[Web]', 'all websockets loaded.');
    }
    return socket;
}

module.exports = Sockets;