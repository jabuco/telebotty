module.exports = function(database, settings, express) {

    express.get('/messages', (req, res) => getAll(req, res));
    express.get('/messages/', (req, res) => getAll(req, res));
    express.get('/messages/:id', (req, res) => getOne(req, res));


    /**
     * returns all messages fetchable
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    function getAll(req, res) {
        database.connect(next => {
            return database.functions.Messages()
                .then(msgs => {
                    res.set(settings.web.accessheaders);
                    res.json({
                        error: null,
                        res: msgs || []
                    });
                    next();
                });
        });
    }

    /**
     * returns one message with given id
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    function getOne(req, res) {
        database.connect(next => {
            var error = null;
            return database.functions.Messages(req.params.id)
                .catch(e => { error = e; })
                .then(msgs => {
                    if (error !== null) {
                        res.status(500);
                    } else if (msgs.length <= 0) {
                        res.status(404);
                        error = 'requested element not found';
                    }
                    res.set(settings.web.accessheaders);
                    res.json({
                        error,
                        res: msgs || []
                    });
                    next();
                });
        });
    }

    /**
     * deny pushing new messages via POST
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    function post(req, res) {
        if (error !== null) {
            res.status(403);
        }
        res.set(settings.web.accessheaders);
        res.json({
            error: '403 Unauthorized',
            res: null
        });
    }
};