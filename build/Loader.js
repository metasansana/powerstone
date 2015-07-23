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
                if (defaults) return defaults;
                throw e;
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
    }]);

    return Loader;
})();

exports['default'] = Loader;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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TUFBTSxDQUFDLENBQUM7U0FDM0Q7OztXQWhKQyxNQUFNOzs7cUJBb0pHLE1BQU0iLCJmaWxlIjoiTG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IG1lcmdlIGZyb20gJ2RlZXBtZXJnZSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgdHJhdmVyc2UgZnJvbSAndHJhdmVyc2UnO1xuaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi9Db25maWd1cmF0aW9uJztcblxuLyoqXG4gKiBMb2FkZXJcbiAqL1xuY2xhc3MgTG9hZGVyIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhcmVudCBUaGUgcGFyZW50IHBhcmVudCBhbGwgbG9hZCBvcGVyYXRpb25zIHdpbGwgb3BlcmF0ZSBmcm9tLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCkge1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy5jb25mID0gcGFyZW50ICsgJy9jb25mJztcbiAgICB9XG5cbiAgICBfcGFyZW50aXplKGRpcil7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudCArICcvJyArIGRpcjtcbiAgICB9XG5cbiAgICBnZXRDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IENvbmZpZ3VyYXRpb24ocmVxdWlyZSh0aGlzLmNvbmYrJy9jb25maWcnKSk7XG4gICAgfVxuXG4gICAgZ2V0RGlyTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguYmFzZW5hbWUodGhpcy5wYXJlbnQpO1xuICAgIH1cblxuICAgIGdldFBhdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb2FkRnJvbUNvbmZcbiAgICAgKi9cbiAgICBsb2FkRnJvbUNvbmYoZmlsZSwgZGVmYXVsdHMpIHtcblxuXG4gICAgICAgIHZhciByZXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXQgPSByZXF1aXJlKHRoaXMuY29uZiArICcvJyArIGZpbGUpO1xuICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICBpZihkZWZhdWx0cykgcmV0dXJuIGRlZmF1bHRzO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB3ZCA9IHBhdGguZGlybmFtZSh0aGlzLmNvbmYgKyAnLycgKyBmaWxlKSArICcvJztcblxuICAgICAgICBpZiAoKCFyZXQpICYmIGRlZmF1bHRzKSByZXQgPSBkZWZhdWx0cztcblxuICAgICAgICB0cmF2ZXJzZShyZXQpLlxuICAgICAgICAgICAgZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5rZXkgPT09ICckcmVmJylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQudXBkYXRlKHJlcXVpcmUod2QgKyB2YWx1ZSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb2FkRnJvbUNvbmZXaXRoRGVmYXVsdHNcbiAgICAgKi9cbiAgICBsb2FkRnJvbUNvbmZXaXRoRGVmYXVsdHMoZmlsZSwgZGVmYXVsdHMpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKGRlZmF1bHRzLCB0aGlzLmxvYWRGcm9tQ29uZihmaWxlKSk7XG4gICAgfVxuXG4gICAgcmVxdWlyZVJlbGF0aXZlKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUodGhpcy5wYXJlbnQrJy8nK3BhdGgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiByZXF1aXJlRGlyU3luYyByZXF1aXJlcyBhbGwgZmlsZXMgaW4gYSBzdWItZGlyZWN0b3J5IGludG8gYSBzaW5nbGUgb2JqZWN0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpciBBIG5hbWUgb2YgYSBzdWItZGlyZWN0b3J5IGluIHRoZSBjdXJyZW50IHBhcmVudC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbWVyZ2UgQW4gb3B0aW9uYWwgb2JqZWN0IGZ1bmN0aW9ucyBjYW4gYmUgbWVyZ2VkIGludG8uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtwcmVmaXhdIEEgcHJlZml4IHRoYXQgd2lsbCBiZSBjb25jYXRlbmF0ZWQgdG8gdGhlIG9iamVjdCdzIGtleXNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHJlcXVpcmVEaXJTeW5jKGRpciwgbWVyZ2UsIHByZWZpeCkge1xuXG4gICAgICAgIHZhciBmaWxlcztcbiAgICAgICAgdmFyIGV4dGVuc2lvbnMgPSBleHRlbnNpb25zIHx8IFsnLmpzJywgJy5qc29uJ107XG5cbiAgICAgICAgZGlyID0gdGhpcy5fcGFyZW50aXplKGRpcik7XG4gICAgICAgIG1lcmdlID0gbWVyZ2UgfHwge307XG5cbiAgICAgICAgcHJlZml4ID0gcHJlZml4IHx8ICcnO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGRpcik7XG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2UgfHwge307XG4gICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZpbGVzKSlcbiAgICAgICAgICAgICAgICAgICAgZmlsZXMuZm9yRWFjaChmdW5jdGlvbiAocGF0aFRvRmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnMuaW5kZXhPZihwYXRoLmV4dG5hbWUocGF0aFRvRmlsZSkpIDwgMCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VbcHJlZml4K3BhdGguYmFzZW5hbWUocGF0aFRvRmlsZSwgcGF0aC5leHRuYW1lKHBhdGhUb0ZpbGUpKV0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoZGlyICsgJy8nICsgcGF0aFRvRmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lcmdlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlcXVpcmVUYXNrcyBncmFicyBhbGwgdGhlIHRhc2tzIGluIHRoZSB0YXNrcyBmb2xkZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW21lcmdlXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcmVmaXhcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHJlcXVpcmVUYXNrcyhtZXJnZSwgcHJlZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVEaXJTeW5jKCd0YXNrcycsIG1lcmdlLCBwcmVmaXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlcXVpcmVNb2RlbHMgZ3JhYnMgYWxsIHRoZSBtb2RlbHMgaW4gdGhlIG1vZGVscyBmb2xkZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW21lcmdlXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcmVmaXhcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHJlcXVpcmVNb2RlbHMobWVyZ2UsIHByZWZpeCl7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVEaXJTeW5jKCdtb2RlbHMnLCBtZXJnZSwgcHJlZml4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1aXJlQ29udHJvbGxlcnMgZ3JhYnMgYWxsIHRoZSBjb250cm9sbGVycyBpbiB0aGUgY29udHJvbGxlcnMgZm9sZGVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFttZXJnZV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJlZml4XG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICByZXF1aXJlQ29udHJvbGxlcnMobWVyZ2UsIHByZWZpeCl7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVEaXJTeW5jKCdjb250cm9sbGVycycsIG1lcmdlLCBwcmVmaXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlcXVpcmVRdWVyaWVzIGdyYWJzIGFsbCB0aGUgcXVlcmllcyBpbiB0aGUgcXVlcmllcyBmb2xkZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW21lcmdlXVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgcmVxdWlyZVF1ZXJpZXMobWVyZ2UsIHByZWZpeCl7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVEaXJTeW5jKCdxdWVyaWVzJywgbWVyZ2UsIHByZWZpeCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVxdWlyZU1pZGRsZXdhcmUgZ3JhYnMgYWxsIHRoZSBtaWRkbGV3YXJlIGluIHRoZSBtaWRkbGV3YXJlcyBmb2xkZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW21lcmdlXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcmVmaXhcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHJlcXVpcmVNaWRkbGVXYXJlKG1lcmdlLCBwcmVmaXgpe1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1aXJlRGlyU3luYygnbWlkZGxld2FyZScsIG1lcmdlLCBwcmVmaXgpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2FkZXIiXX0=