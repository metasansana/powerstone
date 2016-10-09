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
                    return new _commonRouteRoute2['default'](method, route, routes[route][method], actions.generate(method, route, routes[route][method], _this2.application), _this2._expressApp);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViTW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBQW9CLFNBQVM7Ozs7bUNBQ0gseUJBQXlCOzs7OzRCQUNoQyxrQkFBa0I7Ozs7Z0NBQ25CLHVCQUF1Qjs7OztBQUV6QyxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7O0lBRVosU0FBUztjQUFULFNBQVM7O0FBRUEsYUFGVCxTQUFTLENBRUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFOzhCQUZ0QyxTQUFTOztBQUlQLG1DQUpGLFNBQVMsNkNBSUQsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFOztBQUVsQyxZQUFJLENBQUMsV0FBVyxHQUFHLDJCQUFTLENBQUM7QUFDN0IsWUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7O0FBRWpDLFlBQUksQ0FBQyxVQUFVLEdBQUcsVUFBUyxJQUFJLEVBQUUsTUFBTSxFQUFFOztBQUVyQyxtQkFBTyxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTs7QUFFNUMsbUJBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBRXpDLHdCQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkIsdUJBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBRWxCLENBQUMsQ0FBQzthQUVOLENBQUE7U0FFSixDQUFDO0tBRUw7O2lCQXhCQyxTQUFTOztlQTBCQSx1QkFBRzs7O0FBRVYsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JGLGdCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFDakYsTUFBTSxDQUFDLENBQUM7O0FBRVosb0JBQVEsT0FBTyxNQUFNOztBQUVqQixxQkFBSyxVQUFVO0FBQ1gsMEJBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUM1QywwQkFBTTs7QUFBQSxBQUVWLHFCQUFLLFFBQVE7QUFDVCx3QkFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDekMsd0JBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM1QywwQkFBTTtBQUFBLEFBQ1YscUJBQUssSUFBSTtBQUNMLDBCQUFNOztBQUFBLEFBRVY7QUFDSSwwQkFBTTs7QUFBQSxhQUViOztBQUVELGtCQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7dUJBQUksTUFBSyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBQSxDQUFDLENBQUM7QUFDL0UsZ0JBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7U0FHOUI7OztlQUVRLG1CQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUU7O0FBRXJCLHVDQTVERixTQUFTLDJDQTREUyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRTtTQUUvQzs7O2VBRVEsbUJBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7OztBQUUzQixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUNBQWMsSUFBSSxDQUFDLElBQUksUUFBTSxJQUFJLENBQUMsSUFBSSxDQUFHLENBQUM7QUFDN0UsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDOztBQUV2QyxrQkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDbkIsT0FBTyxDQUFDLFVBQUEsS0FBSzt1QkFDVCxPQUFLLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07MkJBQy9DLGtDQUFVLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUMxQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQUssV0FBVyxDQUFDLEVBQ3hFLE9BQUssV0FBVyxDQUFDO2lCQUFBLENBQUM7YUFBQSxDQUFDLENBQUM7O0FBRWhDLGdCQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN4RCxlQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkM7OztXQTlFQyxTQUFTOzs7cUJBa0ZBLFNBQVMiLCJmaWxlIjoiV2ViTW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgQ29uZmlndXJhdGlvbiBmcm9tICcuLi9jb21tb24vQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgTW9kdWxlIGZyb20gJy4uL2NvbW1vbi9Nb2R1bGUnO1xuaW1wb3J0IFJvdXRlIGZyb20gJy4uL2NvbW1vbi9yb3V0ZS9Sb3V0ZSc7XG5cbmNvbnN0IEJBU0tFVCA9IHt9O1xuXG5jbGFzcyBXZWJNb2R1bGUgZXh0ZW5kcyBNb2R1bGUge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgY29uZmlnLCBjb250ZXh0LCBhcHApIHtcblxuICAgICAgICBzdXBlcihuYW1lLCBjb25maWcsIGNvbnRleHQsIGFwcCk7XG5cbiAgICAgICAgdGhpcy5fZXhwcmVzc0FwcCA9IGV4cHJlc3MoKTtcbiAgICAgICAgdGhpcy5jb25maWdEaXJlY3RvcnkgPSAnd2ViY29uZic7XG5cbiAgICAgICAgdGhpcy52aWV3RW5naW5lID0gZnVuY3Rpb24odmlldywgbG9jYWxzKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiByZW5kZXJfd2ViX3ZpZXcocmVxLCByZXMsIG5leHQpIHtcblxuICAgICAgICAgICAgICAgIHJlcy5yZW5kZXIodmlldywgbG9jYWxzLCBmdW5jdGlvbihlcnIsIGh0bWwpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSBuZXh0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKGh0bWwpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgX19mcmFtZXdvcmsoKSB7XG5cbiAgICAgICAgdmFyIGVuZ2luZSA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLldFQl9WSUVXU19FTkdJTkUsIG51bGwpO1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSB0aGlzLmNvbmZpZ3VyYXRpb24ucmVhZCh0aGlzLmNvbmZpZ3VyYXRpb24ua2V5cy5XRUJfRlJBTUVXT1JLX1NFVFRJTkdTLFxuICAgICAgICAgICAgQkFTS0VUKTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBlbmdpbmUpIHtcblxuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgIGVuZ2luZSh0aGlzLl9leHByZXNzQXBwLCB0aGlzLmNvbmZpZ3VyYXRpb24pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXhwcmVzc0FwcC5zZXQoJ3ZpZXdzJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuV0VCX1ZJRVdTX1BBVEhTLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnBhdGhzLnZpZXdzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXhwcmVzc0FwcC5zZXQoJ3ZpZXcgZW5naW5lJywgZW5naW5lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmtleXMoc2V0dGluZ3MpLmZvckVhY2goa2V5ID0+IHRoaXMuX2V4cHJlc3NBcHAuc2V0KGtleSwgc2V0dGluZ3Nba2V5XSkpO1xuICAgICAgICB0aGlzLm1vZHVsZXMuX19mcmFtZXdvcmsoKTtcblxuXG4gICAgfVxuXG4gICAgX19maWx0ZXJzKGFwcCwgZGVmYXVsdHMpIHtcblxuICAgICAgICBzdXBlci5fX2ZpbHRlcnModGhpcy5fZXhwcmVzc0FwcCwgZGVmYXVsdHMpO1xuXG4gICAgfVxuXG4gICAgX19yb3V0aW5nKHBvaW50LCBhcHAsIGFjdGlvbnMpIHtcblxuICAgICAgICB2YXIgcGF0aCA9IHRoaXMuY29uZmlndXJhdGlvbi5yZWFkKENvbmZpZ3VyYXRpb24ua2V5cy5QQVRILCBgLyR7dGhpcy5uYW1lfWApO1xuICAgICAgICB2YXIgcm91dGVzID0gdGhpcy5jb25maWd1cmF0aW9uLnJvdXRlcztcblxuICAgICAgICBPYmplY3Qua2V5cyhyb3V0ZXMpLlxuICAgICAgICBmb3JFYWNoKHJvdXRlID0+XG4gICAgICAgICAgICB0aGlzLnJvdXRlcyA9IE9iamVjdC5rZXlzKHJvdXRlc1tyb3V0ZV0pLm1hcChtZXRob2QgPT5cbiAgICAgICAgICAgICAgICBuZXcgUm91dGUobWV0aG9kLCByb3V0ZSwgcm91dGVzW3JvdXRlXVttZXRob2RdLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLmdlbmVyYXRlKG1ldGhvZCwgcm91dGUsIHJvdXRlc1tyb3V0ZV1bbWV0aG9kXSwgdGhpcy5hcHBsaWNhdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V4cHJlc3NBcHApKSk7XG5cbiAgICAgICAgdGhpcy5tb2R1bGVzLl9fcm91dGluZyhwYXRoLCB0aGlzLl9leHByZXNzQXBwLCBhY3Rpb25zKTtcbiAgICAgICAgYXBwLnVzZShwYXRoLCB0aGlzLl9leHByZXNzQXBwKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2ViTW9kdWxlXG4iXX0=