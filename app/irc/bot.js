/**
 * IRC wrapper class
 * 
 * @param {Object} database 
 * @param {Object} web 
 * @param {Object} settings 
 * @param {Object} options 
 * @param {Function} test 
 * @returns {Object}
 */
function Irc(database, web, settings, options, test) {
    // setup uptions variable
    options = Object.assign({}, settings.irc.options, options);

    // init bot
    var irc = require('irc'),
        Commands = require('./bot_commands.js'),
        Listeners = require('./bot_listeners.js'),
        bot = new irc.Client(settings.irc.server, settings.irc.nick, options);

    if (!test) {
        Commands(database, web, settings, bot);
        Listeners(database, web, settings, bot);
    } else {
        bot.connect(bot.disconnect(test));
    }
    bot.connect(() => {
        if (settings.irc.debug) {
            console.log('[IRC]', 'client connected to ' + settings.irc.server + ' as ' + settings.irc.nick);
        }
        console.log('[IRC]', 'client ready.');
    });
    return bot;
}

module.exports = Irc;