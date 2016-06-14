'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _PowerError2 = require('./PowerError');

var _PowerError3 = _interopRequireDefault(_PowerError2);

/**
 * UnknownFilterError 
 */

var UnknownFilterError = (function (_PowerError) {
    _inherits(UnknownFilterError, _PowerError);

    function UnknownFilterError(module, filter) {
        _classCallCheck(this, UnknownFilterError);

        _get(Object.getPrototypeOf(UnknownFilterError.prototype), 'constructor', this).call(this, 'Unable to locate filter \'' + filter + '\' specified in module ' + module + '!');
    }

    return UnknownFilterError;
})(_PowerError3['default']);

exports['default'] = UnknownFilterError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vVW5rbm93bkZpbHRlckVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzJCQUF1QixjQUFjOzs7Ozs7OztJQUsvQixrQkFBa0I7Y0FBbEIsa0JBQWtCOztBQUVULGFBRlQsa0JBQWtCLENBRVIsTUFBTSxFQUFFLE1BQU0sRUFBRTs4QkFGMUIsa0JBQWtCOztBQUloQixtQ0FKRixrQkFBa0IsNEVBSWtCLE1BQU0sK0JBQXlCLE1BQU0sUUFBSztLQUUvRTs7V0FOQyxrQkFBa0I7OztxQkFVVCxrQkFBa0IiLCJmaWxlIjoiVW5rbm93bkZpbHRlckVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvd2VyRXJyb3IgZnJvbSAnLi9Qb3dlckVycm9yJztcblxuLyoqXG4gKiBVbmtub3duRmlsdGVyRXJyb3IgXG4gKi9cbmNsYXNzIFVua25vd25GaWx0ZXJFcnJvciBleHRlbmRzIFBvd2VyRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IobW9kdWxlLCBmaWx0ZXIpIHtcblxuICAgICAgICBzdXBlcihgVW5hYmxlIHRvIGxvY2F0ZSBmaWx0ZXIgJyR7ZmlsdGVyfScgc3BlY2lmaWVkIGluIG1vZHVsZSAke21vZHVsZX0hYCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVW5rbm93bkZpbHRlckVycm9yXG4iXX0=