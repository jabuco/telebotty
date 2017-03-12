var Path = require('path');
/**
 * Collection of utilities e.g. String.capitalize 
 * 
 * @returns {Object} Utils
 */
function Utils() {

    global.String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    global.String.prototype.popFirst = function(delimiter) {
        return this.substr(this.indexOf(delimiter) + 1)
    };

    return {

        requireDir: function(dir) {
            var modules = {}; //,args = Array.prototype.slice.call(arguments, 1);

            require('fs').readdirSync(dir).forEach((file) => {
                var index = file.split('.')[0].capitalize();
                modules[index] = require(dir + Path.sep + file);
            });
            return modules;
        }
    };
}
module.exports = Utils();