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
    PATH: 'power.routing.path',
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

exports.default = Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQ29uZmlndXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJrZXlzIiwiTU9EVUxFUyIsIk1PRFVMRVNfUFJFVkVOVEVEIiwiQ09OTkVDVElPTlMiLCJNSURETEVXQVJFIiwiQ09OVFJPTExFUlMiLCJNT0RFTFMiLCJTRUNSRVQiLCJQT1JUIiwiUEFUSCIsIldFQl9GUkFNRVdPUktfU0VUVElOR1MiLCJXRUJfVklFV1NfRU5HSU5FIiwiV0VCX1ZJRVdTX1BBVEhTIiwiVklFV1NfRU5HSU5FIiwiRklMVEVSUyIsIkZJTFRFUlNfUEFSU0VSX0pTT05fRU5BQkxFRCIsIkZJTFRFUlNfUEFSU0VSX0pTT05fT1BUSU9OUyIsIkZJTFRFUlNfUEFSU0VSX1VSTEVOQ09ERURfRU5BQkxFRCIsIkZJTFRFUlNfUEFSU0VSX1VSTEVOQ09ERURfT1BUSU9OUyIsIkZJTFRFUlNfUEFSU0VSX1RFWFRfRU5BQkxFRCIsIkZJTFRFUlNfUEFSU0VSX1RFWFRfT1BUSU9OUyIsIkZJTFRFUlNfUEFSU0VSX1JBV19FTkFCTEVEIiwiRklMVEVSU19QQVJTRVJfUkFXX09QVElPTlMiLCJGSUxURVJTX0NTUkZfRU5BQkxFRCIsIkZJTFRFUlNfQ1NSRl9PUFRJT05TIiwiRklMVEVSU19MT0dfRU5BQkxFRCIsIkZJTFRFUlNfTE9HX0ZPUk1BVCIsIkZJTFRFUlNfTE9HX09QVElPTlMiLCJGSUxURVJTX0FTU0VUX1BBVEhTIiwiRklMVEVSU19BU1NFVF9QQVRIU19PUFRJT05TIiwiRklMVEVSU19BU1NFVF9DSEVDS19QQVRIUyIsIkZJTFRFUlNfQVNTRVRfRElSRUNUT1JZIiwiRklMVEVSU19BU1NFVF9ESVJFQ1RPUllfT1BUSU9OUyIsIkZJTFRFUlNfU0VTU0lPTl9FTkFCTEVEIiwiRklMVEVSU19TRVNTSU9OX09QVElPTlMiLCJGSUxURVJTX1NFU1NJT05fU1RPUkUiLCJGSUxURVJTX0NPT0tJRVNfT1BUSU9OUyIsImRlZmF1bHRzIiwicmFuZG9tQnl0ZXMiLCJ0b1N0cmluZyIsImV4aXN0cyIsInBhdGgiLCJzdGF0U3luYyIsImlzRmlsZSIsImUiLCJyZXF1aXJlZCIsInJldCIsInJlcXVpcmUiLCJkZWZhdWx0IiwiQ29uZmlndXJhdGlvbiIsImRpciIsInBhdGhzIiwicm9vdCIsImNvbmZpZyIsInJvdXRlcyIsIm1vZHVsZXMiLCJjb25uZWN0b3JzIiwiZmlsdGVycyIsIm1pZGRsZXdhcmUiLCJjb250cm9sbGVycyIsIm1vZGVscyIsInZpZXdzIiwibGliIiwicHVibGljIiwib3B0aW9ucyIsIl9yZXNvdXJjZXMiLCJhZGQiLCJyZXNvbHZlIiwicHJvY2VzcyIsImVudiIsImtleSIsIm1lcmdlIiwiaGFzT3duUHJvcGVydHkiLCJmaW5kIiwicHJlZml4IiwiZmlsZXMiLCJleHRlbnNpb25zIiwicmVwbGFjZSIsInJlYWRkaXJTeW5jIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsInBhdGhUb0ZpbGUiLCJpbmRleE9mIiwiZXh0bmFtZSIsInNldCIsImJhc2VuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUdBLElBQU1BLE9BQU87QUFDVEMsYUFBUyxlQURBO0FBRVRDLHVCQUFtQiw4QkFGVjtBQUdUQyxpQkFBYSxtQkFISjtBQUlUQyxnQkFBWSxzQkFKSDtBQUtUQyxpQkFBYSx1QkFMSjtBQU1UQyxZQUFRLGtCQU5DO0FBT1RDLFlBQVEsY0FQQztBQVFUQyxVQUFNLFlBUkc7QUFTVEMsVUFBTSxvQkFURztBQVVUQyw0QkFBd0IsOEJBVmY7QUFXVEMsc0JBQWtCLHdCQVhUO0FBWVRDLHFCQUFpQix1QkFaUjtBQWFUQyxrQkFBYyxvQkFiTDtBQWNUQyxhQUFTLGVBZEE7QUFlVEMsaUNBQTZCLG1DQWZwQjtBQWdCVEMsaUNBQTZCLG1DQWhCcEI7QUFpQlRDLHVDQUFtQyx5Q0FqQjFCO0FBa0JUQyx1Q0FBbUMseUNBbEIxQjtBQW1CVEMsaUNBQTZCLG1DQW5CcEI7QUFvQlRDLGlDQUE2QixtQ0FwQnBCO0FBcUJUQyxnQ0FBNEIsa0NBckJuQjtBQXNCVEMsZ0NBQTRCLGtDQXRCbkI7QUF1QlRDLDBCQUFzQiw0QkF2QmI7QUF3QlRDLDBCQUFzQiw0QkF4QmI7QUF5QlRDLHlCQUFxQiwyQkF6Qlo7QUEwQlRDLHdCQUFvQiwwQkExQlg7QUEyQlRDLHlCQUFxQiwyQkEzQlo7QUE0QlRDLHlCQUFxQiwyQkE1Qlo7QUE2QlRDLGlDQUE2Qiw2QkE3QnBCO0FBOEJUQywrQkFBMkIsaUNBOUJsQjtBQStCVEMsNkJBQXlCLCtCQS9CaEI7QUFnQ1RDLHFDQUFpQyw2QkFoQ3hCO0FBaUNUQyw2QkFBeUIsK0JBakNoQjtBQWtDVEMsNkJBQXlCLCtCQWxDaEI7QUFtQ1RDLDJCQUF1Qiw2QkFuQ2Q7QUFvQ1RDLDZCQUF5Qjs7QUFwQ2hCLENBQWI7O0FBd0NBLElBQU1DLFdBQVc7QUFDYjlCLFlBQVEsaUJBQU8rQixXQUFQLENBQW1CLEVBQW5CLEVBQXVCQyxRQUF2QixDQUFnQyxLQUFoQztBQURLLENBQWpCOztBQUlBLFNBQVNDLE1BQVQsQ0FBZ0JDLElBQWhCLEVBQXNCOztBQUVsQixRQUFJO0FBQ0EsZUFBTyxhQUFHQyxRQUFILENBQVlELElBQVosRUFBa0JFLE1BQWxCLEVBQVA7QUFDSCxLQUZELENBRUUsT0FBT0MsQ0FBUCxFQUFVO0FBQ1IsZUFBTyxLQUFQO0FBRUg7QUFDSjs7QUFFRCxTQUFTQyxRQUFULENBQWtCSixJQUFsQixFQUF3Qjs7QUFFcEIsUUFBSUssTUFBTUMsUUFBUU4sSUFBUixDQUFWOztBQUVBLFFBQUlLLElBQUlFLE9BQVIsRUFDSSxPQUFPRixJQUFJRSxPQUFYOztBQUVKLFdBQU9GLEdBQVA7QUFFSDs7QUFFRDs7Ozs7Ozs7OztJQVNNRyxhO0FBRUYsMkJBQVlDLEdBQVosRUFBaUJULElBQWpCLEVBQXVCO0FBQUE7O0FBRW5CLGFBQUtVLEtBQUwsR0FBYTtBQUNUQyxrQkFBTVgsSUFERztBQUVUWSxvQkFBV1osSUFBWCxTQUFtQlMsR0FBbkIsZUFGUztBQUdUSSxvQkFBV2IsSUFBWCxTQUFtQlMsR0FBbkIsZUFIUztBQUlUSyxxQkFBWWQsSUFBWixhQUpTO0FBS1RlLHdCQUFlZixJQUFmLGdCQUxTO0FBTVRnQixxQkFBWWhCLElBQVosYUFOUztBQU9UaUIsd0JBQWVqQixJQUFmLG9CQVBTO0FBUVRrQix5QkFBZ0JsQixJQUFoQixxQkFSUztBQVNUbUIsb0JBQVduQixJQUFYLGdCQVRTO0FBVVRvQixtQkFBVXBCLElBQVYsZUFWUztBQVdUcUIsaUJBQVFyQixJQUFSLFNBWFM7QUFZVHNCLG9CQUFXdEIsSUFBWDtBQVpTLFNBQWI7O0FBZUEsYUFBS3pDLElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtxQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGFBQUsyQixPQUFMLEdBQWdCeEIsT0FBTyxLQUFLVyxLQUFMLENBQVdFLE1BQWxCLENBQUQsR0FBOEJSLFNBQVMsS0FBS00sS0FBTCxDQUFXRSxNQUFwQixDQUE5QixHQUE0RCxFQUEzRTtBQUNBLGFBQUtDLE1BQUwsR0FBZWQsT0FBTyxLQUFLVyxLQUFMLENBQVdHLE1BQWxCLENBQUQsR0FBOEJULFNBQVMsS0FBS00sS0FBTCxDQUFXRyxNQUFwQixDQUE5QixHQUE0RCxFQUExRTs7QUFFQSxhQUFLVyxVQUFMLEdBQWtCLDZCQUFtQiw4QkFBbkIsQ0FBbEI7QUFDQSxhQUFLQSxVQUFMLENBQWdCQyxHQUFoQixDQUFvQixRQUFwQixFQUE4Qiw4QkFBb0IsZUFBS0MsT0FBTCxDQUFhLEtBQUtoQixLQUFMLENBQVdDLElBQXhCLENBQXBCLENBQTlCO0FBQ0EsYUFBS2EsVUFBTCxDQUFnQkMsR0FBaEIsQ0FBb0IsU0FBcEIsRUFBK0IsK0JBQS9CO0FBQ0EsYUFBS0QsVUFBTCxDQUFnQkMsR0FBaEIsQ0FBb0IsS0FBcEIsRUFBMkIsK0JBQXFCRSxRQUFRQyxHQUE3QixDQUEzQjtBQUVIOzs7OzZCQUVJQyxHLEVBQUtqQyxRLEVBQVVrQyxLLEVBQU87O0FBRXZCLGdCQUFJekIsTUFBTyxLQUFLa0IsT0FBTCxDQUFhUSxjQUFiLENBQTRCRixHQUE1QixDQUFELEdBQXFDLEtBQUtOLE9BQUwsQ0FBYU0sR0FBYixDQUFyQyxHQUF5RGpDLFFBQW5FOztBQUVBLGdCQUFJLE9BQU9TLEdBQVAsS0FBZSxRQUFuQixFQUNJLE9BQU8sS0FBS21CLFVBQUwsQ0FBZ0JRLElBQWhCLENBQXFCM0IsR0FBckIsQ0FBUDs7QUFFSixnQkFBSXlCLEtBQUosRUFDSSxPQUFPLHlCQUFVQSxLQUFWLEVBQWlCekIsR0FBakIsQ0FBUDs7QUFFSixtQkFBT0EsR0FBUDtBQUVIOztBQUVEOzs7Ozs7Ozs7O2dDQU9RSSxHLEVBQUtxQixLLEVBQU9HLE0sRUFBUTs7QUFFeEIsZ0JBQUlDLEtBQUo7QUFDQSxnQkFBSUMsYUFBYUEsY0FBYyxDQUFDLEtBQUQsRUFBUSxPQUFSLENBQS9COztBQUVBTCxvQkFBUUEsU0FBUyxFQUFqQjs7QUFFQUcscUJBQVNBLFVBQVUsRUFBbkI7QUFDQUEscUJBQVVBLE1BQUQsR0FBV0EsU0FBUyxHQUFwQixHQUEwQkEsTUFBbkM7QUFDQUEscUJBQVVBLE9BQU8sQ0FBUCxNQUFjLEdBQWYsR0FBc0JBLE9BQU9HLE9BQVAsQ0FBZSxHQUFmLEVBQW9CLEVBQXBCLENBQXRCLEdBQWdESCxNQUF6RDtBQUNBQSxxQkFBU0EsT0FBT0csT0FBUCxDQUFlLEtBQWYsRUFBc0IsR0FBdEIsQ0FBVDs7QUFFQSxnQkFBSTtBQUNBRix3QkFBUSxhQUFHRyxXQUFILENBQWU1QixHQUFmLENBQVI7QUFDSCxhQUZELENBRUUsT0FBT04sQ0FBUCxFQUFVO0FBQ1IsdUJBQU8yQixTQUFTLEVBQWhCO0FBQ0g7QUFDRCxnQkFBSVEsTUFBTUMsT0FBTixDQUFjTCxLQUFkLENBQUosRUFDSUEsTUFBTU0sT0FBTixDQUFjLFVBQUNDLFVBQUQsRUFBZ0I7O0FBRTFCLG9CQUFJTixXQUFXTyxPQUFYLENBQW1CLGVBQUtDLE9BQUwsQ0FBYUYsVUFBYixDQUFuQixJQUErQyxDQUFuRCxFQUFzRDs7QUFFdEQsdUNBQVNHLEdBQVQsQ0FBYWQsS0FBYixFQUFvQkcsU0FBUyxlQUFLWSxRQUFMLENBQWNKLFVBQWQsRUFBMEIsZUFBS0UsT0FBTCxDQUFhRixVQUFiLENBQTFCLENBQTdCLEVBQ0lyQyxTQUFTSyxNQUFNLEdBQU4sR0FBWWdDLFVBQXJCLENBREo7QUFHSCxhQVBEOztBQVNKLG1CQUFPWCxLQUFQO0FBQ0g7Ozs7OztrQkFLVXRCLGEiLCJmaWxlIjoiQ29uZmlndXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wZXJ0eSBmcm9tICdwcm9wZXJ0eS1zZWVrJztcbmltcG9ydCBkZWVwbWVyZ2UgZnJvbSAnZGVlcG1lcmdlJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgUGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCBQb29sIGZyb20gJy4uL25ldC9Qb29sJztcbmltcG9ydCBQcm9wZXJ0eVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvUHJvcGVydHlSZXNvdXJjZSc7XG5pbXBvcnQgUmVxdWlyZVJlc291cmNlIGZyb20gJy4vcmVzb3VyY2UvUmVxdWlyZVJlc291cmNlJztcbmltcG9ydCBTdHJpbmdSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1N0cmluZ1Jlc291cmNlJztcbmltcG9ydCBTY2hlbWVSZXNvdXJjZSBmcm9tICcuL3Jlc291cmNlL1NjaGVtZVJlc291cmNlJztcblxuXG5jb25zdCBrZXlzID0ge1xuICAgIE1PRFVMRVM6ICdwb3dlci5tb2R1bGVzJyxcbiAgICBNT0RVTEVTX1BSRVZFTlRFRDogJ3Bvd2VyLm1vZHVsZXMucHJldmVudFJvdXRpbmcnLFxuICAgIENPTk5FQ1RJT05TOiAncG93ZXIuY29ubmVjdGlvbnMnLFxuICAgIE1JRERMRVdBUkU6ICdwb3dlci5hcHAubWlkZGxld2FyZScsXG4gICAgQ09OVFJPTExFUlM6ICdwb3dlci5hcHAuY29udHJvbGxlcnMnLFxuICAgIE1PREVMUzogJ3Bvd2VyLmFwcC5tb2RlbHMnLFxuICAgIFNFQ1JFVDogJ3Bvd2VyLnNlY3JldCcsXG4gICAgUE9SVDogJ3Bvd2VyLnBvcnQnLFxuICAgIFBBVEg6ICdwb3dlci5yb3V0aW5nLnBhdGgnLFxuICAgIFdFQl9GUkFNRVdPUktfU0VUVElOR1M6ICdwb3dlci53ZWIuZnJhbWV3b3JrLnNldHRpbmdzJyxcbiAgICBXRUJfVklFV1NfRU5HSU5FOiAncG93ZXIud2ViLnZpZXdzLmVuZ2luZScsXG4gICAgV0VCX1ZJRVdTX1BBVEhTOiAncG93ZXIud2ViLnZpZXdzLnBhdGhzJyxcbiAgICBWSUVXU19FTkdJTkU6ICdwb3dlci52aWV3cy5lbmdpbmUnLFxuICAgIEZJTFRFUlM6ICdwb3dlci5maWx0ZXJzJyxcbiAgICBGSUxURVJTX1BBUlNFUl9KU09OX0VOQUJMRUQ6ICdwb3dlci5maWx0ZXJzLnBhcnNlci5qc29uLmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfUEFSU0VSX0pTT05fT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLmpzb24ub3B0aW9ucycsXG4gICAgRklMVEVSU19QQVJTRVJfVVJMRU5DT0RFRF9FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5wYXJzZXIudXJsZW5jb2RlZC5lbmFibGVkJyxcbiAgICBGSUxURVJTX1BBUlNFUl9VUkxFTkNPREVEX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLnBhcnNlci51cmxlbmNvZGVkLm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfUEFSU0VSX1RFWFRfRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnRleHQuZW5hYmxlZCcsXG4gICAgRklMVEVSU19QQVJTRVJfVEVYVF9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5wYXJzZXIudGV4dC5vcHRpb25zJyxcbiAgICBGSUxURVJTX1BBUlNFUl9SQVdfRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnJhdy5lbmFibGVkJyxcbiAgICBGSUxURVJTX1BBUlNFUl9SQVdfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMucGFyc2VyLnJhdy5vcHRpb25zJyxcbiAgICBGSUxURVJTX0NTUkZfRU5BQkxFRDogJ3Bvd2VyLmZpbHRlcnMuY3NyZi5lbmFibGVkJyxcbiAgICBGSUxURVJTX0NTUkZfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMuY3NyZi5vcHRpb25zJyxcbiAgICBGSUxURVJTX0xPR19FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5sb2cuZW5hYmxlZCcsXG4gICAgRklMVEVSU19MT0dfRk9STUFUOiAncG93ZXIuZmlsdGVycy5sb2cuZm9ybWF0JyxcbiAgICBGSUxURVJTX0xPR19PUFRJT05TOiAncG93ZXIuZmlsdGVycy5sb2cub3B0aW9ucycsXG4gICAgRklMVEVSU19BU1NFVF9QQVRIUzogJ3Bvd2VyLmZpbHRlcnMuYXNzZXQucGF0aHMnLFxuICAgIEZJTFRFUlNfQVNTRVRfUEFUSFNfT1BUSU9OUzogJ3Bvd2VyLmZpbHRlcnMuYXNzZXQub3B0aW9ucycsXG4gICAgRklMVEVSU19BU1NFVF9DSEVDS19QQVRIUzogJ3Bvd2VyLmZpbHRlcnMuYXNzZXQuY2hlY2sucGF0aHMnLFxuICAgIEZJTFRFUlNfQVNTRVRfRElSRUNUT1JZOiAncG93ZXIuZmlsdGVycy5hc3NldC5kaXJlY3RvcnknLFxuICAgIEZJTFRFUlNfQVNTRVRfRElSRUNUT1JZX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLmFzc2V0Lm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfU0VTU0lPTl9FTkFCTEVEOiAncG93ZXIuZmlsdGVycy5zZXNzaW9uLmVuYWJsZWQnLFxuICAgIEZJTFRFUlNfU0VTU0lPTl9PUFRJT05TOiAncG93ZXIuZmlsdGVycy5zZXNzaW9uLm9wdGlvbnMnLFxuICAgIEZJTFRFUlNfU0VTU0lPTl9TVE9SRTogJ3Bvd2VyLmZpbHRlcnMuc2Vzc2lvbi5zdG9yZScsXG4gICAgRklMVEVSU19DT09LSUVTX09QVElPTlM6ICdwb3dlci5maWx0ZXJzLmNvb2tpZXMub3B0aW9ucydcblxufTtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgU0VDUkVUOiBjcnlwdG8ucmFuZG9tQnl0ZXMoMzIpLnRvU3RyaW5nKCdoZXgnKVxufTtcblxuZnVuY3Rpb24gZXhpc3RzKHBhdGgpIHtcblxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmcy5zdGF0U3luYyhwYXRoKS5pc0ZpbGUoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVxdWlyZWQocGF0aCkge1xuXG4gICAgdmFyIHJldCA9IHJlcXVpcmUocGF0aCk7XG5cbiAgICBpZiAocmV0LmRlZmF1bHQpXG4gICAgICAgIHJldHVybiByZXQuZGVmYXVsdDtcblxuICAgIHJldHVybiByZXQ7XG5cbn1cblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIHByb3ZpZGVzIGFuIGFwaSBmb3IgcmVhZGluZyBpbnRlcmVzdGluZyB2YWx1ZXMgZnJvbSBhXG4gKiBtb2R1bGVzIGNvbmZpZ3VyYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gZGlyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICogQHByb3BlcnR5IHtvYmplY3R9IGtleXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwYXRoXG4gKiBUT0RPIERvY3VtZW50IHRoZSBwcm9wZXJ0aWVzIG9mIHRoaXMgY2xhc3MgcHJvcGVybHkuXG4gKi9cbmNsYXNzIENvbmZpZ3VyYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IoZGlyLCBwYXRoKSB7XG5cbiAgICAgICAgdGhpcy5wYXRocyA9IHtcbiAgICAgICAgICAgIHJvb3Q6IHBhdGgsXG4gICAgICAgICAgICBjb25maWc6IGAke3BhdGh9LyR7ZGlyfS9jb25maWcuanNgLFxuICAgICAgICAgICAgcm91dGVzOiBgJHtwYXRofS8ke2Rpcn0vcm91dGVzLmpzYCxcbiAgICAgICAgICAgIG1vZHVsZXM6IGAke3BhdGh9L21vZHVsZXNgLFxuICAgICAgICAgICAgY29ubmVjdG9yczogYCR7cGF0aH0vY29ubmVjdG9yc2AsXG4gICAgICAgICAgICBmaWx0ZXJzOiBgJHtwYXRofS9maWx0ZXJzYCxcbiAgICAgICAgICAgIG1pZGRsZXdhcmU6IGAke3BhdGh9L2FwcC9taWRkbGV3YXJlYCxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJzOiBgJHtwYXRofS9hcHAvY29udHJvbGxlcnNgLFxuICAgICAgICAgICAgbW9kZWxzOiBgJHtwYXRofS9hcHAvbW9kZWxzYCxcbiAgICAgICAgICAgIHZpZXdzOiBgJHtwYXRofS9hcHAvdmlld3NgLFxuICAgICAgICAgICAgbGliOiBgJHtwYXRofS9saWJgLFxuICAgICAgICAgICAgcHVibGljOiBgJHtwYXRofS9wdWJsaWNgXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5rZXlzID0ga2V5cztcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSAoZXhpc3RzKHRoaXMucGF0aHMuY29uZmlnKSkgPyByZXF1aXJlZCh0aGlzLnBhdGhzLmNvbmZpZykgOiB7fTtcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSAoZXhpc3RzKHRoaXMucGF0aHMucm91dGVzKSkgPyByZXF1aXJlZCh0aGlzLnBhdGhzLnJvdXRlcykgOiB7fTtcblxuICAgICAgICB0aGlzLl9yZXNvdXJjZXMgPSBuZXcgU2NoZW1lUmVzb3VyY2UobmV3IFN0cmluZ1Jlc291cmNlKCkpO1xuICAgICAgICB0aGlzLl9yZXNvdXJjZXMuYWRkKCdtb2R1bGUnLCBuZXcgUmVxdWlyZVJlc291cmNlKFBhdGgucmVzb2x2ZSh0aGlzLnBhdGhzLnJvb3QpKSk7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5hZGQoJ3JlcXVpcmUnLCBuZXcgUmVxdWlyZVJlc291cmNlKCkpO1xuICAgICAgICB0aGlzLl9yZXNvdXJjZXMuYWRkKCdlbnYnLCBuZXcgUHJvcGVydHlSZXNvdXJjZShwcm9jZXNzLmVudikpO1xuXG4gICAgfVxuXG4gICAgcmVhZChrZXksIGRlZmF1bHRzLCBtZXJnZSkge1xuXG4gICAgICAgIHZhciByZXQgPSAodGhpcy5vcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpID8gdGhpcy5vcHRpb25zW2tleV0gOiBkZWZhdWx0cztcblxuICAgICAgICBpZiAodHlwZW9mIHJldCA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzb3VyY2VzLmZpbmQocmV0KTtcblxuICAgICAgICBpZiAobWVyZ2UpXG4gICAgICAgICAgICByZXR1cm4gZGVlcG1lcmdlKG1lcmdlLCByZXQpO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXF1aXJlIHJlcXVpcmVzIGFsbCBmaWxlcyBpbiBhIHN1Yi1kaXJlY3RvcnkgaW50byBhIHNpbmdsZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGlyIFRoZSAgcGF0aC5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbWVyZ2UgQW4gb3B0aW9uYWwgb2JqZWN0IGZ1bmN0aW9ucyBjYW4gYmUgbWVyZ2VkIGludG8uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtwcmVmaXhdIEEgcHJlZml4IHRoYXQgd2lsbCBiZSBjb25jYXRlbmF0ZWQgdG8gdGhlIG9iamVjdCdzIGtleXNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHJlcXVpcmUoZGlyLCBtZXJnZSwgcHJlZml4KSB7XG5cbiAgICAgICAgdmFyIGZpbGVzO1xuICAgICAgICB2YXIgZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnMgfHwgWycuanMnLCAnLmpzb24nXTtcblxuICAgICAgICBtZXJnZSA9IG1lcmdlIHx8IHt9O1xuXG4gICAgICAgIHByZWZpeCA9IHByZWZpeCB8fCAnJztcbiAgICAgICAgcHJlZml4ID0gKHByZWZpeCkgPyBwcmVmaXggKyAnLicgOiBwcmVmaXg7XG4gICAgICAgIHByZWZpeCA9IChwcmVmaXhbMF0gPT09ICcvJykgPyBwcmVmaXgucmVwbGFjZSgnLycsICcnKSA6IHByZWZpeDtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnJlcGxhY2UoL1xcLy9nLCAnLicpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGRpcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZSB8fCB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxlcykpXG4gICAgICAgICAgICBmaWxlcy5mb3JFYWNoKChwYXRoVG9GaWxlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9ucy5pbmRleE9mKFBhdGguZXh0bmFtZShwYXRoVG9GaWxlKSkgPCAwKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBQcm9wZXJ0eS5zZXQobWVyZ2UsIHByZWZpeCArIFBhdGguYmFzZW5hbWUocGF0aFRvRmlsZSwgUGF0aC5leHRuYW1lKHBhdGhUb0ZpbGUpKSxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQoZGlyICsgJy8nICsgcGF0aFRvRmlsZSkpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbWVyZ2U7XG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdGlvblxuIl19