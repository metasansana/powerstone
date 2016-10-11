'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _OutputFilter = require('./OutputFilter');

var _OutputFilter2 = _interopRequireDefault(_OutputFilter);

var _AndOutputFilter = require('./AndOutputFilter');

var _AndOutputFilter2 = _interopRequireDefault(_AndOutputFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LameFilter = function () {
    function LameFilter() {
        _classCallCheck(this, LameFilter);
    }

    _createClass(LameFilter, [{
        key: 'and',
        value: function and(filter) {

            (0, _beof2.default)({ filter: filter }).instance(_OutputFilter2.default);
            return new _AndOutputFilter2.default(this, filter);
        }
    }, {
        key: 'apply',
        value: function apply(out, req, res) {

            return _bluebird2.default.resolve(out);
        }
    }]);

    return LameFilter;
}();

exports.default = LameFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvZmlsdGVycy9MYW1lRmlsdGVyLmpzIl0sIm5hbWVzIjpbIkxhbWVGaWx0ZXIiLCJmaWx0ZXIiLCJpbnN0YW5jZSIsIm91dCIsInJlcSIsInJlcyIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1BLFU7Ozs7Ozs7NEJBRUVDLE0sRUFBUTs7QUFFUixnQ0FBSyxFQUFFQSxjQUFGLEVBQUwsRUFBaUJDLFFBQWpCO0FBQ0EsbUJBQU8sOEJBQW9CLElBQXBCLEVBQTBCRCxNQUExQixDQUFQO0FBRUg7Ozs4QkFFS0UsRyxFQUFLQyxHLEVBQUtDLEcsRUFBSzs7QUFFakIsbUJBQU8sbUJBQVFDLE9BQVIsQ0FBZ0JILEdBQWhCLENBQVA7QUFFSDs7Ozs7O2tCQUlVSCxVIiwiZmlsZSI6IkxhbWVGaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBPdXRwdXRGaWx0ZXIgZnJvbSAnLi9PdXRwdXRGaWx0ZXInO1xuaW1wb3J0IEFuZE91dHB1dEZpbHRlciBmcm9tICcuL0FuZE91dHB1dEZpbHRlcic7XG5cbmNsYXNzIExhbWVGaWx0ZXIge1xuXG4gICAgYW5kKGZpbHRlcikge1xuXG4gICAgICAgIGJlb2YoeyBmaWx0ZXIgfSkuaW5zdGFuY2UoT3V0cHV0RmlsdGVyKTtcbiAgICAgICAgcmV0dXJuIG5ldyBBbmRPdXRwdXRGaWx0ZXIodGhpcywgZmlsdGVyKTtcblxuICAgIH1cblxuICAgIGFwcGx5KG91dCwgcmVxLCByZXMpIHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG91dCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGFtZUZpbHRlclxuIl19