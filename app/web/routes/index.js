module.exports = function(database, settings, express) {
    express.get('/', function(req, res) {
        var file = require('path').join(global.PROJECTROOT, 'demo', 'index.html');
        res.sendFile(file);
    });
};