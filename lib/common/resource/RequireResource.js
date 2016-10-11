'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * RequireResource locates a resource relative to the path it is
 * created with.
 * @param {string} [path='']
 * @implements {Resource}
 */
var RequireResource = function () {
    function RequireResource(path) {
        _classCallCheck(this, RequireResource);

        this._path = path ? '' + (path + '/') : '';

        if (typeof this._path !== 'string') throw new TypeError('The argument \'path\' must be a string, got \'' + (typeof path === 'undefined' ? 'undefined' : _typeof(path)) + '\'!');
    }

    _createClass(RequireResource, [{
        key: 'find',
        value: function find(path) {

            return require('' + this._path + path);
        }
    }]);

    return RequireResource;
}();

exports.default = RequireResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVzb3VyY2UvUmVxdWlyZVJlc291cmNlLmpzIl0sIm5hbWVzIjpbIlJlcXVpcmVSZXNvdXJjZSIsInBhdGgiLCJfcGF0aCIsIlR5cGVFcnJvciIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTs7Ozs7O0lBTU1BLGU7QUFFRiw2QkFBWUMsSUFBWixFQUFrQjtBQUFBOztBQUVkLGFBQUtDLEtBQUwsR0FBY0QsSUFBRCxHQUFTLE1BQVFBLElBQVIsT0FBVCxHQUEyQixFQUF4Qzs7QUFFQSxZQUFJLE9BQU8sS0FBS0MsS0FBWixLQUFzQixRQUExQixFQUNJLE1BQU0sSUFBSUMsU0FBSiw0REFBb0VGLElBQXBFLHlDQUFvRUEsSUFBcEUsV0FBTjtBQUVQOzs7OzZCQUVJQSxJLEVBQU07O0FBRVAsbUJBQU9HLGFBQVcsS0FBS0YsS0FBaEIsR0FBd0JELElBQXhCLENBQVA7QUFFSDs7Ozs7O2tCQUlVRCxlIiwiZmlsZSI6IlJlcXVpcmVSZXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoTW9kdWxlIGZyb20gJ3BhdGgnO1xuXG4vKipcbiAqIFJlcXVpcmVSZXNvdXJjZSBsb2NhdGVzIGEgcmVzb3VyY2UgcmVsYXRpdmUgdG8gdGhlIHBhdGggaXQgaXNcbiAqIGNyZWF0ZWQgd2l0aC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbcGF0aD0nJ11cbiAqIEBpbXBsZW1lbnRzIHtSZXNvdXJjZX1cbiAqL1xuY2xhc3MgUmVxdWlyZVJlc291cmNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHBhdGgpIHtcblxuICAgICAgICB0aGlzLl9wYXRoID0gKHBhdGgpID8gJycgKyBgJHtwYXRofS9gIDogJyc7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9wYXRoICE9PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBhcmd1bWVudCAncGF0aCcgbXVzdCBiZSBhIHN0cmluZywgZ290ICcke3R5cGVvZiAgcGF0aH0nIWApO1xuXG4gICAgfVxuXG4gICAgZmluZChwYXRoKSB7XG5cbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoYCR7dGhpcy5fcGF0aH0ke3BhdGh9YCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVxdWlyZVJlc291cmNlXG4iXX0=