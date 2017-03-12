var CouchPotatoAPI = require('couchpotato-api');

var couchpotato = new CouchPotatoAPI({
    hostname: 'seedbox',
    apiKey: '14ab4e48db384411b714cf56a661ed1a',
    port: 80,
    urlBase: '/couchpotato'
});
couchpotato.get('movie.search', { 'q': "day after" })
    .then(function(result) {
        if (result.success) {
            for (var i = 0; i < result.movies.length; i++) {
                console.log(result.movies[i].original_title);
            }
        }
    });