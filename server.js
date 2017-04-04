var Utils = require('./app/app/utils'),
    settings = require('./app/app/settings'),
    Telegram = require('./app/telegram/bot'),
    Irc = require('./app/irc/bot'),
    Web = require('./app/web/web'),
    Database = require('./app/database/database');

// creating database instance
console.log('[DB]', 'starting services...');
var database = Database(settings);
console.log('[DB]', 'database ready.');

// creating web instance
console.log('[Web]', 'starting services...');
var web = Web(database, settings).listen();
console.log('[Web]', 'initialized, becomming ready...');

// TODO: Create a link between telegram and irc -> both need access to each other
// creating telegram bot instance
console.log('[TG]', 'starting services...');
var telegram = Telegram(database, web, settings);
console.log('[TG]', 'bot ready.');

// creating irc bot instance
console.log('[IRC]', 'starting services...');
var irc = Irc(database, web, settings);
console.log('[IRC]', 'initialized, becomming ready...');