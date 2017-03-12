var settings = require('../../app/settings');

/**
 * Message Helper function for easier Database access
 * 
 * @param {Object} database 
 * @returns {Function}
 */
function Messages(database) {
    return function(id, cb) {
        id = id != null ? id : null;
        cb = cb || function() {};

        /**
         * check if id is castable / valid mongoose.Types.ObjectId
         */
        if (id !== null) {
            try {
                database.database.Types.ObjectId(id);
            } catch (error) {
                cb(error);
                return Promise.reject(error.message);
            }
        }

        var query = id !== null ? { _id: id } : {};

        return database.models.Message()
            .find(query)
            .populate('by rcpt')
            .catch(function(err) {
                if (settings.database.debug) {
                    console.trace('[DB] Messages(' + id + ')', err);
                }
                cb(err);
            });
    };
}

module.exports = Messages;