'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveIndex = require('serve-index');

var _serveIndex2 = _interopRequireDefault(_serveIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * AssetFilter 
 * @implements {Filter}
 */
var AssetFilter = function () {
    function AssetFilter() {
        _classCallCheck(this, AssetFilter);
    }

    _createClass(AssetFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            config.read(config.keys.FILTERS_ASSET_PATHS, [config.paths.public]).forEach(function (path) {

                if (config.read(config.keys.FILTERS_ASSET_CHECK_PATHS, true)) if (_path2.default.basename(path) !== 'public') _fs2.default.accessSync(path, _fs2.default.F_OK | _fs2.default.R_OK);

                app.use(_express2.default.static(path, config.read(config.keys.FILTERS_ASSET_PATH_OPTIONS, null)));
            });

            config.read(config.keys.FILTERS.ASSET_DIRECTORY, []).forEach(function (path) {
                return app.use((0, _serveIndex2.default)(path, config.read(config.keys.FILTERS_ASSET_DIRECTORY_OPTIONS, null)));
            });
        }
    }]);

    return AssetFilter;
}();

exports.default = new AssetFilter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9Bc3NldEZpbHRlci5qcyJdLCJuYW1lcyI6WyJBc3NldEZpbHRlciIsImFwcCIsImNvbmZpZyIsInJlYWQiLCJrZXlzIiwiRklMVEVSU19BU1NFVF9QQVRIUyIsInBhdGhzIiwicHVibGljIiwiZm9yRWFjaCIsIkZJTFRFUlNfQVNTRVRfQ0hFQ0tfUEFUSFMiLCJiYXNlbmFtZSIsInBhdGgiLCJhY2Nlc3NTeW5jIiwiRl9PSyIsIlJfT0siLCJ1c2UiLCJzdGF0aWMiLCJGSUxURVJTX0FTU0VUX1BBVEhfT1BUSU9OUyIsIkZJTFRFUlMiLCJBU1NFVF9ESVJFQ1RPUlkiLCJGSUxURVJTX0FTU0VUX0RJUkVDVE9SWV9PUFRJT05TIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUNBOzs7O0lBSU1BLFc7Ozs7Ozs7OEJBRUlDLEcsRUFBS0MsTSxFQUFROztBQUVmQSxtQkFBT0MsSUFBUCxDQUFZRCxPQUFPRSxJQUFQLENBQVlDLG1CQUF4QixFQUE2QyxDQUFDSCxPQUFPSSxLQUFQLENBQWFDLE1BQWQsQ0FBN0MsRUFDQUMsT0FEQSxDQUNRLGdCQUFROztBQUVaLG9CQUFJTixPQUFPQyxJQUFQLENBQVlELE9BQU9FLElBQVAsQ0FBWUsseUJBQXhCLEVBQW1ELElBQW5ELENBQUosRUFDSSxJQUFJLGVBQUtDLFFBQUwsQ0FBY0MsSUFBZCxNQUF3QixRQUE1QixFQUNJLGFBQUdDLFVBQUgsQ0FBY0QsSUFBZCxFQUFvQixhQUFHRSxJQUFILEdBQVUsYUFBR0MsSUFBakM7O0FBRVJiLG9CQUFJYyxHQUFKLENBQVEsa0JBQVFDLE1BQVIsQ0FBZUwsSUFBZixFQUNKVCxPQUFPQyxJQUFQLENBQVlELE9BQU9FLElBQVAsQ0FBWWEsMEJBQXhCLEVBQW9ELElBQXBELENBREksQ0FBUjtBQUdILGFBVkQ7O0FBWUFmLG1CQUFPQyxJQUFQLENBQVlELE9BQU9FLElBQVAsQ0FBWWMsT0FBWixDQUFvQkMsZUFBaEMsRUFBaUQsRUFBakQsRUFDQVgsT0FEQSxDQUNRO0FBQUEsdUJBQVFQLElBQUljLEdBQUosQ0FBUSwwQkFBWUosSUFBWixFQUNwQlQsT0FBT0MsSUFBUCxDQUFZRCxPQUFPRSxJQUFQLENBQVlnQiwrQkFBeEIsRUFBeUQsSUFBekQsQ0FEb0IsQ0FBUixDQUFSO0FBQUEsYUFEUjtBQUlIOzs7Ozs7a0JBSVUsSUFBSXBCLFdBQUosRSIsImZpbGUiOiJBc3NldEZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgUGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHNlcnZlX2luZGV4IGZyb20gJ3NlcnZlLWluZGV4Jztcbi8qKlxuICogQXNzZXRGaWx0ZXIgXG4gKiBAaW1wbGVtZW50cyB7RmlsdGVyfVxuICovXG5jbGFzcyBBc3NldEZpbHRlciB7XG5cbiAgICBhcHBseShhcHAsIGNvbmZpZykge1xuXG4gICAgICAgIGNvbmZpZy5yZWFkKGNvbmZpZy5rZXlzLkZJTFRFUlNfQVNTRVRfUEFUSFMsIFtjb25maWcucGF0aHMucHVibGljXSkuXG4gICAgICAgIGZvckVhY2gocGF0aCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTX0FTU0VUX0NIRUNLX1BBVEhTLCB0cnVlKSlcbiAgICAgICAgICAgICAgICBpZiAoUGF0aC5iYXNlbmFtZShwYXRoKSAhPT0gJ3B1YmxpYycpXG4gICAgICAgICAgICAgICAgICAgIGZzLmFjY2Vzc1N5bmMocGF0aCwgZnMuRl9PSyB8IGZzLlJfT0spO1xuXG4gICAgICAgICAgICBhcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGgsXG4gICAgICAgICAgICAgICAgY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19BU1NFVF9QQVRIX09QVElPTlMsIG51bGwpKSlcblxuICAgICAgICB9KTtcblxuICAgICAgICBjb25maWcucmVhZChjb25maWcua2V5cy5GSUxURVJTLkFTU0VUX0RJUkVDVE9SWSwgW10pLlxuICAgICAgICBmb3JFYWNoKHBhdGggPT4gYXBwLnVzZShzZXJ2ZV9pbmRleChwYXRoLFxuICAgICAgICAgICAgY29uZmlnLnJlYWQoY29uZmlnLmtleXMuRklMVEVSU19BU1NFVF9ESVJFQ1RPUllfT1BUSU9OUywgbnVsbCkpKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEFzc2V0RmlsdGVyKClcbiJdfQ==