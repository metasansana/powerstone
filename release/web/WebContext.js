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
//# sourceMappingURL=WebContext.js.map