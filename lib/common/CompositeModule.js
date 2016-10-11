"use strict";

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
        key: "add",
        value: function add(m) {

            this.submodules.push(m);
            return this;
        }
    }, {
        key: "__init",
        value: function __init() {
            this.submodules.forEach(function (m) {
                return m.__init();
            });
        }
    }, {
        key: "__autoload",
        value: function __autoload() {
            this.submodules.forEach(function (m) {
                return m.__autoload();
            });
        }
    }, {
        key: "__framework",
        value: function __framework() {
            this.submodules.forEach(function (m) {
                return m.__framework();
            });
        }
    }, {
        key: "__connections",
        value: function __connections() {
            return this.submodules.map(function (m) {
                return m.__connections();
            });
        }
    }, {
        key: "__filters",
        value: function __filters(app, defaults) {
            return this.submodules.forEach(function (m) {
                return m.__filters(app, defaults);
            });
        }
    }, {
        key: "__routing",
        value: function __routing(path, app, actions) {
            return this.submodules.forEach(function (m) {
                return m.__routing(path, app, actions);
            });
        }
    }]);

    return CompositeModule;
}();

exports.default = CompositeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vQ29tcG9zaXRlTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkNvbXBvc2l0ZU1vZHVsZSIsIm1vZHVsZXMiLCJzdWJtb2R1bGVzIiwibSIsInB1c2giLCJmb3JFYWNoIiwiX19pbml0IiwiX19hdXRvbG9hZCIsIl9fZnJhbWV3b3JrIiwibWFwIiwiX19jb25uZWN0aW9ucyIsImFwcCIsImRlZmF1bHRzIiwiX19maWx0ZXJzIiwicGF0aCIsImFjdGlvbnMiLCJfX3JvdXRpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7SUFLTUEsZTtBQUVGLDZCQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ2pCLGFBQUtDLFVBQUwsR0FBa0JELE9BQWxCO0FBQ0g7Ozs7NEJBRUdFLEMsRUFBRzs7QUFFSCxpQkFBS0QsVUFBTCxDQUFnQkUsSUFBaEIsQ0FBcUJELENBQXJCO0FBQ0EsbUJBQU8sSUFBUDtBQUVIOzs7aUNBRVE7QUFDTCxpQkFBS0QsVUFBTCxDQUFnQkcsT0FBaEIsQ0FBd0I7QUFBQSx1QkFBS0YsRUFBRUcsTUFBRixFQUFMO0FBQUEsYUFBeEI7QUFDSDs7O3FDQUVZO0FBQ1QsaUJBQUtKLFVBQUwsQ0FBZ0JHLE9BQWhCLENBQXdCO0FBQUEsdUJBQUtGLEVBQUVJLFVBQUYsRUFBTDtBQUFBLGFBQXhCO0FBQ0g7OztzQ0FFYTtBQUNWLGlCQUFLTCxVQUFMLENBQWdCRyxPQUFoQixDQUF3QjtBQUFBLHVCQUFLRixFQUFFSyxXQUFGLEVBQUw7QUFBQSxhQUF4QjtBQUNIOzs7d0NBRWU7QUFDWixtQkFBTyxLQUFLTixVQUFMLENBQWdCTyxHQUFoQixDQUFvQjtBQUFBLHVCQUFLTixFQUFFTyxhQUFGLEVBQUw7QUFBQSxhQUFwQixDQUFQO0FBQ0g7OztrQ0FFU0MsRyxFQUFLQyxRLEVBQVU7QUFDckIsbUJBQU8sS0FBS1YsVUFBTCxDQUFnQkcsT0FBaEIsQ0FBd0I7QUFBQSx1QkFBS0YsRUFBRVUsU0FBRixDQUFZRixHQUFaLEVBQWlCQyxRQUFqQixDQUFMO0FBQUEsYUFBeEIsQ0FBUDtBQUNIOzs7a0NBRVNFLEksRUFBTUgsRyxFQUFLSSxPLEVBQVM7QUFDMUIsbUJBQU8sS0FBS2IsVUFBTCxDQUFnQkcsT0FBaEIsQ0FBd0I7QUFBQSx1QkFBS0YsRUFBRWEsU0FBRixDQUFZRixJQUFaLEVBQWtCSCxHQUFsQixFQUF1QkksT0FBdkIsQ0FBTDtBQUFBLGFBQXhCLENBQVA7QUFDSDs7Ozs7O2tCQUlVZixlIiwiZmlsZSI6IkNvbXBvc2l0ZU1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29tcG9zaXRlTW9kdWxlIHByb3ZpZGVzIGFuIGFwaSBmb3IgY2FsbGluZyB0aGUgc2FtZVxuICogbWV0aG9kIG9uIG11bHRpcGxlIE1vZHVsZXMgYXQgb25jZS5cbiAqIEBwYXJhbSB7YXJyYXl9IG1vZHVsZXMgXG4gKi9cbmNsYXNzIENvbXBvc2l0ZU1vZHVsZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihtb2R1bGVzKSB7XG4gICAgICAgIHRoaXMuc3VibW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgfVxuXG4gICAgYWRkKG0pIHtcblxuICAgICAgICB0aGlzLnN1Ym1vZHVsZXMucHVzaChtKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBfX2luaXQoKSB7XG4gICAgICAgIHRoaXMuc3VibW9kdWxlcy5mb3JFYWNoKG0gPT4gbS5fX2luaXQoKSk7XG4gICAgfVxuXG4gICAgX19hdXRvbG9hZCgpIHtcbiAgICAgICAgdGhpcy5zdWJtb2R1bGVzLmZvckVhY2gobSA9PiBtLl9fYXV0b2xvYWQoKSk7XG4gICAgfVxuXG4gICAgX19mcmFtZXdvcmsoKSB7XG4gICAgICAgIHRoaXMuc3VibW9kdWxlcy5mb3JFYWNoKG0gPT4gbS5fX2ZyYW1ld29yaygpKTtcbiAgICB9XG5cbiAgICBfX2Nvbm5lY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJtb2R1bGVzLm1hcChtID0+IG0uX19jb25uZWN0aW9ucygpKTtcbiAgICB9XG5cbiAgICBfX2ZpbHRlcnMoYXBwLCBkZWZhdWx0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJtb2R1bGVzLmZvckVhY2gobSA9PiBtLl9fZmlsdGVycyhhcHAsIGRlZmF1bHRzKSk7XG4gICAgfVxuXG4gICAgX19yb3V0aW5nKHBhdGgsIGFwcCwgYWN0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJtb2R1bGVzLmZvckVhY2gobSA9PiBtLl9fcm91dGluZyhwYXRoLCBhcHAsIGFjdGlvbnMpKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9zaXRlTW9kdWxlXG4iXX0=