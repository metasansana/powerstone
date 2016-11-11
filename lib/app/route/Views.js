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

                    var context = {};

                    if (res.locals) Object.keys(res.locals).forEach(function (k) {
                        return context[k] = res.locals[k];
                    });

                    if (def.locals) Object.keys(def.locals).forEach(function (k) {
                        return context[k] = def[k];
                    });

                    action.factory.response(req, res, action.output).render(def.view, context);
                });
            }
        }
    }]);

    return Views;
}();

exports.default = Views;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvVmlld3MuanMiXSwibmFtZXMiOlsiVmlld3MiLCJkZWYiLCJhY3Rpb24iLCJyZXNvdXJjZSIsInZpZXciLCJyb3V0ZSIsIm1vZHVsZSIsInZpZXdFbmdpbmUiLCJSZWZlcmVuY2VFcnJvciIsImNvbmZpZ3VyYXRpb24iLCJwYXRocyIsInJvb3QiLCJjYWxsYmFja3MiLCJwdXNoIiwicmVxIiwicmVzIiwiY29udGV4dCIsImxvY2FscyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiayIsImZhY3RvcnkiLCJyZXNwb25zZSIsIm91dHB1dCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSU1BLEs7Ozs7Ozs7Z0NBRWFDLEcsRUFBS0MsTSxFQUFRQyxRLEVBQVU7O0FBRWxDLGdCQUFJLE9BQU9GLElBQUlHLElBQVgsS0FBb0IsUUFBeEIsRUFBa0M7O0FBRTlCLG9CQUFJLENBQUNGLE9BQU9HLEtBQVAsQ0FBYUMsTUFBYixDQUFvQkMsVUFBekIsRUFDSSxNQUFNLElBQUlDLGNBQUosQ0FBbUIseURBQ2pCTixPQUFPRyxLQUFQLENBQWFDLE1BQWIsQ0FBb0JHLGFBQXBCLENBQWtDQyxLQUFsQyxDQUF3Q0MsSUFEdkIsU0FBbkIsQ0FBTjs7QUFHSlQsdUJBQU9VLFNBQVAsQ0FBaUJDLElBQWpCLENBQXNCLFVBQVNDLEdBQVQsRUFBY0MsR0FBZCxFQUFtQjs7QUFFckMsd0JBQUlDLFVBQVUsRUFBZDs7QUFFQSx3QkFBSUQsSUFBSUUsTUFBUixFQUNJQyxPQUFPQyxJQUFQLENBQVlKLElBQUlFLE1BQWhCLEVBQXdCRyxPQUF4QixDQUFnQztBQUFBLCtCQUFLSixRQUFRSyxDQUFSLElBQWFOLElBQUlFLE1BQUosQ0FBV0ksQ0FBWCxDQUFsQjtBQUFBLHFCQUFoQzs7QUFFSix3QkFBSXBCLElBQUlnQixNQUFSLEVBQ0lDLE9BQU9DLElBQVAsQ0FBWWxCLElBQUlnQixNQUFoQixFQUF3QkcsT0FBeEIsQ0FBZ0M7QUFBQSwrQkFBS0osUUFBUUssQ0FBUixJQUFhcEIsSUFBSW9CLENBQUosQ0FBbEI7QUFBQSxxQkFBaEM7O0FBRUpuQiwyQkFBT29CLE9BQVAsQ0FBZUMsUUFBZixDQUF3QlQsR0FBeEIsRUFBNkJDLEdBQTdCLEVBQWtDYixPQUFPc0IsTUFBekMsRUFBaURDLE1BQWpELENBQXdEeEIsSUFBSUcsSUFBNUQsRUFBa0VZLE9BQWxFO0FBRUgsaUJBWkQ7QUFjSDtBQUVKOzs7Ozs7a0JBSVVoQixLIiwiZmlsZSI6IlZpZXdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBWaWV3XG4gKiBAaW1wbGVtZW50cyB7QWN0aW9ufVxuICovXG5jbGFzcyBWaWV3cyB7XG5cbiAgICBzdGF0aWMgcHJlcGFyZShkZWYsIGFjdGlvbiwgcmVzb3VyY2UpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGRlZi52aWV3ID09PSAnc3RyaW5nJykge1xuXG4gICAgICAgICAgICBpZiAoIWFjdGlvbi5yb3V0ZS5tb2R1bGUudmlld0VuZ2luZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYE5vIHZpZXcgZW5naW5lIGlzIGluc3RhbGxlZCBmb3IgdGhpcyBtb2R1bGUgYCArXG4gICAgICAgICAgICAgICAgICAgIGAnJHthY3Rpb24ucm91dGUubW9kdWxlLmNvbmZpZ3VyYXRpb24ucGF0aHMucm9vdH0nIWApO1xuXG4gICAgICAgICAgICBhY3Rpb24uY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24ocmVxLCByZXMpIHtcblxuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0ge307XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzLmxvY2FscylcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocmVzLmxvY2FscykuZm9yRWFjaChrID0+IGNvbnRleHRba10gPSByZXMubG9jYWxzW2tdKTtcblxuICAgICAgICAgICAgICAgIGlmIChkZWYubG9jYWxzKVxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkZWYubG9jYWxzKS5mb3JFYWNoKGsgPT4gY29udGV4dFtrXSA9IGRlZltrXSk7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24uZmFjdG9yeS5yZXNwb25zZShyZXEsIHJlcywgYWN0aW9uLm91dHB1dCkucmVuZGVyKGRlZi52aWV3LCBjb250ZXh0KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFZpZXdzXG4iXX0=