'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * View
 * @implements {Action}
 */
var Views = function () {
    function Views() {
        _classCallCheck(this, Views);
    }

    _createClass(Views, null, [{
        key: 'prepare',
        value: function prepare(def, action, resource) {

            if (typeof def.view === 'string') {

                if (!action.route.module.viewEngine) throw new ReferenceError('No view engine is installed for this module ' + ('\'' + action.route.module.configuration.paths.root + '\'!'));

                action.callbacks.push(function (req, res) {

                    action.factory.response(res, action).render(def.view, def.locals);
                });
            }
        }
    }]);

    return Views;
}();

exports.default = Views;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvVmlld3MuanMiXSwibmFtZXMiOlsiVmlld3MiLCJkZWYiLCJhY3Rpb24iLCJyZXNvdXJjZSIsInZpZXciLCJyb3V0ZSIsIm1vZHVsZSIsInZpZXdFbmdpbmUiLCJSZWZlcmVuY2VFcnJvciIsImNvbmZpZ3VyYXRpb24iLCJwYXRocyIsInJvb3QiLCJjYWxsYmFja3MiLCJwdXNoIiwicmVxIiwicmVzIiwiZmFjdG9yeSIsInJlc3BvbnNlIiwicmVuZGVyIiwibG9jYWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJTUEsSzs7Ozs7OztnQ0FFYUMsRyxFQUFLQyxNLEVBQVFDLFEsRUFBVTs7QUFHbEMsZ0JBQUksT0FBT0YsSUFBSUcsSUFBWCxLQUFvQixRQUF4QixFQUFrQzs7QUFFOUIsb0JBQUksQ0FBQ0YsT0FBT0csS0FBUCxDQUFhQyxNQUFiLENBQW9CQyxVQUF6QixFQUNJLE1BQU0sSUFBSUMsY0FBSixDQUFtQix5REFDakJOLE9BQU9HLEtBQVAsQ0FBYUMsTUFBYixDQUFvQkcsYUFBcEIsQ0FBa0NDLEtBQWxDLENBQXdDQyxJQUR2QixTQUFuQixDQUFOOztBQUlKVCx1QkFBT1UsU0FBUCxDQUFpQkMsSUFBakIsQ0FBc0IsVUFBU0MsR0FBVCxFQUFjQyxHQUFkLEVBQW1COztBQUVyQ2IsMkJBQU9jLE9BQVAsQ0FBZUMsUUFBZixDQUF3QkYsR0FBeEIsRUFBNkJiLE1BQTdCLEVBQXFDZ0IsTUFBckMsQ0FBNENqQixJQUFJRyxJQUFoRCxFQUFzREgsSUFBSWtCLE1BQTFEO0FBRUgsaUJBSkQ7QUFNSDtBQUVKOzs7Ozs7a0JBSVVuQixLIiwiZmlsZSI6IlZpZXdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBWaWV3XG4gKiBAaW1wbGVtZW50cyB7QWN0aW9ufVxuICovXG5jbGFzcyBWaWV3cyB7XG5cbiAgICBzdGF0aWMgcHJlcGFyZShkZWYsIGFjdGlvbiwgcmVzb3VyY2UpIHtcblxuXG4gICAgICAgIGlmICh0eXBlb2YgZGVmLnZpZXcgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgICAgIGlmICghYWN0aW9uLnJvdXRlLm1vZHVsZS52aWV3RW5naW5lKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgTm8gdmlldyBlbmdpbmUgaXMgaW5zdGFsbGVkIGZvciB0aGlzIG1vZHVsZSBgICtcbiAgICAgICAgICAgICAgICAgICAgYCcke2FjdGlvbi5yb3V0ZS5tb2R1bGUuY29uZmlndXJhdGlvbi5wYXRocy5yb290fSchYCk7XG5cblxuICAgICAgICAgICAgYWN0aW9uLmNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24uZmFjdG9yeS5yZXNwb25zZShyZXMsIGFjdGlvbikucmVuZGVyKGRlZi52aWV3LCBkZWYubG9jYWxzKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFZpZXdzXG4iXX0=