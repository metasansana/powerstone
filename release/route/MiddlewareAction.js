/**
 * MiddlewareAction configures middleware specified by the 'middlewares'
 * key in a route declaration.
 * @implements {Action}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MiddlewareAction = (function () {
    function MiddlewareAction(resources) {
        _classCallCheck(this, MiddlewareAction);

        this._resources = resources;
    }

    _createClass(MiddlewareAction, [{
        key: 'generate',
        value: function generate(method, path, route) {
            var _this = this;

            if (Array.isArray(route.middleware)) return route.middleware.map(function (middleware) {
                return typeof middleware === 'function' ? middleware : _this._resources.lookup(middleware).module;
            });
        }
    }]);

    return MiddlewareAction;
})();

exports['default'] = MiddlewareAction;
module.exports = exports['default'];
//# sourceMappingURL=MiddlewareAction.js.map