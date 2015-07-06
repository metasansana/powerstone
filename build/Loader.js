'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Promise = require('bluebird');
var merge = require('deepmerge');
var fs = require('fs');
var path = require('path');
var traverse = require('traverse');

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
        key: 'loadFromConf',

        /**
         * loadFromConf
         */
        value: function loadFromConf(file, defaults) {

            var ret = require(this.conf + '/' + file);
            var wd = path.dirname(this.conf + '/' + file) + '/';

            if (!ret && defaults) ret = defaults;

            traverse(ret).forEach(function (value) {
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
            return merge(defaults, this.loadFromConf(file));
        }
    }, {
        key: 'requireDirSync',

        /**
         * requireDirSync requires all files in a sub-directory into a single object
         * @param {String} dir A name of a sub-directory in the current parent.
         * @param {Array} [extensions=['.js','.json']] A list of extensions to load.
         * @param {Object} merge An optional object functions can be merged into.
         * @returns {Object}
         */
        value: function requireDirSync(dir, extensions, merge) {

            dir = this._parentize(dir);
            merge = merge || {};
            extensions = extensions || ['.js', '.json'];

            var files = fs.readdirSync(dir);

            if (Array.isArray(files)) files.forEach(function (pathToFile) {
                if (extensions.indexOf(path.extname(pathToFile)) < 0) return;
                merge[path.basename(pathToFile, path.extname(pathToFile))] = require(dir + '/' + pathToFile);
            });

            return merge;
        }
    }, {
        key: 'requireTasks',

        /**
         * requireTasks grabs all the tasks in the tasks folder
         * @param {Object} [merge]
         * @returns {Array}
         */
        value: function requireTasks(merge) {
            var ret = this.requireDirSync('tasks', null, merge);
            return Object.keys(ret).map(function (key) {
                return ret[key];
            });
        }
    }, {
        key: 'requireModels',

        /**
         * requireModels grabs all the models in the models folder
         * @param {Object} [merge]
         * @returns {Object}
         */
        value: function requireModels(merge) {
            return this.requireDirSync('models', null, merge);
        }
    }, {
        key: 'requireControllers',

        /**
         * requireControllers grabs all the controllers in the controllers folder
         * @param {Object} [merge]
         * @returns {Object}
         */
        value: function requireControllers(merge) {
            return this.requireDirSync('controllers', null, merge);
        }
    }, {
        key: 'requireQueries',

        /**
         * requireQueries grabs all the queries in the queries folder
         * @param {Object} [merge]
         * @returns {Object}
         */
        value: function requireQueries(merge) {
            return this.requireDirSync('queries', null, merge);
        }
    }, {
        key: 'requireMiddleWare',

        /**
         * requireMiddleware grabs all the middleware in the middlewares folder
         * @param {Object} [merge]
         * @returns {Object}
         */
        value: function requireMiddleWare(merge) {
            return this.requireDirSync('middleware', null, merge);
        }
    }]);

    return Loader;
})();

exports['default'] = Loader;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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SSxHQUFHLEdBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3JELG1CQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRzt1QkFBRSxHQUFHLENBQUMsR0FBRyxDQUFDO2FBQUEsQ0FBQyxDQUFDO1NBQzlDOzs7Ozs7Ozs7ZUFPWSx1QkFBQyxLQUFLLEVBQUM7QUFDaEIsbUJBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3JEOzs7Ozs7Ozs7ZUFPaUIsNEJBQUMsS0FBSyxFQUFDO0FBQ3JCLG1CQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxRDs7Ozs7Ozs7O2VBT2Esd0JBQUMsS0FBSyxFQUFDO0FBQ2pCLG1CQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN0RDs7Ozs7Ozs7O2VBT2dCLDJCQUFDLEtBQUssRUFBQztBQUNwQixtQkFBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDekQ7OztXQTdHQyxNQUFNOzs7cUJBaUhHLE1BQU0iLCJmaWxlIjoiTG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xudmFyIG1lcmdlID0gcmVxdWlyZSgnZGVlcG1lcmdlJyk7XG52YXIgZnMgPSByZXF1aXJlKCdmcycpO1xudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG52YXIgdHJhdmVyc2UgPSByZXF1aXJlKCd0cmF2ZXJzZScpO1xuXG4vKipcbiAqIExvYWRlclxuICovXG5jbGFzcyBMb2FkZXIge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyZW50IFRoZSBwYXJlbnQgcGFyZW50IGFsbCBsb2FkIG9wZXJhdGlvbnMgd2lsbCBvcGVyYXRlIGZyb20uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGFyZW50KSB7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLmNvbmYgPSBwYXJlbnQgKyAnL2NvbmYnO1xuICAgIH1cblxuICAgIF9wYXJlbnRpemUoZGlyKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICsgJy8nICsgZGlyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvYWRGcm9tQ29uZlxuICAgICAqL1xuICAgIGxvYWRGcm9tQ29uZihmaWxlLCBkZWZhdWx0cykge1xuXG4gICAgICAgIHZhciByZXQgPSByZXF1aXJlKHRoaXMuY29uZiArICcvJyArIGZpbGUpO1xuICAgICAgICB2YXIgd2QgPSBwYXRoLmRpcm5hbWUodGhpcy5jb25mICsgJy8nICsgZmlsZSkgKyAnLyc7XG5cbiAgICAgICAgaWYgKCghcmV0KSAmJiBkZWZhdWx0cykgcmV0ID0gZGVmYXVsdHM7XG5cbiAgICAgICAgdHJhdmVyc2UocmV0KS5cbiAgICAgICAgICAgIGZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMua2V5ID09PSAnJHJlZicpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LnVwZGF0ZShyZXF1aXJlKHdkICsgdmFsdWUpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9hZEZyb21Db25mV2l0aERlZmF1bHRzXG4gICAgICovXG4gICAgbG9hZEZyb21Db25mV2l0aERlZmF1bHRzKGZpbGUsIGRlZmF1bHRzKSB7XG4gICAgICAgIHJldHVybiBtZXJnZShkZWZhdWx0cywgdGhpcy5sb2FkRnJvbUNvbmYoZmlsZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlcXVpcmVEaXJTeW5jIHJlcXVpcmVzIGFsbCBmaWxlcyBpbiBhIHN1Yi1kaXJlY3RvcnkgaW50byBhIHNpbmdsZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyIEEgbmFtZSBvZiBhIHN1Yi1kaXJlY3RvcnkgaW4gdGhlIGN1cnJlbnQgcGFyZW50LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtleHRlbnNpb25zPVsnLmpzJywnLmpzb24nXV0gQSBsaXN0IG9mIGV4dGVuc2lvbnMgdG8gbG9hZC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbWVyZ2UgQW4gb3B0aW9uYWwgb2JqZWN0IGZ1bmN0aW9ucyBjYW4gYmUgbWVyZ2VkIGludG8uXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICByZXF1aXJlRGlyU3luYyhkaXIsIGV4dGVuc2lvbnMsIG1lcmdlKSB7XG5cbiAgICAgICAgZGlyID0gdGhpcy5fcGFyZW50aXplKGRpcik7XG4gICAgICAgIG1lcmdlID0gbWVyZ2UgfHwge307XG4gICAgICAgIGV4dGVuc2lvbnMgPSBleHRlbnNpb25zIHx8IFsnLmpzJywgJy5qc29uJ107XG5cbiAgICAgICAgICAgIHZhciBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGRpcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxlcykpXG4gICAgICAgICAgICAgICAgICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24gKHBhdGhUb0ZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHRlbnNpb25zLmluZGV4T2YocGF0aC5leHRuYW1lKHBhdGhUb0ZpbGUpKSA8IDApIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlW3BhdGguYmFzZW5hbWUocGF0aFRvRmlsZSwgcGF0aC5leHRuYW1lKHBhdGhUb0ZpbGUpKV0gPSByZXF1aXJlKGRpciArICcvJyArIHBhdGhUb0ZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBtZXJnZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1aXJlVGFza3MgZ3JhYnMgYWxsIHRoZSB0YXNrcyBpbiB0aGUgdGFza3MgZm9sZGVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFttZXJnZV1cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgcmVxdWlyZVRhc2tzKG1lcmdlKSB7XG4gICAgICAgIHZhciByZXQgID0gdGhpcy5yZXF1aXJlRGlyU3luYygndGFza3MnLCBudWxsLCBtZXJnZSk7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhyZXQpLm1hcChrZXk9PnJldFtrZXldKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1aXJlTW9kZWxzIGdyYWJzIGFsbCB0aGUgbW9kZWxzIGluIHRoZSBtb2RlbHMgZm9sZGVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFttZXJnZV1cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHJlcXVpcmVNb2RlbHMobWVyZ2Upe1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1aXJlRGlyU3luYygnbW9kZWxzJywgbnVsbCwgbWVyZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlcXVpcmVDb250cm9sbGVycyBncmFicyBhbGwgdGhlIGNvbnRyb2xsZXJzIGluIHRoZSBjb250cm9sbGVycyBmb2xkZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW21lcmdlXVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgcmVxdWlyZUNvbnRyb2xsZXJzKG1lcmdlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWlyZURpclN5bmMoJ2NvbnRyb2xsZXJzJywgbnVsbCwgbWVyZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlcXVpcmVRdWVyaWVzIGdyYWJzIGFsbCB0aGUgcXVlcmllcyBpbiB0aGUgcXVlcmllcyBmb2xkZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW21lcmdlXVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgcmVxdWlyZVF1ZXJpZXMobWVyZ2Upe1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1aXJlRGlyU3luYygncXVlcmllcycsIG51bGwsIG1lcmdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1aXJlTWlkZGxld2FyZSBncmFicyBhbGwgdGhlIG1pZGRsZXdhcmUgaW4gdGhlIG1pZGRsZXdhcmVzIGZvbGRlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbbWVyZ2VdXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICByZXF1aXJlTWlkZGxlV2FyZShtZXJnZSl7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVEaXJTeW5jKCdtaWRkbGV3YXJlJywgbnVsbCwgbWVyZ2UpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2FkZXI7Il19