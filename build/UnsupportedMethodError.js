'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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
  _inherits(UnsupportedMethodError, _PowerStoneError);

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

  return UnsupportedMethodError;
})(_PowerStoneError3['default']);

exports['default'] = UnsupportedMethodError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VbnN1cHBvcnRlZE1ldGhvZEVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2dDQUE0QixtQkFBbUI7Ozs7c0JBQy9CLFFBQVE7Ozs7Ozs7O0lBS2pCLHNCQUFzQjtZQUF0QixzQkFBc0I7Ozs7Ozs7OztBQVFkLFdBUlIsc0JBQXNCLENBUWIsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7MEJBUmpDLHNCQUFzQjs7QUFTckIsK0JBVEQsc0JBQXNCLDZDQVNiO0FBQ1IsV0FBTyxHQUFHLE9BQU8sSUFBSSwwQ0FBMEMsQ0FBQztBQUNoRSxpQ0FBZ0IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUseUJBQUksT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ2hGOztTQVpFLHNCQUFzQjs7O3FCQWdCZCxzQkFBc0IiLCJmaWxlIjoiVW5zdXBwb3J0ZWRNZXRob2RFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb3dlclN0b25lRXJyb3IgZnJvbSAnLi9Qb3dlclN0b25lRXJyb3InO1xuaW1wb3J0IHN0ciBmcm9tICdzdHJ0cGwnO1xuXG4vKipcbiAqICBVbnN1cHBvcnRlZE1ldGhvZEVycm9yXG4gKi9cbmNsYXNzICBVbnN1cHBvcnRlZE1ldGhvZEVycm9yIGV4dGVuZHMgUG93ZXJTdG9uZUVycm9ye1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtsYXNzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFttZXNzYWdlXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwga2xhc3MsIG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgJ1Vuc3VwcG9ydGVkIG1ldGhvZDoge3trbGFzc319I3t7bWV0aG9kfX0nO1xuICAgICAgICBQb3dlclN0b25lRXJyb3Iuc2V0dXAuY2FsbCh0aGlzLCBzdHIobWVzc2FnZSwge2tsYXNzOmtsYXNzLCBtZXRob2Q6bWV0aG9kfSkpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBVbnN1cHBvcnRlZE1ldGhvZEVycm9yXG4iXX0=