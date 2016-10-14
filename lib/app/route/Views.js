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

                    action.factory.response(req, res, action.output).render(def.view, def.locals);
                });
            }
        }
    }]);

    return Views;
}();

exports.default = Views;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvVmlld3MuanMiXSwibmFtZXMiOlsiVmlld3MiLCJkZWYiLCJhY3Rpb24iLCJyZXNvdXJjZSIsInZpZXciLCJyb3V0ZSIsIm1vZHVsZSIsInZpZXdFbmdpbmUiLCJSZWZlcmVuY2VFcnJvciIsImNvbmZpZ3VyYXRpb24iLCJwYXRocyIsInJvb3QiLCJjYWxsYmFja3MiLCJwdXNoIiwicmVxIiwicmVzIiwiZmFjdG9yeSIsInJlc3BvbnNlIiwib3V0cHV0IiwicmVuZGVyIiwibG9jYWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJTUEsSzs7Ozs7OztnQ0FFYUMsRyxFQUFLQyxNLEVBQVFDLFEsRUFBVTs7QUFHbEMsZ0JBQUksT0FBT0YsSUFBSUcsSUFBWCxLQUFvQixRQUF4QixFQUFrQzs7QUFFOUIsb0JBQUksQ0FBQ0YsT0FBT0csS0FBUCxDQUFhQyxNQUFiLENBQW9CQyxVQUF6QixFQUNJLE1BQU0sSUFBSUMsY0FBSixDQUFtQix5REFDakJOLE9BQU9HLEtBQVAsQ0FBYUMsTUFBYixDQUFvQkcsYUFBcEIsQ0FBa0NDLEtBQWxDLENBQXdDQyxJQUR2QixTQUFuQixDQUFOOztBQUdKVCx1QkFBT1UsU0FBUCxDQUFpQkMsSUFBakIsQ0FBc0IsVUFBU0MsR0FBVCxFQUFjQyxHQUFkLEVBQW1COztBQUVyQ2IsMkJBQU9jLE9BQVAsQ0FBZUMsUUFBZixDQUF3QkgsR0FBeEIsRUFBNkJDLEdBQTdCLEVBQWtDYixPQUFPZ0IsTUFBekMsRUFBaURDLE1BQWpELENBQXdEbEIsSUFBSUcsSUFBNUQsRUFBa0VILElBQUltQixNQUF0RTtBQUVILGlCQUpEO0FBTUg7QUFFSjs7Ozs7O2tCQUlVcEIsSyIsImZpbGUiOiJWaWV3cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVmlld1xuICogQGltcGxlbWVudHMge0FjdGlvbn1cbiAqL1xuY2xhc3MgVmlld3Mge1xuXG4gICAgc3RhdGljIHByZXBhcmUoZGVmLCBhY3Rpb24sIHJlc291cmNlKSB7XG5cblxuICAgICAgICBpZiAodHlwZW9mIGRlZi52aWV3ID09PSAnc3RyaW5nJykge1xuXG4gICAgICAgICAgICBpZiAoIWFjdGlvbi5yb3V0ZS5tb2R1bGUudmlld0VuZ2luZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYE5vIHZpZXcgZW5naW5lIGlzIGluc3RhbGxlZCBmb3IgdGhpcyBtb2R1bGUgYCArXG4gICAgICAgICAgICAgICAgICAgIGAnJHthY3Rpb24ucm91dGUubW9kdWxlLmNvbmZpZ3VyYXRpb24ucGF0aHMucm9vdH0nIWApO1xuXG4gICAgICAgICAgICBhY3Rpb24uY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24ocmVxLCByZXMpIHtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5mYWN0b3J5LnJlc3BvbnNlKHJlcSwgcmVzLCBhY3Rpb24ub3V0cHV0KS5yZW5kZXIoZGVmLnZpZXcsIGRlZi5sb2NhbHMpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlld3NcbiJdfQ==