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
 * UnknownModuleError 
 */
var UnknownModuleError = function (_PowerError) {
    _inherits(UnknownModuleError, _PowerError);

    function UnknownModuleError(name) {
        _classCallCheck(this, UnknownModuleError);

        return _possibleConstructorReturn(this, (UnknownModuleError.__proto__ || Object.getPrototypeOf(UnknownModuleError)).call(this, 'The module \'' + name + '\' was not found!'));
    }

    return UnknownModuleError;
}(_PowerError3.default);

exports.default = UnknownModuleError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vVW5rbm93bk1vZHVsZUVycm9yLmpzIl0sIm5hbWVzIjpbIlVua25vd25Nb2R1bGVFcnJvciIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFDQTs7O0lBR01BLGtCOzs7QUFFRixnQ0FBWUMsSUFBWixFQUFrQjtBQUFBOztBQUFBLHlKQUVPQSxJQUZQO0FBSWpCOzs7OztrQkFJVUQsa0IiLCJmaWxlIjoiVW5rbm93bk1vZHVsZUVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvd2VyRXJyb3IgZnJvbSAnLi9Qb3dlckVycm9yJztcbi8qKlxuICogVW5rbm93bk1vZHVsZUVycm9yIFxuICovXG5jbGFzcyBVbmtub3duTW9kdWxlRXJyb3IgZXh0ZW5kcyBQb3dlckVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcblxuICAgICAgICBzdXBlcihgVGhlIG1vZHVsZSAnJHtuYW1lfScgd2FzIG5vdCBmb3VuZCFgKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBVbmtub3duTW9kdWxlRXJyb3JcbiJdfQ==