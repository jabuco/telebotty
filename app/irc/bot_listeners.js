/**
 * Botcommands Helper class
 * 
 * @param {any} database 
 * @param {any} web 
 * @param {any} settings 
 * @param {any} bot 
 */
function Listeners(database, web, settings, bot) {
    var Path = require('path'),
        path = Path.join(__dirname, 'listeners'),
        utils = require('../app/utils');

    if (database === null && settings.irc) {
        console.log('[IRC] Listeners', 'no database present. this could lead to errors if bot needs to access to a database.');
    }
    // load all Listeners
    var listeners = utils.requireDir(path);
    for (var i in listeners) {
        listeners[i](database, web, settings, bot);
    }

    if (settings.irc.debug) {
        console.log('[IRC]', 'all Listeners loaded.');
    }
}

module.exports = Listeners;