'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _PowerError2 = require('../PowerError');

var _PowerError3 = _interopRequireDefault(_PowerError2);

var UnknownMiddlewareError = (function (_PowerError) {
    _inherits(UnknownMiddlewareError, _PowerError);

    function UnknownMiddlewareError(ware) {
        _classCallCheck(this, UnknownMiddlewareError);

        _get(Object.getPrototypeOf(UnknownMiddlewareError.prototype), 'constructor', this).call(this, 'Unable to locate middleware specified as ' + ware + '!');
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * MiddlewareAction configures middleware specified by the 'middlewares'
     * key in a route declaration.
     * @implements {Action}
     */
    return UnknownMiddlewareError;
})(_PowerError3['default']);

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

                if (typeof middleware === 'function') return middleware;

                var module = _this._resources.find(middleware);

                if (!module) throw new UnknownMiddlewareError(middleware);

                return module;
            });
        }
    }]);

    return MiddlewareAction;
})();

exports['default'] = MiddlewareAction;
module.exports = exports['default'];
//# sourceMappingURL=MiddlewareAction.js.map