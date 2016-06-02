'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _filtersDefaultFilters = require('./filters/DefaultFilters');

var _filtersDefaultFilters2 = _interopRequireDefault(_filtersDefaultFilters);

/**
 * ApiContext is a class that stores a shared context between
 * modules and their submodules.
 */

var ApiContext = function ApiContext() {
    _classCallCheck(this, ApiContext);

    this.middleware = {};
    this.connectors = {};
    this.controllers = {};
    this.filters = {
        'default': _filtersDefaultFilters2['default'],
        'public': {
            apply: function apply() {}
        }
    };
};

exports['default'] = ApiContext;
module.exports = exports['default'];
//# sourceMappingURL=ApiContext.js.map