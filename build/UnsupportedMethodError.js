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

var _strtpl = require('strtpl');

var _strtpl2 = _interopRequireDefault(_strtpl);

/**
 *  UnsupportedMethodError
 */

var UnsupportedMethodError = (function (_PowerStoneError) {

  /**
   *
   * @param {String} method
   * @param {String} klass
   * @param {String} [message]
   */

  function UnsupportedMethodError(method, klass, message) {
    _classCallCheck(this, UnsupportedMethodError);

    _get(Object.getPrototypeOf(UnsupportedMethodError.prototype), 'constructor', this).call(this);
    message = message || 'Unsupported method: {{klass}}#{{method}}';
    _PowerStoneError3['default'].setup.call(this, (0, _strtpl2['default'])(message, { klass: klass, method: method }));
  }

  _inherits(UnsupportedMethodError, _PowerStoneError);

  return UnsupportedMethodError;
})(_PowerStoneError3['default']);

exports['default'] = UnsupportedMethodError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VbnN1cHBvcnRlZE1ldGhvZEVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2dDQUE0QixtQkFBbUI7Ozs7c0JBQy9CLFFBQVE7Ozs7Ozs7O0lBS2pCLHNCQUFzQjs7Ozs7Ozs7O0FBUWQsV0FSUixzQkFBc0IsQ0FRYixNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTswQkFSakMsc0JBQXNCOztBQVNyQiwrQkFURCxzQkFBc0IsNkNBU2I7QUFDUixXQUFPLEdBQUcsT0FBTyxJQUFJLDBDQUEwQyxDQUFDO0FBQ2hFLGlDQUFnQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSx5QkFBSSxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7R0FDaEY7O1lBWkUsc0JBQXNCOztTQUF0QixzQkFBc0I7OztxQkFnQmQsc0JBQXNCIiwiZmlsZSI6IlVuc3VwcG9ydGVkTWV0aG9kRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG93ZXJTdG9uZUVycm9yIGZyb20gJy4vUG93ZXJTdG9uZUVycm9yJztcbmltcG9ydCBzdHIgZnJvbSAnc3RydHBsJztcblxuLyoqXG4gKiAgVW5zdXBwb3J0ZWRNZXRob2RFcnJvclxuICovXG5jbGFzcyAgVW5zdXBwb3J0ZWRNZXRob2RFcnJvciBleHRlbmRzIFBvd2VyU3RvbmVFcnJvcntcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrbGFzc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbbWVzc2FnZV1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihtZXRob2QsIGtsYXNzLCBtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlIHx8ICdVbnN1cHBvcnRlZCBtZXRob2Q6IHt7a2xhc3N9fSN7e21ldGhvZH19JztcbiAgICAgICAgUG93ZXJTdG9uZUVycm9yLnNldHVwLmNhbGwodGhpcywgc3RyKG1lc3NhZ2UsIHtrbGFzczprbGFzcywgbWV0aG9kOm1ldGhvZH0pKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVW5zdXBwb3J0ZWRNZXRob2RFcnJvclxuIl19