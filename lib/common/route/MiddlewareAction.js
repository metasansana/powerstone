'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerError2 = require('../PowerError');

var _PowerError3 = _interopRequireDefault(_PowerError2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnknownMiddlewareError = function (_PowerError) {
    _inherits(UnknownMiddlewareError, _PowerError);

    function UnknownMiddlewareError(ware) {
        _classCallCheck(this, UnknownMiddlewareError);

        var _this = _possibleConstructorReturn(this, (UnknownMiddlewareError.__proto__ || Object.getPrototypeOf(UnknownMiddlewareError)).call(this, 'Unable to locate middleware specified as ' + ware + '!'));

        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }

    return UnknownMiddlewareError;
}(_PowerError3.default);

/**
 * MiddlewareAction configures middleware specified by the 'middlewares'
 * key in a route declaration.
 * @implements {Action}
 */


var MiddlewareAction = function () {
    function MiddlewareAction(resources) {
        _classCallCheck(this, MiddlewareAction);

        this._resources = resources;
    }

    _createClass(MiddlewareAction, [{
        key: 'generate',
        value: function generate(method, path, route, main) {
            var _this2 = this;

            if (Array.isArray(route.middleware)) return route.middleware.map(function (middleware) {

                if (typeof middleware === 'function') return middleware;

                var module = _this2._resources.find(middleware);

                if (!module) throw new UnknownMiddlewareError(middleware);

                return module;
            });
        }
    }]);

    return MiddlewareAction;
}();

exports.default = MiddlewareAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvTWlkZGxld2FyZUFjdGlvbi5qcyJdLCJuYW1lcyI6WyJVbmtub3duTWlkZGxld2FyZUVycm9yIiwid2FyZSIsIkVycm9yIiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJjb25zdHJ1Y3RvciIsIk1pZGRsZXdhcmVBY3Rpb24iLCJyZXNvdXJjZXMiLCJfcmVzb3VyY2VzIiwibWV0aG9kIiwicGF0aCIsInJvdXRlIiwibWFpbiIsIkFycmF5IiwiaXNBcnJheSIsIm1pZGRsZXdhcmUiLCJtYXAiLCJtb2R1bGUiLCJmaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFTUEsc0I7OztBQUNGLG9DQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQUEsa01BQ29DQSxJQURwQzs7QUFFZEMsY0FBTUMsaUJBQU4sUUFBOEIsTUFBS0MsV0FBbkM7QUFGYztBQUdqQjs7Ozs7QUFHTDs7Ozs7OztJQUtNQyxnQjtBQUVGLDhCQUFZQyxTQUFaLEVBQXVCO0FBQUE7O0FBRW5CLGFBQUtDLFVBQUwsR0FBa0JELFNBQWxCO0FBRUg7Ozs7aUNBRVFFLE0sRUFBUUMsSSxFQUFNQyxLLEVBQU9DLEksRUFBTTtBQUFBOztBQUVoQyxnQkFBSUMsTUFBTUMsT0FBTixDQUFjSCxNQUFNSSxVQUFwQixDQUFKLEVBQ0ksT0FBT0osTUFBTUksVUFBTixDQUFpQkMsR0FBakIsQ0FBcUIsc0JBQWM7O0FBRXRDLG9CQUFJLE9BQU9ELFVBQVAsS0FBc0IsVUFBMUIsRUFDSSxPQUFPQSxVQUFQOztBQUVKLG9CQUFJRSxTQUFTLE9BQUtULFVBQUwsQ0FBZ0JVLElBQWhCLENBQXFCSCxVQUFyQixDQUFiOztBQUVBLG9CQUFJLENBQUNFLE1BQUwsRUFDSSxNQUFNLElBQUloQixzQkFBSixDQUEyQmMsVUFBM0IsQ0FBTjs7QUFFSix1QkFBT0UsTUFBUDtBQUVILGFBWk0sQ0FBUDtBQWNQOzs7Ozs7a0JBR1VYLGdCIiwiZmlsZSI6Ik1pZGRsZXdhcmVBY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG93ZXJFcnJvciBmcm9tICcuLi9Qb3dlckVycm9yJztcblxuY2xhc3MgVW5rbm93bk1pZGRsZXdhcmVFcnJvciBleHRlbmRzIFBvd2VyRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHdhcmUpIHtcbiAgICAgICAgc3VwZXIoYFVuYWJsZSB0byBsb2NhdGUgbWlkZGxld2FyZSBzcGVjaWZpZWQgYXMgJHt3YXJlfSFgKTtcbiAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxufVxuXG4vKipcbiAqIE1pZGRsZXdhcmVBY3Rpb24gY29uZmlndXJlcyBtaWRkbGV3YXJlIHNwZWNpZmllZCBieSB0aGUgJ21pZGRsZXdhcmVzJ1xuICoga2V5IGluIGEgcm91dGUgZGVjbGFyYXRpb24uXG4gKiBAaW1wbGVtZW50cyB7QWN0aW9ufVxuICovXG5jbGFzcyBNaWRkbGV3YXJlQWN0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlc291cmNlcykge1xuXG4gICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IHJlc291cmNlcztcblxuICAgIH1cblxuICAgIGdlbmVyYXRlKG1ldGhvZCwgcGF0aCwgcm91dGUsIG1haW4pIHtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyb3V0ZS5taWRkbGV3YXJlKSlcbiAgICAgICAgICAgIHJldHVybiByb3V0ZS5taWRkbGV3YXJlLm1hcChtaWRkbGV3YXJlID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWlkZGxld2FyZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1pZGRsZXdhcmU7XG5cbiAgICAgICAgICAgICAgICB2YXIgbW9kdWxlID0gdGhpcy5fcmVzb3VyY2VzLmZpbmQobWlkZGxld2FyZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1vZHVsZSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25NaWRkbGV3YXJlRXJyb3IobWlkZGxld2FyZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kdWxlO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWlkZGxld2FyZUFjdGlvblxuIl19