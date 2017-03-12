/**
 * message Listener for TelegramBot
 * 
 * @param {any} database 
 * @param {any} web 
 * @param {any} settings 
 * @param {any} bot 
 */
function listen(database, web, settings, bot) {
    bot.on('message', function(msg) {
        var req = msg.text;

        if (!req.startsWith('/')) {
            database.connect(function(next) {
                return database.models.User().findOne({ reg: 0 })
                    .then(function(botuser) {
                        var query = { reg: msg.from.id },
                            options = { upsert: true, new: true, setDefaultsOnInsert: true },
                            update = { name: msg.from.username, by: botuser };

                        return database.models.User().findOneAndUpdate(query, update, options, function(error, sender) {
                            return database.models.Message()
                                .create({ by: sender, rcpt: botuser, text: req })
                                .then(() => {
                                    var reason = `BOT [${msg.chat.type}]`;
                                    database.functions.Notifys(reason)
                                        .then(doc => {
                                            next();
                                            web.sockets.emit('messages', {
                                                action: "refresh",
                                                reason,
                                                result: doc
                                            });
                                        });
                                });
                        });
                    });
            });
        }
    });
}

module.exports = listen;