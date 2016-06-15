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
    PORT: 'power.port',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vQ29uZmlndXJhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7NEJBQXFCLGVBQWU7Ozs7eUJBQ2QsV0FBVzs7OztrQkFDbEIsSUFBSTs7OztvQkFDRixNQUFNOzs7O3NCQUNKLFFBQVE7Ozs7dUJBQ1YsYUFBYTs7Ozt3Q0FDRCw2QkFBNkI7Ozs7dUNBQzlCLDRCQUE0Qjs7OztzQ0FDN0IsMkJBQTJCOzs7O3NDQUMzQiwyQkFBMkI7Ozs7QUFFdEQsSUFBTSxJQUFJLEdBQUc7QUFDVCxXQUFPLEVBQUUsZUFBZTtBQUN4QixxQkFBaUIsRUFBRSw4QkFBOEI7QUFDakQsZUFBVyxFQUFFLG1CQUFtQjtBQUNoQyxjQUFVLEVBQUUsc0JBQXNCO0FBQ2xDLGVBQVcsRUFBRSx1QkFBdUI7QUFDcEMsVUFBTSxFQUFFLGNBQWM7QUFDdEIsUUFBSSxFQUFFLFlBQVk7QUFDbEIsUUFBSSxFQUFFLG9CQUFvQjtBQUMxQiwwQkFBc0IsRUFBRSw4QkFBOEI7QUFDdEQsb0JBQWdCLEVBQUUsd0JBQXdCO0FBQzFDLG1CQUFlLEVBQUUsdUJBQXVCO0FBQ3hDLFdBQU8sRUFBRSxlQUFlO0FBQ3hCLCtCQUEyQixFQUFFLG1DQUFtQztBQUNoRSwrQkFBMkIsRUFBRSxtQ0FBbUM7QUFDaEUscUNBQWlDLEVBQUUseUNBQXlDO0FBQzVFLHFDQUFpQyxFQUFFLHlDQUF5QztBQUM1RSwrQkFBMkIsRUFBRSxtQ0FBbUM7QUFDaEUsK0JBQTJCLEVBQUUsbUNBQW1DO0FBQ2hFLDhCQUEwQixFQUFFLGtDQUFrQztBQUM5RCw4QkFBMEIsRUFBRSxrQ0FBa0M7QUFDOUQsd0JBQW9CLEVBQUUsNEJBQTRCO0FBQ2xELHdCQUFvQixFQUFFLDRCQUE0QjtBQUNsRCx1QkFBbUIsRUFBRSwyQkFBMkI7QUFDaEQsc0JBQWtCLEVBQUUsMEJBQTBCO0FBQzlDLHVCQUFtQixFQUFFLDJCQUEyQjtBQUNoRCx1QkFBbUIsRUFBRSwyQkFBMkI7QUFDaEQs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LFVBQVUsQ0FBQyxDQUFDLEVBQzVFLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFFeEMsQ0FBQyxDQUFDOztBQUVQLG1CQUFPLEtBQUssQ0FBQztTQUNoQjs7O1dBaEZDLGFBQWE7OztBQW9GbkIsYUFBYSxDQUFDLElBQUksR0FBRztBQUNqQixXQUFPLEVBQUUsU0FBUztBQUNsQixlQUFXLEVBQUUsYUFBYTtBQUMxQixjQUFVLEVBQUUsWUFBWTtBQUN4QixXQUFPLEVBQUUsU0FBUztBQUNsQixRQUFJLEVBQUUsTUFBTTtDQUNmLENBQUM7O3FCQUVhLGFBQWEiLCJmaWxlIjoiQ29uZmlndXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wZXJ0eSBmcm9tICdwcm9wZXJ0eS1zZWVrJztcbmltcG9ydCBkZWVwbWVyZ2UgZnJvbSAnZGVlcG1lcmdlJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgUGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCBQb29sIGZyb20gJy4uL25ldC9Qb29sJztcbmltcG9ydCBQcm9wZXJ0eVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvUHJvcGVydHlSZXNvdXJjZSc7XG5pbXBvcnQgUmVxdWlyZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvUmVxdWlyZVJlc291cmNlJztcbmltcG9ydCBTdHJpbmdSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1N0cmluZ1Jlc291cmNlJztcbmltcG9ydCBTY2hlbWVSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1NjaGVtZVJlc291cmNlJztcblxuY29uc3Qga2V5cyA9IHtcbiAgICBNT0RVTEVTOiAncG93ZXIubW9kdWxlcycsXG4gICAgTU9EVUxFU19QUkVWRU5URUQ6ICdwb3dlci5tb2R1bGVzLnByZXZlbnRSb3V0aW5nJyxcbiAgICBDT05ORUNUSU9OUzogJ3Bvd2VyLmNvbm5lY3Rpb25zJyxcbiAgICBNSURETEVXQVJFOiAncG93ZXIuYXBwLm1pZGRsZXdhcmUnLFxuICAgIENPTlRST0xMRVJTOiAncG93ZXIuYXBwLmNvbnRyb2xsZXJzJyxcbiAgICBTRUNSRVQ6ICdwb3dlci5zZWNyZXQnLFxuICAgIFBPUlQ6ICdwb3dlci5wb3J0JyxcbiAgICBQQVRIOiAncG93ZXIucm91dGluZy5yb290JyxcbiAgICBXRUJfRlJBTUVXT1JLX1NFVFRJTkdTOiAncG93ZXIud2ViLmZyYW1ld29yay5zZXR0aW5ncycsXG4gICAgV0VCX1ZJRVdTX0VOR0lORTogJ3Bvd2VyLndlYi52aWV3cy5lbmdpbmUnLFxuICAgIFdFQl9WSUVXU19QQVRIUzogJ3Bvd2VyLndlYi52aWV3cy5wYXRocycsXG4gICAgRklMVEVSUzogJ3Bvd2VyLmZpbHRlcnMnLFxuICAgIEZJTFRFUlNfUEFSU0VSX0pTT05fRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLmpzb24uZW5hYmxlZCcsXG4gICAgRklMVEVSU19QQVJTRVJfSlNPTl9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5wYXJzZXIuanNvbi5vcHRpb25zJyxcbiAgICBGSUxURVJTX1BBUlNFUl9VUkxFTkNPREVEX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLnBhcnNlci51cmxlbmNvZGVkLmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1VSTEVOQ09ERURfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnVybGVuY29kZWQub3B0aW9ucycsXG4gICAgRklMVEVSU19QQVJTRVJfVEVYVF9FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5wYXJzZXIudGV4dC5lbmFibGVkJyxcbiAgICBGSUxURVJTX1BBUlNFUl9URVhUX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLnBhcnNlci50ZXh0Lm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1JBV19FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5wYXJzZXIucmF3LmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1JBV19PUFRJT05TOiAncG93ZXIuZmlsdGVycy5wYXJzZXIucmF3Lm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfQ1NSRl9FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5jc3JmLmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfQ1NSRl9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5jc3JmLm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfTE9HX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLmxvZy5lbmFibGVkJyxcbiAgICBGSUxURVJTX0xPR19GT1JNQVQ6ICdwb3dlci5maWx0ZXJzLmxvZy5mb3JtYXQnLFxuICAgIEZJTFRFUlNfTE9HX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLmxvZy5vcHRpb25zJyxcbiAgICBGSUxURVJTX0FTU0VUX1BBVEhTOiAncG93ZXIuZmlsdGVycy5hc3NldC5wYXRocycsXG4gICAgRklMVEVSU19BU1NFVF9QQVRIU19PUFRJT05TOiAncG93ZXIuZmlsdGVycy5hc3NldC5vcHRpb25zJyxcbiAgICBGSUxURVJTX0FTU0VUX0RJUkVDVE9SWTogJ3Bvd2VyLmZpbHRlcnMuYXNzZXQuZGlyZWN0b3J5JyxcbiAgICBGSUxURVJTX0FTU0VUX0RJUkVDVE9SWV9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5hc3NldC5vcHRpb25zJyxcbiAgICBGSUxURVJTX1NFU1NJT05fRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMuc2Vzc2lvbi5lbmFibGVkJyxcbiAgICBGSUxURVJTX1NFU1NJT05fT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMuc2Vzc2lvbi5vcHRpb25zJyxcbiAgICBGSUxURVJTX1NFU1NJT05fU1RPUkU6ICdwb3dlci5maWx0ZXJzLnNlc3Npb24uc3RvcmUnXG5cblxuXG59O1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgICBTRUNSRVQ6IGNyeXB0by5yYW5kb21CeXRlcygzMikudG9TdHJpbmcoJ2hleCcpXG59O1xuXG5mdW5jdGlvbiBleGlzdHMocGF0aCkge1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxufVxuXG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBwcm92aWRlcyBhbiBhcGkgZm9yIHJlYWRpbmcgaW50ZXJlc3RpbmcgdmFsdWVzIGZyb20gYVxuICogbW9kdWxlcyBjb25maWd1cmF0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IGRpclxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggXG4gKiBAcHJvcGVydHkge29iamVjdH0ga2V5c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhdGhcbiAqIFRPRE8gRG9jdW1lbnQgdGhlIHByb3BlcnRpZXMgb2YgdGhpcyBjbGFzcyBwcm9wZXJseS5cbiAqL1xuY2xhc3MgQ29uZmlndXJhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihkaXIsIHBhdGgpIHtcblxuICAgICAgICB0aGlzLnBhdGhzID0ge1xuICAgICAgICAgICAgcm9vdDogcGF0aCxcbiAgICAgICAgICAgIGNvbmZpZzogYCR7cGF0aH0vJHtkaXJ9L2NvbmZpZy5qc2AsXG4gICAgICAgICAgICByb3V0ZXM6IGAke3BhdGh9LyR7ZGlyfS9yb3V0ZXMuanNgLFxuICAgICAgICAgICAgbW9kdWxlczogYCR7cGF0aH0vbW9kdWxlc2AsXG4gICAgICAgICAgICBjb25uZWN0b3JzOiBgJHtwYXRofS9jb25uZWN0b3JzYCxcbiAgICAgICAgICAgIGZpbHRlcnM6IGAke3BhdGh9L2ZpbHRlcnNgLFxuICAgICAgICAgICAgbWlkZGxld2FyZTogYCR7cGF0aH0vYXBwL21pZGRsZXdhcmVgLFxuICAgICAgICAgICAgY29udHJvbGxlcnM6IGAke3BhdGh9L2FwcC9jb250cm9sbGVyc2AsXG4gICAgICAgICAgICB2aWV3czogYCR7cGF0aH0vYXBwL3ZpZXdzYCxcbiAgICAgICAgICAgIGxpYjogYCR7cGF0aH0vbGliYCxcbiAgICAgICAgICAgIHB1YmxpYzogYCR7cGF0aH0vcHVibGljYFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMua2V5cyA9IGtleXM7XG4gICAgICAgIHRoaXMuZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICAgICAgdGhpcy5vcHRpb25zID0gKGV4aXN0cyh0aGlzLnBhdGhzLmNvbmZpZykpID8gcmVxdWlyZSh0aGlzLnBhdGhzLmNvbmZpZykgOiB7fTtcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSAoZXhpc3RzKHRoaXMucGF0aHMucm91dGVzKSkgPyByZXF1aXJlKHRoaXMucGF0aHMucm91dGVzKSA6IHt9O1xuICAgICAgICB0aGlzLl9yZXNvdXJjZXMgPSBuZXcgU2NoZW1lUmVzb3VyY2UobmV3IFN0cmluZ1Jlc291cmNlKCkpO1xuXG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5hZGQoJ3JlcXVpcmUnLCBuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuICAgICAgICB0aGlzLl9yZXNvdXJjZXMuYWRkKCdsaWInLCBuZXcgUmVxdWlyZVJlc291cmNlKGAke3RoaXMucGF0aHMubGlifS9gKSk7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5hZGQoJ2VudicsIG5ldyBQcm9wZXJ0eVJlc291cmNlKHByb2Nlc3MuZW52KSk7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5hZGQoJ3Bvb2wnLCBuZXcgUHJvcGVydHlSZXNvdXJjZShQb29sKSk7XG5cbiAgICB9XG5cbiAgICByZWFkKGtleSwgZGVmYXVsdHMsIG1lcmdlKSB7XG5cbiAgICAgICAgdmFyIHJldCA9ICh0aGlzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkgPyB0aGlzLm9wdGlvbnNba2V5XSA6IGRlZmF1bHRzO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmV0ID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXNvdXJjZXMuZmluZChyZXQpO1xuXG4gICAgICAgIGlmIChtZXJnZSlcbiAgICAgICAgICAgIHJldHVybiBkZWVwbWVyZ2UobWVyZ2UsIHJldCk7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlcXVpcmUgcmVxdWlyZXMgYWxsIGZpbGVzIGluIGEgc3ViLWRpcmVjdG9yeSBpbnRvIGEgc2luZ2xlIG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXIgVGhlICBwYXRoLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXJnZSBBbiBvcHRpb25hbCBvYmplY3QgZnVuY3Rpb25zIGNhbiBiZSBtZXJnZWQgaW50by5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3ByZWZpeF0gQSBwcmVmaXggdGhhdCB3aWxsIGJlIGNvbmNhdGVuYXRlZCB0byB0aGUgb2JqZWN0J3Mga2V5c1xuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgcmVxdWlyZShkaXIsIG1lcmdlLCBwcmVmaXgpIHtcblxuICAgICAgICB2YXIgZmlsZXM7XG4gICAgICAgIHZhciBleHRlbnNpb25zID0gZXh0ZW5zaW9ucyB8fCBbJy5qcycsICcuanNvbiddO1xuXG4gICAgICAgIG1lcmdlID0gbWVyZ2UgfHwge307XG5cbiAgICAgICAgcHJlZml4ID0gcHJlZml4IHx8ICcnO1xuICAgICAgICBwcmVmaXggPSAocHJlZml4KSA/IHByZWZpeCArICcuJyA6IHByZWZpeDtcbiAgICAgICAgcHJlZml4ID0gKHByZWZpeFswXSA9PT0gJy8nKSA/IHByZWZpeC5yZXBsYWNlKCcvJywgJycpIDogcHJlZml4O1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgucmVwbGFjZSgvXFwvL2csICcuJyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZpbGVzID0gZnMucmVhZGRpclN5bmMoZGlyKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlIHx8IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZpbGVzKSlcbiAgICAgICAgICAgIGZpbGVzLmZvckVhY2goKHBhdGhUb0ZpbGUpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChleHRlbnNpb25zLmluZGV4T2YoUGF0aC5leHRuYW1lKHBhdGhUb0ZpbGUpKSA8IDApIHJldHVybjtcblxuICAgICAgICAgICAgICAgIFByb3BlcnR5LnNldChtZXJnZSwgcHJlZml4ICsgUGF0aC5iYXNlbmFtZShwYXRoVG9GaWxlLCBQYXRoLmV4dG5hbWUocGF0aFRvRmlsZSkpLFxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlKGRpciArICcvJyArIHBhdGhUb0ZpbGUpKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG1lcmdlO1xuICAgIH1cblxufVxuXG5Db25maWd1cmF0aW9uLmtleXMgPSB7XG4gICAgTU9EVUxFUzogJ21vZHVsZXMnLFxuICAgIENPTk5FQ1RJT05TOiAnY29ubmVjdGlvbnMnLFxuICAgIE1JRERMRVdBUkU6ICdtaWRkbGV3YXJlJyxcbiAgICBGSUxURVJTOiAnZmlsdGVycycsXG4gICAgUEFUSDogJ3BhdGgnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb25maWd1cmF0aW9uXG4iXX0=