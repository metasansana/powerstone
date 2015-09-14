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
//# sourceMappingURL=Routing.js.map