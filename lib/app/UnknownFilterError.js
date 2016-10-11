'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _PowerError2 = require('./PowerError');

var _PowerError3 = _interopRequireDefault(_PowerError2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * UnknownFilterError 
 */
var UnknownFilterError = function (_PowerError) {
    _inherits(UnknownFilterError, _PowerError);

    function UnknownFilterError(module, filter) {
        _classCallCheck(this, UnknownFilterError);

        return _possibleConstructorReturn(this, (UnknownFilterError.__proto__ || Object.getPrototypeOf(UnknownFilterError)).call(this, 'Unable to locate filter \'' + filter + '\' specified in module ' + module + '!'));
    }

    return UnknownFilterError;
}(_PowerError3.default);

exports.default = UnknownFilterError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvVW5rbm93bkZpbHRlckVycm9yLmpzIl0sIm5hbWVzIjpbIlVua25vd25GaWx0ZXJFcnJvciIsIm1vZHVsZSIsImZpbHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsa0I7OztBQUVGLGdDQUFZQyxNQUFaLEVBQW9CQyxNQUFwQixFQUE0QjtBQUFBOztBQUFBLHNLQUVVQSxNQUZWLCtCQUV5Q0QsTUFGekM7QUFJM0I7Ozs7O2tCQUlVRCxrQiIsImZpbGUiOiJVbmtub3duRmlsdGVyRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG93ZXJFcnJvciBmcm9tICcuL1Bvd2VyRXJyb3InO1xuXG4vKipcbiAqIFVua25vd25GaWx0ZXJFcnJvciBcbiAqL1xuY2xhc3MgVW5rbm93bkZpbHRlckVycm9yIGV4dGVuZHMgUG93ZXJFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihtb2R1bGUsIGZpbHRlcikge1xuXG4gICAgICAgIHN1cGVyKGBVbmFibGUgdG8gbG9jYXRlIGZpbHRlciAnJHtmaWx0ZXJ9JyBzcGVjaWZpZWQgaW4gbW9kdWxlICR7bW9kdWxlfSFgKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBVbmtub3duRmlsdGVyRXJyb3JcbiJdfQ==