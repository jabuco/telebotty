/**
 * Botcommands Helper class
 * 
 * @param {any} database 
 * @param {any} web 
 * @param {any} settings 
 * @param {any} bot 
 */
function Commands(database, web, settings, bot) {
    function addCommand(instance, delim, trigger, callback) {
        instance.addListener('message', function(from, to, message) {
            callback = callback || function() {};
            if (message.startsWith(delim + trigger)) {
                callback(from, to, message.popFirst(delim + trigger));
            }
        });
    }

    function addPrivateCommand(instance, delim, trigger, callback) {
        instance.addListener('pm', function(from, to, message) {
            callback = callback || function() {};
            if (message.startsWith(delim + trigger)) {
                callback(from, to, message.popFirst(delim + trigger));
            }
        });
    }

    var Path = require('path'),
        path = Path.join(__dirname, 'commands'),
        pathUser = Path.join(__dirname, '../../config/app/irc/commands'),
        utils = require('../app/utils'),
        commands = {};

    if (database === null && settings.irc) {
        console.log('[IRC] Commands', 'no database present. this could lead to errors if bot needs to access to a database.');
    }
    // load all commands
    Object.assign(commands, utils.requireDir(path), utils.requireDir(pathUser));
    for (var i in commands) {
        var cmd = commands[i](database, web, settings, bot);
        addCommand(bot, settings.irc.commandDelimiter, cmd.name, cmd);
        if (settings.irc.debug) console.log('[IRC][Command]', `loaded '${cmd.name}'.`);
    }

    if (settings.irc.debug) {
        console.log('[IRC]', 'all commands loaded.');
    }
}
module.exports = Commands;