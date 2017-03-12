/**
 * TelegramBot wrapper class
 * 
 * @param {Object} database 
 * @param {Object} web 
 * @param {Object} settings 
 * @param {Object} options 
 * @param {Function} test 
 * @returns {Object}
 */
function Bot(database, web, settings, options, test) {
    // setup uptions variable
    options = Object.assign({}, settings.telegram.options, options);

    // init bot
    var TelegramBot = require('tgfancy'),
        Commands = require('./bot_commands.js'),
        bot = new TelegramBot(settings.telegram.token, options);

    if (!test) {
        Commands(database, web, settings, bot);
    }

    return bot;
}

module.exports = Bot;