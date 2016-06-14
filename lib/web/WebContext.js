'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _filtersDefaultFilters = require('./filters/DefaultFilters');

var _filtersDefaultFilters2 = _interopRequireDefault(_filtersDefaultFilters);

var _filtersAssetFilter = require('./filters/AssetFilter');

var _filtersAssetFilter2 = _interopRequireDefault(_filtersAssetFilter);

var WebContext = function WebContext() {
    _classCallCheck(this, WebContext);

    this.middleware = {};
    this.connectors = {};
    this.controllers = {};
    this.filters = {
        'default': _filtersDefaultFilters2['default'],
        'public': _filtersAssetFilter2['default']
    };
};

exports['default'] = WebContext;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViQ29udGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3FDQUEyQiwwQkFBMEI7Ozs7a0NBQzdCLHVCQUF1Qjs7OztJQUV6QyxVQUFVLEdBRUQsU0FGVCxVQUFVLEdBRUU7MEJBRlosVUFBVTs7QUFJUixRQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNyQixRQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNyQixRQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN0QixRQUFJLENBQUMsT0FBTyxHQUFHO0FBQ1gscURBQXVCO0FBQ25CLGlEQUFtQjtLQUMxQixDQUFDO0NBRUw7O3FCQUdVLFVBQVUiLCJmaWxlIjoiV2ViQ29udGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWZhdWx0RmlsdGVycyBmcm9tICcuL2ZpbHRlcnMvRGVmYXVsdEZpbHRlcnMnO1xuaW1wb3J0IEFzc2V0RmlsdGVyIGZyb20gJy4vZmlsdGVycy9Bc3NldEZpbHRlcic7XG5cbmNsYXNzIFdlYkNvbnRleHQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5taWRkbGV3YXJlID0ge307XG4gICAgICAgIHRoaXMuY29ubmVjdG9ycyA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJzID0ge307XG4gICAgICAgIHRoaXMuZmlsdGVycyA9IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IERlZmF1bHRGaWx0ZXJzLFxuICAgICAgICAgICAgICAgIHB1YmxpYzogQXNzZXRGaWx0ZXJcbiAgICAgICAgfTtcblxuICAgIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgV2ViQ29udGV4dFxuIl19