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
 * PropertyResource looks up a resource by querying an object.
 * @implements {Resource}
 * @param {object} o
 *
 * @property {object} context
 */
var PropertyResource = function (_Resource) {
    _inherits(PropertyResource, _Resource);

    function PropertyResource(o) {
        _classCallCheck(this, PropertyResource);

        var _this = _possibleConstructorReturn(this, (PropertyResource.__proto__ || Object.getPrototypeOf(PropertyResource)).call(this));

        _this.context = o;

        return _this;
    }

    _createClass(PropertyResource, [{
        key: 'find',
        value: function find(path) {

            return this.context[path];
        }
    }]);

    return PropertyResource;
}(_Resource3.default);

exports.default = PropertyResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcmVzb3VyY2UvUHJvcGVydHlSZXNvdXJjZS5qcyJdLCJuYW1lcyI6WyJQcm9wZXJ0eVJlc291cmNlIiwibyIsImNvbnRleHQiLCJwYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7OztJQU9NQSxnQjs7O0FBRUYsOEJBQVlDLENBQVosRUFBZTtBQUFBOztBQUFBOztBQUdYLGNBQUtDLE9BQUwsR0FBZUQsQ0FBZjs7QUFIVztBQUtkOzs7OzZCQUVJRSxJLEVBQU07O0FBRVAsbUJBQU8sS0FBS0QsT0FBTCxDQUFhQyxJQUFiLENBQVA7QUFFSDs7Ozs7O2tCQUdVSCxnQiIsImZpbGUiOiJQcm9wZXJ0eVJlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlc291cmNlIGZyb20gJy4vUmVzb3VyY2UnO1xuXG4vKipcbiAqIFByb3BlcnR5UmVzb3VyY2UgbG9va3MgdXAgYSByZXNvdXJjZSBieSBxdWVyeWluZyBhbiBvYmplY3QuXG4gKiBAaW1wbGVtZW50cyB7UmVzb3VyY2V9XG4gKiBAcGFyYW0ge29iamVjdH0gb1xuICpcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBjb250ZXh0XG4gKi9cbmNsYXNzIFByb3BlcnR5UmVzb3VyY2UgZXh0ZW5kcyBSZXNvdXJjZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihvKSB7XG5cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gbztcblxuICAgIH1cblxuICAgIGZpbmQocGF0aCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHRbcGF0aF07XG5cbiAgICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IFByb3BlcnR5UmVzb3VyY2VcbiJdfQ==