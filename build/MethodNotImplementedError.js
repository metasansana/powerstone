'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _PowerStoneError2 = require('./PowerStoneError');

var _PowerStoneError3 = _interopRequireDefault(_PowerStoneError2);

/**
 * MethodNotImplementedError
 */

var MethodNotImplementedError = (function (_PowerStoneError) {
    function MethodNotImplementedError(method) {
        _classCallCheck(this, MethodNotImplementedError);

        _get(Object.getPrototypeOf(MethodNotImplementedError.prototype), 'constructor', this).call(this);
        _PowerStoneError3['default'].setup.call(this);
    }

    _inherits(MethodNotImplementedError, _PowerStoneError);

    return MethodNotImplementedError;
})(_PowerStoneError3['default']);

exports['default'] = MethodNotImplementedError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXRob2ROb3RJbXBsZW1lbnRlZEVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2dDQUE0QixtQkFBbUI7Ozs7Ozs7O0lBS3pDLHlCQUF5QjtBQUVoQixhQUZULHlCQUF5QixDQUVmLE1BQU0sRUFBRTs4QkFGbEIseUJBQXlCOztBQUd2QixtQ0FIRix5QkFBeUIsNkNBR2Y7QUFDUixxQ0FBZ0IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUduQzs7Y0FQQyx5QkFBeUI7O1dBQXpCLHlCQUF5Qjs7O3FCQVdoQix5QkFBeUIiLCJmaWxlIjoiTWV0aG9kTm90SW1wbGVtZW50ZWRFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb3dlclN0b25lRXJyb3IgZnJvbSAnLi9Qb3dlclN0b25lRXJyb3InO1xuXG4vKipcbiAqIE1ldGhvZE5vdEltcGxlbWVudGVkRXJyb3JcbiAqL1xuY2xhc3MgTWV0aG9kTm90SW1wbGVtZW50ZWRFcnJvciBleHRlbmRzIFBvd2VyU3RvbmVFcnJvcntcblxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBQb3dlclN0b25lRXJyb3Iuc2V0dXAuY2FsbCh0aGlzKVxuXG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWV0aG9kTm90SW1wbGVtZW50ZWRFcnJvclxuIl19