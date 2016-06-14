'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

/**
 * MethodOverrideFilter 
 * @implements {Filter}
 */

var MethodOverrideFilter = (function () {
  function MethodOverrideFilter() {
    _classCallCheck(this, MethodOverrideFilter);
  }

  _createClass(MethodOverrideFilter, [{
    key: 'apply',
    value: function apply(app, config) {

      app.use((0, _methodOverride2['default'])());
    }
  }]);

  return MethodOverrideFilter;
})();

exports['default'] = new MethodOverrideFilter();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWIvZmlsdGVycy9NZXRob2RPdmVycmlkZUZpbHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OEJBQTJCLGlCQUFpQjs7Ozs7Ozs7O0lBS3RDLG9CQUFvQjtXQUFwQixvQkFBb0I7MEJBQXBCLG9CQUFvQjs7O2VBQXBCLG9CQUFvQjs7V0FFbkIsZUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFOztBQUVqQixTQUFHLENBQUMsR0FBRyxDQUFDLGtDQUFnQixDQUFDLENBQUM7S0FFM0I7OztTQU5HLG9CQUFvQjs7O3FCQVNYLElBQUksb0JBQW9CLEVBQUUiLCJmaWxlIjoiTWV0aG9kT3ZlcnJpZGVGaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWV0aG9kT3ZlcnJpZGUgZnJvbSAnbWV0aG9kLW92ZXJyaWRlJztcbi8qKlxuICogTWV0aG9kT3ZlcnJpZGVGaWx0ZXIgXG4gKiBAaW1wbGVtZW50cyB7RmlsdGVyfVxuICovXG5jbGFzcyBNZXRob2RPdmVycmlkZUZpbHRlciB7XG5cbiAgYXBwbHkoYXBwLCBjb25maWcpIHtcblxuICAgIGFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XG5cbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBuZXcgTWV0aG9kT3ZlcnJpZGVGaWx0ZXIoKVxuXG4iXX0=