'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Feature2 = require('../Feature');

var _Feature3 = _interopRequireDefault(_Feature2);

var _PipeController = require('./PipeController');

var _PipeController2 = _interopRequireDefault(_PipeController);

/**
 * PipeFeature installs middleware for the pipes framework
 * on a route.
 */

var PipeFeature = (function (_Feature) {
    _inherits(PipeFeature, _Feature);

    function PipeFeature() {
        _classCallCheck(this, PipeFeature);

        _get(Object.getPrototypeOf(PipeFeature.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(PipeFeature, [{
        key: 'install',
        value: function install(method, path, definition, q) {
            var _this = this;

            if (typeof definition.pipes !== 'object') return;

            Object.keys(definition.pipes).forEach(function (prop) {
                q.enque(method, function (req, res, next) {
                    return new _PipeController2['default'](req, res, _this.application).filter(prop, definition, next);
                });
            });
        }
    }]);

    return PipeFeature;
})(_Feature3['default']);

exports['default'] = PipeFeature;
module.exports = exports['default'];
//# sourceMappingURL=PipeFeature.js.map