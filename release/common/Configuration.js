'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function exists(path) {

    try {
        return fs.statSync(path).isFile();
    } catch (e) {
        return false;
    }
}

/**
 * Configuration
 * @param {string} dir
 * @param {string} path 
 * @property {object} keys
 * @property {string} path
 */

var Configuration = (function () {
    function Configuration(dir, path) {
        _classCallCheck(this, Configuration);

        this.paths = {
            root: path,
            config: path + '/' + dir + '/config.js',
            routes: path + '/' + dir + '/routes.js',
            modules: path + '/modules'
        };

        this.options = exists(this.paths.config) ? require(this.paths.config) : {};
        this.routes = exists(this.paths.routes) ? require(this.paths.routes) : {};
    }

    _createClass(Configuration, [{
        key: 'read',
        value: function read(key, defaults) {
            var ret = _propertySeek2['default'].get(this.options, key);
            if (ret) return ret;
            return defaults;
        }
    }, {
        key: 'readAndMerge',
        value: function readAndMerge(key, target, defaults) {
            var ret = this.readWithDefaults(key, defaults);
            return (0, _deepmerge2['default'])(target, ret);
        }
    }]);

    return Configuration;
})();

Configuration.keys = {
    MODULES: 'modules',
    CONNECTIONS: 'connections',
    MIDDLEWARE: 'middleware',
    PATH: 'path'
};

exports['default'] = Configuration;
module.exports = exports['default'];
//# sourceMappingURL=Configuration.js.map