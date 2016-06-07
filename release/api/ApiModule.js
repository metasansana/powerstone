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
            var routes = this.configuration.routes.routes;

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
//# sourceMappingURL=ApiModule.js.map