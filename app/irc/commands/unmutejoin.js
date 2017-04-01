/**
 * IRC Command
 * 
 * @param {any} database 
 * @param {any} web 
 * @param {any} settings 
 * @param {any} bot 
 * @return {Function} 
 */
function mutejoin(database, web, settings, bot) {
    return function mutejoin(from, to, data) {
        database.connect(function(next) {
            return database.models.User().findOne({ reg: 0 })
                .then(function(botuser) {
                    var query = { irc: from }, //TODO
                        options = { upsert: true, new: true, setDefaultsOnInsert: true },
                        update = { muteJoin: false };

                    return database.models.User().findOneAndUpdate(query, update, options, function(error, sender) {
                        next();
                        bot.say(from, `Yay I will greet you again, from the next time you join! Have a good Day!`);
                    });
                });
        });
    };
}

module.exports = mutejoin;