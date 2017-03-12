var fs = require('fs'),
    path = require('path');

function checkfile(dir, rw, callback) {
    try {
        fs.access(dir, rw ? fs.constants.R_OK : fs.constants.W_OK, callback);
    } catch (error) {
        callback(error);
    }
}

function getTestCallback(dir) {
    return {
        read: (callback) => checkfile(dir, true, callback),
        write: (callback) => checkfile(dir, false, callback)
    };
}
/**
 * This test is designed to check for required settings files.
 * If this fails, the reason might be a missing file or wrióng syntax in settings files.
 * 
 * Please make sure, that this test succeeds, so this app can run.
 */

module.exports = {
    settings: getTestCallback(path.join(__dirname, '../app/app/settings.js')),
    secrets: getTestCallback(path.join(__dirname, '../app/app/secrets.js')),
    globals: getTestCallback(path.join(__dirname, '../app/app/globals.js'))
};