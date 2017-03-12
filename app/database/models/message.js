/**
 * Message database model (mongoose)
 * 
 * @param {Object} database 
 * @returns {Function}
 */
function Message(database) {
    var settings = require('../../app/settings.js'),
        blueprint = {
            ts: 'number',
            by: { type: database.database.Schema.Types.ObjectId, ref: 'User' },
            rcpt: { type: database.database.Schema.Types.ObjectId, ref: 'User' },
            text: 'string',
        },
        schema = database.database.Schema(blueprint);

    return function Message() {
        // make sure, usermodel is initialized
        database.models.User();

        try {
            model = database.database.model('Message', schema);
        } catch (error) {
            model = database.database.model('Message');
        }
        return model;
    };
}

module.exports = Message;