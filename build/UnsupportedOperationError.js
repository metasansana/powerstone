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
 *  UnsupportedOperationError
 */

var UnsupportedOperationError = (function (_PowerStoneError) {

  /**
   *
   * @param {String} method
   * @param {String} klass
   * @param {String} [message]
   */

  function UnsupportedOperationError(method, klass, message) {
    _classCallCheck(this, UnsupportedOperationError);

    _get(Object.getPrototypeOf(UnsupportedOperationError.prototype), 'constructor', this).call(this);
    message = message || 'Unsupported method: {{klass}}#{{method}}';
    _PowerStoneError3['default'].setup.call(this, (0, _strtpl2['default'])(message, { klass: klass, method: method }));
  }

  _inherits(UnsupportedOperationError, _PowerStoneError);

  return UnsupportedOperationError;
})(_PowerStoneError3['default']);

exports['default'] = UnsupportedOperationError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VbnN1cHBvcnRlZE9wZXJhdGlvbkVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2dDQUE0QixtQkFBbUI7Ozs7c0JBQy9CLFFBQVE7Ozs7Ozs7O0lBS2pCLHlCQUF5Qjs7Ozs7Ozs7O0FBUWpCLFdBUlIseUJBQXlCLENBUWhCLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFOzBCQVJqQyx5QkFBeUI7O0FBU3hCLCtCQVRELHlCQUF5Qiw2Q0FTaEI7QUFDUixXQUFPLEdBQUcsT0FBTyxJQUFJLDBDQUEwQyxDQUFDO0FBQ2hFLGlDQUFnQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSx5QkFBSSxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7R0FDaEY7O1lBWkUseUJBQXlCOztTQUF6Qix5QkFBeUI7OztxQkFnQmpCLHlCQUF5QiIsImZpbGUiOiJVbnN1cHBvcnRlZE9wZXJhdGlvbkVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvd2VyU3RvbmVFcnJvciBmcm9tICcuL1Bvd2VyU3RvbmVFcnJvcic7XG5pbXBvcnQgc3RyIGZyb20gJ3N0cnRwbCc7XG5cbi8qKlxuICogIFVuc3VwcG9ydGVkT3BlcmF0aW9uRXJyb3JcbiAqL1xuY2xhc3MgIFVuc3VwcG9ydGVkT3BlcmF0aW9uRXJyb3IgZXh0ZW5kcyBQb3dlclN0b25lRXJyb3J7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2xhc3NcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW21lc3NhZ2VdXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBrbGFzcywgbWVzc2FnZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBtZXNzYWdlID0gbWVzc2FnZSB8fCAnVW5zdXBwb3J0ZWQgbWV0aG9kOiB7e2tsYXNzfX0je3ttZXRob2R9fSc7XG4gICAgICAgIFBvd2VyU3RvbmVFcnJvci5zZXR1cC5jYWxsKHRoaXMsIHN0cihtZXNzYWdlLCB7a2xhc3M6a2xhc3MsIG1ldGhvZDptZXRob2R9KSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFVuc3VwcG9ydGVkT3BlcmF0aW9uRXJyb3JcbiJdfQ==