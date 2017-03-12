module.exports = function(database, settigns, express, socket) {
    express.post('/notify', (req, res) => {
        var reason = "API";
        database.connect(next => {
            database.functions.Notifys(reason)
                .then(doc => {
                    res.json(doc);
                    socket.emit('messages', {
                        action: 'refresh',
                        reason
                    });
                    next();
                });
        });
    });
    express.get('/notify/list', (req, res) => {
        database.connect((next) => {
            return database.models.Notify()
                .find({})
                .then(data => res.json(data))
                .then(next);
        });
    });
};