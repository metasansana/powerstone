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
 * UnknownModuleError 
 */

var UnknownModuleError = (function (_PowerError) {
    _inherits(UnknownModuleError, _PowerError);

    function UnknownModuleError(name) {
        _classCallCheck(this, UnknownModuleError);

        _get(Object.getPrototypeOf(UnknownModuleError.prototype), 'constructor', this).call(this, 'The module \'' + name + '\' was not found!');
    }

    return UnknownModuleError;
})(_PowerError3['default']);

exports['default'] = UnknownModuleError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vVW5rbm93bk1vZHVsZUVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzJCQUF1QixjQUFjOzs7Ozs7OztJQUkvQixrQkFBa0I7Y0FBbEIsa0JBQWtCOztBQUVULGFBRlQsa0JBQWtCLENBRVIsSUFBSSxFQUFFOzhCQUZoQixrQkFBa0I7O0FBSWhCLG1DQUpGLGtCQUFrQiwrREFJSyxJQUFJLHdCQUFvQjtLQUVoRDs7V0FOQyxrQkFBa0I7OztxQkFVVCxrQkFBa0IiLCJmaWxlIjoiVW5rbm93bk1vZHVsZUVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvd2VyRXJyb3IgZnJvbSAnLi9Qb3dlckVycm9yJztcbi8qKlxuICogVW5rbm93bk1vZHVsZUVycm9yIFxuICovXG5jbGFzcyBVbmtub3duTW9kdWxlRXJyb3IgZXh0ZW5kcyBQb3dlckVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcblxuICAgICAgICBzdXBlcihgVGhlIG1vZHVsZSAnJHtuYW1lfScgd2FzIG5vdCBmb3VuZCFgKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBVbmtub3duTW9kdWxlRXJyb3JcbiJdfQ==