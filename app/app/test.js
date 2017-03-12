function Test(Settings) {
    Settings.irc.server = 'irc.freenode.net';
    Settings.irc.options.channels = ['#telebotty'];
    Settings.irc.options.port = 6667;
    Settings.irc.options.secure = false;
    Settings.irc.options.certExpired = true;
}

module.exports = Test;