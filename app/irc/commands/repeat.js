/**
 * IRC Command
 * 
 * @param {any} database 
 * @param {any} web 
 * @param {any} settings 
 * @param {any} bot 
 * @return {Function} 
 */
function repeat(database, web, settings, bot) {
    return function repeat(from, to, data) {
        bot.say(to, `${from} hat '${data} gesagt! hihi :>'`);
    };
}

module.exports = repeat;