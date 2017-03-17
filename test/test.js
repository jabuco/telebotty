var assert = require('assert'),
    utils = require('../app/app/utils'),
    path = require('path'),
    exec = require('child_process').exec,

    settings = require('./settings'),
    telegram = require('./telegram'),
    database = require('./database'),
    web = require('./web'),
    jsondir = path.join(__dirname, '..', 'app/data/'),
    mongoImportExec = `mongoimport --db telebotty --collection messages --file ${path.join(jsondir,'mongo_messages.json')} && mongoimport --db telebotty --collection users --file ${path.join(jsondir, 'mongo_users.json')}`;

describe('Settings', () => {
    describe('settings.js', () => {
        it('should be readable', done => settings.settings.read(done));
        it('should be writeable', done => settings.settings.write(done));
    });
    if ((process.env.TEST + '').toLowerCase() == 'true') {
        describe('secrets.js', () => {
            it('should be readable', done => settings.secrets.read(done));
            it('should be writeable', done => settings.secrets.write(done));
        });
    }
    describe('globals.js', () => {
        it('should be readable', done => settings.globals.read(done));
        it('should be writeable', done => settings.globals.write(done));
    });
});

/**
 * if this testblock won't execute,
 * this might be because secrets.js needs atleast to be present
 * also it needs to set settings.secrets as TRUE,
 * if it is set to false you should preceeding secrets.js checks
 * 
 * IF process.env.NONPR is defined we're running a non-PR
 * ELSE this is a PR an TELEGRAM_TOKEN won't be available 
 * 
 */
    describe('Telegram', () => {
        describe('token', () => {
            it('should be accepted', done => telegram(r => {
                if(process.env.NONPR == 'telebotty_test_value') {
                    done(r);
                } else {
                    require('mocha-logger').log('secret environment variables are not set! result might be inaccurate.');
                    done();
                }
            }))
                .timeout(6000);
        });
    });

describe('Database', () => {
    describe('#connect()', () => {
        it('should be connectable', done => database(done))
            .timeout(6000);
    });
    after(done => exec(mongoImportExec, done));
});

describe('Web', () => {
    /** 
     * test if server is able to listen,
     * if this fails the following tests will also fail.
     * 
     */
    describe('#listen()', () => {
        it('should listen on open port', done => web.listen(web.close(done)))
            .timeout(6000);
    });


    /**
     * start webserver as requirement for the next tests
     */
    before(done => web.listen(done));


    /**
     * run tests on webserver
     */

    describe('#notify_post()', () => {
        it('should return notify', done => web.notify_post(done))
            .timeout(10000);
    });
    describe('#notify_get()', () => {
        it('should return all notifies', done => web.notify_get(done))
            .timeout(10000);
    });
    describe('#messages_get()', () => {
        it('should return all messages', done => web.messages_get(null, done))
            .timeout(10000);
    });
    describe('#messages_get(ID)', () => {
        it('should return one message', done => web.messages_get('58c445d39653013740a1f99e', done))
            .timeout(10000);
        it('should fail if id is not covertable', done => web.messages_get_fail_500('0', done))
            .timeout(10000);
        it('should fail if message is not found', done => web.messages_get_fail_404('000000000000000000000000', done))
            .timeout(10000);
    });

    /**
     * closing down webserver as it is not yet needed anymore
     */
    after(done => web.close(done));
});