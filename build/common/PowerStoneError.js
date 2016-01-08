'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hasCaptureStackTrace = ('captureStackTrace' in Error);

/**
 * PowerStoneError
 */

var PowerStoneError = (function (_Error) {
    _inherits(PowerStoneError, _Error);

    function PowerStoneError() {
        _classCallCheck(this, PowerStoneError);

        _get(Object.getPrototypeOf(PowerStoneError.prototype), 'constructor', this).apply(this, arguments);
    }

    return PowerStoneError;
})(Error);

PowerStoneError.setup = function (message) {
    var name = this.constructor.name;

    if (hasCaptureStackTrace) Error.captureStackTrace(this, this.constructor);else Object.defineProperty(this, 'stack', {
        value: new Error().stack
    });

    Object.defineProperties(this, {
        name: { value: name },
        message: { value: message }
    });
};

exports['default'] = PowerStoneError;
module.exports = exports['default'];
//# sourceMappingURL=PowerStoneError.js.map