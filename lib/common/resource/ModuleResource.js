'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Configuration = require('../Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ModuleResource looks up a resource by querying an object.
 * @implements {Resource}
 * @param {Module} parent 
 */
var ModuleResource = function () {
    function ModuleResource(parent) {
        _classCallCheck(this, ModuleResource);

        this._parent = parent;
    }

    _createClass(ModuleResource, [{
        key: 'find',
        value: function find(path) {

            return new this._parent.constructor(path, new _Configuration2.default(this._parent.configDirectory, this._parent.configuration.paths.modules + '/' + path), this._parent.context, this._parent.application);
        }
    }]);

    return ModuleResource;
}();

exports.default = ModuleResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVzb3VyY2UvTW9kdWxlUmVzb3VyY2UuanMiXSwibmFtZXMiOlsiTW9kdWxlUmVzb3VyY2UiLCJwYXJlbnQiLCJfcGFyZW50IiwicGF0aCIsImNvbnN0cnVjdG9yIiwiY29uZmlnRGlyZWN0b3J5IiwiY29uZmlndXJhdGlvbiIsInBhdGhzIiwibW9kdWxlcyIsImNvbnRleHQiLCJhcHBsaWNhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFDQTs7Ozs7SUFLTUEsYztBQUVGLDRCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBRWhCLGFBQUtDLE9BQUwsR0FBZUQsTUFBZjtBQUVIOzs7OzZCQUVJRSxJLEVBQU07O0FBRVAsbUJBQU8sSUFBSSxLQUFLRCxPQUFMLENBQWFFLFdBQWpCLENBQTZCRCxJQUE3QixFQUNILDRCQUFrQixLQUFLRCxPQUFMLENBQWFHLGVBQS9CLEVBQ08sS0FBS0gsT0FBTCxDQUFhSSxhQUFiLENBQTJCQyxLQUEzQixDQUFpQ0MsT0FEeEMsU0FDbURMLElBRG5ELENBREcsRUFHSCxLQUFLRCxPQUFMLENBQWFPLE9BSFYsRUFHbUIsS0FBS1AsT0FBTCxDQUFhUSxXQUhoQyxDQUFQO0FBS0g7Ozs7OztrQkFJVVYsYyIsImZpbGUiOiJNb2R1bGVSZXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb25maWd1cmF0aW9uIGZyb20gJy4uL0NvbmZpZ3VyYXRpb24nO1xuLyoqXG4gKiBNb2R1bGVSZXNvdXJjZSBsb29rcyB1cCBhIHJlc291cmNlIGJ5IHF1ZXJ5aW5nIGFuIG9iamVjdC5cbiAqIEBpbXBsZW1lbnRzIHtSZXNvdXJjZX1cbiAqIEBwYXJhbSB7TW9kdWxlfSBwYXJlbnQgXG4gKi9cbmNsYXNzIE1vZHVsZVJlc291cmNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHBhcmVudCkge1xuXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblxuICAgIH1cblxuICAgIGZpbmQocGF0aCkge1xuXG4gICAgICAgIHJldHVybiBuZXcgdGhpcy5fcGFyZW50LmNvbnN0cnVjdG9yKHBhdGgsXG4gICAgICAgICAgICBuZXcgQ29uZmlndXJhdGlvbih0aGlzLl9wYXJlbnQuY29uZmlnRGlyZWN0b3J5LFxuICAgICAgICAgICAgICAgIGAke3RoaXMuX3BhcmVudC5jb25maWd1cmF0aW9uLnBhdGhzLm1vZHVsZXN9LyR7cGF0aH1gKSxcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5jb250ZXh0LCB0aGlzLl9wYXJlbnQuYXBwbGljYXRpb24pO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vZHVsZVJlc291cmNlXG4iXX0=