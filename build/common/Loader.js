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

var _traverse = require('traverse');

var _traverse2 = _interopRequireDefault(_traverse);

var _Configuration = require('./Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

/**
 * Loader
 */

var Loader = (function () {

    /**
     *
     * @param {String} parent The parent parent all load operations will operate from.
     */

    function Loader(parent) {
        _classCallCheck(this, Loader);

        this.parent = parent;
        this.conf = parent + '/conf';
    }

    _createClass(Loader, [{
        key: '_parentize',
        value: function _parentize(dir) {
            return this.parent + '/' + dir;
        }
    }, {
        key: 'getConfiguration',
        value: function getConfiguration() {
            return new _Configuration2['default'](require(this.conf + '/config'));
        }
    }, {
        key: 'getDirName',
        value: function getDirName() {
            return _path2['default'].basename(this.parent);
        }
    }, {
        key: 'getPath',
        value: function getPath() {
            return this.parent;
        }
    }, {
        key: 'loadFromConf',

        /**
         * loadFromConf
         */
        value: function loadFromConf(file, defaults) {

            var ret;
            try {
                ret = require(this.conf + '/' + file);
            } catch (e) {

                try {
                    ret = require(this.conf + '/../' + file);
                } catch (e) {
                    if (defaults) return defaults;
                    throw e;
                }
            }

            var wd = _path2['default'].dirname(this.conf + '/' + file) + '/';

            if (!ret && defaults) ret = defaults;

            (0, _traverse2['default'])(ret).forEach(function (value) {
                if (this.key === '$ref') this.parent.update(require(wd + value));
            });

            return ret;
        }
    }, {
        key: 'loadFromConfWithDefaults',

        /**
         * loadFromConfWithDefaults
         */
        value: function loadFromConfWithDefaults(file, defaults) {
            return (0, _deepmerge2['default'])(defaults, this.loadFromConf(file));
        }
    }, {
        key: 'requireRelative',
        value: function requireRelative(path) {
            return require(this.parent + '/' + path);
        }
    }, {
        key: 'requireDirSync',

        /**
         * requireDirSync requires all files in a sub-directory into a single object
         * @param {String} dir A name of a sub-directory in the current parent.
         * @param {Object} merge An optional object functions can be merged into.
         * @param {String} [prefix] A prefix that will be concatenated to the object's keys
         * @returns {Object}
         */
        value: function requireDirSync(dir, merge, prefix) {

            var files;
            var extensions = extensions || ['.js', '.json'];

            dir = this._parentize(dir);
            merge = merge || {};

            prefix = prefix || '';

            try {
                files = _fs2['default'].readdirSync(dir);
            } catch (e) {
                return merge || {};
            }

            if (Array.isArray(files)) files.forEach(function (pathToFile) {
                if (extensions.indexOf(_path2['default'].extname(pathToFile)) < 0) return;
                merge[prefix + _path2['default'].basename(pathToFile, _path2['default'].extname(pathToFile))] = require(dir + '/' + pathToFile);
            });

            return merge;
        }
    }, {
        key: 'requireTasks',

        /**
         * requireTasks grabs all the tasks in the tasks folder
         * @param {Object} [merge]
         * @param {String} prefix
         * @returns {Object}
         */
        value: function requireTasks(merge, prefix) {
            return this.requireDirSync('tasks', merge, prefix);
        }
    }, {
        key: 'requireModels',

        /**
         * requireModels grabs all the models in the models folder
         * @param {Object} [merge]
         * @param {String} prefix
         * @returns {Object}
         */
        value: function requireModels(merge, prefix) {
            return this.requireDirSync('models', merge, prefix);
        }
    }, {
        key: 'requireControllers',

        /**
         * requireControllers grabs all the controllers in the controllers folder
         * @param {Object} [merge]
         * @param {String} prefix
         * @returns {Object}
         */
        value: function requireControllers(merge, prefix) {
            return this.requireDirSync('controllers', merge, prefix);
        }
    }, {
        key: 'requireQueries',

        /**
         * requireQueries grabs all the queries in the queries folder
         * @param {Object} [merge]
         * @returns {Object}
         */
        value: function requireQueries(merge, prefix) {
            return this.requireDirSync('queries', merge, prefix);
        }
    }, {
        key: 'requireMiddleWare',

        /**
         * requireMiddleware grabs all the middleware in the middlewares folder
         * @param {Object} [merge]
         * @param {String} prefix
         * @returns {Object}
         */
        value: function requireMiddleWare(merge, prefix) {
            return this.requireDirSync('middleware', merge, prefix);
        }
    }, {
        key: 'requirePipes',

        /**
         * requirePipes grabs up all the pipe definitions in the pipes folder
         * @param {Object} [merge]
         * @returns {Object}
         */
        value: function requirePipes(merge, prefix) {
            return this.requireDirSync('pipes', merge, prefix);
        }
    }]);

    return Loader;
})();

exports['default'] = Loader;
module.exports = exports['default'];
//# sourceMappingURL=Loader.js.map