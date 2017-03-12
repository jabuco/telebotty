/**
 * message Listener for TelegramBot
 * 
 * @param {any} database 
 * @param {any} web 
 * @param {any} settings 
 * @param {any} bot 
 */
function ws_forward(database, web, settings, bot) {
    bot.on('message', function(msg) {
        var cmd = '/wsnotify';
        var req = (msg.text ? msg.text : "").slice(cmd.length + 1);
        var reason = `BOT [${msg.chat.type}]`;

        if (req.length > 0) {
            web.sockets.emit('wsnotify', {
                action: "command",
                reason,
                data: req
            });
        }
    });
}

module.exports = ws_forward;