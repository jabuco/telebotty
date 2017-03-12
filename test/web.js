    /* eslint-env mocha */

    /**
     * required variables and applications fo this test case
     */
    var mlog = require('mocha-logger'),
        chai = require('chai'),
        chaiHttp = require('chai-http'),
        settings = require('../app/app/settings'),
        Web = require('../app/web/web'),
        database = require('../app/database/database')(settings),
        should = chai.should(),
        web = Web(database, settings);

    chai.use(chaiHttp);

    /**
     * This test is designed to check for required open web-port.
     * If this fails, the reason might be a firewall issue, permssion problem or misconfiguration.
     * 
     * Please make sure, that this test succeeds, so this app can run.
     */
    module.exports = {
        /**
         * wrapper function for tests
         * used to start webserver
         * 
         * @param {Function} callback 
         */
        listen: function(callback) {
            callback = callback ? callback : function() {};
            try {
                web.listen(() => callback());
            } catch (ex) {
                callback(ex);
            }
        },
        /**
         * wrapper function for tests
         * used to stop webserver
         * 
         * @param {Function} callback 
         */
        close: function(callback) {
            callback = callback ? callback : function() {};
            try {
                web.server.close();
                callback();
            } catch (ex) {
                callback(ex);
            }
        },
        /**
         * POST /notify
         * 
         * @param {Function} callback 
         */
        notify_post: function(callback) {
            callback = callback ? callback : function() {};
            chai.request(web.server)
                .post('/notify')
                .send({})
                .end(function(err, res) {
                    try {
                        res.should.have.status(200);
                        res.should.be.json; // jshint ignore:line
                        res.body.should.be.a('object');
                        res.body.should.have.property('reason');
                        res.body.should.have.property('action');
                        res.body.should.have.property('ts');
                        res.body.should.have.property('createdAt');
                    } catch (ex) {
                        err = ex;
                    }

                    if (err) {
                        callback(err);
                    } else {
                        callback();
                    }
                });
        },
        /**
         * GET /notify
         * 
         * @param {Function} callback 
         */
        notify_get: function(callback) {
            callback = callback ? callback : function() {};
            chai.request(web.server)
                .get('/notify/list')
                .send({})
                .end(function(err, res) {
                    try {
                        res.should.have.status(200);
                        res.should.be.json; // jshint ignore:line
                        res.body.should.be.a('array');
                        if (res.body.length > 0) {
                            res.body[0].should.have.property('reason');
                            res.body[0].should.have.property('action');
                            res.body[0].should.have.property('ts');
                            res.body[0].should.have.property('createdAt');
                        } else {
                            mlog.log("result is empty, test might be inaccurate!");
                        }
                    } catch (ex) {
                        err = ex;
                    }

                    if (err) {
                        callback(err);
                    } else {
                        callback();
                    }
                });
        },
        /**
         * GET /messages/:id
         * 
         * @param {String} id 
         * @param {Function} callback 
         */
        messages_get: function(id, callback) {
            id = id !== null && id !== '' && id ? id : '';
            callback = callback ? callback : function() {};
            chai.request(web.server)
                .get('/messages/' + id)
                .end(function(err, res) {
                    try {
                        res.should.have.status(200);
                        res.should.be.json; // jshint ignore:line
                        res.body.should.be.a('object');
                        should.not.exist(res.body.error);
                        res.body.res.should.be.a('array');

                        if (res.body.res.length > 0) {
                            res.body.res[0].should.be.a('object');

                            res.body.res[0].should.have.property('by');
                            res.body.res[0].by.should.be.a('object');
                            res.body.res[0].by.should.have.property('reg');
                            res.body.res[0].by.should.have.property('name');
                            res.body.res[0].by.should.have.property('by');

                            res.body.res[0].should.have.property('rcpt');
                            res.body.res[0].rcpt.should.be.a('object');
                            res.body.res[0].rcpt.should.have.property('reg');
                            res.body.res[0].rcpt.should.have.property('name');

                            res.body.res[0].should.have.property('text');
                        } else {
                            mlog.log("result is empty, test might be inaccurate!");
                        }
                    } catch (ex) {
                        err = ex;
                    }

                    if (err) {
                        callback(err);
                    } else {
                        callback();
                    }
                });
        },
        /**
         * Check for expected fails
         * in this case check for failing ID cast
         * 
         * @param {String} id 
         * @param {Function} callback 
         */
        messages_get_fail_500: function(id, callback) {
            id = id !== null && id !== '' && id ? id : '';
            callback = callback ? callback : function() {};

            chai.request(web.server)
                .get('/messages/' + id)
                .end(function(err, res) {
                    try {
                        res.should.have.status(500);
                        res.should.be.json; // jshint ignore:line
                        res.body.should.be.a('object');
                        res.body.error.should.be.a('string');
                        res.body.res.should.be.a('array');
                    } catch (ex) {
                        err = ex;
                    }

                    if (err.response.status !== 500) {
                        callback(err);
                    } else {
                        callback();
                    }
                });
        },
        /**
         * Check for expected fails
         * in this case check for missing message (id)
         * 
         * @param {String} id 
         * @param {Function} callback 
         */
        messages_get_fail_404: function(id, callback) {
            id = id !== null && id !== '' && id ? id : '';
            callback = callback ? callback : function() {};

            chai.request(web.server)
                .get('/messages/' + id)
                .end(function(err, res) {
                    try {
                        res.should.have.status(404);
                        res.should.be.json; // jshint ignore:line
                        res.body.should.be.a('object');
                        res.body.error.should.be.a('string');
                        res.body.res.should.be.a('array');
                    } catch (ex) {
                        err = ex;
                    }

                    if (err.response.status !== 404) {
                        callback(err);
                    } else {
                        callback();
                    }
                });
        }
    };