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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpQ29udGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3FDQUEyQiwwQkFBMEI7Ozs7Ozs7OztJQU0vQyxVQUFVLEdBRUQsU0FGVCxVQUFVLEdBRUU7MEJBRlosVUFBVTs7QUFJUixRQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNyQixRQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNyQixRQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN0QixRQUFJLENBQUMsT0FBTyxHQUFHO0FBQ1gscURBQXVCO0FBQ3ZCLGtCQUFRO0FBQ0osaUJBQUssRUFBQSxpQkFBRyxFQUFFO1NBQ2I7S0FDSixDQUFDO0NBRUw7O3FCQUdVLFVBQVUiLCJmaWxlIjoiQXBpQ29udGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWZhdWx0RmlsdGVycyBmcm9tICcuL2ZpbHRlcnMvRGVmYXVsdEZpbHRlcnMnO1xuXG4vKipcbiAqIEFwaUNvbnRleHQgaXMgYSBjbGFzcyB0aGF0IHN0b3JlcyBhIHNoYXJlZCBjb250ZXh0IGJldHdlZW5cbiAqIG1vZHVsZXMgYW5kIHRoZWlyIHN1Ym1vZHVsZXMuXG4gKi9cbmNsYXNzIEFwaUNvbnRleHQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5taWRkbGV3YXJlID0ge307XG4gICAgICAgIHRoaXMuY29ubmVjdG9ycyA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJzID0ge307XG4gICAgICAgIHRoaXMuZmlsdGVycyA9IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IERlZmF1bHRGaWx0ZXJzLFxuICAgICAgICAgICAgcHVibGljOiB7XG4gICAgICAgICAgICAgICAgYXBwbHkoKSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBBcGlDb250ZXh0XG4iXX0=