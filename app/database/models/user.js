/**
 * User database model (mongoose)
 * 
 * @param {Object} database 
 * @returns {Function}
 */
function User(database) {
    var settings = require('../../app/settings.js'),
        blueprint = {
            reg: 'number',
            name: 'string',
            by: { type: database.database.Schema.Types.ObjectId, ref: 'User' },
            email: 'string',
            hash: 'string'
        },
        schema = database.database.Schema(blueprint);

    return function User() {
        try {
            model = database.database.model('User', schema);
        } catch (error) {
            model = database.database.model('User');
        }
        return model;
    };
}

module.exports = User;