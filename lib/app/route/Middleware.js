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
                    return mware.apply(action.factory.request(req, res, action), action.factory.response(req, res, action), next);
                });
            });
        }
    }]);

    return Middleware;
}();

exports.default = Middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvTWlkZGxld2FyZS5qcyJdLCJuYW1lcyI6WyJVbmtub3duTWlkZGxld2FyZUVycm9yIiwid2FyZSIsImxpc3QiLCJPYmplY3QiLCJrZXlzIiwiTWlkZGxld2FyZSIsImRlZiIsImFjdGlvbiIsInJlc291cmNlIiwibWlkZGxld2FyZSIsInNwbGl0IiwiZm9yRWFjaCIsIk13YXJlIiwiZmluZCIsIm0iLCJtd2FyZSIsInJvdXRlIiwibW9kdWxlIiwiYXBwbGljYXRpb24iLCJjb250ZXh0IiwiVHlwZUVycm9yIiwiY2FsbGJhY2tzIiwicHVzaCIsInJlcSIsInJlcyIsIm5leHQiLCJhcHBseSIsImZhY3RvcnkiLCJyZXF1ZXN0IiwicmVzcG9uc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLHNCOzs7QUFFRixvQ0FBWUMsSUFBWixFQUFrQkMsSUFBbEIsRUFBd0I7QUFBQTs7QUFBQSxpS0FFQ0QsSUFGRCxpQ0FFZ0NFLE9BQU9DLElBQVAsQ0FBWUYsSUFBWixDQUZoQztBQUl2Qjs7Ozs7QUFJTDs7Ozs7SUFHTUcsVTs7Ozs7OztnQ0FFYUMsRyxFQUFLQyxNLEVBQVFDLFEsRUFBVTs7QUFFbEMsZ0JBQUksT0FBT0YsSUFBSUcsVUFBWCxLQUEwQixRQUE5QixFQUF3Qzs7QUFFeENILGdCQUFJRyxVQUFKLENBQWVDLEtBQWYsQ0FBcUIsR0FBckIsRUFDQUMsT0FEQSxDQUNRLGFBQUs7O0FBRVQsb0JBQUlDLFFBQVFKLFNBQVNLLElBQVQsQ0FBY0MsQ0FBZCxDQUFaO0FBQ0Esb0JBQUlDLEtBQUo7O0FBRUEsb0JBQUksQ0FBQ0gsS0FBTCxFQUNJLE1BQU0sSUFBSVosc0JBQUosQ0FBMkJjLENBQTNCLEVBQThCUCxPQUFPUyxLQUFQLENBQWFDLE1BQWIsQ0FBb0JDLFdBQXBCLENBQWdDQyxPQUFoQyxDQUF3Q1YsVUFBdEUsQ0FBTjs7QUFFSixvQkFBSSxPQUFPRyxLQUFQLEtBQWlCLFVBQXJCLEVBQ0ksTUFBTSxJQUFJUSxTQUFKLHNEQUFnRU4sQ0FBaEUsUUFBTjs7QUFFSkMsd0JBQVEsSUFBSUgsS0FBSixDQUFVTCxNQUFWLEVBQWtCQSxPQUFPUyxLQUFQLENBQWFDLE1BQS9CLEVBQXVDVixPQUFPUyxLQUFQLENBQWFDLE1BQWIsQ0FBb0JDLFdBQTNELENBQVI7QUFDQVgsdUJBQU9jLFNBQVAsQ0FBaUJDLElBQWpCLENBQXNCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxJQUFYO0FBQUEsMkJBQ2xCVixNQUFNVyxLQUFOLENBQVluQixPQUFPb0IsT0FBUCxDQUFlQyxPQUFmLENBQXVCTCxHQUF2QixFQUE0QkMsR0FBNUIsRUFBaUNqQixNQUFqQyxDQUFaLEVBQ0lBLE9BQU9vQixPQUFQLENBQWVFLFFBQWYsQ0FBd0JOLEdBQXhCLEVBQTZCQyxHQUE3QixFQUFrQ2pCLE1BQWxDLENBREosRUFDK0NrQixJQUQvQyxDQURrQjtBQUFBLGlCQUF0QjtBQUlILGFBakJEO0FBbUJIOzs7Ozs7a0JBR1VwQixVIiwiZmlsZSI6Ik1pZGRsZXdhcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJyb3IgZnJvbSAnZXM2LWVycm9yJztcbmltcG9ydCBwcm9wZXJ0eSBmcm9tICdwcm9wZXJ0eS1zZWVrJztcblxuY2xhc3MgVW5rbm93bk1pZGRsZXdhcmVFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHdhcmUsIGxpc3QpIHtcblxuICAgICAgICBzdXBlcihgTWlkZGxld2FyZSAnJHt3YXJlfScgd2FzIG5vdCBmb3VuZCEgRm91bmQ6ICR7T2JqZWN0LmtleXMobGlzdCl9YCk7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKlxuICovXG5jbGFzcyBNaWRkbGV3YXJlIHtcblxuICAgIHN0YXRpYyBwcmVwYXJlKGRlZiwgYWN0aW9uLCByZXNvdXJjZSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGVmLm1pZGRsZXdhcmUgIT09ICdzdHJpbmcnKSByZXR1cm47XG5cbiAgICAgICAgZGVmLm1pZGRsZXdhcmUuc3BsaXQoJywnKS5cbiAgICAgICAgZm9yRWFjaChtID0+IHtcblxuICAgICAgICAgICAgdmFyIE13YXJlID0gcmVzb3VyY2UuZmluZChtKTtcbiAgICAgICAgICAgIHZhciBtd2FyZVxuXG4gICAgICAgICAgICBpZiAoIU13YXJlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbmtub3duTWlkZGxld2FyZUVycm9yKG0sIGFjdGlvbi5yb3V0ZS5tb2R1bGUuYXBwbGljYXRpb24uY29udGV4dC5taWRkbGV3YXJlKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBNd2FyZSAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBNaWRkbGV3YXJlIG11c3QgYmUgY29uc3RydWN0b3IgZnVuY3Rpb25zISBGb3IgJyR7bX0nYCk7XG5cbiAgICAgICAgICAgIG13YXJlID0gbmV3IE13YXJlKGFjdGlvbiwgYWN0aW9uLnJvdXRlLm1vZHVsZSwgYWN0aW9uLnJvdXRlLm1vZHVsZS5hcHBsaWNhdGlvbik7XG4gICAgICAgICAgICBhY3Rpb24uY2FsbGJhY2tzLnB1c2goKHJlcSwgcmVzLCBuZXh0KSA9PlxuICAgICAgICAgICAgICAgIG13YXJlLmFwcGx5KGFjdGlvbi5mYWN0b3J5LnJlcXVlc3QocmVxLCByZXMsIGFjdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5mYWN0b3J5LnJlc3BvbnNlKHJlcSwgcmVzLCBhY3Rpb24pLCBuZXh0KSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1pZGRsZXdhcmVcbiJdfQ==