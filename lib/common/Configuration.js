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
    MODELS: 'power.app.models',
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
    FILTERS_ASSET_CHECK_PATHS: 'power.filters.asset.check.paths',
    FILTERS_ASSET_DIRECTORY: 'power.filters.asset.directory',
    FILTERS_ASSET_DIRECTORY_OPTIONS: 'power.filters.asset.options',
    FILTERS_SESSION_ENABLED: 'power.filters.session.enabled',
    FILTERS_SESSION_OPTIONS: 'power.filters.session.options',
    FILTERS_SESSION_STORE: 'power.filters.session.store',
    FILTERS_COOKIES_OPTIONS: 'power.filters.cookies.options'

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
            models: path + '/app/models',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vQ29uZmlndXJhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7NEJBQXFCLGVBQWU7Ozs7eUJBQ2QsV0FBVzs7OztrQkFDbEIsSUFBSTs7OztvQkFDRixNQUFNOzs7O3NCQUNKLFFBQVE7Ozs7dUJBQ1YsYUFBYTs7Ozt3Q0FDRCw2QkFBNkI7Ozs7dUNBQzlCLDRCQUE0Qjs7OztzQ0FDN0IsMkJBQTJCOzs7O3NDQUMzQiwyQkFBMkI7Ozs7QUFFdEQsSUFBTSxJQUFJLEdBQUc7QUFDVCxXQUFPLEVBQUUsZUFBZTtBQUN4QixxQkFBaUIsRUFBRSw4QkFBOEI7QUFDakQsZUFBVyxFQUFFLG1CQUFtQjtBQUNoQyxjQUFVLEVBQUUsc0JBQXNCO0FBQ2xDLGVBQVcsRUFBRSx1QkFBdUI7QUFDcEMsVUFBTSxFQUFDLGtCQUFrQjtBQUN6QixVQUFNLEVBQUUsY0FBYztBQUN0QixRQUFJLEVBQUUsWUFBWTtBQUNsQixRQUFJLEVBQUUsb0JBQW9CO0FBQzFCLDBCQUFzQixFQUFFLDhCQUE4QjtBQUN0RCxvQkFBZ0IsRUFBRSx3QkFBd0I7QUFDMUMsbUJBQWUsRUFBRSx1QkFBdUI7QUFDeEMsV0FBTyxFQUFFLGVBQWU7QUFDeEIsK0JBQTJCLEVBQUUsbUNBQW1DO0FBQ2hFLCtCQUEyQixFQUFFLG1DQUFtQztBQUNoRSxxQ0FBaUMsRUFBRSx5Q0FBeUM7QUFDNUUscUNBQWlDLEVBQUUseUNBQXlDO0FBQzVFLCtCQUEyQixFQUFFLG1DQUFtQztBQUNoRSwrQkFBMkIsRUFBRSxtQ0FBbUM7QUFDaEUsOEJBQTBCLEVBQUUsa0NBQWtDO0FBQzlELDhCQUEwQixFQUFFLGtDQUFrQztBQUM5RCx3QkFBb0IsRUFBRSw0QkFBNEI7QUFDbEQsd0JBQW9CLEVBQUUsNEJBQTRCO0FBQ2xELHVCQUFtQixFQUFFLDJCQUEyQjtBQUNoRCxzQkFBa0IsRUFBRSwwQkFBMEI7QUFDOUMsdUJBQW1CLEVBQUUsMkJBQTJCO0FBQ2hELHVC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RyxDQUFDLEVBQUUsT0FBTzs7QUFFN0QsMENBQVMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEdBQUcsa0JBQUssUUFBUSxDQUFDLFVBQVUsRUFBRSxrQkFBSyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFDNUUsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUV4QyxDQUFDLENBQUM7O0FBRVAsbUJBQU8sS0FBSyxDQUFDO1NBQ2hCOzs7V0FqRkMsYUFBYTs7O0FBcUZuQixhQUFhLENBQUMsSUFBSSxHQUFHO0FBQ2pCLFdBQU8sRUFBRSxTQUFTO0FBQ2xCLGVBQVcsRUFBRSxhQUFhO0FBQzFCLGNBQVUsRUFBRSxZQUFZO0FBQ3hCLFdBQU8sRUFBRSxTQUFTO0FBQ2xCLFFBQUksRUFBRSxNQUFNO0NBQ2YsQ0FBQzs7cUJBRWEsYUFBYSIsImZpbGUiOiJDb25maWd1cmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BlcnR5IGZyb20gJ3Byb3BlcnR5LXNlZWsnO1xuaW1wb3J0IGRlZXBtZXJnZSBmcm9tICdkZWVwbWVyZ2UnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBQYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IFBvb2wgZnJvbSAnLi4vbmV0L1Bvb2wnO1xuaW1wb3J0IFByb3BlcnR5UmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9Qcm9wZXJ0eVJlc291cmNlJztcbmltcG9ydCBSZXF1aXJlUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9SZXF1aXJlUmVzb3VyY2UnO1xuaW1wb3J0IFN0cmluZ1Jlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvU3RyaW5nUmVzb3VyY2UnO1xuaW1wb3J0IFNjaGVtZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvU2NoZW1lUmVzb3VyY2UnO1xuXG5jb25zdCBrZXlzID0ge1xuICAgIE1PRFVMRVM6ICdwb3dlci5tb2R1bGVzJyxcbiAgICBNT0RVTEVTX1BSRVZFTlRFRDogJ3Bvd2VyLm1vZHVsZXMucHJldmVudFJvdXRpbmcnLFxuICAgIENPTk5FQ1RJT05TOiAncG93ZXIuY29ubmVjdGlvbnMnLFxuICAgIE1JRERMRVdBUkU6ICdwb3dlci5hcHAubWlkZGxld2FyZScsXG4gICAgQ09OVFJPTExFUlM6ICdwb3dlci5hcHAuY29udHJvbGxlcnMnLFxuICAgIE1PREVMUzoncG93ZXIuYXBwLm1vZGVscycsXG4gICAgU0VDUkVUOiAncG93ZXIuc2VjcmV0JyxcbiAgICBQT1JUOiAncG93ZXIucG9ydCcsXG4gICAgUEFUSDogJ3Bvd2VyLnJvdXRpbmcucm9vdCcsXG4gICAgV0VCX0ZSQU1FV09SS19TRVRUSU5HUzogJ3Bvd2VyLndlYi5mcmFtZXdvcmsuc2V0dGluZ3MnLFxuICAgIFdFQl9WSUVXU19FTkdJTkU6ICdwb3dlci53ZWIudmlld3MuZW5naW5lJyxcbiAgICBXRUJfVklFV1NfUEFUSFM6ICdwb3dlci53ZWIudmlld3MucGF0aHMnLFxuICAgIEZJTFRFUlM6ICdwb3dlci5maWx0ZXJzJyxcbiAgICBGSUxURVJTX1BBUlNFUl9KU09OX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLnBhcnNlci5qc29uLmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfUEFSU0VSX0pTT05fT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLmpzb24ub3B0aW9ucycsXG4gICAgRklMVEVSU19QQVJTRVJfVVJMRU5DT0RFRF9FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5wYXJzZXIudXJsZW5jb2RlZC5lbmFibGVkJyxcbiAgICBGSUxURVJTX1BBUlNFUl9VUkxFTkNPREVEX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLnBhcnNlci51cmxlbmNvZGVkLm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1RFWFRfRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnRleHQuZW5hYmxlZCcsXG4gICAgRklMVEVSU19QQVJTRVJfVEVYVF9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5wYXJzZXIudGV4dC5vcHRpb25zJyxcbiAgICBGSUxURVJTX1BBUlNFUl9SQVdfRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnJhdy5lbmFibGVkJyxcbiAgICBGSUxURVJTX1BBUlNFUl9SQVdfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnJhdy5vcHRpb25zJyxcbiAgICBGSUxURVJTX0NTUkZfRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMuY3NyZi5lbmFibGVkJyxcbiAgICBGSUxURVJTX0NTUkZfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMuY3NyZi5vcHRpb25zJyxcbiAgICBGSUxURVJTX0xPR19FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5sb2cuZW5hYmxlZCcsXG4gICAgRklMVEVSU19MT0dfRk9STUFUOiAncG93ZXIuZmlsdGVycy5sb2cuZm9ybWF0JyxcbiAgICBGSUxURVJTX0xPR19PUFRJT05TOiAncG93ZXIuZmlsdGVycy5sb2cub3B0aW9ucycsXG4gICAgRklMVEVSU19BU1NFVF9QQVRIUzogJ3Bvd2VyLmZpbHRlcnMuYXNzZXQucGF0aHMnLFxuICAgIEZJTFRFUlNfQVNTRVRfUEFUSFNfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMuYXNzZXQub3B0aW9ucycsXG4gICAgRklMVEVSU19BU1NFVF9DSEVDS19QQVRIUzogJ3Bvd2VyLmZpbHRlcnMuYXNzZXQuY2hlY2sucGF0aHMnLFxuICAgIEZJTFRFUlNfQVNTRVRfRElSRUNUT1JZOiAncG93ZXIuZmlsdGVycy5hc3NldC5kaXJlY3RvcnknLFxuICAgIEZJTFRFUlNfQVNTRVRfRElSRUNUT1JZX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLmFzc2V0Lm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfU0VTU0lPTl9FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5zZXNzaW9uLmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfU0VTU0lPTl9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5zZXNzaW9uLm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfU0VTU0lPTl9TVE9SRTogJ3Bvd2VyLmZpbHRlcnMuc2Vzc2lvbi5zdG9yZScsXG4gICAgRklMVEVSU19DT09LSUVTX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLmNvb2tpZXMub3B0aW9ucydcblxufTtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgU0VDUkVUOiBjcnlwdG8ucmFuZG9tQnl0ZXMoMzIpLnRvU3RyaW5nKCdoZXgnKVxufTtcblxuZnVuY3Rpb24gZXhpc3RzKHBhdGgpIHtcblxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmcy5zdGF0U3luYyhwYXRoKS5pc0ZpbGUoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cbn1cblxuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gcHJvdmlkZXMgYW4gYXBpIGZvciByZWFkaW5nIGludGVyZXN0aW5nIHZhbHVlcyBmcm9tIGFcbiAqIG1vZHVsZXMgY29uZmlndXJhdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFxuICogQHByb3BlcnR5IHtvYmplY3R9IGtleXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwYXRoXG4gKiBUT0RPIERvY3VtZW50IHRoZSBwcm9wZXJ0aWVzIG9mIHRoaXMgY2xhc3MgcHJvcGVybHkuXG4gKi9cbmNsYXNzIENvbmZpZ3VyYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IoZGlyLCBwYXRoKSB7XG5cbiAgICAgICAgdGhpcy5wYXRocyA9IHtcbiAgICAgICAgICAgIHJvb3Q6IHBhdGgsXG4gICAgICAgICAgICBjb25maWc6IGAke3BhdGh9LyR7ZGlyfS9jb25maWcuanNgLFxuICAgICAgICAgICAgcm91dGVzOiBgJHtwYXRofS8ke2Rpcn0vcm91dGVzLmpzYCxcbiAgICAgICAgICAgIG1vZHVsZXM6IGAke3BhdGh9L21vZHVsZXNgLFxuICAgICAgICAgICAgY29ubmVjdG9yczogYCR7cGF0aH0vY29ubmVjdG9yc2AsXG4gICAgICAgICAgICBmaWx0ZXJzOiBgJHtwYXRofS9maWx0ZXJzYCxcbiAgICAgICAgICAgIG1pZGRsZXdhcmU6IGAke3BhdGh9L2FwcC9taWRkbGV3YXJlYCxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJzOiBgJHtwYXRofS9hcHAvY29udHJvbGxlcnNgLFxuICAgICAgICAgICAgbW9kZWxzOiBgJHtwYXRofS9hcHAvbW9kZWxzYCxcbiAgICAgICAgICAgIHZpZXdzOiBgJHtwYXRofS9hcHAvdmlld3NgLFxuICAgICAgICAgICAgbGliOiBgJHtwYXRofS9saWJgLFxuICAgICAgICAgICAgcHVibGljOiBgJHtwYXRofS9wdWJsaWNgXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5rZXlzID0ga2V5cztcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSAoZXhpc3RzKHRoaXMucGF0aHMuY29uZmlnKSkgPyByZXF1aXJlKHRoaXMucGF0aHMuY29uZmlnKSA6IHt9O1xuICAgICAgICB0aGlzLnJvdXRlcyA9IChleGlzdHModGhpcy5wYXRocy5yb3V0ZXMpKSA/IHJlcXVpcmUodGhpcy5wYXRocy5yb3V0ZXMpIDoge307XG4gICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgU3RyaW5nUmVzb3VyY2UoKSk7XG5cbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmFkZCgncmVxdWlyZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5hZGQoJ2xpYicsIG5ldyBSZXF1aXJlUmVzb3VyY2UoYCR7dGhpcy5wYXRocy5saWJ9L2ApKTtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmFkZCgnZW52JywgbmV3IFByb3BlcnR5UmVzb3VyY2UocHJvY2Vzcy5lbnYpKTtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmFkZCgncG9vbCcsIG5ldyBQcm9wZXJ0eVJlc291cmNlKFBvb2wpKTtcblxuICAgIH1cblxuICAgIHJlYWQoa2V5LCBkZWZhdWx0cywgbWVyZ2UpIHtcblxuICAgICAgICB2YXIgcmV0ID0gKHRoaXMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSA/IHRoaXMub3B0aW9uc1trZXldIDogZGVmYXVsdHM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXQgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc291cmNlcy5maW5kKHJldCk7XG5cbiAgICAgICAgaWYgKG1lcmdlKVxuICAgICAgICAgICAgcmV0dXJuIGRlZXBtZXJnZShtZXJnZSwgcmV0KTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVxdWlyZSByZXF1aXJlcyBhbGwgZmlsZXMgaW4gYSBzdWItZGlyZWN0b3J5IGludG8gYSBzaW5nbGUgb2JqZWN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpciBUaGUgIHBhdGguXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1lcmdlIEFuIG9wdGlvbmFsIG9iamVjdCBmdW5jdGlvbnMgY2FuIGJlIG1lcmdlZCBpbnRvLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcHJlZml4XSBBIHByZWZpeCB0aGF0IHdpbGwgYmUgY29uY2F0ZW5hdGVkIHRvIHRoZSBvYmplY3QncyBrZXlzXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICByZXF1aXJlKGRpciwgbWVyZ2UsIHByZWZpeCkge1xuXG4gICAgICAgIHZhciBmaWxlcztcbiAgICAgICAgdmFyIGV4dGVuc2lvbnMgPSBleHRlbnNpb25zIHx8IFsnLmpzJywgJy5qc29uJ107XG5cbiAgICAgICAgbWVyZ2UgPSBtZXJnZSB8fCB7fTtcblxuICAgICAgICBwcmVmaXggPSBwcmVmaXggfHwgJyc7XG4gICAgICAgIHByZWZpeCA9IChwcmVmaXgpID8gcHJlZml4ICsgJy4nIDogcHJlZml4O1xuICAgICAgICBwcmVmaXggPSAocHJlZml4WzBdID09PSAnLycpID8gcHJlZml4LnJlcGxhY2UoJy8nLCAnJykgOiBwcmVmaXg7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC5yZXBsYWNlKC9cXC8vZywgJy4nKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhkaXIpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2UgfHwge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsZXMpKVxuICAgICAgICAgICAgZmlsZXMuZm9yRWFjaCgocGF0aFRvRmlsZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnMuaW5kZXhPZihQYXRoLmV4dG5hbWUocGF0aFRvRmlsZSkpIDwgMCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgUHJvcGVydHkuc2V0KG1lcmdlLCBwcmVmaXggKyBQYXRoLmJhc2VuYW1lKHBhdGhUb0ZpbGUsIFBhdGguZXh0bmFtZShwYXRoVG9GaWxlKSksXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoZGlyICsgJy8nICsgcGF0aFRvRmlsZSkpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbWVyZ2U7XG4gICAgfVxuXG59XG5cbkNvbmZpZ3VyYXRpb24ua2V5cyA9IHtcbiAgICBNT0RVTEVTOiAnbW9kdWxlcycsXG4gICAgQ09OTkVDVElPTlM6ICdjb25uZWN0aW9ucycsXG4gICAgTUlERExFV0FSRTogJ21pZGRsZXdhcmUnLFxuICAgIEZJTFRFUlM6ICdmaWx0ZXJzJyxcbiAgICBQQVRIOiAncGF0aCdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRpb25cbiJdfQ==