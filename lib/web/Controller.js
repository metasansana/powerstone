'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Results2 = require('../common/Results');

var _Results3 = _interopRequireDefault(_Results2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = function (_Results) {
  _inherits(Controller, _Results);

  function Controller() {
    _classCallCheck(this, Controller);

    return _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).apply(this, arguments));
  }

  _createClass(Controller, [{
    key: 'send',
    value: function send(status, body) {

      this.response.status(status).send(body);
    }
  }]);

  return Controller;
}(_Results3.default);

exports.default = Controller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJDb250cm9sbGVyIiwic3RhdHVzIiwiYm9keSIsInJlc3BvbnNlIiwic2VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRU1BLFU7Ozs7Ozs7Ozs7O3lCQUVDQyxNLEVBQVFDLEksRUFBTTs7QUFFakIsV0FBS0MsUUFBTCxDQUFjRixNQUFkLENBQXFCQSxNQUFyQixFQUE2QkcsSUFBN0IsQ0FBa0NGLElBQWxDO0FBRUQ7Ozs7OztrQkFJWUYsVSIsImZpbGUiOiJDb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlc3VsdHMgZnJvbSAnLi4vY29tbW9uL1Jlc3VsdHMnO1xuXG5jbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgUmVzdWx0cyB7XG5cbiAgc2VuZChzdGF0dXMsIGJvZHkpIHtcblxuICAgIHRoaXMucmVzcG9uc2Uuc3RhdHVzKHN0YXR1cykuc2VuZChib2R5KTtcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlclxuXG4iXX0=