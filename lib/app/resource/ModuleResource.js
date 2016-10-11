'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Resource2 = require('./Resource');

var _Resource3 = _interopRequireDefault(_Resource2);

var _Configuration = require('../Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ModuleResource looks up a resource by querying an object.
 * @implements {Resource}
 * @param {Module} parent
 */
var ModuleResource = function (_Resource) {
    _inherits(ModuleResource, _Resource);

    function ModuleResource(parent) {
        _classCallCheck(this, ModuleResource);

        var _this = _possibleConstructorReturn(this, (ModuleResource.__proto__ || Object.getPrototypeOf(ModuleResource)).call(this));

        _this._parent = parent;

        return _this;
    }

    _createClass(ModuleResource, [{
        key: 'find',
        value: function find(path) {

            return new this._parent.constructor(path, new _Configuration2.default(this._parent.configDirectory, this._parent.configuration.paths.modules + '/' + path), this._parent.application, this._parent);
        }
    }]);

    return ModuleResource;
}(_Resource3.default);

exports.default = ModuleResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcmVzb3VyY2UvTW9kdWxlUmVzb3VyY2UuanMiXSwibmFtZXMiOlsiTW9kdWxlUmVzb3VyY2UiLCJwYXJlbnQiLCJfcGFyZW50IiwicGF0aCIsImNvbnN0cnVjdG9yIiwiY29uZmlnRGlyZWN0b3J5IiwiY29uZmlndXJhdGlvbiIsInBhdGhzIiwibW9kdWxlcyIsImFwcGxpY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBOzs7OztJQUtNQSxjOzs7QUFFRiw0QkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUFBOztBQUdoQixjQUFLQyxPQUFMLEdBQWVELE1BQWY7O0FBSGdCO0FBS25COzs7OzZCQUVJRSxJLEVBQU07O0FBRVAsbUJBQU8sSUFBSSxLQUFLRCxPQUFMLENBQWFFLFdBQWpCLENBQTZCRCxJQUE3QixFQUNILDRCQUFrQixLQUFLRCxPQUFMLENBQWFHLGVBQS9CLEVBQ08sS0FBS0gsT0FBTCxDQUFhSSxhQUFiLENBQTJCQyxLQUEzQixDQUFpQ0MsT0FEeEMsU0FDbURMLElBRG5ELENBREcsRUFHRixLQUFLRCxPQUFMLENBQWFPLFdBSFgsRUFHd0IsS0FBS1AsT0FIN0IsQ0FBUDtBQUtIOzs7Ozs7a0JBSVVGLGMiLCJmaWxlIjoiTW9kdWxlUmVzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVzb3VyY2UgZnJvbSAnLi9SZXNvdXJjZSc7XG5pbXBvcnQgQ29uZmlndXJhdGlvbiBmcm9tICcuLi9Db25maWd1cmF0aW9uJztcbi8qKlxuICogTW9kdWxlUmVzb3VyY2UgbG9va3MgdXAgYSByZXNvdXJjZSBieSBxdWVyeWluZyBhbiBvYmplY3QuXG4gKiBAaW1wbGVtZW50cyB7UmVzb3VyY2V9XG4gKiBAcGFyYW0ge01vZHVsZX0gcGFyZW50XG4gKi9cbmNsYXNzIE1vZHVsZVJlc291cmNlIGV4dGVuZHMgUmVzb3VyY2Uge1xuXG4gICAgY29uc3RydWN0b3IocGFyZW50KSB7XG5cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXG4gICAgfVxuXG4gICAgZmluZChwYXRoKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLl9wYXJlbnQuY29uc3RydWN0b3IocGF0aCxcbiAgICAgICAgICAgIG5ldyBDb25maWd1cmF0aW9uKHRoaXMuX3BhcmVudC5jb25maWdEaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgYCR7dGhpcy5fcGFyZW50LmNvbmZpZ3VyYXRpb24ucGF0aHMubW9kdWxlc30vJHtwYXRofWApLFxuICAgICAgICAgICAgIHRoaXMuX3BhcmVudC5hcHBsaWNhdGlvbiwgdGhpcy5fcGFyZW50KTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2R1bGVSZXNvdXJjZVxuIl19