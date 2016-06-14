'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _commonConfiguration = require('../common/Configuration');

var _commonConfiguration2 = _interopRequireDefault(_commonConfiguration);

var _commonModule = require('../common/Module');

var _commonModule2 = _interopRequireDefault(_commonModule);

var _commonRouteRoute = require('../common/route/Route');

var _commonRouteRoute2 = _interopRequireDefault(_commonRouteRoute);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

/**
 * Module
 * @param {string} fqn The name of the module prefixed with its parent modules 
 * @param {string} path 
 * @param {Configuration} config 
 * @param {Loader} loader 
 * @param {Application} app 
 */

var ApiModule = (function (_Module) {
    _inherits(ApiModule, _Module);

    function ApiModule(name, config, context, app) {
        _classCallCheck(this, ApiModule);

        _get(Object.getPrototypeOf(ApiModule.prototype), 'constructor', this).call(this, name, config, context, app);

        this.viewEngine = function () {
            throw new Error('ApiModule does not support views!');
        };
    }

    _createClass(ApiModule, [{
        key: '__framework',
        value: function __framework() {}
    }, {
        key: '__routing',
        value: function __routing(point, app, actions) {
            var _this = this;

            var path = this.configuration.read(this.configuration.keys.PATH, point + '/' + this.name);
            var routes = this.configuration.routes;

            Object.keys(routes).forEach(function (route) {
                return _this.routes = Object.keys(routes[route]).map(function (method) {
                    return new _commonRouteRoute2['default'](method, path + '/' + route, actions.generate(method, path + '/' + route, routes[route][method]), app);
                });
            });

            this.modules.__routing(path, app, actions);
        }
    }]);

    return ApiModule;
})(_commonModule2['default']);

exports['default'] = ApiModule;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpTW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBQTBCLHlCQUF5Qjs7Ozs0QkFDaEMsa0JBQWtCOzs7O2dDQUNuQix1QkFBdUI7Ozs7dUJBQ3JCLFNBQVM7Ozs7Ozs7Ozs7Ozs7SUFVdkIsU0FBUztjQUFULFNBQVM7O0FBRUEsYUFGVCxTQUFTLENBRUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFOzhCQUZ0QyxTQUFTOztBQUlQLG1DQUpGLFNBQVMsNkNBSUQsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFOztBQUVsQyxZQUFJLENBQUMsVUFBVSxHQUFHLFlBQVc7QUFDekIsa0JBQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztTQUN4RCxDQUFBO0tBRUo7O2lCQVZDLFNBQVM7O2VBYUEsdUJBQUcsRUFHYjs7O2VBRVEsbUJBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7OztBQUUzQixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFLLEtBQUssU0FBSSxJQUFJLENBQUMsSUFBSSxDQUFHLENBQUM7QUFDMUYsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDOztBQUV2QyxrQkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDbkIsT0FBTyxDQUFDLFVBQUEsS0FBSzt1QkFDVCxNQUFLLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07MkJBQy9DLGtDQUFVLE1BQU0sRUFBSyxJQUFJLFNBQUksS0FBSyxFQUM5QixPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBSyxJQUFJLFNBQUksS0FBSyxFQUNyQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7aUJBQUEsQ0FBQzthQUFBLENBQUMsQ0FBQzs7QUFFL0MsZ0JBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FFOUM7OztXQWhDQyxTQUFTOzs7cUJBb0NBLFNBQVMiLCJmaWxlIjoiQXBpTW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi4vY29tbW9uL0NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IE1vZHVsZSBmcm9tICcuLi9jb21tb24vTW9kdWxlJztcbmltcG9ydCBSb3V0ZSBmcm9tICcuLi9jb21tb24vcm91dGUvUm91dGUnO1xuaW1wb3J0IHJlc3RpZnkgZnJvbSAncmVzdGlmeSc7XG5cbi8qKlxuICogTW9kdWxlXG4gKiBAcGFyYW0ge3N0cmluZ30gZnFuIFRoZSBuYW1lIG9mIHRoZSBtb2R1bGUgcHJlZml4ZWQgd2l0aCBpdHMgcGFyZW50IG1vZHVsZXMgXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBcbiAqIEBwYXJhbSB7Q29uZmlndXJhdGlvbn0gY29uZmlnIFxuICogQHBhcmFtIHtMb2FkZXJ9IGxvYWRlciBcbiAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcCBcbiAqL1xuY2xhc3MgQXBpTW9kdWxlIGV4dGVuZHMgTW9kdWxlIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGNvbmZpZywgY29udGV4dCwgYXBwKSB7XG5cbiAgICAgICAgc3VwZXIobmFtZSwgY29uZmlnLCBjb250ZXh0LCBhcHApO1xuXG4gICAgICAgIHRoaXMudmlld0VuZ2luZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcGlNb2R1bGUgZG9lcyBub3Qgc3VwcG9ydCB2aWV3cyEnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBfX2ZyYW1ld29yaygpIHtcblxuXG4gICAgfVxuXG4gICAgX19yb3V0aW5nKHBvaW50LCBhcHAsIGFjdGlvbnMpIHtcblxuICAgICAgICB2YXIgcGF0aCA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLlBBVEgsIGAke3BvaW50fS8ke3RoaXMubmFtZX1gKTtcbiAgICAgICAgdmFyIHJvdXRlcyA9IHRoaXMuY29uZmlndXJhdGlvbi5yb3V0ZXM7XG5cbiAgICAgICAgT2JqZWN0LmtleXMocm91dGVzKS5cbiAgICAgICAgZm9yRWFjaChyb3V0ZSA9PlxuICAgICAgICAgICAgdGhpcy5yb3V0ZXMgPSBPYmplY3Qua2V5cyhyb3V0ZXNbcm91dGVdKS5tYXAobWV0aG9kID0+XG4gICAgICAgICAgICAgICAgbmV3IFJvdXRlKG1ldGhvZCwgYCR7cGF0aH0vJHtyb3V0ZX1gLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLmdlbmVyYXRlKG1ldGhvZCwgYCR7cGF0aH0vJHtyb3V0ZX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVzW3JvdXRlXVttZXRob2RdKSwgYXBwKSkpO1xuXG4gICAgICAgIHRoaXMubW9kdWxlcy5fX3JvdXRpbmcocGF0aCwgYXBwLCBhY3Rpb25zKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBcGlNb2R1bGVcbiJdfQ==