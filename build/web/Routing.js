'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _GeneralRouting2 = require('../GeneralRouting');

var _GeneralRouting3 = _interopRequireDefault(_GeneralRouting2);

var _Routes = require('../Routes');

var _Routes2 = _interopRequireDefault(_Routes);

/**
 * Routing
 */

var Routing = (function (_GeneralRouting) {
    _inherits(Routing, _GeneralRouting);

    function Routing() {
        _classCallCheck(this, Routing);

        _get(Object.getPrototypeOf(Routing.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Routing, [{
        key: 'configure',
        value: function configure(app, routes, config) {
            var _this = this;

            _Routes2['default'].flatten(routes).forEach(function (route) {

                _this.configureSchema(app, route, config);
                _this.configureMiddleWare(app, route, config);
                _this.configureQueries(app, route, config);
                _this.configureControllers(app, route, config);
                _this.configureViews(app, route, config);
            });
        }
    }, {
        key: 'configureViews',
        value: function configureViews(router, route) {

            if (route.view) router.get(route.href, function (req, res) {

                var locals = res.locals || {};
                var session = req.session || {};

                if (route.locals) locals = merge(locals, route.locals);

                if (route.session) {
                    route.session.forEach(function (key) {
                        locals[key] = session[key];
                    });
                }

                res.render(route.view, locals);
            });

            return this;
        }
    }]);

    return Routing;
})(_GeneralRouting3['default']);

exports['default'] = new Routing();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvUm91dGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OytCQUMyQixtQkFBbUI7Ozs7c0JBQzNCLFdBQVc7Ozs7Ozs7O0lBS3hCLE9BQU87Y0FBUCxPQUFPOzthQUFQLE9BQU87OEJBQVAsT0FBTzs7bUNBQVAsT0FBTzs7O2lCQUFQLE9BQU87O2VBRUEsbUJBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7OztBQUUzQixnQ0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFJOztBQUVyQyxzQkFBSyxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN6QyxzQkFBSyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzdDLHNCQUFLLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDMUMsc0JBQUssb0JBQW9CLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM5QyxzQkFBSyxjQUFjLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQzthQUUzQyxDQUFDLENBQUM7U0FFTjs7O2VBRWEsd0JBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTs7QUFFMUIsZ0JBQUksS0FBSyxDQUFDLElBQUksRUFDVixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFOztBQUV2QyxvQkFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7QUFDOUIsb0JBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDOztBQUVoQyxvQkFBSSxLQUFLLENBQUMsTUFBTSxFQUNaLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFekMsb0JBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtBQUNmLHlCQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNqQyw4QkFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDOUIsQ0FBQyxDQUFDO2lCQUNOOztBQUVELG1CQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFFbEMsQ0FBQyxDQUFDOztBQUdQLG1CQUFPLElBQUksQ0FBQztTQUVmOzs7V0F4Q0MsT0FBTzs7O3FCQTRDRSxJQUFJLE9BQU8sRUFBRSIsImZpbGUiOiJSb3V0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgR2VuZXJhbFJvdXRpbmcgZnJvbSAnLi4vR2VuZXJhbFJvdXRpbmcnO1xuaW1wb3J0IFJvdXRlcyBmcm9tICcuLi9Sb3V0ZXMnO1xuXG4vKipcbiAqIFJvdXRpbmdcbiAqL1xuY2xhc3MgUm91dGluZyBleHRlbmRzIEdlbmVyYWxSb3V0aW5nIHtcblxuICAgIGNvbmZpZ3VyZShhcHAsIHJvdXRlcywgY29uZmlnKSB7XG5cbiAgICAgICAgUm91dGVzLmZsYXR0ZW4ocm91dGVzKS5mb3JFYWNoKChyb3V0ZSk9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJlU2NoZW1hKGFwcCwgcm91dGUsIGNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZU1pZGRsZVdhcmUoYXBwLCByb3V0ZSwgY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJlUXVlcmllcyhhcHAsIHJvdXRlLCBjb25maWcpO1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmVDb250cm9sbGVycyhhcHAsIHJvdXRlLCBjb25maWcpO1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmVWaWV3cyhhcHAsIHJvdXRlLCBjb25maWcpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgY29uZmlndXJlVmlld3Mocm91dGVyLCByb3V0ZSkge1xuXG4gICAgICAgIGlmIChyb3V0ZS52aWV3KVxuICAgICAgICAgICAgcm91dGVyLmdldChyb3V0ZS5ocmVmLCBmdW5jdGlvbiAocmVxLCByZXMpIHtcblxuICAgICAgICAgICAgICAgIHZhciBsb2NhbHMgPSByZXMubG9jYWxzIHx8IHt9O1xuICAgICAgICAgICAgICAgIHZhciBzZXNzaW9uID0gcmVxLnNlc3Npb24gfHwge307XG5cbiAgICAgICAgICAgICAgICBpZiAocm91dGUubG9jYWxzKVxuICAgICAgICAgICAgICAgICAgICBsb2NhbHMgPSBtZXJnZShsb2NhbHMsIHJvdXRlLmxvY2Fscyk7XG5cbiAgICAgICAgICAgICAgICBpZiAocm91dGUuc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZS5zZXNzaW9uLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxzW2tleV0gPSBzZXNzaW9uW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlcy5yZW5kZXIocm91dGUudmlldywgbG9jYWxzKTtcblxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUm91dGluZygpXG4iXX0=