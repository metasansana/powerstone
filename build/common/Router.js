'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _commonRoute = require('../common/Route');

var _commonRoute2 = _interopRequireDefault(_commonRoute);

/**
 * Router provides methods for setting up 
 * application routing.
 * @param {Framework} fw 
 * @param {Configuration} config 
 */

var Router = (function () {
    function Router(fw, config) {
        _classCallCheck(this, Router);

        this.fw = fw;
        this.config = config;
    }

    _createClass(Router, [{
        key: 'configure',

        /**
         * configure routing
         * @param {object} routes 
         */
        value: function configure(routes) {
            var _this = this;

            var route;
            Object.keys(routes).forEach(function (path) {
                return Object.keys(routes[path]).forEach(function (method) {
                    route = new _commonRoute2['default'](method.toLowerCase(), path, _this.fw, _this.config);
                    route.configureDefault(routes[path][method]).configureSchema(routes[path][method].schema).configurePipes(routes[path][method].pipes).configureMiddleware(routes[path][method].middleware).configureAction(routes[path][method].action);
                });
            });
        }
    }]);

    return Router;
})();

exports['default'] = Router;
module.exports = exports['default'];
//# sourceMappingURL=Router.js.map