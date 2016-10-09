'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveIndex = require('serve-index');

var _serveIndex2 = _interopRequireDefault(_serveIndex);

/**
 * AssetFilter 
 * @implements {Filter}
 */

var AssetFilter = (function () {
    function AssetFilter() {
        _classCallCheck(this, AssetFilter);
    }

    _createClass(AssetFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            config.read(config.keys.FILTERS_ASSET_PATHS, [config.paths['public']]).forEach(function (path) {

                if (config.read(config.keys.FILTERS_ASSET_CHECK_PATHS, true)) if (_path2['default'].basename(path) !== 'public') _fs2['default'].accessSync(path, _fs2['default'].F_OK | _fs2['default'].R_OK);

                app.use(_express2['default']['static'](path, config.read(config.keys.FILTERS_ASSET_PATH_OPTIONS, null)));
            });

            config.read(config.keys.FILTERS.ASSET_DIRECTORY, []).forEach(function (path) {
                return app.use((0, _serveIndex2['default'])(path, config.read(config.keys.FILTERS_ASSET_DIRECTORY_OPTIONS, null)));
            });
        }
    }]);

    return AssetFilter;
})();

exports['default'] = new AssetFilter();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9Bc3NldEZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7a0JBQWUsSUFBSTs7OztvQkFDRixNQUFNOzs7O3VCQUNILFNBQVM7Ozs7MEJBQ0wsYUFBYTs7Ozs7Ozs7O0lBSy9CLFdBQVc7YUFBWCxXQUFXOzhCQUFYLFdBQVc7OztpQkFBWCxXQUFXOztlQUVSLGVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTs7QUFFZixrQkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssVUFBTyxDQUFDLENBQUMsQ0FDbkUsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJOztBQUVaLG9CQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsRUFDeEQsSUFBSSxrQkFBSyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssUUFBUSxFQUNoQyxnQkFBRyxVQUFVLENBQUMsSUFBSSxFQUFFLGdCQUFHLElBQUksR0FBRyxnQkFBRyxJQUFJLENBQUMsQ0FBQzs7QUFFL0MsbUJBQUcsQ0FBQyxHQUFHLENBQUMsOEJBQWMsQ0FBQyxJQUFJLEVBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFFbEUsQ0FBQyxDQUFDOztBQUVILGtCQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FDcEQsT0FBTyxDQUFDLFVBQUEsSUFBSTt1QkFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLDZCQUFZLElBQUksRUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFBQSxDQUFDLENBQUM7U0FFekU7OztXQXBCQyxXQUFXOzs7cUJBd0JGLElBQUksV0FBVyxFQUFFIiwiZmlsZSI6IkFzc2V0RmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBQYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgc2VydmVfaW5kZXggZnJvbSAnc2VydmUtaW5kZXgnO1xuLyoqXG4gKiBBc3NldEZpbHRlciBcbiAqIEBpbXBsZW1lbnRzIHtGaWx0ZXJ9XG4gKi9cbmNsYXNzIEFzc2V0RmlsdGVyIHtcblxuICAgIGFwcGx5KGFwcCwgY29uZmlnKSB7XG5cbiAgICAgICAgY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19BU1NFVF9QQVRIUywgW2NvbmZpZy5wYXRocy5wdWJsaWNdKS5cbiAgICAgICAgZm9yRWFjaChwYXRoID0+IHtcblxuICAgICAgICAgICAgaWYgKGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfQVNTRVRfQ0hFQ0tfUEFUSFMsIHRydWUpKVxuICAgICAgICAgICAgICAgIGlmIChQYXRoLmJhc2VuYW1lKHBhdGgpICE9PSAncHVibGljJylcbiAgICAgICAgICAgICAgICAgICAgZnMuYWNjZXNzU3luYyhwYXRoLCBmcy5GX09LIHwgZnMuUl9PSyk7XG5cbiAgICAgICAgICAgIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aCxcbiAgICAgICAgICAgICAgICBjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX0FTU0VUX1BBVEhfT1BUSU9OUywgbnVsbCkpKVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlMuQVNTRVRfRElSRUNUT1JZLCBbXSkuXG4gICAgICAgIGZvckVhY2gocGF0aCA9PiBhcHAudXNlKHNlcnZlX2luZGV4KHBhdGgsXG4gICAgICAgICAgICBjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX0FTU0VUX0RJUkVDVE9SWV9PUFRJT05TLCBudWxsKSkpKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQXNzZXRGaWx0ZXIoKVxuIl19