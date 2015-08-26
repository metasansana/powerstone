'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _expressJsonschema = require('express-jsonschema');

var _Routes = require('../Routes');

var _Routes2 = _interopRequireDefault(_Routes);

var _GeneralRouting2 = require('../GeneralRouting');

var _GeneralRouting3 = _interopRequireDefault(_GeneralRouting2);

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
            });
        }
    }]);

    return Routing;
})(_GeneralRouting3['default']);

exports['default'] = new Routing();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXN0L1JvdXRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztpQ0FBd0Isb0JBQW9COztzQkFDekIsV0FBVzs7OzsrQkFDSCxtQkFBbUI7Ozs7Ozs7O0lBSXhDLE9BQU87Y0FBUCxPQUFPOzthQUFQLE9BQU87OEJBQVAsT0FBTzs7bUNBQVAsT0FBTzs7O2lCQUFQLE9BQU87O2VBRUEsbUJBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7OztBQUUzQixnQ0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFJOztBQUVyQyxzQkFBSyxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN6QyxzQkFBSyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzdDLHNCQUFLLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDMUMsc0JBQUssb0JBQW9CLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQzthQUVqRCxDQUFDLENBQUM7U0FFTjs7O1dBYkMsT0FBTzs7O3FCQWlCRSxJQUFJLE9BQU8sRUFBRSIsImZpbGUiOiJSb3V0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt2YWxpZGF0ZX0gIGZyb20gJ2V4cHJlc3MtanNvbnNjaGVtYSc7XG5pbXBvcnQgUm91dGVzIGZyb20gJy4uL1JvdXRlcyc7XG5pbXBvcnQgR2VuZXJhbFJvdXRpbmcgZnJvbSAnLi4vR2VuZXJhbFJvdXRpbmcnO1xuLyoqXG4gKiBSb3V0aW5nXG4gKi9cbmNsYXNzIFJvdXRpbmcgZXh0ZW5kcyBHZW5lcmFsUm91dGluZ3tcblxuICAgIGNvbmZpZ3VyZShhcHAsIHJvdXRlcywgY29uZmlnKSB7XG5cbiAgICAgICAgUm91dGVzLmZsYXR0ZW4ocm91dGVzKS5mb3JFYWNoKChyb3V0ZSk9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJlU2NoZW1hKGFwcCwgcm91dGUsIGNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZU1pZGRsZVdhcmUoYXBwLCByb3V0ZSwgY29uZmlnKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJlUXVlcmllcyhhcHAsIHJvdXRlLCBjb25maWcpO1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmVDb250cm9sbGVycyhhcHAsIHJvdXRlLCBjb25maWcpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBSb3V0aW5nKClcbiJdfQ==