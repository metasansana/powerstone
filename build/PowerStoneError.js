'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Qb3dlclN0b25lRXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxvQkFBb0IsSUFBRyxtQkFBbUIsSUFBSSxLQUFLLENBQUEsQ0FBQzs7Ozs7O0lBS3BELGVBQWU7Y0FBZixlQUFlOzthQUFmLGVBQWU7OEJBQWYsZUFBZTs7bUNBQWYsZUFBZTs7O1dBQWYsZUFBZTtHQUFTLEtBQUs7O0FBSW5DLGVBQWUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxPQUFPLEVBQUU7UUFDL0IsSUFBSSxHQUFLLElBQUksQ0FBQyxXQUFXLENBQXpCLElBQUk7O0FBRVosUUFBSSxvQkFBb0IsRUFDcEIsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsS0FFaEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ2pDLGFBQUssRUFBRSxJQUFJLEtBQUssRUFBRSxDQUFDLEtBQUs7S0FDM0IsQ0FBQyxDQUFDOztBQUVQLFVBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7QUFDMUIsWUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtBQUNyQixlQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO0tBQzlCLENBQUMsQ0FBQTtDQUNMLENBQUM7O3FCQUVhLGVBQWUiLCJmaWxlIjoiUG93ZXJTdG9uZUVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaGFzQ2FwdHVyZVN0YWNrVHJhY2UgPSAnY2FwdHVyZVN0YWNrVHJhY2UnIGluIEVycm9yO1xuXG4vKipcbiAqIFBvd2VyU3RvbmVFcnJvclxuICovXG5jbGFzcyBQb3dlclN0b25lRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbn1cblxuUG93ZXJTdG9uZUVycm9yLnNldHVwID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICBpZiAoaGFzQ2FwdHVyZVN0YWNrVHJhY2UpXG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgIGVsc2VcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzdGFjaycsIHtcbiAgICAgICAgICAgIHZhbHVlOiBuZXcgRXJyb3IoKS5zdGFja1xuICAgICAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgICAgbmFtZTogeyB2YWx1ZTogbmFtZSB9LFxuICAgICAgICBtZXNzYWdlOiB7IHZhbHVlOiBtZXNzYWdlIH1cbiAgICB9KVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUG93ZXJTdG9uZUVycm9yXG4iXX0=