/**
 * This function is designed for making manual request to a given server
 * 
 * @param {Object} database 
 * @param {Object} settings 
 * @param {Object} http 
 * @param {Object} express 
 * @returns {Function}
 */
function request(database, settings, http, express) {
    return function(method, target, path, data, callback) {
        var querystring = require('querystring'),
            host = "",
            port = 80;

        if (typeof target === 'string' || target instanceof String) {
            if (target.includes(':')) {
                var t = target.split(':');
                host = t[0];
                port = t[1];
            } else if (target == 'self') {
                /**
                 * if server listens on 0.0.0.0,
                 * requests won't be able to reach it there.
                 * we need to access it on local loopback (127.0.0.1)
                 */
                host = settings.web.ip == '0.0.0.0' ? '127.0.0.1' : settings.web.ip;
                port = settings.web.port;
            } else {
                host = target;
            }
        }

        var options = {
            host,
            port,
            path,
            method
        };

        var req = http.request(options, response => callback ? callback(response) : function() {});
        req.write(querystring.stringify(data));
        req.end();
        return req;
    };
}
module.exports = request;