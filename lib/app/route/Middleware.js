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

var UnknownMiddlewareError = function (_Error) {
    _inherits(UnknownMiddlewareError, _Error);

    function UnknownMiddlewareError(ware, list) {
        _classCallCheck(this, UnknownMiddlewareError);

        return _possibleConstructorReturn(this, (UnknownMiddlewareError.__proto__ || Object.getPrototypeOf(UnknownMiddlewareError)).call(this, 'Middleware \'' + ware + '\' was not found! Found: ' + Object.keys(list)));
    }

    return UnknownMiddlewareError;
}(_es6Error2.default);

/**
 *
 */


var Middleware = function () {
    function Middleware() {
        _classCallCheck(this, Middleware);
    }

    _createClass(Middleware, null, [{
        key: 'prepare',
        value: function prepare(def, action, resource) {

            if (typeof def.middleware !== 'string') return;

            def.middleware.split(',').forEach(function (m) {

                var Mware = resource.find(m);
                var mware;

                if (!Mware) throw new UnknownMiddlewareError(m, action.route.module.application.context.middleware);

                if (typeof Mware !== 'function') throw new TypeError('Middleware must be constructor functions! For \'' + m + '\'');

                mware = new Mware(action, action.route.module, action.route.module.application);
                action.callbacks.push(function (req, res, next) {
                    return mware.apply(action.factory.request(req, action), action.factory.response(res, action), next);
                });
            });
        }
    }]);

    return Middleware;
}();

exports.default = Middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvTWlkZGxld2FyZS5qcyJdLCJuYW1lcyI6WyJVbmtub3duTWlkZGxld2FyZUVycm9yIiwid2FyZSIsImxpc3QiLCJPYmplY3QiLCJrZXlzIiwiTWlkZGxld2FyZSIsImRlZiIsImFjdGlvbiIsInJlc291cmNlIiwibWlkZGxld2FyZSIsInNwbGl0IiwiZm9yRWFjaCIsIk13YXJlIiwiZmluZCIsIm0iLCJtd2FyZSIsInJvdXRlIiwibW9kdWxlIiwiYXBwbGljYXRpb24iLCJjb250ZXh0IiwiVHlwZUVycm9yIiwiY2FsbGJhY2tzIiwicHVzaCIsInJlcSIsInJlcyIsIm5leHQiLCJhcHBseSIsImZhY3RvcnkiLCJyZXF1ZXN0IiwicmVzcG9uc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLHNCOzs7QUFFRixvQ0FBWUMsSUFBWixFQUFrQkMsSUFBbEIsRUFBd0I7QUFBQTs7QUFBQSxpS0FFQ0QsSUFGRCxpQ0FFZ0NFLE9BQU9DLElBQVAsQ0FBWUYsSUFBWixDQUZoQztBQUl2Qjs7Ozs7QUFJTDs7Ozs7SUFHTUcsVTs7Ozs7OztnQ0FFYUMsRyxFQUFLQyxNLEVBQVFDLFEsRUFBVTs7QUFFbEMsZ0JBQUksT0FBT0YsSUFBSUcsVUFBWCxLQUEwQixRQUE5QixFQUF3Qzs7QUFFeENILGdCQUFJRyxVQUFKLENBQWVDLEtBQWYsQ0FBcUIsR0FBckIsRUFDQUMsT0FEQSxDQUNRLGFBQUs7O0FBRVQsb0JBQUlDLFFBQVFKLFNBQVNLLElBQVQsQ0FBY0MsQ0FBZCxDQUFaO0FBQ0Esb0JBQUlDLEtBQUo7O0FBRUEsb0JBQUksQ0FBQ0gsS0FBTCxFQUNJLE1BQU0sSUFBSVosc0JBQUosQ0FBMkJjLENBQTNCLEVBQThCUCxPQUFPUyxLQUFQLENBQWFDLE1BQWIsQ0FBb0JDLFdBQXBCLENBQWdDQyxPQUFoQyxDQUF3Q1YsVUFBdEUsQ0FBTjs7QUFFSixvQkFBSSxPQUFPRyxLQUFQLEtBQWlCLFVBQXJCLEVBQ0ksTUFBTSxJQUFJUSxTQUFKLHNEQUFnRU4sQ0FBaEUsUUFBTjs7QUFFSkMsd0JBQVEsSUFBSUgsS0FBSixDQUFVTCxNQUFWLEVBQWtCQSxPQUFPUyxLQUFQLENBQWFDLE1BQS9CLEVBQXVDVixPQUFPUyxLQUFQLENBQWFDLE1BQWIsQ0FBb0JDLFdBQTNELENBQVI7QUFDQVgsdUJBQU9jLFNBQVAsQ0FBaUJDLElBQWpCLENBQXNCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxJQUFYO0FBQUEsMkJBQ2xCVixNQUFNVyxLQUFOLENBQVluQixPQUFPb0IsT0FBUCxDQUFlQyxPQUFmLENBQXVCTCxHQUF2QixFQUE0QmhCLE1BQTVCLENBQVosRUFDSUEsT0FBT29CLE9BQVAsQ0FBZUUsUUFBZixDQUF3QkwsR0FBeEIsRUFBNkJqQixNQUE3QixDQURKLEVBQzBDa0IsSUFEMUMsQ0FEa0I7QUFBQSxpQkFBdEI7QUFJSCxhQWpCRDtBQW1CSDs7Ozs7O2tCQUdVcEIsVSIsImZpbGUiOiJNaWRkbGV3YXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yIGZyb20gJ2VzNi1lcnJvcic7XG5pbXBvcnQgcHJvcGVydHkgZnJvbSAncHJvcGVydHktc2Vlayc7XG5cbmNsYXNzIFVua25vd25NaWRkbGV3YXJlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcih3YXJlLCBsaXN0KSB7XG5cbiAgICAgICAgc3VwZXIoYE1pZGRsZXdhcmUgJyR7d2FyZX0nIHdhcyBub3QgZm91bmQhIEZvdW5kOiAke09iamVjdC5rZXlzKGxpc3QpfWApO1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgTWlkZGxld2FyZSB7XG5cbiAgICBzdGF0aWMgcHJlcGFyZShkZWYsIGFjdGlvbiwgcmVzb3VyY2UpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGRlZi5taWRkbGV3YXJlICE9PSAnc3RyaW5nJykgcmV0dXJuO1xuXG4gICAgICAgIGRlZi5taWRkbGV3YXJlLnNwbGl0KCcsJykuXG4gICAgICAgIGZvckVhY2gobSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBNd2FyZSA9IHJlc291cmNlLmZpbmQobSk7XG4gICAgICAgICAgICB2YXIgbXdhcmVcblxuICAgICAgICAgICAgaWYgKCFNd2FyZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVW5rbm93bk1pZGRsZXdhcmVFcnJvcihtLCBhY3Rpb24ucm91dGUubW9kdWxlLmFwcGxpY2F0aW9uLmNvbnRleHQubWlkZGxld2FyZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgTXdhcmUgIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTWlkZGxld2FyZSBtdXN0IGJlIGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyEgRm9yICcke219J2ApO1xuXG4gICAgICAgICAgICBtd2FyZSA9IG5ldyBNd2FyZShhY3Rpb24sIGFjdGlvbi5yb3V0ZS5tb2R1bGUsIGFjdGlvbi5yb3V0ZS5tb2R1bGUuYXBwbGljYXRpb24pO1xuICAgICAgICAgICAgYWN0aW9uLmNhbGxiYWNrcy5wdXNoKChyZXEsIHJlcywgbmV4dCkgPT5cbiAgICAgICAgICAgICAgICBtd2FyZS5hcHBseShhY3Rpb24uZmFjdG9yeS5yZXF1ZXN0KHJlcSwgYWN0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmZhY3RvcnkucmVzcG9uc2UocmVzLCBhY3Rpb24pLCBuZXh0KSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1pZGRsZXdhcmVcbiJdfQ==