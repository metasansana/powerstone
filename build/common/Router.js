'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Route = require('./Route');

var _Route2 = _interopRequireDefault(_Route);

var _Converter = require('./Converter');

var _Converter2 = _interopRequireDefault(_Converter);

/**
 * Router provides methods for setting up 
 * application routing.
 * @param {Framework} fw 
 */

var Router = (function () {
    function Router(fw) {
        _classCallCheck(this, Router);

        this.framework = fw;
    }

    /**
     * configure routing
     * @param {string} mode 
     * @param {object} routes 
     * @param {Application} app 
     */

    _createClass(Router, [{
        key: 'configure',
        value: function configure(mode, routes, app) {
            var _this = this;

            var route;
            var definition;
            var convert = new _Converter2['default'](app.middleware, app.controllers);

            Object.keys(routes).forEach(function (path) {
                return Object.keys(routes[path]).forEach(function (method) {

                    definition = routes[path][method];
                    route = new _Route2['default'](method.toLowerCase(), path, _this.framework, definition, convert);

                    if (typeof definition.pipes === 'object') Object.keys(definition.pipes).forEach(function (key) {
                        return route.configurePipes(key, definition.pipes[key], app.framework.pipes);
                    });

                    route.configureMiddleware(definition.middleware);

                    if (mode === 'web') route.configureView(definition.view, definition.locals);

                    route.configureAction(definition.action);
                    route.configureHandler(definition.handler);
                    route.configureOther(mode, definition);
                    route.done();
                });
            });
        }
    }]);

    return Router;
})();

exports['default'] = Router;
module.exports = exports['default'];
//# sourceMappingURL=Router.js.map