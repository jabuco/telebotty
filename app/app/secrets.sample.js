/**
 * Userdefined Settings which contain sensible data, e.g. database passwords.
 * This is designed for usecases where passwords and such sensible information may not
 * or can not be provided via environment variabes
 * 
 * @param {any} Settings 
 */
function Secrets(Settings) {
    /**
     * this is usually a case,
     * when you dont want to pass the bot-token
     * by using environment variabes.
     * 
     * these could also be set in settings.js, but we dont want to put SECRET values into there,
     * so you can safely pass your settings.js in a support case if needed.
     */
    Settings.telegram.token = 'mysecret_token';
    Settings.database.options.user = 'root'; //mongoose user option [1]
    Settings.database.options.pass = 'mysecret_password'; //mongoose pass option[1]

    /**
     * [1] mongoose option
     *  The connect method also accepts an options object which will be passed on to the underlying driver.
     *  All options included here take precedence over options passed in the connection string.
     * 
     * see http://mongoosejs.com/docs/connections.html#options
     */
}

module.exports = Secrets;