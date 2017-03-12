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
        socket = require('socket.io')(server),
        utils = require('../app/utils');

    // load all socket listeners
    socket.on('connection', function(s) {
        var socks = utils.requireDir(path);
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