'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _commonConfiguration = require('../common/Configuration');

var _commonConfiguration2 = _interopRequireDefault(_commonConfiguration);

var _commonModule = require('../common/Module');

var _commonModule2 = _interopRequireDefault(_commonModule);

var _commonRouteRoute = require('../common/route/Route');

var _commonRouteRoute2 = _interopRequireDefault(_commonRouteRoute);

var BASKET = {};

var WebModule = (function (_Module) {
    _inherits(WebModule, _Module);

    function WebModule(name, config, context, app) {
        _classCallCheck(this, WebModule);

        _get(Object.getPrototypeOf(WebModule.prototype), 'constructor', this).call(this, name, config, context, app);

        this._expressApp = (0, _express2['default'])();
        this.configDirectory = 'webconf';

        this.viewEngine = function (view, locals) {

            return function render_web_view(req, res, next) {

                res.render(view, locals, function (err, html) {

                    if (err) next(err);
                    res.send(html);
                });
            };
        };
    }

    _createClass(WebModule, [{
        key: '__framework',
        value: function __framework() {
            var _this = this;

            var engine = this.configuration.read(this.configuration.keys.WEB_VIEWS_ENGINE, null);
            var settings = this.configuration.read(this.configuration.keys.WEB_FRAMEWORK_SETTINGS, BASKET);

            switch (typeof engine) {

                case 'function':
                    engine(this._expressApp, this.configuration);
                    break;

                case 'string':
                    this._expressApp.set('views', this.configuration.read(this.configuration.keys.WEB_VIEWS_PATHS, this.configuration.paths.views));
                    this._expressApp.set('view engine', engine);
                    break;
                case null:
                    break;

                default:
                    break;

            }

            Object.keys(settings).forEach(function (key) {
                return _this._expressApp.set(key, settings[key]);
            });
            this.modules.__framework();
        }
    }, {
        key: '__filters',
        value: function __filters(app, defaults) {

            _get(Object.getPrototypeOf(WebModule.prototype), '__filters', this).call(this, this._expressApp, defaults);
        }
    }, {
        key: '__routing',
        value: function __routing(point, app, actions) {
            var _this2 = this;

            var path = this.configuration.read(_commonConfiguration2['default'].keys.PATH, '/' + this.name);
            var routes = this.configuration.routes;

            Object.keys(routes).forEach(function (route) {
                return _this2.routes = Object.keys(routes[route]).map(function (method) {
                    return new _commonRouteRoute2['default'](method, route, actions.generate(method, route, routes[route][method]), _this2._expressApp);
                });
            });

            this.modules.__routing(path, this._expressApp, actions);
            app.use(path, this._expressApp);
        }
    }]);

    return WebModule;
})(_commonModule2['default']);

exports['default'] = WebModule;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViTW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBQW9CLFNBQVM7Ozs7bUNBQ0gseUJBQXlCOzs7OzRCQUNoQyxrQkFBa0I7Ozs7Z0NBQ25CLHVCQUF1Qjs7OztBQUV6QyxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7O0lBRVosU0FBUztjQUFULFNBQVM7O0FBRUEsYUFGVCxTQUFTLENBRUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFOzhCQUZ0QyxTQUFTOztBQUlQLG1DQUpGLFNBQVMsNkNBSUQsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFOztBQUVsQyxZQUFJLENBQUMsV0FBVyxHQUFHLDJCQUFTLENBQUM7QUFDN0IsWUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7O0FBRWpDLFlBQUksQ0FBQyxVQUFVLEdBQUcsVUFBUyxJQUFJLEVBQUUsTUFBTSxFQUFFOztBQUVyQyxtQkFBTyxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTs7QUFFNUMsbUJBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBRXpDLHdCQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkIsdUJBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBRWxCLENBQUMsQ0FBQzthQUVOLENBQUE7U0FFSixDQUFDO0tBRUw7O2lCQXhCQyxTQUFTOztlQTBCQSx1QkFBRzs7O0FBRVYsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JGLGdCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFDakYsTUFBTSxDQUFDLENBQUM7O0FBRVosb0JBQVEsT0FBTyxNQUFNOztBQUVqQixxQkFBSyxVQUFVO0FBQ1gsMEJBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUM1QywwQkFBTTs7QUFBQSxBQUVWLHFCQUFLLFFBQVE7QUFDVCx3QkFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDekMsd0JBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM1QywwQkFBTTtBQUFBLEFBQ1YscUJBQUssSUFBSTtBQUNMLDBCQUFNOztBQUFBLEFBRVY7QUFDSSwwQkFBTTs7QUFBQSxhQUViOztBQUVELGtCQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7dUJBQUksTUFBSyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBQSxDQUFDLENBQUM7QUFDL0UsZ0JBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7U0FHOUI7OztlQUVRLG1CQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUU7O0FBRXJCLHVDQTVERixTQUFTLDJDQTREUyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRTtTQUUvQzs7O2VBRVEsbUJBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7OztBQUUzQixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUNBQWMsSUFBSSxDQUFDLElBQUksUUFBTSxJQUFJLENBQUMsSUFBSSxDQUFHLENBQUM7QUFDN0UsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDOztBQUV2QyxrQkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDbkIsT0FBTyxDQUFDLFVBQUEsS0FBSzt1QkFDVCxPQUFLLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07MkJBQy9DLGtDQUFVLE1BQU0sRUFBRSxLQUFLLEVBQ25CLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFDdEQsT0FBSyxXQUFXLENBQUM7aUJBQUEsQ0FBQzthQUFBLENBQUMsQ0FBQzs7QUFFaEMsZ0JBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hELGVBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuQzs7O1dBOUVDLFNBQVM7OztxQkFrRkEsU0FBUyIsImZpbGUiOiJXZWJNb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBDb25maWd1cmF0aW9uIGZyb20gJy4uL2NvbW1vbi9Db25maWd1cmF0aW9uJztcbmltcG9ydCBNb2R1bGUgZnJvbSAnLi4vY29tbW9uL01vZHVsZSc7XG5pbXBvcnQgUm91dGUgZnJvbSAnLi4vY29tbW9uL3JvdXRlL1JvdXRlJztcblxuY29uc3QgQkFTS0VUID0ge307XG5cbmNsYXNzIFdlYk1vZHVsZSBleHRlbmRzIE1vZHVsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjb25maWcsIGNvbnRleHQsIGFwcCkge1xuXG4gICAgICAgIHN1cGVyKG5hbWUsIGNvbmZpZywgY29udGV4dCwgYXBwKTtcblxuICAgICAgICB0aGlzLl9leHByZXNzQXBwID0gZXhwcmVzcygpO1xuICAgICAgICB0aGlzLmNvbmZpZ0RpcmVjdG9yeSA9ICd3ZWJjb25mJztcblxuICAgICAgICB0aGlzLnZpZXdFbmdpbmUgPSBmdW5jdGlvbih2aWV3LCBsb2NhbHMpIHtcblxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHJlbmRlcl93ZWJfdmlldyhyZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgICAgICAgICAgcmVzLnJlbmRlcih2aWV3LCBsb2NhbHMsIGZ1bmN0aW9uKGVyciwgaHRtbCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIG5leHQoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoaHRtbCk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICB9XG5cbiAgICBfX2ZyYW1ld29yaygpIHtcblxuICAgICAgICB2YXIgZW5naW5lID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuV0VCX1ZJRVdTX0VOR0lORSwgbnVsbCk7XG4gICAgICAgIHZhciBzZXR0aW5ncyA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLldFQl9GUkFNRVdPUktfU0VUVElOR1MsXG4gICAgICAgICAgICBCQVNLRVQpO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGVuZ2luZSkge1xuXG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgZW5naW5lKHRoaXMuX2V4cHJlc3NBcHAsIHRoaXMuY29uZmlndXJhdGlvbilcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9leHByZXNzQXBwLnNldCgndmlld3MnLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5XRUJfVklFV1NfUEFUSFMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24ucGF0aHMudmlld3MpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leHByZXNzQXBwLnNldCgndmlldyBlbmdpbmUnLCBlbmdpbmUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBudWxsOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3Qua2V5cyhzZXR0aW5ncykuZm9yRWFjaChrZXkgPT4gdGhpcy5fZXhwcmVzc0FwcC5zZXQoa2V5LCBzZXR0aW5nc1trZXldKSk7XG4gICAgICAgIHRoaXMubW9kdWxlcy5fX2ZyYW1ld29yaygpO1xuXG5cbiAgICB9XG5cbiAgICBfX2ZpbHRlcnMoYXBwLCBkZWZhdWx0cykge1xuXG4gICAgICAgIHN1cGVyLl9fZmlsdGVycyh0aGlzLl9leHByZXNzQXBwLCBkZWZhdWx0cyk7XG5cbiAgICB9XG5cbiAgICBfX3JvdXRpbmcocG9pbnQsIGFwcCwgYWN0aW9ucykge1xuXG4gICAgICAgIHZhciBwYXRoID0gdGhpcy5jb25maWd1cmF0aW9uLnJlYWQoQ29uZmlndXJhdGlvbi5rZXlzLlBBVEgsIGAvJHt0aGlzLm5hbWV9YCk7XG4gICAgICAgIHZhciByb3V0ZXMgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucm91dGVzO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHJvdXRlcykuXG4gICAgICAgIGZvckVhY2gocm91dGUgPT5cbiAgICAgICAgICAgIHRoaXMucm91dGVzID0gT2JqZWN0LmtleXMocm91dGVzW3JvdXRlXSkubWFwKG1ldGhvZCA9PlxuICAgICAgICAgICAgICAgIG5ldyBSb3V0ZShtZXRob2QsIHJvdXRlLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLmdlbmVyYXRlKG1ldGhvZCwgcm91dGUsIHJvdXRlc1tyb3V0ZV1bbWV0aG9kXSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V4cHJlc3NBcHApKSk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9fcm91dGluZyhwYXRoLCB0aGlzLl9leHByZXNzQXBwLCBhY3Rpb25zKTtcbiAgICAgICAgYXBwLnVzZShwYXRoLCB0aGlzLl9leHByZXNzQXBwKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViTW9kdWxlXG4iXX0=