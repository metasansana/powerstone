'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _libpowerstoneApiController = require('libpowerstone/api/Controller');

var _libpowerstoneApiController2 = _interopRequireDefault(_libpowerstoneApiController);

/**
 * Users 
 */

var Users = (function (_Controller) {
    _inherits(Users, _Controller);

    function Users() {
        _classCallCheck(this, Users);

        _get(Object.getPrototypeOf(Users.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Users, [{
        key: 'count',
        value: function count() {
            this.response.send({
                count: Object.keys(global.messages).length
            });
        }
    }, {
        key: 'messages',
        value: function messages() {
            this.response.send({
                messages: 'Not enabled'
            });
        }
    }]);

    return Users;
})(_libpowerstoneApiController2['default']);

exports['default'] = Users;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy90ZXN0L2Z1bmMvYXNzZXRzL3Byb2plY3RzL3ZvaWNlbWFpbC9hcHAvY29udHJvbGxlcnMvVXNlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OzswQ0FBdUIsOEJBQThCOzs7Ozs7OztJQUsvQyxLQUFLO2NBQUwsS0FBSzs7YUFBTCxLQUFLOzhCQUFMLEtBQUs7O21DQUFMLEtBQUs7OztpQkFBTCxLQUFLOztlQUVGLGlCQUFHO0FBQ0osZ0JBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ2YscUJBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNO2FBQzdDLENBQUMsQ0FBQztTQUNOOzs7ZUFFTyxvQkFBRztBQUNQLGdCQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztBQUNmLHdCQUFRLEVBQUUsYUFBYTthQUMxQixDQUFDLENBQUM7U0FDTjs7O1dBWkMsS0FBSzs7O3FCQWVJLEtBQUsiLCJmaWxlIjoiVXNlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udHJvbGxlciBmcm9tICdsaWJwb3dlcnN0b25lL2FwaS9Db250cm9sbGVyJztcblxuLyoqXG4gKiBVc2VycyBcbiAqL1xuY2xhc3MgVXNlcnMgZXh0ZW5kcyBDb250cm9sbGVyIHtcblxuICAgIGNvdW50KCkge1xuICAgICAgICB0aGlzLnJlc3BvbnNlLnNlbmQoe1xuICAgICAgICAgICAgY291bnQ6IE9iamVjdC5rZXlzKGdsb2JhbC5tZXNzYWdlcykubGVuZ3RoXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1lc3NhZ2VzKCkge1xuICAgICAgICB0aGlzLnJlc3BvbnNlLnNlbmQoe1xuICAgICAgICAgICAgbWVzc2FnZXM6ICdOb3QgZW5hYmxlZCdcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBVc2Vyc1xuIl19