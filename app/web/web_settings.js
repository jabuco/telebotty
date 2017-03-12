/**
 * helper class
 * applies all webserver settings to its webserver wrapper
 * 
 * @param {Object} settings 
 * @param {Object} express 
 */
function Settings(settings, express) {
    for (var key in settings.web.express) {
        if (settings.web.express.hasOwnProperty(key)) {
            var val = settings.web.express[key];
            if (settings.web.debug) {
                console.log(`[Web] express set '${key}' to '${val}'`);
            }
            express.set(key, val);
        }
    }
}

module.exports = Settings;