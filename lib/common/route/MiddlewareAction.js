'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _PowerError2 = require('../PowerError');

var _PowerError3 = _interopRequireDefault(_PowerError2);

var UnknownMiddlewareError = (function (_PowerError) {
    _inherits(UnknownMiddlewareError, _PowerError);

    function UnknownMiddlewareError(ware) {
        _classCallCheck(this, UnknownMiddlewareError);

        _get(Object.getPrototypeOf(UnknownMiddlewareError.prototype), 'constructor', this).call(this, 'Unable to locate middleware specified as ' + ware + '!');
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * MiddlewareAction configures middleware specified by the 'middlewares'
     * key in a route declaration.
     * @implements {Action}
     */
    return UnknownMiddlewareError;
})(_PowerError3['default']);

var MiddlewareAction = (function () {
    function MiddlewareAction(resources) {
        _classCallCheck(this, MiddlewareAction);

        this._resources = resources;
    }

    _createClass(MiddlewareAction, [{
        key: 'generate',
        value: function generate(method, path, route, main) {
            var _this = this;

            if (Array.isArray(route.middleware)) return route.middleware.map(function (middleware) {

                if (typeof middleware === 'function') return middleware;

                var module = _this._resources.find(middleware);

                if (!module) throw new UnknownMiddlewareError(middleware);

                return module;
            });
        }
    }]);

    return MiddlewareAction;
})();

exports['default'] = MiddlewareAction;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvTWlkZGxld2FyZUFjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzJCQUF1QixlQUFlOzs7O0lBRWhDLHNCQUFzQjtjQUF0QixzQkFBc0I7O0FBQ2IsYUFEVCxzQkFBc0IsQ0FDWixJQUFJLEVBQUU7OEJBRGhCLHNCQUFzQjs7QUFFcEIsbUNBRkYsc0JBQXNCLDJGQUU4QixJQUFJLFFBQUs7QUFDM0QsYUFBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDbkQ7Ozs7Ozs7V0FKQyxzQkFBc0I7OztJQVl0QixnQkFBZ0I7QUFFUCxhQUZULGdCQUFnQixDQUVOLFNBQVMsRUFBRTs4QkFGckIsZ0JBQWdCOztBQUlkLFlBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0tBRS9COztpQkFOQyxnQkFBZ0I7O2VBUVYsa0JBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFOzs7QUFFaEMsZ0JBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQy9CLE9BQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQSxVQUFVLEVBQUk7O0FBRXRDLG9CQUFJLE9BQU8sVUFBVSxLQUFLLFVBQVUsRUFDaEMsT0FBTyxVQUFVLENBQUM7O0FBRXRCLG9CQUFJLE1BQU0sR0FBRyxNQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRTlDLG9CQUFJLENBQUMsTUFBTSxFQUNQLE1BQU0sSUFBSSxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFakQsdUJBQU8sTUFBTSxDQUFDO2FBRWpCLENBQUMsQ0FBQztTQUVWOzs7V0F6QkMsZ0JBQWdCOzs7cUJBNEJQLGdCQUFnQiIsImZpbGUiOiJNaWRkbGV3YXJlQWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvd2VyRXJyb3IgZnJvbSAnLi4vUG93ZXJFcnJvcic7XG5cbmNsYXNzIFVua25vd25NaWRkbGV3YXJlRXJyb3IgZXh0ZW5kcyBQb3dlckVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcih3YXJlKSB7XG4gICAgICAgIHN1cGVyKGBVbmFibGUgdG8gbG9jYXRlIG1pZGRsZXdhcmUgc3BlY2lmaWVkIGFzICR7d2FyZX0hYCk7XG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBNaWRkbGV3YXJlQWN0aW9uIGNvbmZpZ3VyZXMgbWlkZGxld2FyZSBzcGVjaWZpZWQgYnkgdGhlICdtaWRkbGV3YXJlcydcbiAqIGtleSBpbiBhIHJvdXRlIGRlY2xhcmF0aW9uLlxuICogQGltcGxlbWVudHMge0FjdGlvbn1cbiAqL1xuY2xhc3MgTWlkZGxld2FyZUFjdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZXNvdXJjZXMpIHtcblxuICAgICAgICB0aGlzLl9yZXNvdXJjZXMgPSByZXNvdXJjZXM7XG5cbiAgICB9XG5cbiAgICBnZW5lcmF0ZShtZXRob2QsIHBhdGgsIHJvdXRlLCBtYWluKSB7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocm91dGUubWlkZGxld2FyZSkpXG4gICAgICAgICAgICByZXR1cm4gcm91dGUubWlkZGxld2FyZS5tYXAobWlkZGxld2FyZSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1pZGRsZXdhcmUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtaWRkbGV3YXJlO1xuXG4gICAgICAgICAgICAgICAgdmFyIG1vZHVsZSA9IHRoaXMuX3Jlc291cmNlcy5maW5kKG1pZGRsZXdhcmUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFtb2R1bGUpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBVbmtub3duTWlkZGxld2FyZUVycm9yKG1pZGRsZXdhcmUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZHVsZTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1pZGRsZXdhcmVBY3Rpb25cbiJdfQ==