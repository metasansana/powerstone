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
            var routes = this.configuration.routes.routes;

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
//# sourceMappingURL=WebModule.js.map