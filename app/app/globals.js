/**
 * 
 * 
 * @param {any} context 
 */
function globals(context) {
    context.PROJECTROOT = require('path').join(__dirname, '..', '..');
}
module.exports = globals;