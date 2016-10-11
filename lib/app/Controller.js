'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _Action = require('./route/Action');

var _Action2 = _interopRequireDefault(_Action);

var _Module = require('./Module');

var _Module2 = _interopRequireDefault(_Module);

var _Application = require('./Application');

var _Application2 = _interopRequireDefault(_Application);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller
 * @param {Action} action
 * @param {Module} module
 * @param {Application} app
 */
var Controller = function Controller(action, module, app) {
    _classCallCheck(this, Controller);

    (0, _beof2.default)({ action: action }).instance(_Action2.default);
    (0, _beof2.default)({ module: module }).instance(_Module2.default);
    (0, _beof2.default)({ app: app }).instance(_Application2.default);

    this.action = action;
    this.module = module;
    this.application = app;
};

exports.default = Controller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJDb250cm9sbGVyIiwiYWN0aW9uIiwibW9kdWxlIiwiYXBwIiwiaW5zdGFuY2UiLCJhcHBsaWNhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7OztJQU1NQSxVLEdBRUYsb0JBQVlDLE1BQVosRUFBb0JDLE1BQXBCLEVBQTRCQyxHQUE1QixFQUFpQztBQUFBOztBQUU3Qix3QkFBSyxFQUFFRixjQUFGLEVBQUwsRUFBaUJHLFFBQWpCO0FBQ0Esd0JBQUssRUFBRUYsY0FBRixFQUFMLEVBQWlCRSxRQUFqQjtBQUNBLHdCQUFLLEVBQUVELFFBQUYsRUFBTCxFQUFjQyxRQUFkOztBQUVBLFNBQUtILE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtHLFdBQUwsR0FBbUJGLEdBQW5CO0FBRUgsQzs7a0JBSVVILFUiLCJmaWxlIjoiQ29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IEFjdGlvbiBmcm9tICcuL3JvdXRlL0FjdGlvbic7XG5pbXBvcnQgTW9kdWxlIGZyb20gJy4vTW9kdWxlJztcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuL0FwcGxpY2F0aW9uJztcblxuLyoqXG4gKiBDb250cm9sbGVyXG4gKiBAcGFyYW0ge0FjdGlvbn0gYWN0aW9uXG4gKiBAcGFyYW0ge01vZHVsZX0gbW9kdWxlXG4gKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBcbiAqL1xuY2xhc3MgQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihhY3Rpb24sIG1vZHVsZSwgYXBwKSB7XG5cbiAgICAgICAgYmVvZih7IGFjdGlvbiB9KS5pbnN0YW5jZShBY3Rpb24pO1xuICAgICAgICBiZW9mKHsgbW9kdWxlIH0pLmluc3RhbmNlKE1vZHVsZSk7XG4gICAgICAgIGJlb2YoeyBhcHAgfSkuaW5zdGFuY2UoQXBwbGljYXRpb24pO1xuXG4gICAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICB0aGlzLm1vZHVsZSA9IG1vZHVsZTtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbiA9IGFwcDtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyXG4iXX0=