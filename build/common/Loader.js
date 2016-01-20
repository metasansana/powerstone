'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _path3 = _interopRequireDefault(_path);

var _traverse = require('traverse');

var _traverse2 = _interopRequireDefault(_traverse);

var _Configuration = require('./Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

/**
 * Loader
 */

var Loader = (function () {

    /**
     * @param {String} path The path where all requires will be relative to.
     */

    function Loader(path) {
        _classCallCheck(this, Loader);

        this.path = path;
    }

    /**
     * basename returns the basename of this Loaders's path
     * @returns {string}
     */

    _createClass(Loader, [{
        key: 'basename',
        value: function basename() {
            return _path3['default'].basename(this.path);
        }

        /**
         * join a value to the Loader's Path.
         * @param {string} value 
         * @returns {string}
         */
    }, {
        key: 'join',
        value: function join(value) {
            return _path3['default'].join(this.path, value);
        }

        /**
         * load requires a single file into memory
         * @param {string} path 
         * @param {*} defaults 
         * @returns {*}
         */
    }, {
        key: 'load',
        value: function load(path, defaults) {

            try {
                return require(this.join(path));
            } catch (e) {
                if (e.code !== 'MODULE_NOT_FOUND' || !defaults) throw e;
                return defaults;
            }
        }

        /**
         * require requires all files in a sub-directory into a single object
         * @param {String} dir A name of a sub-directory in the current path.
         * @param {Object} merge An optional object functions can be merged into.
         * @param {String} [prefix] A prefix that will be concatenated to the object's keys
         * @returns {Object}
         */
    }, {
        key: 'require',
        value: (function (_require) {
            function require(_x, _x2, _x3) {
                return _require.apply(this, arguments);
            }

            require.toString = function () {
                return _require.toString();
            };

            return require;
        })(function (dir, merge, prefix) {

            var files;
            var extensions = extensions || ['.js', '.json'];

            dir = this.path + '/' + dir;
            merge = merge || {};

            prefix = prefix || '';
            prefix = prefix ? prefix + '.' : prefix;

            try {
                files = _fs2['default'].readdirSync(dir);
            } catch (e) {
                return merge || {};
            }

            if (Array.isArray(files)) files.forEach(function (pathToFile) {
                if (extensions.indexOf(_path3['default'].extname(pathToFile)) < 0) return;
                merge[prefix + _path3['default'].basename(pathToFile, _path3['default'].extname(pathToFile))] = require(dir + '/' + pathToFile);
            });

            return merge;
        })
    }]);

    return Loader;
})();

exports['default'] = Loader;
module.exports = exports['default'];
//# sourceMappingURL=Loader.js.map