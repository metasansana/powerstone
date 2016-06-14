'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

/**
 * RequireResource locates a resource relative to the path it is
 * created with.
 * @param {string} [path='']
 * @implements {Resource}
 */

var RequireResource = (function () {
    function RequireResource(path) {
        _classCallCheck(this, RequireResource);

        this._path = path ? '' + (path + '/') : '';

        if (typeof this._path !== 'string') throw new TypeError('The argument \'path\' must be a string, got \'' + typeof path + '\'!');
    }

    _createClass(RequireResource, [{
        key: 'find',
        value: function find(path) {

            return require('' + this._path + path);
        }
    }]);

    return RequireResource;
})();

exports['default'] = RequireResource;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVzb3VyY2UvUmVxdWlyZVJlc291cmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztvQkFBdUIsTUFBTTs7Ozs7Ozs7Ozs7SUFRdkIsZUFBZTtBQUVOLGFBRlQsZUFBZSxDQUVMLElBQUksRUFBRTs4QkFGaEIsZUFBZTs7QUFJYixZQUFJLENBQUMsS0FBSyxHQUFHLEFBQUMsSUFBSSxHQUFJLEVBQUUsSUFBTSxJQUFJLE9BQUcsR0FBRyxFQUFFLENBQUM7O0FBRTNDLFlBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDOUIsTUFBTSxJQUFJLFNBQVMsb0RBQStDLE9BQVEsSUFBSSxTQUFLLENBQUM7S0FFM0Y7O2lCQVRDLGVBQWU7O2VBV2IsY0FBQyxJQUFJLEVBQUU7O0FBRVAsbUJBQU8sT0FBTyxNQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFHLENBQUM7U0FFMUM7OztXQWZDLGVBQWU7OztxQkFtQk4sZUFBZSIsImZpbGUiOiJSZXF1aXJlUmVzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aE1vZHVsZSBmcm9tICdwYXRoJztcblxuLyoqXG4gKiBSZXF1aXJlUmVzb3VyY2UgbG9jYXRlcyBhIHJlc291cmNlIHJlbGF0aXZlIHRvIHRoZSBwYXRoIGl0IGlzXG4gKiBjcmVhdGVkIHdpdGguXG4gKiBAcGFyYW0ge3N0cmluZ30gW3BhdGg9JyddXG4gKiBAaW1wbGVtZW50cyB7UmVzb3VyY2V9XG4gKi9cbmNsYXNzIFJlcXVpcmVSZXNvdXJjZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXRoKSB7XG5cbiAgICAgICAgdGhpcy5fcGF0aCA9IChwYXRoKSA/ICcnICsgYCR7cGF0aH0vYCA6ICcnO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fcGF0aCAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgYXJndW1lbnQgJ3BhdGgnIG11c3QgYmUgYSBzdHJpbmcsIGdvdCAnJHt0eXBlb2YgIHBhdGh9JyFgKTtcblxuICAgIH1cblxuICAgIGZpbmQocGF0aCkge1xuXG4gICAgICAgIHJldHVybiByZXF1aXJlKGAke3RoaXMuX3BhdGh9JHtwYXRofWApO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVpcmVSZXNvdXJjZVxuIl19