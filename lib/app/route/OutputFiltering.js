'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnknownOutputFilterError = function (_Error) {
    _inherits(UnknownOutputFilterError, _Error);

    function UnknownOutputFilterError(f, list) {
        _classCallCheck(this, UnknownOutputFilterError);

        return _possibleConstructorReturn(this, (UnknownOutputFilterError.__proto__ || Object.getPrototypeOf(UnknownOutputFilterError)).call(this, 'OutputFilter\'' + f + '\' was not found! Found: ' + Object.keys(list)));
    }

    return UnknownOutputFilterError;
}(_es6Error2.default);

/**
 *
 */


var OutputFiltering = function () {
    function OutputFiltering() {
        _classCallCheck(this, OutputFiltering);
    }

    _createClass(OutputFiltering, null, [{
        key: 'prepare',
        value: function prepare(def, action, resource) {

            var output = def.output;

            if (!output) return;

            if (typeof output === 'string') output = output.split(',');

            if (!Array.isArray(output)) throw new TypeError('The \'output\' directive must be a string or array!');

            output.forEach(function (o) {

                var Filter = resource.find(o);
                var filter;

                if (!Filter) throw new UnknownOutputFilteringError(m, action.route.module.application.context.outputFilters);

                if (typeof Filter !== 'function') throw new TypeError('OutputFiltering: invalid constructor function for: \'' + m + '\'!');

                action.output = action.output.and(new Filter(action, action.route, action.route.module));
            });
        }
    }]);

    return OutputFiltering;
}();

exports.default = OutputFiltering;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvT3V0cHV0RmlsdGVyaW5nLmpzIl0sIm5hbWVzIjpbIlVua25vd25PdXRwdXRGaWx0ZXJFcnJvciIsImYiLCJsaXN0IiwiT2JqZWN0Iiwia2V5cyIsIk91dHB1dEZpbHRlcmluZyIsImRlZiIsImFjdGlvbiIsInJlc291cmNlIiwib3V0cHV0Iiwic3BsaXQiLCJBcnJheSIsImlzQXJyYXkiLCJUeXBlRXJyb3IiLCJmb3JFYWNoIiwiRmlsdGVyIiwiZmluZCIsIm8iLCJmaWx0ZXIiLCJVbmtub3duT3V0cHV0RmlsdGVyaW5nRXJyb3IiLCJtIiwicm91dGUiLCJtb2R1bGUiLCJhcHBsaWNhdGlvbiIsImNvbnRleHQiLCJvdXRwdXRGaWx0ZXJzIiwiYW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSx3Qjs7O0FBRUYsc0NBQVlDLENBQVosRUFBZUMsSUFBZixFQUFxQjtBQUFBOztBQUFBLHNLQUVLRCxDQUZMLGlDQUVpQ0UsT0FBT0MsSUFBUCxDQUFZRixJQUFaLENBRmpDO0FBSXBCOzs7OztBQUlMOzs7OztJQUdNRyxlOzs7Ozs7O2dDQUVhQyxHLEVBQUtDLE0sRUFBUUMsUSxFQUFVOztBQUVsQyxnQkFBSUMsU0FBU0gsSUFBSUcsTUFBakI7O0FBRUEsZ0JBQUksQ0FBQ0EsTUFBTCxFQUFhOztBQUViLGdCQUFJLE9BQU9BLE1BQVAsS0FBa0IsUUFBdEIsRUFDSUEsU0FBU0EsT0FBT0MsS0FBUCxDQUFhLEdBQWIsQ0FBVDs7QUFFSixnQkFBSSxDQUFDQyxNQUFNQyxPQUFOLENBQWNILE1BQWQsQ0FBTCxFQUNJLE1BQU0sSUFBSUksU0FBSixDQUFjLHFEQUFkLENBQU47O0FBRUpKLG1CQUFPSyxPQUFQLENBQWUsYUFBSzs7QUFFaEIsb0JBQUlDLFNBQVNQLFNBQVNRLElBQVQsQ0FBY0MsQ0FBZCxDQUFiO0FBQ0Esb0JBQUlDLE1BQUo7O0FBRUEsb0JBQUksQ0FBQ0gsTUFBTCxFQUNJLE1BQU0sSUFBSUksMkJBQUosQ0FBZ0NDLENBQWhDLEVBQ0ZiLE9BQU9jLEtBQVAsQ0FBYUMsTUFBYixDQUFvQkMsV0FBcEIsQ0FBZ0NDLE9BQWhDLENBQXdDQyxhQUR0QyxDQUFOOztBQUdKLG9CQUFJLE9BQU9WLE1BQVAsS0FBa0IsVUFBdEIsRUFDSSxNQUFNLElBQUlGLFNBQUosMkRBQXFFTyxDQUFyRSxTQUFOOztBQUVKYix1QkFBT0UsTUFBUCxHQUFnQkYsT0FBT0UsTUFBUCxDQUFjaUIsR0FBZCxDQUFrQixJQUFJWCxNQUFKLENBQVdSLE1BQVgsRUFBbUJBLE9BQU9jLEtBQTFCLEVBQWlDZCxPQUFPYyxLQUFQLENBQWFDLE1BQTlDLENBQWxCLENBQWhCO0FBRUgsYUFkRDtBQWdCSDs7Ozs7O2tCQUdVakIsZSIsImZpbGUiOiJPdXRwdXRGaWx0ZXJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJyb3IgZnJvbSAnZXM2LWVycm9yJztcbmltcG9ydCBwcm9wZXJ0eSBmcm9tICdwcm9wZXJ0eS1zZWVrJztcblxuY2xhc3MgVW5rbm93bk91dHB1dEZpbHRlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IoZiwgbGlzdCkge1xuXG4gICAgICAgIHN1cGVyKGBPdXRwdXRGaWx0ZXInJHtmfScgd2FzIG5vdCBmb3VuZCEgRm91bmQ6ICR7T2JqZWN0LmtleXMobGlzdCl9YCk7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKlxuICovXG5jbGFzcyBPdXRwdXRGaWx0ZXJpbmcge1xuXG4gICAgc3RhdGljIHByZXBhcmUoZGVmLCBhY3Rpb24sIHJlc291cmNlKSB7XG5cbiAgICAgICAgdmFyIG91dHB1dCA9IGRlZi5vdXRwdXQ7XG5cbiAgICAgICAgaWYgKCFvdXRwdXQpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQuc3BsaXQoJywnKTtcblxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkob3V0cHV0KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcXCdvdXRwdXRcXCcgZGlyZWN0aXZlIG11c3QgYmUgYSBzdHJpbmcgb3IgYXJyYXkhJyk7XG5cbiAgICAgICAgb3V0cHV0LmZvckVhY2gobyA9PiB7XG5cbiAgICAgICAgICAgIHZhciBGaWx0ZXIgPSByZXNvdXJjZS5maW5kKG8pO1xuICAgICAgICAgICAgdmFyIGZpbHRlcjtcblxuICAgICAgICAgICAgaWYgKCFGaWx0ZXIpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25PdXRwdXRGaWx0ZXJpbmdFcnJvcihtLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ucm91dGUubW9kdWxlLmFwcGxpY2F0aW9uLmNvbnRleHQub3V0cHV0RmlsdGVycyk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgRmlsdGVyICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE91dHB1dEZpbHRlcmluZzogaW52YWxpZCBjb25zdHJ1Y3RvciBmdW5jdGlvbiBmb3I6ICcke219JyFgKTtcblxuICAgICAgICAgICAgYWN0aW9uLm91dHB1dCA9IGFjdGlvbi5vdXRwdXQuYW5kKG5ldyBGaWx0ZXIoYWN0aW9uLCBhY3Rpb24ucm91dGUsIGFjdGlvbi5yb3V0ZS5tb2R1bGUpKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT3V0cHV0RmlsdGVyaW5nXG4iXX0=