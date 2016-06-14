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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _netPool = require('../net/Pool');

var _netPool2 = _interopRequireDefault(_netPool);

var _resourcePropertyResource = require('./resource/PropertyResource');

var _resourcePropertyResource2 = _interopRequireDefault(_resourcePropertyResource);

var _resourceRequireResource = require('./resource/RequireResource');

var _resourceRequireResource2 = _interopRequireDefault(_resourceRequireResource);

var _resourceStringResource = require('./resource/StringResource');

var _resourceStringResource2 = _interopRequireDefault(_resourceStringResource);

var _resourceSchemeResource = require('./resource/SchemeResource');

var _resourceSchemeResource2 = _interopRequireDefault(_resourceSchemeResource);

var keys = {
    MODULES: 'power.modules',
    MODULES_PREVENTED: 'power.modules.preventRouting',
    CONNECTIONS: 'power.connections',
    MIDDLEWARE: 'power.app.middleware',
    CONTROLLERS: 'power.app.controllers',
    SECRET: 'power.secret',
    PATH: 'power.routing.root',
    WEB_FRAMEWORK_SETTINGS: 'power.web.framework.settings',
    WEB_VIEWS_ENGINE: 'power.web.views.engine',
    WEB_VIEWS_PATHS: 'power.web.views.paths',
    FILTERS: 'power.filters',
    FILTERS_PARSER_JSON_ENABLED: 'power.filters.parser.json.enabled',
    FILTERS_PARSER_JSON_OPTIONS: 'power.filters.parser.json.options',
    FILTERS_PARSER_URLENCODED_ENABLED: 'power.filters.parser.urlencoded.enabled',
    FILTERS_PARSER_URLENCODED_OPTIONS: 'power.filters.parser.urlencoded.options',
    FILTERS_PARSER_TEXT_ENABLED: 'power.filters.parser.text.enabled',
    FILTERS_PARSER_TEXT_OPTIONS: 'power.filters.parser.text.options',
    FILTERS_PARSER_RAW_ENABLED: 'power.filters.parser.raw.enabled',
    FILTERS_PARSER_RAW_OPTIONS: 'power.filters.parser.raw.options',
    FILTERS_CSRF_ENABLED: 'power.filters.csrf.enabled',
    FILTERS_CSRF_OPTIONS: 'power.filters.csrf.options',
    FILTERS_LOG_ENABLED: 'power.filters.log.enabled',
    FILTERS_LOG_FORMAT: 'power.filters.log.format',
    FILTERS_LOG_OPTIONS: 'power.filters.log.options',
    FILTERS_ASSET_PATHS: 'power.filters.asset.paths',
    FILTERS_ASSET_PATHS_OPTIONS: 'power.filters.asset.options',
    FILTERS_ASSET_DIRECTORY: 'power.filters.asset.directory',
    FILTERS_ASSET_DIRECTORY_OPTIONS: 'power.filters.asset.options',
    FILTERS_SESSION_ENABLED: 'power.filters.session.enabled',
    FILTERS_SESSION_OPTIONS: 'power.filters.session.options',
    FILTERS_SESSION_STORE: 'power.filters.session.store'

};

var defaults = {
    SECRET: _crypto2['default'].randomBytes(32).toString('hex')
};

function exists(path) {

    try {
        return _fs2['default'].statSync(path).isFile();
    } catch (e) {
        return false;
    }
}

/**
 * Configuration provides an api for reading interesting values from a
 * modules configuration.
 * @param {string} dir
 * @param {string} path 
 * @property {object} keys
 * @property {string} path
 * TODO Document the properties of this class properly.
 */

var Configuration = (function () {
    function Configuration(dir, path) {
        _classCallCheck(this, Configuration);

        this.paths = {
            root: path,
            config: path + '/' + dir + '/config.js',
            routes: path + '/' + dir + '/routes.js',
            modules: path + '/modules',
            connectors: path + '/connectors',
            filters: path + '/filters',
            middleware: path + '/app/middleware',
            controllers: path + '/app/controllers',
            views: path + '/app/views',
            lib: path + '/lib',
            'public': path + '/public'
        };

        this.keys = keys;
        this.defaults = defaults;
        this.options = exists(this.paths.config) ? require(this.paths.config) : {};
        this.routes = exists(this.paths.routes) ? require(this.paths.routes) : {};
        this._resources = new _resourceSchemeResource2['default'](new _resourceStringResource2['default']());

        this._resources.add('require', new _resourceRequireResource2['default']());
        this._resources.add('lib', new _resourceRequireResource2['default'](this.paths.lib + '/'));
        this._resources.add('env', new _resourcePropertyResource2['default'](process.env));
        this._resources.add('pool', new _resourcePropertyResource2['default'](_netPool2['default']));
    }

    _createClass(Configuration, [{
        key: 'read',
        value: function read(key, defaults, merge) {

            var ret = this.options.hasOwnProperty(key) ? this.options[key] : defaults;

            if (typeof ret === 'string') return this._resources.find(ret);

            if (merge) return (0, _deepmerge2['default'])(merge, ret);

            return ret;
        }

        /**
         * require requires all files in a sub-directory into a single object
         * @param {string} dir The  path.
         * @param {object} merge An optional object functions can be merged into.
         * @param {string} [prefix] A prefix that will be concatenated to the object's keys
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

            merge = merge || {};

            prefix = prefix || '';
            prefix = prefix ? prefix + '.' : prefix;
            prefix = prefix[0] === '/' ? prefix.replace('/', '') : prefix;
            prefix = prefix.replace(/\//g, '.');

            try {
                files = _fs2['default'].readdirSync(dir);
            } catch (e) {
                return merge || {};
            }
            if (Array.isArray(files)) files.forEach(function (pathToFile) {

                if (extensions.indexOf(_path2['default'].extname(pathToFile)) < 0) return;

                _propertySeek2['default'].set(merge, prefix + _path2['default'].basename(pathToFile, _path2['default'].extname(pathToFile)), require(dir + '/' + pathToFile));
            });

            return merge;
        })
    }]);

    return Configuration;
})();

Configuration.keys = {
    MODULES: 'modules',
    CONNECTIONS: 'connections',
    MIDDLEWARE: 'middleware',
    FILTERS: 'filters',
    PATH: 'path'
};

exports['default'] = Configuration;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vQ29uZmlndXJhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7NEJBQXFCLGVBQWU7Ozs7eUJBQ2QsV0FBVzs7OztrQkFDbEIsSUFBSTs7OztvQkFDRixNQUFNOzs7O3NCQUNKLFFBQVE7Ozs7dUJBQ1YsYUFBYTs7Ozt3Q0FDRCw2QkFBNkI7Ozs7dUNBQzlCLDRCQUE0Qjs7OztzQ0FDN0IsMkJBQTJCOzs7O3NDQUMzQiwyQkFBMkI7Ozs7QUFFdEQsSUFBTSxJQUFJLEdBQUc7QUFDVCxXQUFPLEVBQUUsZUFBZTtBQUN4QixxQkFBaUIsRUFBRSw4QkFBOEI7QUFDakQsZUFBVyxFQUFFLG1CQUFtQjtBQUNoQyxjQUFVLEVBQUUsc0JBQXNCO0FBQ2xDLGVBQVcsRUFBRSx1QkFBdUI7QUFDcEMsVUFBTSxFQUFFLGNBQWM7QUFDdEIsUUFBSSxFQUFFLG9CQUFvQjtBQUMxQiwwQkFBc0IsRUFBRSw4QkFBOEI7QUFDdEQsb0JBQWdCLEVBQUUsd0JBQXdCO0FBQzFDLG1CQUFlLEVBQUUsdUJBQXVCO0FBQ3hDLFdBQU8sRUFBRSxlQUFlO0FBQ3hCLCtCQUEyQixFQUFFLG1DQUFtQztBQUNoRSwrQkFBMkIsRUFBRSxtQ0FBbUM7QUFDaEUscUNBQWlDLEVBQUUseUNBQXlDO0FBQzVFLHFDQUFpQyxFQUFFLHlDQUF5QztBQUM1RSwrQkFBMkIsRUFBRSxtQ0FBbUM7QUFDaEUsK0JBQTJCLEVBQUUsbUNBQW1DO0FBQ2hFLDhCQUEwQixFQUFFLGtDQUFrQztBQUM5RCw4QkFBMEIsRUFBRSxrQ0FBa0M7QUFDOUQsd0JBQW9CLEVBQUUsNEJBQTRCO0FBQ2xELHdCQUFvQixFQUFFLDRCQUE0QjtBQUNsRCx1QkFBbUIsRUFBRSwyQkFBMkI7QUFDaEQsc0JBQWtCLEVBQUUsMEJBQTBCO0FBQzlDLHVCQUFtQixFQUFFLDJCQUEyQjtBQUNoRCx1QkFBbUIsRUFBRSwyQkFBMkI7QUFDaEQsK0JBQTJCLEVBQUUsNkJBQTZCO0FB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LE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFFeEMsQ0FBQyxDQUFDOztBQUVQLG1CQUFPLEtBQUssQ0FBQztTQUNoQjs7O1dBaEZDLGFBQWE7OztBQW9GbkIsYUFBYSxDQUFDLElBQUksR0FBRztBQUNqQixXQUFPLEVBQUUsU0FBUztBQUNsQixlQUFXLEVBQUUsYUFBYTtBQUMxQixjQUFVLEVBQUUsWUFBWTtBQUN4QixXQUFPLEVBQUUsU0FBUztBQUNsQixRQUFJLEVBQUUsTUFBTTtDQUNmLENBQUM7O3FCQUVhLGFBQWEiLCJmaWxlIjoiQ29uZmlndXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wZXJ0eSBmcm9tICdwcm9wZXJ0eS1zZWVrJztcbmltcG9ydCBkZWVwbWVyZ2UgZnJvbSAnZGVlcG1lcmdlJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgUGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCBQb29sIGZyb20gJy4uL25ldC9Qb29sJztcbmltcG9ydCBQcm9wZXJ0eVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvUHJvcGVydHlSZXNvdXJjZSc7XG5pbXBvcnQgUmVxdWlyZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvUmVxdWlyZVJlc291cmNlJztcbmltcG9ydCBTdHJpbmdSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1N0cmluZ1Jlc291cmNlJztcbmltcG9ydCBTY2hlbWVSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1NjaGVtZVJlc291cmNlJztcblxuY29uc3Qga2V5cyA9IHtcbiAgICBNT0RVTEVTOiAncG93ZXIubW9kdWxlcycsXG4gICAgTU9EVUxFU19QUkVWRU5URUQ6ICdwb3dlci5tb2R1bGVzLnByZXZlbnRSb3V0aW5nJyxcbiAgICBDT05ORUNUSU9OUzogJ3Bvd2VyLmNvbm5lY3Rpb25zJyxcbiAgICBNSURETEVXQVJFOiAncG93ZXIuYXBwLm1pZGRsZXdhcmUnLFxuICAgIENPTlRST0xMRVJTOiAncG93ZXIuYXBwLmNvbnRyb2xsZXJzJyxcbiAgICBTRUNSRVQ6ICdwb3dlci5zZWNyZXQnLFxuICAgIFBBVEg6ICdwb3dlci5yb3V0aW5nLnJvb3QnLFxuICAgIFdFQl9GUkFNRVdPUktfU0VUVElOR1M6ICdwb3dlci53ZWIuZnJhbWV3b3JrLnNldHRpbmdzJyxcbiAgICBXRUJfVklFV1NfRU5HSU5FOiAncG93ZXIud2ViLnZpZXdzLmVuZ2luZScsXG4gICAgV0VCX1ZJRVdTX1BBVEhTOiAncG93ZXIud2ViLnZpZXdzLnBhdGhzJyxcbiAgICBGSUxURVJTOiAncG93ZXIuZmlsdGVycycsXG4gICAgRklMVEVSU19QQVJTRVJfSlNPTl9FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5wYXJzZXIuanNvbi5lbmFibGVkJyxcbiAgICBGSUxURVJTX1BBUlNFUl9KU09OX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLnBhcnNlci5qc29uLm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1VSTEVOQ09ERURfRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnVybGVuY29kZWQuZW5hYmxlZCcsXG4gICAgRklMVEVSU19QQVJTRVJfVVJMRU5DT0RFRF9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5wYXJzZXIudXJsZW5jb2RlZC5vcHRpb25zJyxcbiAgICBGSUxURVJTX1BBUlNFUl9URVhUX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLnBhcnNlci50ZXh0LmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1RFWFRfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnRleHQub3B0aW9ucycsXG4gICAgRklMVEVSU19QQVJTRVJfUkFXX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLnBhcnNlci5yYXcuZW5hYmxlZCcsXG4gICAgRklMVEVSU19QQVJTRVJfUkFXX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLnBhcnNlci5yYXcub3B0aW9ucycsXG4gICAgRklMVEVSU19DU1JGX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLmNzcmYuZW5hYmxlZCcsXG4gICAgRklMVEVSU19DU1JGX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLmNzcmYub3B0aW9ucycsXG4gICAgRklMVEVSU19MT0dfRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMubG9nLmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfTE9HX0ZPUk1BVDogJ3Bvd2VyLmZpbHRlcnMubG9nLmZvcm1hdCcsXG4gICAgRklMVEVSU19MT0dfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMubG9nLm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfQVNTRVRfUEFUSFM6ICdwb3dlci5maWx0ZXJzLmFzc2V0LnBhdGhzJyxcbiAgICBGSUxURVJTX0FTU0VUX1BBVEhTX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLmFzc2V0Lm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfQVNTRVRfRElSRUNUT1JZOiAncG93ZXIuZmlsdGVycy5hc3NldC5kaXJlY3RvcnknLFxuICAgIEZJTFRFUlNfQVNTRVRfRElSRUNUT1JZX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLmFzc2V0Lm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfU0VTU0lPTl9FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5zZXNzaW9uLmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfU0VTU0lPTl9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5zZXNzaW9uLm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfU0VTU0lPTl9TVE9SRTogJ3Bvd2VyLmZpbHRlcnMuc2Vzc2lvbi5zdG9yZSdcblxuXG5cbn07XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICAgIFNFQ1JFVDogY3J5cHRvLnJhbmRvbUJ5dGVzKDMyKS50b1N0cmluZygnaGV4Jylcbn07XG5cbmZ1bmN0aW9uIGV4aXN0cyhwYXRoKSB7XG5cbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZnMuc3RhdFN5bmMocGF0aCkuaXNGaWxlKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG59XG5cblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIHByb3ZpZGVzIGFuIGFwaSBmb3IgcmVhZGluZyBpbnRlcmVzdGluZyB2YWx1ZXMgZnJvbSBhXG4gKiBtb2R1bGVzIGNvbmZpZ3VyYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gZGlyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBrZXlzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGF0aFxuICogVE9ETyBEb2N1bWVudCB0aGUgcHJvcGVydGllcyBvZiB0aGlzIGNsYXNzIHByb3Blcmx5LlxuICovXG5jbGFzcyBDb25maWd1cmF0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKGRpciwgcGF0aCkge1xuXG4gICAgICAgIHRoaXMucGF0aHMgPSB7XG4gICAgICAgICAgICByb290OiBwYXRoLFxuICAgICAgICAgICAgY29uZmlnOiBgJHtwYXRofS8ke2Rpcn0vY29uZmlnLmpzYCxcbiAgICAgICAgICAgIHJvdXRlczogYCR7cGF0aH0vJHtkaXJ9L3JvdXRlcy5qc2AsXG4gICAgICAgICAgICBtb2R1bGVzOiBgJHtwYXRofS9tb2R1bGVzYCxcbiAgICAgICAgICAgIGNvbm5lY3RvcnM6IGAke3BhdGh9L2Nvbm5lY3RvcnNgLFxuICAgICAgICAgICAgZmlsdGVyczogYCR7cGF0aH0vZmlsdGVyc2AsXG4gICAgICAgICAgICBtaWRkbGV3YXJlOiBgJHtwYXRofS9hcHAvbWlkZGxld2FyZWAsXG4gICAgICAgICAgICBjb250cm9sbGVyczogYCR7cGF0aH0vYXBwL2NvbnRyb2xsZXJzYCxcbiAgICAgICAgICAgIHZpZXdzOiBgJHtwYXRofS9hcHAvdmlld3NgLFxuICAgICAgICAgICAgbGliOiBgJHtwYXRofS9saWJgLFxuICAgICAgICAgICAgcHVibGljOiBgJHtwYXRofS9wdWJsaWNgXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5rZXlzID0ga2V5cztcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSAoZXhpc3RzKHRoaXMucGF0aHMuY29uZmlnKSkgPyByZXF1aXJlKHRoaXMucGF0aHMuY29uZmlnKSA6IHt9O1xuICAgICAgICB0aGlzLnJvdXRlcyA9IChleGlzdHModGhpcy5wYXRocy5yb3V0ZXMpKSA/IHJlcXVpcmUodGhpcy5wYXRocy5yb3V0ZXMpIDoge307XG4gICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgU3RyaW5nUmVzb3VyY2UoKSk7XG5cbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmFkZCgncmVxdWlyZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5hZGQoJ2xpYicsIG5ldyBSZXF1aXJlUmVzb3VyY2UoYCR7dGhpcy5wYXRocy5saWJ9L2ApKTtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmFkZCgnZW52JywgbmV3IFByb3BlcnR5UmVzb3VyY2UocHJvY2Vzcy5lbnYpKTtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmFkZCgncG9vbCcsIG5ldyBQcm9wZXJ0eVJlc291cmNlKFBvb2wpKTtcblxuICAgIH1cblxuICAgIHJlYWQoa2V5LCBkZWZhdWx0cywgbWVyZ2UpIHtcblxuICAgICAgICB2YXIgcmV0ID0gKHRoaXMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSA/IHRoaXMub3B0aW9uc1trZXldIDogZGVmYXVsdHM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXQgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc291cmNlcy5maW5kKHJldCk7XG5cbiAgICAgICAgaWYgKG1lcmdlKVxuICAgICAgICAgICAgcmV0dXJuIGRlZXBtZXJnZShtZXJnZSwgcmV0KTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVxdWlyZSByZXF1aXJlcyBhbGwgZmlsZXMgaW4gYSBzdWItZGlyZWN0b3J5IGludG8gYSBzaW5nbGUgb2JqZWN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpciBUaGUgIHBhdGguXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1lcmdlIEFuIG9wdGlvbmFsIG9iamVjdCBmdW5jdGlvbnMgY2FuIGJlIG1lcmdlZCBpbnRvLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcHJlZml4XSBBIHByZWZpeCB0aGF0IHdpbGwgYmUgY29uY2F0ZW5hdGVkIHRvIHRoZSBvYmplY3QncyBrZXlzXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICByZXF1aXJlKGRpciwgbWVyZ2UsIHByZWZpeCkge1xuXG4gICAgICAgIHZhciBmaWxlcztcbiAgICAgICAgdmFyIGV4dGVuc2lvbnMgPSBleHRlbnNpb25zIHx8IFsnLmpzJywgJy5qc29uJ107XG5cbiAgICAgICAgbWVyZ2UgPSBtZXJnZSB8fCB7fTtcblxuICAgICAgICBwcmVmaXggPSBwcmVmaXggfHwgJyc7XG4gICAgICAgIHByZWZpeCA9IChwcmVmaXgpID8gcHJlZml4ICsgJy4nIDogcHJlZml4O1xuICAgICAgICBwcmVmaXggPSAocHJlZml4WzBdID09PSAnLycpID8gcHJlZml4LnJlcGxhY2UoJy8nLCAnJykgOiBwcmVmaXg7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC5yZXBsYWNlKC9cXC8vZywgJy4nKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhkaXIpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2UgfHwge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsZXMpKVxuICAgICAgICAgICAgZmlsZXMuZm9yRWFjaCgocGF0aFRvRmlsZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnMuaW5kZXhPZihQYXRoLmV4dG5hbWUocGF0aFRvRmlsZSkpIDwgMCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgUHJvcGVydHkuc2V0KG1lcmdlLCBwcmVmaXggKyBQYXRoLmJhc2VuYW1lKHBhdGhUb0ZpbGUsIFBhdGguZXh0bmFtZShwYXRoVG9GaWxlKSksXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoZGlyICsgJy8nICsgcGF0aFRvRmlsZSkpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbWVyZ2U7XG4gICAgfVxuXG59XG5cbkNvbmZpZ3VyYXRpb24ua2V5cyA9IHtcbiAgICBNT0RVTEVTOiAnbW9kdWxlcycsXG4gICAgQ09OTkVDVElPTlM6ICdjb25uZWN0aW9ucycsXG4gICAgTUlERExFV0FSRTogJ21pZGRsZXdhcmUnLFxuICAgIEZJTFRFUlM6ICdmaWx0ZXJzJyxcbiAgICBQQVRIOiAncGF0aCdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRpb25cbiJdfQ==