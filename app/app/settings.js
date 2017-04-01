var Settings = {
    // this determines if secrets.js was found and could be loaded
    secrets: false,
    globals: global,
    database: {
        debug: false || (() => {
            try {
                return ((process.env.DEBUG + '').toLowerCase() == 'true')
            } catch (e) {
                return false
            }
        })(),
        name: process.env.DB_PATH || 'telebotty',
        ip: process.env.DB_IP || '127.0.0.1',
        port: process.env.DB_PORT || 27017,
        get url() {
            return `mongodb://${this.ip}:${this.port}/${this.name}`
        },
        options: {
            auth: {
                authdb: 'admin'
            },
            // mongos: undefined,
            // db: undefined,
            // promiseLibrary: undefined
            pass: process.env.DB_PASS || undefined,
            // replset: undefined,
            // server: undefined,
            user: process.env.DB_USER || undefined
        },
        Promise: global.Promise
    },
    irc: {
        commandDelimiter: '_',
        debug: false || (() => {
            try {
                return ((process.env.DEBUG + '').toLowerCase() == 'true')
            } catch (e) {
                return false
            }
        })(),
        server: process.env.IRC_SERVER || '0.0.0.0',
        nick: 'telebotty',
        options: {
            autoConnect: false,
            autoRejoin: true,
            channels: [],
            debug: false,
            encoding: 'UTF-8',
            port: process.env.IRC_PORT || 6667,
            realName: 'telebotty ircbot',
            sasl: false,
            secure: false,
            selfSigned: true,
            stripColors: true,
            retryCount: 3,
            retryDelay: 2000,
            userName: 'telebotty'
        }
    },
    telegram: {
        debug: false || (() => {
            try {
                return ((process.env.DEBUG + '').toLowerCase() == 'true')
            } catch (e) {
                return false
            }
        })(),
        token: process.env.TELEGRAM_TOKEN,
        options: {
            polling: true
        }
    },
    web: {
        debug: false || (() => {
            try {
                return ((process.env.DEBUG + '').toLowerCase() == 'true')
            } catch (e) {
                return false
            }
        })(),
        port: process.env.WEB_PORT || 8080,
        ip: process.env.WEB_IP || '0.0.0.0',

        accessheaders: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        express: {
            /**
             * prettify json output 
             * (won't change text but formatting of it in json mode)
             */
            'json spaces': 4,
            /**
             * suppress x-powered-by header 
             *   -> we don't want to promote,
             *      that we're using express
             */
            'x-powered-by': false
        }
    }
}

/**
 *  apply secrets to settings. 
 * there you can save passwords or sensible data,
 * which gets inserted into settings later.
 * 
 * eg.: settings.database.password
 **/
try {
    if ((process.env.TEST + '').toLowerCase() == 'true') {
        if ((process.env.DEBUG + '').toLowerCase() == 'true') {
            console.log('[Settings]', 'loading test-settings')
        }
        require('./test')(Settings)
    } else {
        require('./secrets')(Settings)
    }
    Settings.secrets = true
} catch (error) {
    if ((process.env.DEBUG + '').toLowerCase() == 'true' || (process.env.TEST + '').toLowerCase() == 'true') {
        console.warn('/app/app/secrets.js is either missing or courrupt. please run Tests.')
    }
}

/**
 *  apply globals to global context. 
 * there you can save variables which will be needed in this project
 * 
 * eg PROJECTROOT (/) 
 * 
 **/
try {
    require('./globals')(Settings.globals)
} catch (error) {
    if ((process.env.DEBUG + '').toLowerCase() == 'true') {
        console.warn('/app/app/globals.js is either missing or courrupt. please run Tests.')
    }
}
module.exports = Settings