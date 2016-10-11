'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Resource2 = require('./Resource');

var _Resource3 = _interopRequireDefault(_Resource2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * StringResource
 */
var StringResource = function (_Resource) {
  _inherits(StringResource, _Resource);

  function StringResource() {
    _classCallCheck(this, StringResource);

    return _possibleConstructorReturn(this, (StringResource.__proto__ || Object.getPrototypeOf(StringResource)).apply(this, arguments));
  }

  _createClass(StringResource, [{
    key: 'find',
    value: function find(path) {

      return path;
    }
  }]);

  return StringResource;
}(_Resource3.default);

exports.default = StringResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcmVzb3VyY2UvU3RyaW5nUmVzb3VyY2UuanMiXSwibmFtZXMiOlsiU3RyaW5nUmVzb3VyY2UiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01BLGM7Ozs7Ozs7Ozs7O3lCQUVDQyxJLEVBQU07O0FBRVQsYUFBT0EsSUFBUDtBQUVEOzs7Ozs7a0JBSVlELGMiLCJmaWxlIjoiU3RyaW5nUmVzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVzb3VyY2UgZnJvbSAnLi9SZXNvdXJjZSc7XG5cbi8qKlxuICogU3RyaW5nUmVzb3VyY2VcbiAqL1xuY2xhc3MgU3RyaW5nUmVzb3VyY2UgZXh0ZW5kcyBSZXNvdXJjZSB7XG5cbiAgZmluZChwYXRoKSB7XG5cbiAgICByZXR1cm4gcGF0aDtcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RyaW5nUmVzb3VyY2VcblxuIl19