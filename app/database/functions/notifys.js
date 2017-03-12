var settings = require('../../app/settings');

/**
 * Notification Helper function for easier database access.
 * 
 * @param {Object} database 
 * @returns {Function}
 */
function Notifys(database) {
    return function(reason, cb) {
        cb = cb || function() {};

        return database.models.Notify()
            .create({
                reason,
                "action": "refresh",
                "ts": Date.now()
            })
            .catch(function(err) {
                if (settings.database.debug) {
                    console.trace('[DB] Messages()', err);
                }
                cb(err);
            });
    };
}

module.exports = Notifys;