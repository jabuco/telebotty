/**
 * Notify database model (mongoose)
 * 
 * @param {Object} database 
 * @returns {Function}
 */
function Notify(database) {
    var settings = require('../../app/settings.js'),
        blueprint = {
            reason: 'string',
            action: 'string',
            ts: 'Date',
            createdAt: { 'type': 'Date', 'expires': 60, default: Date.now }
        },
        schema = database.database.Schema(blueprint);

    return function Notify() {
        try {
            model = database.database.model('Notify', schema);
        } catch (error) {
            model = database.database.model('Notify');
        }
        return model;
    };
}

module.exports = Notify;