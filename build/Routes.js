/**
 * Routes is a utility class for parsing routes.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Routes = (function () {
    function Routes() {
        _classCallCheck(this, Routes);
    }

    _createClass(Routes, [{
        key: 'flatten',

        /**
         * flatten turns a list of routes into a single array of routes.
         * @param {Array|Object} routes
         * @returns Array
         */
        value: function flatten(routes) {

            if (Array.isArray(routes)) {

                var flat = [];

                routes.forEach(function (route) {
                    if (Array.isArray(route.routes)) {
                        flat.push.apply(flat, route.routes.map(function (entry) {
                            return entry;
                        }));
                    } else {
                        flat.push(route);
                    }
                });

                return flat;
            }

            return routes.routes;
        }
    }, {
        key: 'defaultMethod',
        value: function defaultMethod(method) {
            return method ? method.toLowerCase() : 'get';
        }
    }]);

    return Routes;
})();

exports['default'] = new Routes();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUdNLE1BQU07YUFBTixNQUFNOzhCQUFOLE1BQU07OztpQkFBTixNQUFNOzs7Ozs7OztlQU9ELGlCQUFDLE1BQU0sRUFBRTs7QUFFWixnQkFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFOztBQUV2QixvQkFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOztBQUVkLHNCQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFJO0FBQ3JCLHdCQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQzdCLDRCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLO21DQUFHLEtBQUs7eUJBQUEsQ0FBQyxDQUFDLENBQUM7cUJBQzNELE1BQU07QUFDSCw0QkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDcEI7aUJBQ0osQ0FBQyxDQUFDOztBQUVILHVCQUFPLElBQUksQ0FBQzthQUNmOztBQUVELG1CQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FFeEI7OztlQUVZLHVCQUFDLE1BQU0sRUFBRTtBQUNsQixtQkFBTyxBQUFDLE1BQU0sR0FBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsS0FBSyxDQUFBO1NBQ2pEOzs7V0E5QkMsTUFBTTs7O3FCQWtDRyxJQUFJLE1BQU0sRUFBRSIsImZpbGUiOiJSb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJvdXRlcyBpcyBhIHV0aWxpdHkgY2xhc3MgZm9yIHBhcnNpbmcgcm91dGVzLlxuICovXG5jbGFzcyBSb3V0ZXMge1xuXG4gICAgLyoqXG4gICAgICogZmxhdHRlbiB0dXJucyBhIGxpc3Qgb2Ygcm91dGVzIGludG8gYSBzaW5nbGUgYXJyYXkgb2Ygcm91dGVzLlxuICAgICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSByb3V0ZXNcbiAgICAgKiBAcmV0dXJucyBBcnJheVxuICAgICAqL1xuICAgIGZsYXR0ZW4ocm91dGVzKSB7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocm91dGVzKSkge1xuXG4gICAgICAgICAgICB2YXIgZmxhdCA9IFtdO1xuXG4gICAgICAgICAgICByb3V0ZXMuZm9yRWFjaCgocm91dGUpPT4ge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJvdXRlLnJvdXRlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgZmxhdC5wdXNoLmFwcGx5KGZsYXQsIHJvdXRlLnJvdXRlcy5tYXAoKGVudHJ5KT0+ZW50cnkpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmbGF0LnB1c2gocm91dGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZmxhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByb3V0ZXMucm91dGVzO1xuXG4gICAgfVxuXG4gICAgZGVmYXVsdE1ldGhvZChtZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIChtZXRob2QpID8gbWV0aG9kLnRvTG93ZXJDYXNlKCkgOiAnZ2V0J1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUm91dGVzKCkiXX0=