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
        value: function generate(method, path, route) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvTWlkZGxld2FyZUFjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzJCQUF1QixlQUFlOzs7O0lBRWhDLHNCQUFzQjtjQUF0QixzQkFBc0I7O0FBQ2IsYUFEVCxzQkFBc0IsQ0FDWixJQUFJLEVBQUU7OEJBRGhCLHNCQUFzQjs7QUFFcEIsbUNBRkYsc0JBQXNCLDJGQUU4QixJQUFJLFFBQUs7QUFDM0QsYUFBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDbkQ7Ozs7Ozs7V0FKQyxzQkFBc0I7OztJQVl0QixnQkFBZ0I7QUFFUCxhQUZULGdCQUFnQixDQUVOLFNBQVMsRUFBRTs4QkFGckIsZ0JBQWdCOztBQUlkLFlBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0tBRS9COztpQkFOQyxnQkFBZ0I7O2VBUVYsa0JBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7OztBQUUxQixnQkFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFDL0IsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFVBQVUsRUFBSTs7QUFFdEMsb0JBQUksT0FBTyxVQUFVLEtBQUssVUFBVSxFQUNoQyxPQUFPLFVBQVUsQ0FBQzs7QUFFdEIsb0JBQUksTUFBTSxHQUFHLE1BQUssVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFOUMsb0JBQUksQ0FBQyxNQUFNLEVBQ1AsTUFBTSxJQUFJLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUVqRCx1QkFBTyxNQUFNLENBQUM7YUFFakIsQ0FBQyxDQUFDO1NBRVY7OztXQXpCQyxnQkFBZ0I7OztxQkE0QlAsZ0JBQWdCIiwiZmlsZSI6Ik1pZGRsZXdhcmVBY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG93ZXJFcnJvciBmcm9tICcuLi9Qb3dlckVycm9yJztcblxuY2xhc3MgVW5rbm93bk1pZGRsZXdhcmVFcnJvciBleHRlbmRzIFBvd2VyRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHdhcmUpIHtcbiAgICAgICAgc3VwZXIoYFVuYWJsZSB0byBsb2NhdGUgbWlkZGxld2FyZSBzcGVjaWZpZWQgYXMgJHt3YXJlfSFgKTtcbiAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxufVxuXG4vKipcbiAqIE1pZGRsZXdhcmVBY3Rpb24gY29uZmlndXJlcyBtaWRkbGV3YXJlIHNwZWNpZmllZCBieSB0aGUgJ21pZGRsZXdhcmVzJ1xuICoga2V5IGluIGEgcm91dGUgZGVjbGFyYXRpb24uXG4gKiBAaW1wbGVtZW50cyB7QWN0aW9ufVxuICovXG5jbGFzcyBNaWRkbGV3YXJlQWN0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlc291cmNlcykge1xuXG4gICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IHJlc291cmNlcztcblxuICAgIH1cblxuICAgIGdlbmVyYXRlKG1ldGhvZCwgcGF0aCwgcm91dGUpIHtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyb3V0ZS5taWRkbGV3YXJlKSlcbiAgICAgICAgICAgIHJldHVybiByb3V0ZS5taWRkbGV3YXJlLm1hcChtaWRkbGV3YXJlID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWlkZGxld2FyZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1pZGRsZXdhcmU7XG5cbiAgICAgICAgICAgICAgICB2YXIgbW9kdWxlID0gdGhpcy5fcmVzb3VyY2VzLmZpbmQobWlkZGxld2FyZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1vZHVsZSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVua25vd25NaWRkbGV3YXJlRXJyb3IobWlkZGxld2FyZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kdWxlO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWlkZGxld2FyZUFjdGlvblxuIl19