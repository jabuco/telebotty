/**
 * message Listener for TelegramBot
 * 
 * @param {any} database 
 * @param {any} web 
 * @param {any} settings 
 * @param {any} bot 
 */
function onPrivateMessage(database, web, settings, bot) {
    bot.addListener('pm', function(from, message) {
        console.log(`${from} => ME: ${message}`);
    });
}

module.exports = onPrivateMessage;