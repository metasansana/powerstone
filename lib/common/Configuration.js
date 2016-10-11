'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _Pool = require('../net/Pool');

var _Pool2 = _interopRequireDefault(_Pool);

var _PropertyResource = require('./resource/PropertyResource');

var _PropertyResource2 = _interopRequireDefault(_PropertyResource);

var _RequireResource = require('./resource/RequireResource');

var _RequireResource2 = _interopRequireDefault(_RequireResource);

var _StringResource = require('./resource/StringResource');

var _StringResource2 = _interopRequireDefault(_StringResource);

var _SchemeResource = require('./resource/SchemeResource');

var _SchemeResource2 = _interopRequireDefault(_SchemeResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    SECRET: _crypto2.default.randomBytes(32).toString('hex')
};

function exists(path) {

    try {
        return _fs2.default.statSync(path).isFile();
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

var Configuration = function () {
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
            public: path + '/public'
        };

        this.keys = keys;
        this.defaults = defaults;
        this.options = exists(this.paths.config) ? require(this.paths.config) : {};
        this.routes = exists(this.paths.routes) ? require(this.paths.routes) : {};
        this._resources = new _SchemeResource2.default(new _StringResource2.default());

        this._resources.add('require', new _RequireResource2.default());
        this._resources.add('lib', new _RequireResource2.default(this.paths.lib + '/'));
        this._resources.add('env', new _PropertyResource2.default(process.env));
        this._resources.add('pool', new _PropertyResource2.default(_Pool2.default));
    }

    _createClass(Configuration, [{
        key: 'read',
        value: function read(key, defaults, merge) {

            var ret = this.options.hasOwnProperty(key) ? this.options[key] : defaults;

            if (typeof ret === 'string') return this._resources.find(ret);

            if (merge) return (0, _deepmerge2.default)(merge, ret);

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
        value: function (_require) {
            function require(_x, _x2, _x3) {
                return _require.apply(this, arguments);
            }

            require.toString = function () {
                return _require.toString();
            };

            return require;
        }(function (dir, merge, prefix) {

            var files;
            var extensions = extensions || ['.js', '.json'];

            merge = merge || {};

            prefix = prefix || '';
            prefix = prefix ? prefix + '.' : prefix;
            prefix = prefix[0] === '/' ? prefix.replace('/', '') : prefix;
            prefix = prefix.replace(/\//g, '.');

            try {
                files = _fs2.default.readdirSync(dir);
            } catch (e) {
                return merge || {};
            }
            if (Array.isArray(files)) files.forEach(function (pathToFile) {

                if (extensions.indexOf(_path2.default.extname(pathToFile)) < 0) return;

                _propertySeek2.default.set(merge, prefix + _path2.default.basename(pathToFile, _path2.default.extname(pathToFile)), require(dir + '/' + pathToFile));
            });

            return merge;
        })
    }]);

    return Configuration;
}();

Configuration.keys = {
    MODULES: 'modules',
    CONNECTIONS: 'connections',
    MIDDLEWARE: 'middleware',
    FILTERS: 'filters',
    PATH: 'path'
};

exports.default = Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vQ29uZmlndXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJrZXlzIiwiTU9EVUxFUyIsIk1PRFVMRVNfUFJFVkVOVEVEIiwiQ09OTkVDVElPTlMiLCJNSURETEVXQVJFIiwiQ09OVFJPTExFUlMiLCJNT0RFTFMiLCJTRUNSRVQiLCJQT1JUIiwiUEFUSCIsIldFQl9GUkFNRVdPUktfU0VUVElOR1MiLCJXRUJfVklFV1NfRU5HSU5FIiwiV0VCX1ZJRVdTX1BBVEhTIiwiRklMVEVSUyIsIkZJTFRFUlNfUEFSU0VSX0pTT05fRU5BQkxFRCIsIkZJTFRFUlNfUEFSU0VSX0pTT05fT1BUSU9OUyIsIkZJTFRFUlNfUEFSU0VSX1VSTEVOQ09ERURfRU5BQkxFRCIsIkZJTFRFUlNfUEFSU0VSX1VSTEVOQ09ERURfT1BUSU9OUyIsIkZJTFRFUlNfUEFSU0VSX1RFWFRfRU5BQkxFRCIsIkZJTFRFUlNfUEFSU0VSX1RFWFRfT1BUSU9OUyIsIkZJTFRFUlNfUEFSU0VSX1JBV19FTkFCTEVEIiwiRklMVEVSU19QQVJTRVJfUkFXX09QVElPTlMiLCJGSUxURVJTX0NTUkZfRU5BQkxFRCIsIkZJTFRFUlNfQ1NSRl9PUFRJT05TIiwiRklMVEVSU19MT0dfRU5BQkxFRCIsIkZJTFRFUlNfTE9HX0ZPUk1BVCIsIkZJTFRFUlNfTE9HX09QVElPTlMiLCJGSUxURVJTX0FTU0VUX1BBVEhTIiwiRklMVEVSU19BU1NFVF9QQVRIU19PUFRJT05TIiwiRklMVEVSU19BU1NFVF9DSEVDS19QQVRIUyIsIkZJTFRFUlNfQVNTRVRfRElSRUNUT1JZIiwiRklMVEVSU19BU1NFVF9ESVJFQ1RPUllfT1BUSU9OUyIsIkZJTFRFUlNfU0VTU0lPTl9FTkFCTEVEIiwiRklMVEVSU19TRVNTSU9OX09QVElPTlMiLCJGSUxURVJTX1NFU1NJT05fU1RPUkUiLCJGSUxURVJTX0NPT0tJRVNfT1BUSU9OUyIsImRlZmF1bHRzIiwicmFuZG9tQnl0ZXMiLCJ0b1N0cmluZyIsImV4aXN0cyIsInBhdGgiLCJzdGF0U3luYyIsImlzRmlsZSIsImUiLCJDb25maWd1cmF0aW9uIiwiZGlyIiwicGF0aHMiLCJyb290IiwiY29uZmlnIiwicm91dGVzIiwibW9kdWxlcyIsImNvbm5lY3RvcnMiLCJmaWx0ZXJzIiwibWlkZGxld2FyZSIsImNvbnRyb2xsZXJzIiwibW9kZWxzIiwidmlld3MiLCJsaWIiLCJwdWJsaWMiLCJvcHRpb25zIiwicmVxdWlyZSIsIl9yZXNvdXJjZXMiLCJhZGQiLCJwcm9jZXNzIiwiZW52Iiwia2V5IiwibWVyZ2UiLCJyZXQiLCJoYXNPd25Qcm9wZXJ0eSIsImZpbmQiLCJwcmVmaXgiLCJmaWxlcyIsImV4dGVuc2lvbnMiLCJyZXBsYWNlIiwicmVhZGRpclN5bmMiLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwicGF0aFRvRmlsZSIsImluZGV4T2YiLCJleHRuYW1lIiwic2V0IiwiYmFzZW5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBTztBQUNUQyxhQUFTLGVBREE7QUFFVEMsdUJBQW1CLDhCQUZWO0FBR1RDLGlCQUFhLG1CQUhKO0FBSVRDLGdCQUFZLHNCQUpIO0FBS1RDLGlCQUFhLHVCQUxKO0FBTVRDLFlBQU8sa0JBTkU7QUFPVEMsWUFBUSxjQVBDO0FBUVRDLFVBQU0sWUFSRztBQVNUQyxVQUFNLG9CQVRHO0FBVVRDLDRCQUF3Qiw4QkFWZjtBQVdUQyxzQkFBa0Isd0JBWFQ7QUFZVEMscUJBQWlCLHVCQVpSO0FBYVRDLGFBQVMsZUFiQTtBQWNUQyxpQ0FBNkIsbUNBZHBCO0FBZVRDLGlDQUE2QixtQ0FmcEI7QUFnQlRDLHVDQUFtQyx5Q0FoQjFCO0FBaUJUQyx1Q0FBbUMseUNBakIxQjtBQWtCVEMsaUNBQTZCLG1DQWxCcEI7QUFtQlRDLGlDQUE2QixtQ0FuQnBCO0FBb0JUQyxnQ0FBNEIs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O0FBSUx0QixjQUFjNUMsSUFBZCxHQUFxQjtBQUNqQkMsYUFBUyxTQURRO0FBRWpCRSxpQkFBYSxhQUZJO0FBR2pCQyxnQkFBWSxZQUhLO0FBSWpCUyxhQUFTLFNBSlE7QUFLakJKLFVBQU07QUFMVyxDQUFyQjs7a0JBUWVtQyxhIiwiZmlsZSI6IkNvbmZpZ3VyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcGVydHkgZnJvbSAncHJvcGVydHktc2Vlayc7XG5pbXBvcnQgZGVlcG1lcmdlIGZyb20gJ2RlZXBtZXJnZSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IFBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgUG9vbCBmcm9tICcuLi9uZXQvUG9vbCc7XG5pbXBvcnQgUHJvcGVydHlSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1Byb3BlcnR5UmVzb3VyY2UnO1xuaW1wb3J0IFJlcXVpcmVSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1JlcXVpcmVSZXNvdXJjZSc7XG5pbXBvcnQgU3RyaW5nUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9TdHJpbmdSZXNvdXJjZSc7XG5pbXBvcnQgU2NoZW1lUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9TY2hlbWVSZXNvdXJjZSc7XG5cbmNvbnN0IGtleXMgPSB7XG4gICAgTU9EVUxFUzogJ3Bvd2VyLm1vZHVsZXMnLFxuICAgIE1PRFVMRVNfUFJFVkVOVEVEOiAncG93ZXIubW9kdWxlcy5wcmV2ZW50Um91dGluZycsXG4gICAgQ09OTkVDVElPTlM6ICdwb3dlci5jb25uZWN0aW9ucycsXG4gICAgTUlERExFV0FSRTogJ3Bvd2VyLmFwcC5taWRkbGV3YXJlJyxcbiAgICBDT05UUk9MTEVSUzogJ3Bvd2VyLmFwcC5jb250cm9sbGVycycsXG4gICAgTU9ERUxTOidwb3dlci5hcHAubW9kZWxzJyxcbiAgICBTRUNSRVQ6ICdwb3dlci5zZWNyZXQnLFxuICAgIFBPUlQ6ICdwb3dlci5wb3J0JyxcbiAgICBQQVRIOiAncG93ZXIucm91dGluZy5yb290JyxcbiAgICBXRUJfRlJBTUVXT1JLX1NFVFRJTkdTOiAncG93ZXIud2ViLmZyYW1ld29yay5zZXR0aW5ncycsXG4gICAgV0VCX1ZJRVdTX0VOR0lORTogJ3Bvd2VyLndlYi52aWV3cy5lbmdpbmUnLFxuICAgIFdFQl9WSUVXU19QQVRIUzogJ3Bvd2VyLndlYi52aWV3cy5wYXRocycsXG4gICAgRklMVEVSUzogJ3Bvd2VyLmZpbHRlcnMnLFxuICAgIEZJTFRFUlNfUEFSU0VSX0pTT05fRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLmpzb24uZW5hYmxlZCcsXG4gICAgRklMVEVSU19QQVJTRVJfSlNPTl9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5wYXJzZXIuanNvbi5vcHRpb25zJyxcbiAgICBGSUxURVJTX1BBUlNFUl9VUkxFTkNPREVEX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLnBhcnNlci51cmxlbmNvZGVkLmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1VSTEVOQ09ERURfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnVybGVuY29kZWQub3B0aW9ucycsXG4gICAgRklMVEVSU19QQVJTRVJfVEVYVF9FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5wYXJzZXIudGV4dC5lbmFibGVkJyxcbiAgICBGSUxURVJTX1BBUlNFUl9URVhUX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLnBhcnNlci50ZXh0Lm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1JBV19FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5wYXJzZXIucmF3LmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1JBV19PUFRJT05TOiAncG93ZXIuZmlsdGVycy5wYXJzZXIucmF3Lm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfQ1NSRl9FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5jc3JmLmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfQ1NSRl9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5jc3JmLm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfTE9HX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLmxvZy5lbmFibGVkJyxcbiAgICBGSUxURVJTX0xPR19GT1JNQVQ6ICdwb3dlci5maWx0ZXJzLmxvZy5mb3JtYXQnLFxuICAgIEZJTFRFUlNfTE9HX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLmxvZy5vcHRpb25zJyxcbiAgICBGSUxURVJTX0FTU0VUX1BBVEhTOiAncG93ZXIuZmlsdGVycy5hc3NldC5wYXRocycsXG4gICAgRklMVEVSU19BU1NFVF9QQVRIU19PUFRJT05TOiAncG93ZXIuZmlsdGVycy5hc3NldC5vcHRpb25zJyxcbiAgICBGSUxURVJTX0FTU0VUX0NIRUNLX1BBVEhTOiAncG93ZXIuZmlsdGVycy5hc3NldC5jaGVjay5wYXRocycsXG4gICAgRklMVEVSU19BU1NFVF9ESVJFQ1RPUlk6ICdwb3dlci5maWx0ZXJzLmFzc2V0LmRpcmVjdG9yeScsXG4gICAgRklMVEVSU19BU1NFVF9ESVJFQ1RPUllfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMuYXNzZXQub3B0aW9ucycsXG4gICAgRklMVEVSU19TRVNTSU9OX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLnNlc3Npb24uZW5hYmxlZCcsXG4gICAgRklMVEVSU19TRVNTSU9OX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLnNlc3Npb24ub3B0aW9ucycsXG4gICAgRklMVEVSU19TRVNTSU9OX1NUT1JFOiAncG93ZXIuZmlsdGVycy5zZXNzaW9uLnN0b3JlJyxcbiAgICBGSUxURVJTX0NPT0tJRVNfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMuY29va2llcy5vcHRpb25zJ1xuXG59O1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgICBTRUNSRVQ6IGNyeXB0by5yYW5kb21CeXRlcygzMikudG9TdHJpbmcoJ2hleCcpXG59O1xuXG5mdW5jdGlvbiBleGlzdHMocGF0aCkge1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxufVxuXG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBwcm92aWRlcyBhbiBhcGkgZm9yIHJlYWRpbmcgaW50ZXJlc3RpbmcgdmFsdWVzIGZyb20gYVxuICogbW9kdWxlcyBjb25maWd1cmF0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IGRpclxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggXG4gKiBAcHJvcGVydHkge29iamVjdH0ga2V5c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhdGhcbiAqIFRPRE8gRG9jdW1lbnQgdGhlIHByb3BlcnRpZXMgb2YgdGhpcyBjbGFzcyBwcm9wZXJseS5cbiAqL1xuY2xhc3MgQ29uZmlndXJhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihkaXIsIHBhdGgpIHtcblxuICAgICAgICB0aGlzLnBhdGhzID0ge1xuICAgICAgICAgICAgcm9vdDogcGF0aCxcbiAgICAgICAgICAgIGNvbmZpZzogYCR7cGF0aH0vJHtkaXJ9L2NvbmZpZy5qc2AsXG4gICAgICAgICAgICByb3V0ZXM6IGAke3BhdGh9LyR7ZGlyfS9yb3V0ZXMuanNgLFxuICAgICAgICAgICAgbW9kdWxlczogYCR7cGF0aH0vbW9kdWxlc2AsXG4gICAgICAgICAgICBjb25uZWN0b3JzOiBgJHtwYXRofS9jb25uZWN0b3JzYCxcbiAgICAgICAgICAgIGZpbHRlcnM6IGAke3BhdGh9L2ZpbHRlcnNgLFxuICAgICAgICAgICAgbWlkZGxld2FyZTogYCR7cGF0aH0vYXBwL21pZGRsZXdhcmVgLFxuICAgICAgICAgICAgY29udHJvbGxlcnM6IGAke3BhdGh9L2FwcC9jb250cm9sbGVyc2AsXG4gICAgICAgICAgICBtb2RlbHM6IGAke3BhdGh9L2FwcC9tb2RlbHNgLFxuICAgICAgICAgICAgdmlld3M6IGAke3BhdGh9L2FwcC92aWV3c2AsXG4gICAgICAgICAgICBsaWI6IGAke3BhdGh9L2xpYmAsXG4gICAgICAgICAgICBwdWJsaWM6IGAke3BhdGh9L3B1YmxpY2BcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmtleXMgPSBrZXlzO1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IChleGlzdHModGhpcy5wYXRocy5jb25maWcpKSA/IHJlcXVpcmUodGhpcy5wYXRocy5jb25maWcpIDoge307XG4gICAgICAgIHRoaXMucm91dGVzID0gKGV4aXN0cyh0aGlzLnBhdGhzLnJvdXRlcykpID8gcmVxdWlyZSh0aGlzLnBhdGhzLnJvdXRlcykgOiB7fTtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gbmV3IFNjaGVtZVJlc291cmNlKG5ldyBTdHJpbmdSZXNvdXJjZSgpKTtcblxuICAgICAgICB0aGlzLl9yZXNvdXJjZXMuYWRkKCdyZXF1aXJlJywgbmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmFkZCgnbGliJywgbmV3IFJlcXVpcmVSZXNvdXJjZShgJHt0aGlzLnBhdGhzLmxpYn0vYCkpO1xuICAgICAgICB0aGlzLl9yZXNvdXJjZXMuYWRkKCdlbnYnLCBuZXcgUHJvcGVydHlSZXNvdXJjZShwcm9jZXNzLmVudikpO1xuICAgICAgICB0aGlzLl9yZXNvdXJjZXMuYWRkKCdwb29sJywgbmV3IFByb3BlcnR5UmVzb3VyY2UoUG9vbCkpO1xuXG4gICAgfVxuXG4gICAgcmVhZChrZXksIGRlZmF1bHRzLCBtZXJnZSkge1xuXG4gICAgICAgIHZhciByZXQgPSAodGhpcy5vcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpID8gdGhpcy5vcHRpb25zW2tleV0gOiBkZWZhdWx0cztcblxuICAgICAgICBpZiAodHlwZW9mIHJldCA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzb3VyY2VzLmZpbmQocmV0KTtcblxuICAgICAgICBpZiAobWVyZ2UpXG4gICAgICAgICAgICByZXR1cm4gZGVlcG1lcmdlKG1lcmdlLCByZXQpO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1aXJlIHJlcXVpcmVzIGFsbCBmaWxlcyBpbiBhIHN1Yi1kaXJlY3RvcnkgaW50byBhIHNpbmdsZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGlyIFRoZSAgcGF0aC5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbWVyZ2UgQW4gb3B0aW9uYWwgb2JqZWN0IGZ1bmN0aW9ucyBjYW4gYmUgbWVyZ2VkIGludG8uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtwcmVmaXhdIEEgcHJlZml4IHRoYXQgd2lsbCBiZSBjb25jYXRlbmF0ZWQgdG8gdGhlIG9iamVjdCdzIGtleXNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHJlcXVpcmUoZGlyLCBtZXJnZSwgcHJlZml4KSB7XG5cbiAgICAgICAgdmFyIGZpbGVzO1xuICAgICAgICB2YXIgZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnMgfHwgWycuanMnLCAnLmpzb24nXTtcblxuICAgICAgICBtZXJnZSA9IG1lcmdlIHx8IHt9O1xuXG4gICAgICAgIHByZWZpeCA9IHByZWZpeCB8fCAnJztcbiAgICAgICAgcHJlZml4ID0gKHByZWZpeCkgPyBwcmVmaXggKyAnLicgOiBwcmVmaXg7XG4gICAgICAgIHByZWZpeCA9IChwcmVmaXhbMF0gPT09ICcvJykgPyBwcmVmaXgucmVwbGFjZSgnLycsICcnKSA6IHByZWZpeDtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnJlcGxhY2UoL1xcLy9nLCAnLicpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGRpcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZSB8fCB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxlcykpXG4gICAgICAgICAgICBmaWxlcy5mb3JFYWNoKChwYXRoVG9GaWxlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9ucy5pbmRleE9mKFBhdGguZXh0bmFtZShwYXRoVG9GaWxlKSkgPCAwKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBQcm9wZXJ0eS5zZXQobWVyZ2UsIHByZWZpeCArIFBhdGguYmFzZW5hbWUocGF0aFRvRmlsZSwgUGF0aC5leHRuYW1lKHBhdGhUb0ZpbGUpKSxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShkaXIgKyAnLycgKyBwYXRoVG9GaWxlKSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBtZXJnZTtcbiAgICB9XG5cbn1cblxuQ29uZmlndXJhdGlvbi5rZXlzID0ge1xuICAgIE1PRFVMRVM6ICdtb2R1bGVzJyxcbiAgICBDT05ORUNUSU9OUzogJ2Nvbm5lY3Rpb25zJyxcbiAgICBNSURETEVXQVJFOiAnbWlkZGxld2FyZScsXG4gICAgRklMVEVSUzogJ2ZpbHRlcnMnLFxuICAgIFBBVEg6ICdwYXRoJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdGlvblxuIl19