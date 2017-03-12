/**
 * Database wrapper (mongoose)
 * 
 * @param {Object} settings 
 * @param {Object} options 
 * @returns {Object}
 */
function Database(settings, options) {
    //var database = require('mongodb').MongoClient,
    var assert = require('assert'),
        models = require('./database_models'),
        functions = require('./database_functions');

    options = Object.assign({}, settings.database, options);

    var db = {
        options,

        get database() {
            var database = require('mongoose');

            /**
             * using node's promise instead of mongoose promises
             * cause: mpromise in Mongoose >=4.10 is deprecated
             * see mongoose's deprec notice: 
             * http://mongoosejs.com/docs/promises.html#plugging-in-your-own-promises-library
             */
            database.Promise =
                // check if Settings.Database.Promise was set
                options.Promise ?
                // use it
                options.Promise :
                // use global.Promise as fallback
                global.Promise;

            return database;
        },
        assert,
        models: {},
        functions: {},
        connect: function(callback) {
            var self = this;
            this.database.connect(options.url, options.options, (err, db) => {
                assert.equal(db, null, '[DB] Error could not connect to Database!');
                if (options.debug) {
                    console.log('[DB]', 'connected to database. starting transaction.');
                }
                callback(() => {
                    if (options.debug) {
                        console.log("[DB] operation ended. closing connection.");
                    }
                    this.close();
                });
            });
        },
        close: function() {
            return this.database.connection.close();
        }
    };

    db.models = models(db, settings);
    db.functions = functions(db, settings);

    return db;
}

module.exports = Database;