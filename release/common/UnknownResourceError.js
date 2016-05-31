/**
 * UnknownResourceError 
 * @param {string} lookup 
 * @param {string} str 
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnknownResourceError = (function (_Error) {
    _inherits(UnknownResourceError, _Error);

    function UnknownResourceError(lookup, str) {
        _classCallCheck(this, UnknownResourceError);

        _get(Object.getPrototypeOf(UnknownResourceError.prototype), "constructor", this).call(this, "An unknown lookup '" + lookup + "' was specified in the string '" + str + "'!");
        Error.captureStackTrace(this, this.constructor);
    }

    return UnknownResourceError;
})(Error);

exports["default"] = UnknownResourceError;
module.exports = exports["default"];
//# sourceMappingURL=UnknownResourceError.js.map