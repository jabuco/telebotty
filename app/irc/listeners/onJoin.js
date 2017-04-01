/**
 * message Listener for TelegramBot
 * 
 * @param {any} database 
 * @param {any} web 
 * @param {any} settings 
 * @param {any} bot 
 */
function onJoin(database, web, settings, bot) {
    function format(fmt, vars) {
        // TODO split into aray, convert values in array, combine array to command
        fmt = fmt.replace('%p', vars.provider);
        fmt = fmt.replace('%c', vars.command);
        fmt = fmt.replace('%u', vars.user);
        fmt = fmt.replace('%s', vars.secret);
        return fmt;
    }
    bot.addListener('registered', (message) => {
        var cmd = format(settings.irc.auth.commandFormat, settings.irc.auth);
        bot.say(settings.irc.auth.provider, cmd);
    });
    bot.addListener('join#telebotty', (user, message) => {
        if (user != settings.irc.nick) {
            database.connect(function(next) {
                return database.models.User().findOne({ reg: 0 })
                    .then(function(botuser) {
                        var query = { irc: user }, //TODO
                            options = { upsert: true, new: true, setDefaultsOnInsert: true },
                            update = { irc: user, by: botuser };

                        return database.models.User().findOneAndUpdate(query, update, options, function(error, sender) {
                            next();
                            if (!sender.muteJoin) {
                                bot.say(user, `hello there, ${user}! If you haven't done yet, please have a look at my /commands`);
                                bot.say(user, `Do you like me, the great telebotty, then please consider a donation or positive rewiew.`);
                                bot.say(user, `Also, if you want to contribute, please have look at our repo. Feel free to fork me and to share your pull requests!`);
                                bot.say(user, `Have a nice day B-)`);
                                bot.say(user, `If you don't want to be greeted by me anymore, type ${settings.irc.commandDelimiter}mutejoin`);
                            }
                        });
                    });
            });
        }
    })
}

module.exports = onJoin;