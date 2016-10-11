'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Resource2 = require('./Resource');

var _Resource3 = _interopRequireDefault(_Resource2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * RequireResource locates a resource relative to the path it is
 * created with.
 * @param {string} [path='']
 */
var RequireResource = function (_Resource) {
    _inherits(RequireResource, _Resource);

    function RequireResource(path) {
        _classCallCheck(this, RequireResource);

        var _this = _possibleConstructorReturn(this, (RequireResource.__proto__ || Object.getPrototypeOf(RequireResource)).call(this));

        _this._path = path ? '' + (path + '/') : '';

        if (typeof _this._path !== 'string') throw new TypeError('The argument \'path\' must be a string, got \'' + (typeof path === 'undefined' ? 'undefined' : _typeof(path)) + '\'!');

        return _this;
    }

    _createClass(RequireResource, [{
        key: 'find',
        value: function find(path) {

            var ret = require('' + this._path + path);
            if (ret.default) return ret.default;

            return ret;
        }
    }]);

    return RequireResource;
}(_Resource3.default);

exports.default = RequireResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcmVzb3VyY2UvUmVxdWlyZVJlc291cmNlLmpzIl0sIm5hbWVzIjpbIlJlcXVpcmVSZXNvdXJjZSIsInBhdGgiLCJfcGF0aCIsIlR5cGVFcnJvciIsInJldCIsInJlcXVpcmUiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7O0lBS01BLGU7OztBQUVGLDZCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQUE7O0FBSWQsY0FBS0MsS0FBTCxHQUFjRCxJQUFELEdBQVMsTUFBUUEsSUFBUixPQUFULEdBQTJCLEVBQXhDOztBQUVBLFlBQUksT0FBTyxNQUFLQyxLQUFaLEtBQXNCLFFBQTFCLEVBQ0ksTUFBTSxJQUFJQyxTQUFKLDREQUFvRUYsSUFBcEUseUNBQW9FQSxJQUFwRSxXQUFOOztBQVBVO0FBU2pCOzs7OzZCQUVJQSxJLEVBQU07O0FBRVAsZ0JBQUlHLE1BQU1DLGFBQVcsS0FBS0gsS0FBaEIsR0FBd0JELElBQXhCLENBQVY7QUFDQSxnQkFBSUcsSUFBSUUsT0FBUixFQUNJLE9BQU9GLElBQUlFLE9BQVg7O0FBRUosbUJBQU9GLEdBQVA7QUFFSDs7Ozs7O2tCQUlVSixlIiwiZmlsZSI6IlJlcXVpcmVSZXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoTW9kdWxlIGZyb20gJ3BhdGgnO1xuaW1wb3J0IFJlc291cmNlIGZyb20gJy4vUmVzb3VyY2UnO1xuXG4vKipcbiAqIFJlcXVpcmVSZXNvdXJjZSBsb2NhdGVzIGEgcmVzb3VyY2UgcmVsYXRpdmUgdG8gdGhlIHBhdGggaXQgaXNcbiAqIGNyZWF0ZWQgd2l0aC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbcGF0aD0nJ11cbiAqL1xuY2xhc3MgUmVxdWlyZVJlc291cmNlIGV4dGVuZHMgUmVzb3VyY2Uge1xuXG4gICAgY29uc3RydWN0b3IocGF0aCkge1xuXG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fcGF0aCA9IChwYXRoKSA/ICcnICsgYCR7cGF0aH0vYCA6ICcnO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fcGF0aCAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgYXJndW1lbnQgJ3BhdGgnIG11c3QgYmUgYSBzdHJpbmcsIGdvdCAnJHt0eXBlb2YgIHBhdGh9JyFgKTtcblxuICAgIH1cblxuICAgIGZpbmQocGF0aCkge1xuXG4gICAgICAgIHZhciByZXQgPSByZXF1aXJlKGAke3RoaXMuX3BhdGh9JHtwYXRofWApO1xuICAgICAgICBpZiAocmV0LmRlZmF1bHQpXG4gICAgICAgICAgICByZXR1cm4gcmV0LmRlZmF1bHQ7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXF1aXJlUmVzb3VyY2VcbiJdfQ==