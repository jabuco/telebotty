/**
 * This test is designed to check for required database connection.
 * If this fails, the reason might be a connection issue or misconfiguration.
 * 
 * Please make sure, that this test succeeds, so this app can run.
 */
var settings = require('../app/app/settings.js'),
    Database = require('../app/database/database.js'),
    database = Database(settings);

function _database(callback) {
    database.connect(function(next) {
        database.models.User().findOne({})
            .then(function() {
                callback();
                next();
            })
            .catch(err => {
                callback(err);
                next();
            });
    });
}

module.exports = _database;