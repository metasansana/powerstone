'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
            //TODO consider checking if the paths exists first
            config.read(config.keys.FILTERS_ASSET_PATHS, [config.paths['public']]).forEach(function (path) {
                return app.use(_express2['default']['static'](path, config.read(config.keys.FILTERS_ASSET_PATH_OPTIONS, null)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9Bc3NldEZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7dUJBQW9CLFNBQVM7Ozs7MEJBQ0wsYUFBYTs7Ozs7Ozs7O0lBSy9CLFdBQVc7YUFBWCxXQUFXOzhCQUFYLFdBQVc7OztpQkFBWCxXQUFXOztlQUVSLGVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTs7QUFFZixrQkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssVUFBTyxDQUFDLENBQUMsQ0FDbkUsT0FBTyxDQUFDLFVBQUEsSUFBSTt1QkFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLDhCQUFjLENBQUMsSUFBSSxFQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUFBLENBQUMsQ0FBQzs7QUFFakUsa0JBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUNsRCxPQUFPLENBQUMsVUFBQSxJQUFJO3VCQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsNkJBQVksSUFBSSxFQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUFBLENBQUMsQ0FBQztTQUV6RTs7O1dBWkMsV0FBVzs7O3FCQWdCRixJQUFJLFdBQVcsRUFBRSIsImZpbGUiOiJBc3NldEZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHNlcnZlX2luZGV4IGZyb20gJ3NlcnZlLWluZGV4Jztcbi8qKlxuICogQXNzZXRGaWx0ZXIgXG4gKiBAaW1wbGVtZW50cyB7RmlsdGVyfVxuICovXG5jbGFzcyBBc3NldEZpbHRlciB7XG5cbiAgICBhcHBseShhcHAsIGNvbmZpZykge1xuLy9UT0RPIGNvbnNpZGVyIGNoZWNraW5nIGlmIHRoZSBwYXRocyBleGlzdHMgZmlyc3RcbiAgICAgICAgY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19BU1NFVF9QQVRIUywgW2NvbmZpZy5wYXRocy5wdWJsaWNdKS5cbiAgICAgICAgZm9yRWFjaChwYXRoID0+IGFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aCxcbiAgICAgICAgICAgIGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfQVNTRVRfUEFUSF9PUFRJT05TLCBudWxsKSkpKTtcblxuICAgICAgICBjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTLkFTU0VUX0RJUkVDVE9SWSwgW10pLlxuICAgICAgICAgIGZvckVhY2gocGF0aCA9PiBhcHAudXNlKHNlcnZlX2luZGV4KHBhdGgsXG4gICAgICAgICAgICBjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX0FTU0VUX0RJUkVDVE9SWV9PUFRJT05TLCBudWxsKSkpKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQXNzZXRGaWx0ZXIoKVxuIl19