/**
 * Webserver listen wrapper
 * 
 * @param {any} server 
 * @param {any} testcallback 
 */
function listen(server, settings, testcallback) {
    // start listening
    server.listen(settings.web.port, settings.web.ip, () => {
        if (testcallback) {
            server.close();
            testcallback(server);
        } else {
            if (settings.web.debug) {
                console.log('[Web]', 'webserver listening on ' + settings.web.ip + ':' + settings.web.port);
            }
            console.log('[Web]', 'webserver ready.');
        }
    });
}

/**
 * Webserver wrapper class
 * 
 * @param {Object} database 
 * @param {Object} settings 
 * @param {Function} testcallback 
 * @returns {Object}
 */
function Web(database, settings, testcallback) {
    var Express = require('express'),
        HTTP = require('http'),
        Path = require('path'),
        Favicon = require('serve-favicon'),
        BodyParser = require('body-parser'),
        CookieParser = require('cookie-parser'),
        Routes = require('./web_routes'),
        Settings = require('./web_settings'),
        Sockets = require('./web_sockets'),
        Tools = require('./web_tools'),
        express = Express(),
        server = HTTP.createServer(express),
        opbeat = require('opbeat'),
        sockets = {},
        tools = {};

    // add this to the VERY top of the first file loaded in your app
    if (process.env.OPBEAT_TOKEN) {
        opbeat.start({
            appId: 'defd81afde',
            organizationId: 'ff8890035a8446b1b3e2b07416234eee',
            secretToken: process.env.OPBEAT_TOKEN
        });
    }

    // setup express
    Settings(settings, express);
    express.use(Favicon(Path.join(__dirname, '../../config/public', 'favicon.ico')));
    express.use(BodyParser.json());
    express.use(BodyParser.urlencoded({ extended: false }));
    express.use(CookieParser());
    express.use(require('node-sass-middleware')({
        src: Path.join(__dirname, '../../config/public'),
        dest: Path.join(__dirname, '../../config/public'),
        indentedSyntax: false,
        includePaths: [
            Path.join(__dirname, '../../node_modules'),
            Path.join(__dirname, '../../demo/stylesheets')
        ],
        sourceMap: false
    }));


    // first try to serve static files
    express.use('/', Express.static(Path.join(__dirname, '../../config/public')));
    express.use('/', Express.static(Path.join(__dirname, '../../demo')));

    // setup Sockets
    sockets = Sockets(database, settings, server);

    // setup routes
    Routes(database, settings, express, sockets);

    // setup tools
    tools = Tools(database, settings, HTTP, express);

    // Add the Opbeat middleware after your regular middleware
    if (process.env.OPBEAT_TOKEN) {
        express.use(opbeat.middleware.express());
    }

    if (testcallback) {
        listen(server, settings, testcallback);
    }

    // return module
    return {
        express,
        server,
        sockets,
        tools,
        listen: function(testcallback) {
            listen(server, settings, testcallback);
            return this;
        }
    };
}

module.exports = Web;