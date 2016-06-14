/**
 * CompositeModule provides an api for calling the same
 * method on multiple Modules at once.
 * @param {array} modules 
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CompositeModule = (function () {
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
})();

exports["default"] = CompositeModule;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vQ29tcG9zaXRlTW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztJQUtNLGVBQWU7QUFFTixhQUZULGVBQWUsQ0FFTCxPQUFPLEVBQUU7OEJBRm5CLGVBQWU7O0FBR2IsWUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7S0FDN0I7O2lCQUpDLGVBQWU7O2VBTWQsYUFBQyxDQUFDLEVBQUU7O0FBRUgsZ0JBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLG1CQUFPLElBQUksQ0FBQztTQUVmOzs7ZUFFSyxrQkFBRztBQUNMLGdCQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7dUJBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRTthQUFBLENBQUMsQ0FBQztTQUM1Qzs7O2VBRVMsc0JBQUc7QUFDVCxnQkFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO3VCQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUU7YUFBQSxDQUFDLENBQUM7U0FDaEQ7OztlQUVVLHVCQUFHO0FBQ1YsZ0JBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQzt1QkFBSSxDQUFDLENBQUMsV0FBVyxFQUFFO2FBQUEsQ0FBQyxDQUFDO1NBQ2pEOzs7ZUFFWSx5QkFBRztBQUNaLG1CQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQzt1QkFBSSxDQUFDLENBQUMsYUFBYSxFQUFFO2FBQUEsQ0FBQyxDQUFDO1NBQ3REOzs7ZUFFUSxtQkFBQyxHQUFHLEVBQUUsUUFBUSxFQUFFO0FBQ3JCLG1CQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQzt1QkFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUM7YUFBQSxDQUFDLENBQUM7U0FDbkU7OztlQUVRLG1CQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQzFCLG1CQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQzt1QkFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDO2FBQUEsQ0FBQyxDQUFDO1NBQ3hFOzs7V0FuQ0MsZUFBZTs7O3FCQXVDTixlQUFlIiwiZmlsZSI6IkNvbXBvc2l0ZU1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29tcG9zaXRlTW9kdWxlIHByb3ZpZGVzIGFuIGFwaSBmb3IgY2FsbGluZyB0aGUgc2FtZVxuICogbWV0aG9kIG9uIG11bHRpcGxlIE1vZHVsZXMgYXQgb25jZS5cbiAqIEBwYXJhbSB7YXJyYXl9IG1vZHVsZXMgXG4gKi9cbmNsYXNzIENvbXBvc2l0ZU1vZHVsZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihtb2R1bGVzKSB7XG4gICAgICAgIHRoaXMuc3VibW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgfVxuXG4gICAgYWRkKG0pIHtcblxuICAgICAgICB0aGlzLnN1Ym1vZHVsZXMucHVzaChtKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBfX2luaXQoKSB7XG4gICAgICAgIHRoaXMuc3VibW9kdWxlcy5mb3JFYWNoKG0gPT4gbS5fX2luaXQoKSk7XG4gICAgfVxuXG4gICAgX19hdXRvbG9hZCgpIHtcbiAgICAgICAgdGhpcy5zdWJtb2R1bGVzLmZvckVhY2gobSA9PiBtLl9fYXV0b2xvYWQoKSk7XG4gICAgfVxuXG4gICAgX19mcmFtZXdvcmsoKSB7XG4gICAgICAgIHRoaXMuc3VibW9kdWxlcy5mb3JFYWNoKG0gPT4gbS5fX2ZyYW1ld29yaygpKTtcbiAgICB9XG5cbiAgICBfX2Nvbm5lY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJtb2R1bGVzLm1hcChtID0+IG0uX19jb25uZWN0aW9ucygpKTtcbiAgICB9XG5cbiAgICBfX2ZpbHRlcnMoYXBwLCBkZWZhdWx0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJtb2R1bGVzLmZvckVhY2gobSA9PiBtLl9fZmlsdGVycyhhcHAsIGRlZmF1bHRzKSk7XG4gICAgfVxuXG4gICAgX19yb3V0aW5nKHBhdGgsIGFwcCwgYWN0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJtb2R1bGVzLmZvckVhY2gobSA9PiBtLl9fcm91dGluZyhwYXRoLCBhcHAsIGFjdGlvbnMpKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9zaXRlTW9kdWxlXG4iXX0=