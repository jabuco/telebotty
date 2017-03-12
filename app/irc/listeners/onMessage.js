/**
 * message Listener for TelegramBot
 * 
 * @param {any} database 
 * @param {any} web 
 * @param {any} settings 
 * @param {any} bot 
 */
function onMessage(database, web, settings, bot) {
    bot.addListener('message', function(from, to, message) {
        console.log(`${from} => ${to}: ${message}`);
    });
}

module.exports = onMessage;