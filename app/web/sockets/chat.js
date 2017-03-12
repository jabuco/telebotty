/**
 * chat listener
 * 
 * @param {any} database 
 * @param {any} socket 
 */
function chat(database, socket) {
    function request_data(req) {
        if (req == 'messages') {
            database.connect(next => {
                return database.functions.Messages()
                    .then(msgs => {
                        next();
                        var res = {
                            err: null,
                            res: msgs || []
                        };
                        socket.emit('getData', res);
                    });
            });
        }
    }

    socket.on('getData', req => request_data(req));
}
module.exports = chat;