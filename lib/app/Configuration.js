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
    VIEWS_ENGINE: 'power.views.engine',
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

function required(path) {

    var ret = require(path);

    if (ret.default) return ret.default;

    return ret;
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
        this.options = exists(this.paths.config) ? required(this.paths.config) : {};
        this.routes = exists(this.paths.routes) ? required(this.paths.routes) : {};

        this._resources = new _SchemeResource2.default(new _StringResource2.default());
        this._resources.add('module', new _RequireResource2.default(_path2.default.resolve(this.paths.root)));
        this._resources.add('require', new _RequireResource2.default());
        this._resources.add('env', new _PropertyResource2.default(process.env));
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
        value: function require(dir, merge, prefix) {

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

                _propertySeek2.default.set(merge, prefix + _path2.default.basename(pathToFile, _path2.default.extname(pathToFile)), required(dir + '/' + pathToFile));
            });

            return merge;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQ29uZmlndXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJrZXlzIiwiTU9EVUxFUyIsIk1PRFVMRVNfUFJFVkVOVEVEIiwiQ09OTkVDVElPTlMiLCJNSURETEVXQVJFIiwiQ09OVFJPTExFUlMiLCJNT0RFTFMiLCJTRUNSRVQiLCJQT1JUIiwiUEFUSCIsIldFQl9GUkFNRVdPUktfU0VUVElOR1MiLCJXRUJfVklFV1NfRU5HSU5FIiwiV0VCX1ZJRVdTX1BBVEhTIiwiVklFV1NfRU5HSU5FIiwiRklMVEVSUyIsIkZJTFRFUlNfUEFSU0VSX0pTT05fRU5BQkxFRCIsIkZJTFRFUlNfUEFSU0VSX0pTT05fT1BUSU9OUyIsIkZJTFRFUlNfUEFSU0VSX1VSTEVOQ09ERURfRU5BQkxFRCIsIkZJTFRFUlNfUEFSU0VSX1VSTEVOQ09ERURfT1BUSU9OUyIsIkZJTFRFUlNfUEFSU0VSX1RFWFRfRU5BQkxFRCIsIkZJTFRFUlNfUEFSU0VSX1RFWFRfT1BUSU9OUyIsIkZJTFRFUlNfUEFSU0VSX1JBV19FTkFCTEVEIiwiRklMVEVSU19QQVJTRVJfUkFXX09QVElPTlMiLCJGSUxURVJTX0NTUkZfRU5BQkxFRCIsIkZJTFRFUlNfQ1NSRl9PUFRJT05TIiwiRklMVEVSU19MT0dfRU5BQkxFRCIsIkZJTFRFUlNfTE9HX0ZPUk1BVCIsIkZJTFRFUlNfTE9HX09QVElPTlMiLCJGSUxURVJTX0FTU0VUX1BBVEhTIiwiRklMVEVSU19BU1NFVF9QQVRIU19PUFRJT05TIiwiRklMVEVSU19BU1NFVF9DSEVDS19QQVRIUyIsIkZJTFRFUlNfQVNTRVRfRElSRUNUT1JZIiwiRklMVEVSU19BU1NFVF9ESVJFQ1RPUllfT1BUSU9OUyIsIkZJTFRFUlNfU0VTU0lPTl9FTkFCTEVEIiwiRklMVEVSU19TRVNTSU9OX09QVElPTlMiLCJGSUxURVJTX1NFU1NJT05fU1RPUkUiLCJGSUxURVJTX0NPT0tJRVNfT1BUSU9OUyIsImRlZmF1bHRzIiwicmFuZG9tQnl0ZXMiLCJ0b1N0cmluZyIsImV4aXN0cyIsInBhdGgiLCJzdGF0U3luYyIsImlzRmlsZSIsImUiLCJyZXF1aXJlZCIsInJldCIsInJlcXVpcmUiLCJkZWZhdWx0IiwiQ29uZmlndXJhdGlvbiIsImRpciIsInBhdGhzIiwicm9vdCIsImNvbmZpZyIsInJvdXRlcyIsIm1vZHVsZXMiLCJjb25uZWN0b3JzIiwiZmlsdGVycyIsIm1pZGRsZXdhcmUiLCJjb250cm9sbGVycyIsIm1vZGVscyIsInZpZXdzIiwibGliIiwicHVibGljIiwib3B0aW9ucyIsIl9yZXNvdXJjZXMiLCJhZGQiLCJyZXNvbHZlIiwicHJvY2VzcyIsImVudiIsImtleSIsIm1lcmdlIiwiaGFzT3duUHJvcGVydHkiLCJmaW5kIiwicHJlZml4IiwiZmlsZXMiLCJleHRlbnNpb25zIiwicmVwbGFjZSIsInJlYWRkaXJTeW5jIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsInBhdGhUb0ZpbGUiLCJpbmRleE9mIiwiZXh0bmFtZSIsInNldCIsImJhc2VuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUdBLElBQU1BLE9BQU87QUFDVEMsYUFBUyxlQURBO0FBRVRDLHVCQUFtQiw4QkFGVjtBQUdUQyxpQkFBYSxtQkFISjtBQUlUQyxnQkFBWSxzQkFKSDtBQUtUQyxpQkFBYSx1QkFMSjtBQU1UQyxZQUFRLGtCQU5DO0FBT1RDLFlBQVEsY0FQQztBQVFUQyxVQUFNLFlBUkc7QUFTVEMsVUFBTSxvQkFURztBQVVUQyw0QkFBd0IsOEJBVmY7QUFXVEMsc0JBQWtCLHdCQVhUO0FBWVRDLHFCQUFpQix1QkFaUjtBQWFUQyxrQkFBYyxvQkFiTDtBQWNUQyxhQUFTLGVBZEE7QUFlVEMsaUNBQTZCLG1DQWZwQjtBQWdCVEMsaUNBQTZCLG1DQWhCcEI7QUFpQlRDLHVDQUFtQyx5Q0FqQjFCO0FBa0JUQyx1Q0FBbUMseUNB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LEdBQVQsQ0FBYWQsS0FBYixFQUFvQkcsU0FBUyxlQUFLWSxRQUFMLENBQWNKLFVBQWQsRUFBMEIsZUFBS0UsT0FBTCxDQUFhRixVQUFiLENBQTFCLENBQTdCLEVBQ0lyQyxTQUFTSyxNQUFNLEdBQU4sR0FBWWdDLFVBQXJCLENBREo7QUFHSCxhQVBEOztBQVNKLG1CQUFPWCxLQUFQO0FBQ0g7Ozs7OztBQUlMdEIsY0FBY2pELElBQWQsR0FBcUI7QUFDakJDLGFBQVMsU0FEUTtBQUVqQkUsaUJBQWEsYUFGSTtBQUdqQkMsZ0JBQVksWUFISztBQUlqQlUsYUFBUyxTQUpRO0FBS2pCTCxVQUFNO0FBTFcsQ0FBckI7O2tCQVFld0MsYSIsImZpbGUiOiJDb25maWd1cmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BlcnR5IGZyb20gJ3Byb3BlcnR5LXNlZWsnO1xuaW1wb3J0IGRlZXBtZXJnZSBmcm9tICdkZWVwbWVyZ2UnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBQYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IFBvb2wgZnJvbSAnLi4vbmV0L1Bvb2wnO1xuaW1wb3J0IFByb3BlcnR5UmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9Qcm9wZXJ0eVJlc291cmNlJztcbmltcG9ydCBSZXF1aXJlUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9SZXF1aXJlUmVzb3VyY2UnO1xuaW1wb3J0IFN0cmluZ1Jlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvU3RyaW5nUmVzb3VyY2UnO1xuaW1wb3J0IFNjaGVtZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvU2NoZW1lUmVzb3VyY2UnO1xuXG5cbmNvbnN0IGtleXMgPSB7XG4gICAgTU9EVUxFUzogJ3Bvd2VyLm1vZHVsZXMnLFxuICAgIE1PRFVMRVNfUFJFVkVOVEVEOiAncG93ZXIubW9kdWxlcy5wcmV2ZW50Um91dGluZycsXG4gICAgQ09OTkVDVElPTlM6ICdwb3dlci5jb25uZWN0aW9ucycsXG4gICAgTUlERExFV0FSRTogJ3Bvd2VyLmFwcC5taWRkbGV3YXJlJyxcbiAgICBDT05UUk9MTEVSUzogJ3Bvd2VyLmFwcC5jb250cm9sbGVycycsXG4gICAgTU9ERUxTOiAncG93ZXIuYXBwLm1vZGVscycsXG4gICAgU0VDUkVUOiAncG93ZXIuc2VjcmV0JyxcbiAgICBQT1JUOiAncG93ZXIucG9ydCcsXG4gICAgUEFUSDogJ3Bvd2VyLnJvdXRpbmcucm9vdCcsXG4gICAgV0VCX0ZSQU1FV09SS19TRVRUSU5HUzogJ3Bvd2VyLndlYi5mcmFtZXdvcmsuc2V0dGluZ3MnLFxuICAgIFdFQl9WSUVXU19FTkdJTkU6ICdwb3dlci53ZWIudmlld3MuZW5naW5lJyxcbiAgICBXRUJfVklFV1NfUEFUSFM6ICdwb3dlci53ZWIudmlld3MucGF0aHMnLFxuICAgIFZJRVdTX0VOR0lORTogJ3Bvd2VyLnZpZXdzLmVuZ2luZScsXG4gICAgRklMVEVSUzogJ3Bvd2VyLmZpbHRlcnMnLFxuICAgIEZJTFRFUlNfUEFSU0VSX0pTT05fRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLmpzb24uZW5hYmxlZCcsXG4gICAgRklMVEVSU19QQVJTRVJfSlNPTl9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5wYXJzZXIuanNvbi5vcHRpb25zJyxcbiAgICBGSUxURVJTX1BBUlNFUl9VUkxFTkNPREVEX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLnBhcnNlci51cmxlbmNvZGVkLmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1VSTEVOQ09ERURfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnVybGVuY29kZWQub3B0aW9ucycsXG4gICAgRklMVEVSU19QQVJTRVJfVEVYVF9FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5wYXJzZXIudGV4dC5lbmFibGVkJyxcbiAgICBGSUxURVJTX1BBUlNFUl9URVhUX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLnBhcnNlci50ZXh0Lm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1JBV19FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5wYXJzZXIucmF3LmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1JBV19PUFRJT05TOiAncG93ZXIuZmlsdGVycy5wYXJzZXIucmF3Lm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfQ1NSRl9FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5jc3JmLmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfQ1NSRl9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5jc3JmLm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfTE9HX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLmxvZy5lbmFibGVkJyxcbiAgICBGSUxURVJTX0xPR19GT1JNQVQ6ICdwb3dlci5maWx0ZXJzLmxvZy5mb3JtYXQnLFxuICAgIEZJTFRFUlNfTE9HX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLmxvZy5vcHRpb25zJyxcbiAgICBGSUxURVJTX0FTU0VUX1BBVEhTOiAncG93ZXIuZmlsdGVycy5hc3NldC5wYXRocycsXG4gICAgRklMVEVSU19BU1NFVF9QQVRIU19PUFRJT05TOiAncG93ZXIuZmlsdGVycy5hc3NldC5vcHRpb25zJyxcbiAgICBGSUxURVJTX0FTU0VUX0NIRUNLX1BBVEhTOiAncG93ZXIuZmlsdGVycy5hc3NldC5jaGVjay5wYXRocycsXG4gICAgRklMVEVSU19BU1NFVF9ESVJFQ1RPUlk6ICdwb3dlci5maWx0ZXJzLmFzc2V0LmRpcmVjdG9yeScsXG4gICAgRklMVEVSU19BU1NFVF9ESVJFQ1RPUllfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMuYXNzZXQub3B0aW9ucycsXG4gICAgRklMVEVSU19TRVNTSU9OX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLnNlc3Npb24uZW5hYmxlZCcsXG4gICAgRklMVEVSU19TRVNTSU9OX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLnNlc3Npb24ub3B0aW9ucycsXG4gICAgRklMVEVSU19TRVNTSU9OX1NUT1JFOiAncG93ZXIuZmlsdGVycy5zZXNzaW9uLnN0b3JlJyxcbiAgICBGSUxURVJTX0NPT0tJRVNfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMuY29va2llcy5vcHRpb25zJ1xuXG59O1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgICBTRUNSRVQ6IGNyeXB0by5yYW5kb21CeXRlcygzMikudG9TdHJpbmcoJ2hleCcpXG59O1xuXG5mdW5jdGlvbiBleGlzdHMocGF0aCkge1xuXG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGZzLnN0YXRTeW5jKHBhdGgpLmlzRmlsZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXF1aXJlZChwYXRoKSB7XG5cbiAgICB2YXIgcmV0ID0gcmVxdWlyZShwYXRoKTtcblxuICAgIGlmIChyZXQuZGVmYXVsdClcbiAgICAgICAgcmV0dXJuIHJldC5kZWZhdWx0O1xuXG4gICAgcmV0dXJuIHJldDtcblxufVxuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gcHJvdmlkZXMgYW4gYXBpIGZvciByZWFkaW5nIGludGVyZXN0aW5nIHZhbHVlcyBmcm9tIGFcbiAqIG1vZHVsZXMgY29uZmlndXJhdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKiBAcHJvcGVydHkge29iamVjdH0ga2V5c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhdGhcbiAqIFRPRE8gRG9jdW1lbnQgdGhlIHByb3BlcnRpZXMgb2YgdGhpcyBjbGFzcyBwcm9wZXJseS5cbiAqL1xuY2xhc3MgQ29uZmlndXJhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihkaXIsIHBhdGgpIHtcblxuICAgICAgICB0aGlzLnBhdGhzID0ge1xuICAgICAgICAgICAgcm9vdDogcGF0aCxcbiAgICAgICAgICAgIGNvbmZpZzogYCR7cGF0aH0vJHtkaXJ9L2NvbmZpZy5qc2AsXG4gICAgICAgICAgICByb3V0ZXM6IGAke3BhdGh9LyR7ZGlyfS9yb3V0ZXMuanNgLFxuICAgICAgICAgICAgbW9kdWxlczogYCR7cGF0aH0vbW9kdWxlc2AsXG4gICAgICAgICAgICBjb25uZWN0b3JzOiBgJHtwYXRofS9jb25uZWN0b3JzYCxcbiAgICAgICAgICAgIGZpbHRlcnM6IGAke3BhdGh9L2ZpbHRlcnNgLFxuICAgICAgICAgICAgbWlkZGxld2FyZTogYCR7cGF0aH0vYXBwL21pZGRsZXdhcmVgLFxuICAgICAgICAgICAgY29udHJvbGxlcnM6IGAke3BhdGh9L2FwcC9jb250cm9sbGVyc2AsXG4gICAgICAgICAgICBtb2RlbHM6IGAke3BhdGh9L2FwcC9tb2RlbHNgLFxuICAgICAgICAgICAgdmlld3M6IGAke3BhdGh9L2FwcC92aWV3c2AsXG4gICAgICAgICAgICBsaWI6IGAke3BhdGh9L2xpYmAsXG4gICAgICAgICAgICBwdWJsaWM6IGAke3BhdGh9L3B1YmxpY2BcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmtleXMgPSBrZXlzO1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IChleGlzdHModGhpcy5wYXRocy5jb25maWcpKSA/IHJlcXVpcmVkKHRoaXMucGF0aHMuY29uZmlnKSA6IHt9O1xuICAgICAgICB0aGlzLnJvdXRlcyA9IChleGlzdHModGhpcy5wYXRocy5yb3V0ZXMpKSA/IHJlcXVpcmVkKHRoaXMucGF0aHMucm91dGVzKSA6IHt9O1xuXG4gICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IG5ldyBTY2hlbWVSZXNvdXJjZShuZXcgU3RyaW5nUmVzb3VyY2UoKSk7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5hZGQoJ21vZHVsZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UoUGF0aC5yZXNvbHZlKHRoaXMucGF0aHMucm9vdCkpKTtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmFkZCgncmVxdWlyZScsIG5ldyBSZXF1aXJlUmVzb3VyY2UoKSk7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5hZGQoJ2VudicsIG5ldyBQcm9wZXJ0eVJlc291cmNlKHByb2Nlc3MuZW52KSk7XG5cbiAgICB9XG5cbiAgICByZWFkKGtleSwgZGVmYXVsdHMsIG1lcmdlKSB7XG5cbiAgICAgICAgdmFyIHJldCA9ICh0aGlzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkgPyB0aGlzLm9wdGlvbnNba2V5XSA6IGRlZmF1bHRzO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmV0ID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXNvdXJjZXMuZmluZChyZXQpO1xuXG4gICAgICAgIGlmIChtZXJnZSlcbiAgICAgICAgICAgIHJldHVybiBkZWVwbWVyZ2UobWVyZ2UsIHJldCk7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlcXVpcmUgcmVxdWlyZXMgYWxsIGZpbGVzIGluIGEgc3ViLWRpcmVjdG9yeSBpbnRvIGEgc2luZ2xlIG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXIgVGhlICBwYXRoLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXJnZSBBbiBvcHRpb25hbCBvYmplY3QgZnVuY3Rpb25zIGNhbiBiZSBtZXJnZWQgaW50by5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3ByZWZpeF0gQSBwcmVmaXggdGhhdCB3aWxsIGJlIGNvbmNhdGVuYXRlZCB0byB0aGUgb2JqZWN0J3Mga2V5c1xuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgcmVxdWlyZShkaXIsIG1lcmdlLCBwcmVmaXgpIHtcblxuICAgICAgICB2YXIgZmlsZXM7XG4gICAgICAgIHZhciBleHRlbnNpb25zID0gZXh0ZW5zaW9ucyB8fCBbJy5qcycsICcuanNvbiddO1xuXG4gICAgICAgIG1lcmdlID0gbWVyZ2UgfHwge307XG5cbiAgICAgICAgcHJlZml4ID0gcHJlZml4IHx8ICcnO1xuICAgICAgICBwcmVmaXggPSAocHJlZml4KSA/IHByZWZpeCArICcuJyA6IHByZWZpeDtcbiAgICAgICAgcHJlZml4ID0gKHByZWZpeFswXSA9PT0gJy8nKSA/IHByZWZpeC5yZXBsYWNlKCcvJywgJycpIDogcHJlZml4O1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgucmVwbGFjZSgvXFwvL2csICcuJyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZpbGVzID0gZnMucmVhZGRpclN5bmMoZGlyKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlIHx8IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZpbGVzKSlcbiAgICAgICAgICAgIGZpbGVzLmZvckVhY2goKHBhdGhUb0ZpbGUpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChleHRlbnNpb25zLmluZGV4T2YoUGF0aC5leHRuYW1lKHBhdGhUb0ZpbGUpKSA8IDApIHJldHVybjtcblxuICAgICAgICAgICAgICAgIFByb3BlcnR5LnNldChtZXJnZSwgcHJlZml4ICsgUGF0aC5iYXNlbmFtZShwYXRoVG9GaWxlLCBQYXRoLmV4dG5hbWUocGF0aFRvRmlsZSkpLFxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZChkaXIgKyAnLycgKyBwYXRoVG9GaWxlKSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBtZXJnZTtcbiAgICB9XG5cbn1cblxuQ29uZmlndXJhdGlvbi5rZXlzID0ge1xuICAgIE1PRFVMRVM6ICdtb2R1bGVzJyxcbiAgICBDT05ORUNUSU9OUzogJ2Nvbm5lY3Rpb25zJyxcbiAgICBNSURETEVXQVJFOiAnbWlkZGxld2FyZScsXG4gICAgRklMVEVSUzogJ2ZpbHRlcnMnLFxuICAgIFBBVEg6ICdwYXRoJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdGlvblxuIl19