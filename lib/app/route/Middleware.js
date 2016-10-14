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

                    var preq = action.factory.request(req, res, action.output);
                    var pres = action.factory.response(req, res, action.output);

                    Promise.resolve(mware.apply(preq, pres, next)).catch(function (e) {
                        return action.route.module.application.onRouteErrorListener.onRouteError(e, preq, pres, next);
                    });
                });
            });
        }
    }]);

    return Middleware;
}();

exports.default = Middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvTWlkZGxld2FyZS5qcyJdLCJuYW1lcyI6WyJVbmtub3duTWlkZGxld2FyZUVycm9yIiwid2FyZSIsImxpc3QiLCJPYmplY3QiLCJrZXlzIiwiTWlkZGxld2FyZSIsImRlZiIsImFjdGlvbiIsInJlc291cmNlIiwibWlkZGxld2FyZSIsInNwbGl0IiwiZm9yRWFjaCIsIk13YXJlIiwiZmluZCIsIm0iLCJtd2FyZSIsInJvdXRlIiwibW9kdWxlIiwiYXBwbGljYXRpb24iLCJjb250ZXh0IiwiVHlwZUVycm9yIiwiY2FsbGJhY2tzIiwicHVzaCIsInJlcSIsInJlcyIsIm5leHQiLCJwcmVxIiwiZmFjdG9yeSIsInJlcXVlc3QiLCJvdXRwdXQiLCJwcmVzIiwicmVzcG9uc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsImFwcGx5IiwiY2F0Y2giLCJvblJvdXRlRXJyb3JMaXN0ZW5lciIsIm9uUm91dGVFcnJvciIsImUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLHNCOzs7QUFFRixvQ0FBWUMsSUFBWixFQUFrQkMsSUFBbEIsRUFBd0I7QUFBQTs7QUFBQSxpS0FFQ0QsSUFGRCxpQ0FFZ0NFLE9BQU9DLElBQVAsQ0FBWUYsSUFBWixDQUZoQztBQUl2Qjs7Ozs7QUFJTDs7Ozs7SUFHTUcsVTs7Ozs7OztnQ0FFYUMsRyxFQUFLQyxNLEVBQVFDLFEsRUFBVTs7QUFFbEMsZ0JBQUksT0FBT0YsSUFBSUcsVUFBWCxLQUEwQixRQUE5QixFQUF3Qzs7QUFFeENILGdCQUFJRyxVQUFKLENBQWVDLEtBQWYsQ0FBcUIsR0FBckIsRUFDQUMsT0FEQSxDQUNRLGFBQUs7O0FBRVQsb0JBQUlDLFFBQVFKLFNBQVNLLElBQVQsQ0FBY0MsQ0FBZCxDQUFaO0FBQ0Esb0JBQUlDLEtBQUo7O0FBRUEsb0JBQUksQ0FBQ0gsS0FBTCxFQUNJLE1BQU0sSUFBSVosc0JBQUosQ0FBMkJjLENBQTNCLEVBQThCUCxPQUFPUyxLQUFQLENBQWFDLE1BQWIsQ0FBb0JDLFdBQXBCLENBQWdDQyxPQUFoQyxDQUF3Q1YsVUFBdEUsQ0FBTjs7QUFFSixvQkFBSSxPQUFPRyxLQUFQLEtBQWlCLFVBQXJCLEVBQ0ksTUFBTSxJQUFJUSxTQUFKLHNEQUFnRU4sQ0FBaEUsUUFBTjs7QUFFSkMsd0JBQVEsSUFBSUgsS0FBSixDQUFVTCxNQUFWLEVBQWtCQSxPQUFPUyxLQUFQLENBQWFDLE1BQS9CLEVBQXVDVixPQUFPUyxLQUFQLENBQWFDLE1BQWIsQ0FBb0JDLFdBQTNELENBQVI7O0FBRUFYLHVCQUFPYyxTQUFQLENBQWlCQyxJQUFqQixDQUFzQixVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBV0MsSUFBWCxFQUFvQjs7QUFFdEMsd0JBQUlDLE9BQU9uQixPQUFPb0IsT0FBUCxDQUFlQyxPQUFmLENBQXVCTCxHQUF2QixFQUE0QkMsR0FBNUIsRUFBaUNqQixPQUFPc0IsTUFBeEMsQ0FBWDtBQUNBLHdCQUFJQyxPQUFPdkIsT0FBT29CLE9BQVAsQ0FBZUksUUFBZixDQUF3QlIsR0FBeEIsRUFBNkJDLEdBQTdCLEVBQWtDakIsT0FBT3NCLE1BQXpDLENBQVg7O0FBRUFHLDRCQUFRQyxPQUFSLENBQWdCbEIsTUFBTW1CLEtBQU4sQ0FBWVIsSUFBWixFQUFrQkksSUFBbEIsRUFBd0JMLElBQXhCLENBQWhCLEVBQStDVSxLQUEvQyxDQUFxRDtBQUFBLCtCQUNqRDVCLE9BQU9TLEtBQVAsQ0FBYUMsTUFBYixDQUFvQkMsV0FBcEIsQ0FBZ0NrQixvQkFBaEMsQ0FBcURDLFlBQXJELENBQWtFQyxDQUFsRSxFQUNJWixJQURKLEVBQ1VJLElBRFYsRUFDZ0JMLElBRGhCLENBRGlEO0FBQUEscUJBQXJEO0FBSUgsaUJBVEQ7QUFXSCxhQXpCRDtBQTJCSDs7Ozs7O2tCQUdVcEIsVSIsImZpbGUiOiJNaWRkbGV3YXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yIGZyb20gJ2VzNi1lcnJvcic7XG5pbXBvcnQgcHJvcGVydHkgZnJvbSAncHJvcGVydHktc2Vlayc7XG5cbmNsYXNzIFVua25vd25NaWRkbGV3YXJlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcih3YXJlLCBsaXN0KSB7XG5cbiAgICAgICAgc3VwZXIoYE1pZGRsZXdhcmUgJyR7d2FyZX0nIHdhcyBub3QgZm91bmQhIEZvdW5kOiAke09iamVjdC5rZXlzKGxpc3QpfWApO1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgTWlkZGxld2FyZSB7XG5cbiAgICBzdGF0aWMgcHJlcGFyZShkZWYsIGFjdGlvbiwgcmVzb3VyY2UpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGRlZi5taWRkbGV3YXJlICE9PSAnc3RyaW5nJykgcmV0dXJuO1xuXG4gICAgICAgIGRlZi5taWRkbGV3YXJlLnNwbGl0KCcsJykuXG4gICAgICAgIGZvckVhY2gobSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBNd2FyZSA9IHJlc291cmNlLmZpbmQobSk7XG4gICAgICAgICAgICB2YXIgbXdhcmU7XG5cbiAgICAgICAgICAgIGlmICghTXdhcmUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25NaWRkbGV3YXJlRXJyb3IobSwgYWN0aW9uLnJvdXRlLm1vZHVsZS5hcHBsaWNhdGlvbi5jb250ZXh0Lm1pZGRsZXdhcmUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIE13YXJlICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE1pZGRsZXdhcmUgbXVzdCBiZSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMhIEZvciAnJHttfSdgKTtcblxuICAgICAgICAgICAgbXdhcmUgPSBuZXcgTXdhcmUoYWN0aW9uLCBhY3Rpb24ucm91dGUubW9kdWxlLCBhY3Rpb24ucm91dGUubW9kdWxlLmFwcGxpY2F0aW9uKTtcblxuICAgICAgICAgICAgYWN0aW9uLmNhbGxiYWNrcy5wdXNoKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgdmFyIHByZXEgPSBhY3Rpb24uZmFjdG9yeS5yZXF1ZXN0KHJlcSwgcmVzLCBhY3Rpb24ub3V0cHV0KTtcbiAgICAgICAgICAgICAgICB2YXIgcHJlcyA9IGFjdGlvbi5mYWN0b3J5LnJlc3BvbnNlKHJlcSwgcmVzLCBhY3Rpb24ub3V0cHV0KTtcblxuICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShtd2FyZS5hcHBseShwcmVxLCBwcmVzLCBuZXh0KSkuY2F0Y2goZSA9PlxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ucm91dGUubW9kdWxlLmFwcGxpY2F0aW9uLm9uUm91dGVFcnJvckxpc3RlbmVyLm9uUm91dGVFcnJvcihlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlcSwgcHJlcywgbmV4dCkpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWlkZGxld2FyZVxuIl19