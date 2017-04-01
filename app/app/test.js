function Test(Settings) {
    Settings.irc.server = 'irc.freenode.net'
    Settings.irc.options.channels = ['#telebotty']
    Settings.irc.options.port = 6667
    Settings.irc.options.secure = false
    Settings.irc.options.certExpired = true
    Settings.irc.auth.secret = process.env.IRC_TOKEN
    Settings.irc.auth.commandFormat = '%c %u %s'
        // if on heroku (testcase) we need to set web_port using value of $PORT
    console.log('heroku web port: ', process.env.PORT)
    Settings.web.port = process.env.PORT || Settings.web.port
}

module.exports = Test