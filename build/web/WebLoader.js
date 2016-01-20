'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _commonLoader = require('../common/Loader');

var _commonLoader2 = _interopRequireDefault(_commonLoader);

var _commonConfiguration = require('../common/Configuration');

var _commonConfiguration2 = _interopRequireDefault(_commonConfiguration);

var _commonProperties = require('../common/properties');

var WebLoader = (function (_Loader) {
    _inherits(WebLoader, _Loader);

    function WebLoader() {
        _classCallCheck(this, WebLoader);

        _get(Object.getPrototypeOf(WebLoader.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(WebLoader, [{
        key: 'getConfiguration',
        value: function getConfiguration() {
            return new _commonConfiguration2['default'](this.load(_commonProperties.paths.WEB_CONFIG), this.join(_commonProperties.paths.WEB_CONFIG));
        }
    }]);

    return WebLoader;
})(_commonLoader2['default']);

exports['default'] = WebLoader;
module.exports = exports['default'];
//# sourceMappingURL=WebLoader.js.map