module.exports = function(database, settings, express) {
    express.get('/', function(req, res) {
        res.render('index', { title: 'telebotty', slogan: 'Combining many worlds to just one framework' })
    });
};