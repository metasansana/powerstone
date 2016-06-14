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
 * UnknownConnectorError 
 */

var UnknownConnectorError = (function (_PowerError) {
    _inherits(UnknownConnectorError, _PowerError);

    function UnknownConnectorError(key, connector, connectors) {
        _classCallCheck(this, UnknownConnectorError);

        _get(Object.getPrototypeOf(UnknownConnectorError.prototype), 'constructor', this).call(this, 'The connection \'' + key + '\' declares an unknown connector \'' + connector + '\'!' + ('Known connectors-> [' + Object.keys(connectors).join(',') + '].'));
    }

    return UnknownConnectorError;
})(_PowerError3['default']);

exports['default'] = UnknownConnectorError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vVW5rbm93bkNvbm5lY3RvckVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzJCQUF1QixjQUFjOzs7Ozs7OztJQUsvQixxQkFBcUI7Y0FBckIscUJBQXFCOztBQUVaLGFBRlQscUJBQXFCLENBRVgsR0FBRyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUU7OEJBRnRDLHFCQUFxQjs7QUFJbkIsbUNBSkYscUJBQXFCLDZDQUliLHNCQUFtQixHQUFHLDJDQUFvQyxTQUFTLHFDQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBSSxFQUFFO0tBRXJFOztXQVBDLHFCQUFxQjs7O3FCQVdaLHFCQUFxQiIsImZpbGUiOiJVbmtub3duQ29ubmVjdG9yRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG93ZXJFcnJvciBmcm9tICcuL1Bvd2VyRXJyb3InO1xuXG4vKipcbiAqIFVua25vd25Db25uZWN0b3JFcnJvciBcbiAqL1xuY2xhc3MgVW5rbm93bkNvbm5lY3RvckVycm9yIGV4dGVuZHMgUG93ZXJFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihrZXksIGNvbm5lY3RvciwgY29ubmVjdG9ycykge1xuXG4gICAgICAgIHN1cGVyKGBUaGUgY29ubmVjdGlvbiAnJHtrZXl9JyBkZWNsYXJlcyBhbiB1bmtub3duIGNvbm5lY3RvciAnJHtjb25uZWN0b3J9JyFgICtcbiAgICAgICAgICAgIGBLbm93biBjb25uZWN0b3JzLT4gWyR7T2JqZWN0LmtleXMoY29ubmVjdG9ycykuam9pbignLCcpfV0uYCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVW5rbm93bkNvbm5lY3RvckVycm9yXG4iXX0=