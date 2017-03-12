/**
 * This test is designed to check for required token validity.
 * If this fails, the reason might be a connection issue or misconfiguration.
 * 
 * Please make sure, that this test succeeds, so this app can run.
 */
var settings = require('../app/app/settings.js'),
    Bot = require('../app/telegram/bot.js');

function _bot(callback) {
    try {
        Bot(null, null, settings, null, true);
        callback();
    } catch (error) {
        var e = error.message + "";
        callback(new Error(e));
    }
}

module.exports = _bot;