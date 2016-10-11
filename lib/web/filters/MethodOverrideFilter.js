'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * MethodOverrideFilter 
 * @implements {Filter}
 */
var MethodOverrideFilter = function () {
  function MethodOverrideFilter() {
    _classCallCheck(this, MethodOverrideFilter);
  }

  _createClass(MethodOverrideFilter, [{
    key: 'apply',
    value: function apply(app, config) {

      app.use((0, _methodOverride2.default)());
    }
  }]);

  return MethodOverrideFilter;
}();

exports.default = new MethodOverrideFilter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9NZXRob2RPdmVycmlkZUZpbHRlci5qcyJdLCJuYW1lcyI6WyJNZXRob2RPdmVycmlkZUZpbHRlciIsImFwcCIsImNvbmZpZyIsInVzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFDQTs7OztJQUlNQSxvQjs7Ozs7OzswQkFFRUMsRyxFQUFLQyxNLEVBQVE7O0FBRWpCRCxVQUFJRSxHQUFKLENBQVEsK0JBQVI7QUFFRDs7Ozs7O2tCQUdZLElBQUlILG9CQUFKLEUiLCJmaWxlIjoiTWV0aG9kT3ZlcnJpZGVGaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWV0aG9kT3ZlcnJpZGUgZnJvbSAnbWV0aG9kLW92ZXJyaWRlJztcbi8qKlxuICogTWV0aG9kT3ZlcnJpZGVGaWx0ZXIgXG4gKiBAaW1wbGVtZW50cyB7RmlsdGVyfVxuICovXG5jbGFzcyBNZXRob2RPdmVycmlkZUZpbHRlciB7XG5cbiAgYXBwbHkoYXBwLCBjb25maWcpIHtcblxuICAgIGFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XG5cbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBuZXcgTWV0aG9kT3ZlcnJpZGVGaWx0ZXIoKVxuXG4iXX0=