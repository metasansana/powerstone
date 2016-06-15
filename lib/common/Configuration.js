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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vQ29uZmlndXJhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7NEJBQXFCLGVBQWU7Ozs7eUJBQ2QsV0FBVzs7OztrQkFDbEIsSUFBSTs7OztvQkFDRixNQUFNOzs7O3NCQUNKLFFBQVE7Ozs7dUJBQ1YsYUFBYTs7Ozt3Q0FDRCw2QkFBNkI7Ozs7dUNBQzlCLDRCQUE0Qjs7OztzQ0FDN0IsMkJBQTJCOzs7O3NDQUMzQiwyQkFBMkI7Ozs7QUFFdEQsSUFBTSxJQUFJLEdBQUc7QUFDVCxXQUFPLEVBQUUsZUFBZTtBQUN4QixxQkFBaUIsRUFBRSw4QkFBOEI7QUFDakQsZUFBVyxFQUFFLG1CQUFtQjtBQUNoQyxjQUFVLEVBQUUsc0JBQXNCO0FBQ2xDLGVBQVcsRUFBRSx1QkFBdUI7QUFDcEMsVUFBTSxFQUFFLGNBQWM7QUFDdEIsUUFBSSxFQUFFLFlBQVk7QUFDbEIsUUFBSSxFQUFFLG9CQUFvQjtBQUMxQiwwQkFBc0IsRUFBRSw4QkFBOEI7QUFDdEQsb0JBQWdCLEVBQUUsd0JBQXdCO0FBQzFDLG1CQUFlLEVBQUUsdUJBQXVCO0FBQ3hDLFdBQU8sRUFBRSxlQUFlO0FBQ3hCLCtCQUEyQixFQUFFLG1DQUFtQztBQUNoRSwrQkFBMkIsRUFBRSxtQ0FBbUM7QUFDaEUscUNBQWlDLEVBQUUseUNBQXlDO0FBQzVFLHFDQUFpQyxFQUFFLHlDQUF5QztBQUM1RSwrQkFBMkIsRUFBRSxtQ0FBbUM7QUFDaEUsK0JBQTJCLEVBQUUsbUNBQW1DO0FBQ2hFLDhCQUEwQixFQUFFLGtDQUFrQztBQUM5RCw4QkFBMEIsRUFBRSxrQ0FBa0M7QUFDOUQsd0JBQW9CLEVBQUUsNEJBQTRCO0FBQ2xELHdCQUFvQixFQUFFLDRCQUE0QjtBQUNsRCx1QkFBbUIsRUFBRSwyQkFBMkI7QUFDaEQsc0JBQWtCLEVBQUUsMEJBQTBCO0FBQzlDLHVCQUFtQixFQUFFLDJCQUEyQjtBQUNoRCx1QkFBbUIsRUFBRSwyQkFBMkI7QUFDaEQs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VUFBVSxFQUFFLGtCQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUM1RSxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBRXhDLENBQUMsQ0FBQzs7QUFFUCxtQkFBTyxLQUFLLENBQUM7U0FDaEI7OztXQWhGQyxhQUFhOzs7QUFvRm5CLGFBQWEsQ0FBQyxJQUFJLEdBQUc7QUFDakIsV0FBTyxFQUFFLFNBQVM7QUFDbEIsZUFBVyxFQUFFLGFBQWE7QUFDMUIsY0FBVSxFQUFFLFlBQVk7QUFDeEIsV0FBTyxFQUFFLFNBQVM7QUFDbEIsUUFBSSxFQUFFLE1BQU07Q0FDZixDQUFDOztxQkFFYSxhQUFhIiwiZmlsZSI6IkNvbmZpZ3VyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcGVydHkgZnJvbSAncHJvcGVydHktc2Vlayc7XG5pbXBvcnQgZGVlcG1lcmdlIGZyb20gJ2RlZXBtZXJnZSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IFBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgUG9vbCBmcm9tICcuLi9uZXQvUG9vbCc7XG5pbXBvcnQgUHJvcGVydHlSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1Byb3BlcnR5UmVzb3VyY2UnO1xuaW1wb3J0IFJlcXVpcmVSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1JlcXVpcmVSZXNvdXJjZSc7XG5pbXBvcnQgU3RyaW5nUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9TdHJpbmdSZXNvdXJjZSc7XG5pbXBvcnQgU2NoZW1lUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZS9TY2hlbWVSZXNvdXJjZSc7XG5cbmNvbnN0IGtleXMgPSB7XG4gICAgTU9EVUxFUzogJ3Bvd2VyLm1vZHVsZXMnLFxuICAgIE1PRFVMRVNfUFJFVkVOVEVEOiAncG93ZXIubW9kdWxlcy5wcmV2ZW50Um91dGluZycsXG4gICAgQ09OTkVDVElPTlM6ICdwb3dlci5jb25uZWN0aW9ucycsXG4gICAgTUlERExFV0FSRTogJ3Bvd2VyLmFwcC5taWRkbGV3YXJlJyxcbiAgICBDT05UUk9MTEVSUzogJ3Bvd2VyLmFwcC5jb250cm9sbGVycycsXG4gICAgU0VDUkVUOiAncG93ZXIuc2VjcmV0JyxcbiAgICBQT1JUOiAncG93ZXIucG9ydCcsXG4gICAgUEFUSDogJ3Bvd2VyLnJvdXRpbmcucm9vdCcsXG4gICAgV0VCX0ZSQU1FV09SS19TRVRUSU5HUzogJ3Bvd2VyLndlYi5mcmFtZXdvcmsuc2V0dGluZ3MnLFxuICAgIFdFQl9WSUVXU19FTkdJTkU6ICdwb3dlci53ZWIudmlld3MuZW5naW5lJyxcbiAgICBXRUJfVklFV1NfUEFUSFM6ICdwb3dlci53ZWIudmlld3MucGF0aHMnLFxuICAgIEZJTFRFUlM6ICdwb3dlci5maWx0ZXJzJyxcbiAgICBGSUxURVJTX1BBUlNFUl9KU09OX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLnBhcnNlci5qc29uLmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfUEFSU0VSX0pTT05fT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLmpzb24ub3B0aW9ucycsXG4gICAgRklMVEVSU19QQVJTRVJfVVJMRU5DT0RFRF9FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5wYXJzZXIudXJsZW5jb2RlZC5lbmFibGVkJyxcbiAgICBGSUxURVJTX1BBUlNFUl9VUkxFTkNPREVEX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLnBhcnNlci51cmxlbmNvZGVkLm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1RFWFRfRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnRleHQuZW5hYmxlZCcsXG4gICAgRklMVEVSU19QQVJTRVJfVEVYVF9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5wYXJzZXIudGV4dC5vcHRpb25zJyxcbiAgICBGSUxURVJTX1BBUlNFUl9SQVdfRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnJhdy5lbmFibGVkJyxcbiAgICBGSUxURVJTX1BBUlNFUl9SQVdfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnJhdy5vcHRpb25zJyxcbiAgICBGSUxURVJTX0NTUkZfRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMuY3NyZi5lbmFibGVkJyxcbiAgICBGSUxURVJTX0NTUkZfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMuY3NyZi5vcHRpb25zJyxcbiAgICBGSUxURVJTX0xPR19FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5sb2cuZW5hYmxlZCcsXG4gICAgRklMVEVSU19MT0dfRk9STUFUOiAncG93ZXIuZmlsdGVycy5sb2cuZm9ybWF0JyxcbiAgICBGSUxURVJTX0xPR19PUFRJT05TOiAncG93ZXIuZmlsdGVycy5sb2cub3B0aW9ucycsXG4gICAgRklMVEVSU19BU1NFVF9QQVRIUzogJ3Bvd2VyLmZpbHRlcnMuYXNzZXQucGF0aHMnLFxuICAgIEZJTFRFUlNfQVNTRVRfUEFUSFNfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMuYXNzZXQub3B0aW9ucycsXG4gICAgRklMVEVSU19BU1NFVF9ESVJFQ1RPUlk6ICdwb3dlci5maWx0ZXJzLmFzc2V0LmRpcmVjdG9yeScsXG4gICAgRklMVEVSU19BU1NFVF9ESVJFQ1RPUllfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMuYXNzZXQub3B0aW9ucycsXG4gICAgRklMVEVSU19TRVNTSU9OX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLnNlc3Npb24uZW5hYmxlZCcsXG4gICAgRklMVEVSU19TRVNTSU9OX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLnNlc3Npb24ub3B0aW9ucycsXG4gICAgRklMVEVSU19TRVNTSU9OX1NUT1JFOiAncG93ZXIuZmlsdGVycy5zZXNzaW9uLnN0b3JlJyxcbiAgICBGSUxURVJTX0NPT0tJRVNfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMuY29va2llcy5vcHRpb25zJ1xuXG5cblxufTtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgU0VDUkVUOiBjcnlwdG8ucmFuZG9tQnl0ZXMoMzIpLnRvU3RyaW5nKCdoZXgnKVxufTtcblxuZnVuY3Rpb24gZXhpc3RzKHBhdGgpIHtcblxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmcy5zdGF0U3luYyhwYXRoKS5pc0ZpbGUoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cbn1cblxuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gcHJvdmlkZXMgYW4gYXBpIGZvciByZWFkaW5nIGludGVyZXN0aW5nIHZhbHVlcyBmcm9tIGFcbiAqIG1vZHVsZXMgY29uZmlndXJhdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFxuICogQHByb3BlcnR5IHtvYmplY3R9IGtleXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwYXRoXG4gKiBUT0RPIERvY3VtZW50IHRoZSBwcm9wZXJ0aWVzIG9mIHRoaXMgY2xhc3MgcHJvcGVybHkuXG4gKi9cbmNsYXNzIENvbmZpZ3VyYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IoZGlyLCBwYXRoKSB7XG5cbiAgICAgICAgdGhpcy5wYXRocyA9IHtcbiAgICAgICAgICAgIHJvb3Q6IHBhdGgsXG4gICAgICAgICAgICBjb25maWc6IGAke3BhdGh9LyR7ZGlyfS9jb25maWcuanNgLFxuICAgICAgICAgICAgcm91dGVzOiBgJHtwYXRofS8ke2Rpcn0vcm91dGVzLmpzYCxcbiAgICAgICAgICAgIG1vZHVsZXM6IGAke3BhdGh9L21vZHVsZXNgLFxuICAgICAgICAgICAgY29ubmVjdG9yczogYCR7cGF0aH0vY29ubmVjdG9yc2AsXG4gICAgICAgICAgICBmaWx0ZXJzOiBgJHtwYXRofS9maWx0ZXJzYCxcbiAgICAgICAgICAgIG1pZGRsZXdhcmU6IGAke3BhdGh9L2FwcC9taWRkbGV3YXJlYCxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJzOiBgJHtwYXRofS9hcHAvY29udHJvbGxlcnNgLFxuICAgICAgICAgICAgdmlld3M6IGAke3BhdGh9L2FwcC92aWV3c2AsXG4gICAgICAgICAgICBsaWI6IGAke3BhdGh9L2xpYmAsXG4gICAgICAgICAgICBwdWJsaWM6IGAke3BhdGh9L3B1YmxpY2BcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmtleXMgPSBrZXlzO1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IChleGlzdHModGhpcy5wYXRocy5jb25maWcpKSA/IHJlcXVpcmUodGhpcy5wYXRocy5jb25maWcpIDoge307XG4gICAgICAgIHRoaXMucm91dGVzID0gKGV4aXN0cyh0aGlzLnBhdGhzLnJvdXRlcykpID8gcmVxdWlyZSh0aGlzLnBhdGhzLnJvdXRlcykgOiB7fTtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gbmV3IFNjaGVtZVJlc291cmNlKG5ldyBTdHJpbmdSZXNvdXJjZSgpKTtcblxuICAgICAgICB0aGlzLl9yZXNvdXJjZXMuYWRkKCdyZXF1aXJlJywgbmV3IFJlcXVpcmVSZXNvdXJjZSgpKTtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmFkZCgnbGliJywgbmV3IFJlcXVpcmVSZXNvdXJjZShgJHt0aGlzLnBhdGhzLmxpYn0vYCkpO1xuICAgICAgICB0aGlzLl9yZXNvdXJjZXMuYWRkKCdlbnYnLCBuZXcgUHJvcGVydHlSZXNvdXJjZShwcm9jZXNzLmVudikpO1xuICAgICAgICB0aGlzLl9yZXNvdXJjZXMuYWRkKCdwb29sJywgbmV3IFByb3BlcnR5UmVzb3VyY2UoUG9vbCkpO1xuXG4gICAgfVxuXG4gICAgcmVhZChrZXksIGRlZmF1bHRzLCBtZXJnZSkge1xuXG4gICAgICAgIHZhciByZXQgPSAodGhpcy5vcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpID8gdGhpcy5vcHRpb25zW2tleV0gOiBkZWZhdWx0cztcblxuICAgICAgICBpZiAodHlwZW9mIHJldCA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzb3VyY2VzLmZpbmQocmV0KTtcblxuICAgICAgICBpZiAobWVyZ2UpXG4gICAgICAgICAgICByZXR1cm4gZGVlcG1lcmdlKG1lcmdlLCByZXQpO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1aXJlIHJlcXVpcmVzIGFsbCBmaWxlcyBpbiBhIHN1Yi1kaXJlY3RvcnkgaW50byBhIHNpbmdsZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGlyIFRoZSAgcGF0aC5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbWVyZ2UgQW4gb3B0aW9uYWwgb2JqZWN0IGZ1bmN0aW9ucyBjYW4gYmUgbWVyZ2VkIGludG8uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtwcmVmaXhdIEEgcHJlZml4IHRoYXQgd2lsbCBiZSBjb25jYXRlbmF0ZWQgdG8gdGhlIG9iamVjdCdzIGtleXNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHJlcXVpcmUoZGlyLCBtZXJnZSwgcHJlZml4KSB7XG5cbiAgICAgICAgdmFyIGZpbGVzO1xuICAgICAgICB2YXIgZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnMgfHwgWycuanMnLCAnLmpzb24nXTtcblxuICAgICAgICBtZXJnZSA9IG1lcmdlIHx8IHt9O1xuXG4gICAgICAgIHByZWZpeCA9IHByZWZpeCB8fCAnJztcbiAgICAgICAgcHJlZml4ID0gKHByZWZpeCkgPyBwcmVmaXggKyAnLicgOiBwcmVmaXg7XG4gICAgICAgIHByZWZpeCA9IChwcmVmaXhbMF0gPT09ICcvJykgPyBwcmVmaXgucmVwbGFjZSgnLycsICcnKSA6IHByZWZpeDtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnJlcGxhY2UoL1xcLy9nLCAnLicpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGRpcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZSB8fCB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxlcykpXG4gICAgICAgICAgICBmaWxlcy5mb3JFYWNoKChwYXRoVG9GaWxlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9ucy5pbmRleE9mKFBhdGguZXh0bmFtZShwYXRoVG9GaWxlKSkgPCAwKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBQcm9wZXJ0eS5zZXQobWVyZ2UsIHByZWZpeCArIFBhdGguYmFzZW5hbWUocGF0aFRvRmlsZSwgUGF0aC5leHRuYW1lKHBhdGhUb0ZpbGUpKSxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShkaXIgKyAnLycgKyBwYXRoVG9GaWxlKSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBtZXJnZTtcbiAgICB9XG5cbn1cblxuQ29uZmlndXJhdGlvbi5rZXlzID0ge1xuICAgIE1PRFVMRVM6ICdtb2R1bGVzJyxcbiAgICBDT05ORUNUSU9OUzogJ2Nvbm5lY3Rpb25zJyxcbiAgICBNSURETEVXQVJFOiAnbWlkZGxld2FyZScsXG4gICAgRklMVEVSUzogJ2ZpbHRlcnMnLFxuICAgIFBBVEg6ICdwYXRoJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdGlvblxuIl19