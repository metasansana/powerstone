'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * CompositeModule provides an api for calling the same
 * method on multiple Modules at once.
 * @param {array} modules
 */
var CompositeModule = function () {
    function CompositeModule(modules) {
        _classCallCheck(this, CompositeModule);

        this.submodules = modules;
    }

    _createClass(CompositeModule, [{
        key: 'add',
        value: function add(m) {

            this.submodules.push(m);
            return this;
        }
    }, {
        key: '__init',
        value: function __init() {
            this.submodules.forEach(function (m) {
                return m.__init();
            });
        }
    }, {
        key: '__autoload',
        value: function __autoload() {
            this.submodules.forEach(function (m) {
                return m.__autoload();
            });
        }
    }, {
        key: '__framework',
        value: function __framework() {
            this.submodules.forEach(function (m) {
                return m.__framework();
            });
        }
    }, {
        key: '__connections',
        value: function __connections() {
            return this.submodules.map(function (m) {
                return m.__connections();
            });
        }
    }, {
        key: '__viewEngine',
        value: function __viewEngine() {
            return this.submodules.forEach(function (m) {
                return m.__viewEngine();
            });
        }
    }, {
        key: '__filters',
        value: function __filters(app, defaults) {
            return this.submodules.forEach(function (m) {
                return m.__filters(app, defaults);
            });
        }
    }, {
        key: '__routing',
        value: function __routing(path, app, actions) {
            return this.submodules.forEach(function (m) {
                return m.__routing(path, app, actions);
            });
        }
    }, {
        key: 'path',
        value: function path() {

            throw new ReferenceError('CompositeModule#path is not implemented!');
        }
    }, {
        key: 'find',
        value: function find(path) {

            var subs = this.submodules.slice();
            var m;

            var next = function next(sub) {

                if (!sub) return null;

                m = sub.find(path);

                if (!m) return next(subs.pop());

                return m;
            };

            return next(subs.pop());
        }
    }]);

    return CompositeModule;
}();

exports.default = CompositeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQ29tcG9zaXRlTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkNvbXBvc2l0ZU1vZHVsZSIsIm1vZHVsZXMiLCJzdWJtb2R1bGVzIiwibSIsInB1c2giLCJmb3JFYWNoIiwiX19pbml0IiwiX19hdXRvbG9hZCIsIl9fZnJhbWV3b3JrIiwibWFwIiwiX19jb25uZWN0aW9ucyIsIl9fdmlld0VuZ2luZSIsImFwcCIsImRlZmF1bHRzIiwiX19maWx0ZXJzIiwicGF0aCIsImFjdGlvbnMiLCJfX3JvdXRpbmciLCJSZWZlcmVuY2VFcnJvciIsInN1YnMiLCJzbGljZSIsIm5leHQiLCJzdWIiLCJmaW5kIiwicG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7O0lBS01BLGU7QUFFRiw2QkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNqQixhQUFLQyxVQUFMLEdBQWtCRCxPQUFsQjtBQUNIOzs7OzRCQUVHRSxDLEVBQUc7O0FBRUgsaUJBQUtELFVBQUwsQ0FBZ0JFLElBQWhCLENBQXFCRCxDQUFyQjtBQUNBLG1CQUFPLElBQVA7QUFFSDs7O2lDQUVRO0FBQ0wsaUJBQUtELFVBQUwsQ0FBZ0JHLE9BQWhCLENBQXdCO0FBQUEsdUJBQUtGLEVBQUVHLE1BQUYsRUFBTDtBQUFBLGFBQXhCO0FBQ0g7OztxQ0FFWTtBQUNULGlCQUFLSixVQUFMLENBQWdCRyxPQUFoQixDQUF3QjtBQUFBLHVCQUFLRixFQUFFSSxVQUFGLEVBQUw7QUFBQSxhQUF4QjtBQUNIOzs7c0NBRWE7QUFDVixpQkFBS0wsVUFBTCxDQUFnQkcsT0FBaEIsQ0FBd0I7QUFBQSx1QkFBS0YsRUFBRUssV0FBRixFQUFMO0FBQUEsYUFBeEI7QUFDSDs7O3dDQUVlO0FBQ1osbUJBQU8sS0FBS04sVUFBTCxDQUFnQk8sR0FBaEIsQ0FBb0I7QUFBQSx1QkFBS04sRUFBRU8sYUFBRixFQUFMO0FBQUEsYUFBcEIsQ0FBUDtBQUNIOzs7dUNBRWM7QUFDWCxtQkFBTyxLQUFLUixVQUFMLENBQWdCRyxPQUFoQixDQUF3QjtBQUFBLHVCQUFLRixFQUFFUSxZQUFGLEVBQUw7QUFBQSxhQUF4QixDQUFQO0FBQ0g7OztrQ0FFU0MsRyxFQUFLQyxRLEVBQVU7QUFDckIsbUJBQU8sS0FBS1gsVUFBTCxDQUFnQkcsT0FBaEIsQ0FBd0I7QUFBQSx1QkFBS0YsRUFBRVcsU0FBRixDQUFZRixHQUFaLEVBQWlCQyxRQUFqQixDQUFMO0FBQUEsYUFBeEIsQ0FBUDtBQUNIOzs7a0NBRVNFLEksRUFBTUgsRyxFQUFLSSxPLEVBQVM7QUFDMUIsbUJBQU8sS0FBS2QsVUFBTCxDQUFnQkcsT0FBaEIsQ0FBd0I7QUFBQSx1QkFBS0YsRUFBRWMsU0FBRixDQUFZRixJQUFaLEVBQWtCSCxHQUFsQixFQUF1QkksT0FBdkIsQ0FBTDtBQUFBLGFBQXhCLENBQVA7QUFDSDs7OytCQUVNOztBQUVILGtCQUFNLElBQUlFLGNBQUosQ0FBbUIsMENBQW5CLENBQU47QUFFSDs7OzZCQUVJSCxJLEVBQU07O0FBRVAsZ0JBQUlJLE9BQU8sS0FBS2pCLFVBQUwsQ0FBZ0JrQixLQUFoQixFQUFYO0FBQ0EsZ0JBQUlqQixDQUFKOztBQUVBLGdCQUFJa0IsT0FBTyxTQUFQQSxJQUFPLENBQVNDLEdBQVQsRUFBYzs7QUFFckIsb0JBQUksQ0FBQ0EsR0FBTCxFQUFVLE9BQU8sSUFBUDs7QUFFVm5CLG9CQUFJbUIsSUFBSUMsSUFBSixDQUFTUixJQUFULENBQUo7O0FBRUEsb0JBQUksQ0FBQ1osQ0FBTCxFQUNJLE9BQU9rQixLQUFLRixLQUFLSyxHQUFMLEVBQUwsQ0FBUDs7QUFFSix1QkFBT3JCLENBQVA7QUFFSCxhQVhEOztBQWFBLG1CQUFPa0IsS0FBS0YsS0FBS0ssR0FBTCxFQUFMLENBQVA7QUFFSDs7Ozs7O2tCQUlVeEIsZSIsImZpbGUiOiJDb21wb3NpdGVNb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbXBvc2l0ZU1vZHVsZSBwcm92aWRlcyBhbiBhcGkgZm9yIGNhbGxpbmcgdGhlIHNhbWVcbiAqIG1ldGhvZCBvbiBtdWx0aXBsZSBNb2R1bGVzIGF0IG9uY2UuXG4gKiBAcGFyYW0ge2FycmF5fSBtb2R1bGVzXG4gKi9cbmNsYXNzIENvbXBvc2l0ZU1vZHVsZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihtb2R1bGVzKSB7XG4gICAgICAgIHRoaXMuc3VibW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgfVxuXG4gICAgYWRkKG0pIHtcblxuICAgICAgICB0aGlzLnN1Ym1vZHVsZXMucHVzaChtKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBfX2luaXQoKSB7XG4gICAgICAgIHRoaXMuc3VibW9kdWxlcy5mb3JFYWNoKG0gPT4gbS5fX2luaXQoKSk7XG4gICAgfVxuXG4gICAgX19hdXRvbG9hZCgpIHtcbiAgICAgICAgdGhpcy5zdWJtb2R1bGVzLmZvckVhY2gobSA9PiBtLl9fYXV0b2xvYWQoKSk7XG4gICAgfVxuXG4gICAgX19mcmFtZXdvcmsoKSB7XG4gICAgICAgIHRoaXMuc3VibW9kdWxlcy5mb3JFYWNoKG0gPT4gbS5fX2ZyYW1ld29yaygpKTtcbiAgICB9XG5cbiAgICBfX2Nvbm5lY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJtb2R1bGVzLm1hcChtID0+IG0uX19jb25uZWN0aW9ucygpKTtcbiAgICB9XG5cbiAgICBfX3ZpZXdFbmdpbmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1Ym1vZHVsZXMuZm9yRWFjaChtID0+IG0uX192aWV3RW5naW5lKCkpO1xuICAgIH1cblxuICAgIF9fZmlsdGVycyhhcHAsIGRlZmF1bHRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1Ym1vZHVsZXMuZm9yRWFjaChtID0+IG0uX19maWx0ZXJzKGFwcCwgZGVmYXVsdHMpKTtcbiAgICB9XG5cbiAgICBfX3JvdXRpbmcocGF0aCwgYXBwLCBhY3Rpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1Ym1vZHVsZXMuZm9yRWFjaChtID0+IG0uX19yb3V0aW5nKHBhdGgsIGFwcCwgYWN0aW9ucykpO1xuICAgIH1cblxuICAgIHBhdGgoKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdDb21wb3NpdGVNb2R1bGUjcGF0aCBpcyBub3QgaW1wbGVtZW50ZWQhJyk7XG5cbiAgICB9XG5cbiAgICBmaW5kKHBhdGgpIHtcblxuICAgICAgICB2YXIgc3VicyA9IHRoaXMuc3VibW9kdWxlcy5zbGljZSgpO1xuICAgICAgICB2YXIgbTtcblxuICAgICAgICB2YXIgbmV4dCA9IGZ1bmN0aW9uKHN1Yikge1xuXG4gICAgICAgICAgICBpZiAoIXN1YikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIG0gPSBzdWIuZmluZChwYXRoKTtcblxuICAgICAgICAgICAgaWYgKCFtKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0KHN1YnMucG9wKCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gbTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHQoc3Vicy5wb3AoKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9zaXRlTW9kdWxlXG4iXX0=