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

            var next = function next(sub) {

                if (!sub) return null;

                if (sub.isChild(path) || sub.path() === path) return sub.find(path);

                return next(subs.pop());
            };

            return next(subs.pop());
        }
    }]);

    return CompositeModule;
}();

exports.default = CompositeModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQ29tcG9zaXRlTW9kdWxlLmpzIl0sIm5hbWVzIjpbIkNvbXBvc2l0ZU1vZHVsZSIsIm1vZHVsZXMiLCJzdWJtb2R1bGVzIiwibSIsInB1c2giLCJmb3JFYWNoIiwiX19pbml0IiwiX19hdXRvbG9hZCIsIl9fZnJhbWV3b3JrIiwibWFwIiwiX19jb25uZWN0aW9ucyIsIl9fdmlld0VuZ2luZSIsImFwcCIsImRlZmF1bHRzIiwiX19maWx0ZXJzIiwicGF0aCIsImFjdGlvbnMiLCJfX3JvdXRpbmciLCJSZWZlcmVuY2VFcnJvciIsInN1YnMiLCJzbGljZSIsIm5leHQiLCJzdWIiLCJpc0NoaWxkIiwiZmluZCIsInBvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7OztJQUtNQSxlO0FBRUYsNkJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDakIsYUFBS0MsVUFBTCxHQUFrQkQsT0FBbEI7QUFDSDs7Ozs0QkFFR0UsQyxFQUFHOztBQUVILGlCQUFLRCxVQUFMLENBQWdCRSxJQUFoQixDQUFxQkQsQ0FBckI7QUFDQSxtQkFBTyxJQUFQO0FBRUg7OztpQ0FFUTtBQUNMLGlCQUFLRCxVQUFMLENBQWdCRyxPQUFoQixDQUF3QjtBQUFBLHVCQUFLRixFQUFFRyxNQUFGLEVBQUw7QUFBQSxhQUF4QjtBQUNIOzs7cUNBRVk7QUFDVCxpQkFBS0osVUFBTCxDQUFnQkcsT0FBaEIsQ0FBd0I7QUFBQSx1QkFBS0YsRUFBRUksVUFBRixFQUFMO0FBQUEsYUFBeEI7QUFDSDs7O3NDQUVhO0FBQ1YsaUJBQUtMLFVBQUwsQ0FBZ0JHLE9BQWhCLENBQXdCO0FBQUEsdUJBQUtGLEVBQUVLLFdBQUYsRUFBTDtBQUFBLGFBQXhCO0FBQ0g7Ozt3Q0FFZTtBQUNaLG1CQUFPLEtBQUtOLFVBQUwsQ0FBZ0JPLEdBQWhCLENBQW9CO0FBQUEsdUJBQUtOLEVBQUVPLGFBQUYsRUFBTDtBQUFBLGFBQXBCLENBQVA7QUFDSDs7O3VDQUVjO0FBQ1gsbUJBQU8sS0FBS1IsVUFBTCxDQUFnQkcsT0FBaEIsQ0FBd0I7QUFBQSx1QkFBS0YsRUFBRVEsWUFBRixFQUFMO0FBQUEsYUFBeEIsQ0FBUDtBQUNIOzs7a0NBRVNDLEcsRUFBS0MsUSxFQUFVO0FBQ3JCLG1CQUFPLEtBQUtYLFVBQUwsQ0FBZ0JHLE9BQWhCLENBQXdCO0FBQUEsdUJBQUtGLEVBQUVXLFNBQUYsQ0FBWUYsR0FBWixFQUFpQkMsUUFBakIsQ0FBTDtBQUFBLGFBQXhCLENBQVA7QUFDSDs7O2tDQUVTRSxJLEVBQU1ILEcsRUFBS0ksTyxFQUFTO0FBQzFCLG1CQUFPLEtBQUtkLFVBQUwsQ0FBZ0JHLE9BQWhCLENBQXdCO0FBQUEsdUJBQUtGLEVBQUVjLFNBQUYsQ0FBWUYsSUFBWixFQUFrQkgsR0FBbEIsRUFBdUJJLE9BQXZCLENBQUw7QUFBQSxhQUF4QixDQUFQO0FBQ0g7OzsrQkFFTTs7QUFFSCxrQkFBTSxJQUFJRSxjQUFKLENBQW1CLDBDQUFuQixDQUFOO0FBRUg7Ozs2QkFFSUgsSSxFQUFNOztBQUVQLGdCQUFJSSxPQUFPLEtBQUtqQixVQUFMLENBQWdCa0IsS0FBaEIsRUFBWDs7QUFFQSxnQkFBSUMsT0FBTyxTQUFQQSxJQUFPLENBQVNDLEdBQVQsRUFBYzs7QUFFckIsb0JBQUksQ0FBQ0EsR0FBTCxFQUFVLE9BQU8sSUFBUDs7QUFFVixvQkFBS0EsSUFBSUMsT0FBSixDQUFZUixJQUFaLENBQUQsSUFBd0JPLElBQUlQLElBQUosT0FBZUEsSUFBM0MsRUFDSSxPQUFPTyxJQUFJRSxJQUFKLENBQVNULElBQVQsQ0FBUDs7QUFFSix1QkFBT00sS0FBS0YsS0FBS00sR0FBTCxFQUFMLENBQVA7QUFFSCxhQVREOztBQVdBLG1CQUFPSixLQUFLRixLQUFLTSxHQUFMLEVBQUwsQ0FBUDtBQUVIOzs7Ozs7a0JBSVV6QixlIiwiZmlsZSI6IkNvbXBvc2l0ZU1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29tcG9zaXRlTW9kdWxlIHByb3ZpZGVzIGFuIGFwaSBmb3IgY2FsbGluZyB0aGUgc2FtZVxuICogbWV0aG9kIG9uIG11bHRpcGxlIE1vZHVsZXMgYXQgb25jZS5cbiAqIEBwYXJhbSB7YXJyYXl9IG1vZHVsZXNcbiAqL1xuY2xhc3MgQ29tcG9zaXRlTW9kdWxlIHtcblxuICAgIGNvbnN0cnVjdG9yKG1vZHVsZXMpIHtcbiAgICAgICAgdGhpcy5zdWJtb2R1bGVzID0gbW9kdWxlcztcbiAgICB9XG5cbiAgICBhZGQobSkge1xuXG4gICAgICAgIHRoaXMuc3VibW9kdWxlcy5wdXNoKG0pO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIF9faW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdWJtb2R1bGVzLmZvckVhY2gobSA9PiBtLl9faW5pdCgpKTtcbiAgICB9XG5cbiAgICBfX2F1dG9sb2FkKCkge1xuICAgICAgICB0aGlzLnN1Ym1vZHVsZXMuZm9yRWFjaChtID0+IG0uX19hdXRvbG9hZCgpKTtcbiAgICB9XG5cbiAgICBfX2ZyYW1ld29yaygpIHtcbiAgICAgICAgdGhpcy5zdWJtb2R1bGVzLmZvckVhY2gobSA9PiBtLl9fZnJhbWV3b3JrKCkpO1xuICAgIH1cblxuICAgIF9fY29ubmVjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1Ym1vZHVsZXMubWFwKG0gPT4gbS5fX2Nvbm5lY3Rpb25zKCkpO1xuICAgIH1cblxuICAgIF9fdmlld0VuZ2luZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VibW9kdWxlcy5mb3JFYWNoKG0gPT4gbS5fX3ZpZXdFbmdpbmUoKSk7XG4gICAgfVxuXG4gICAgX19maWx0ZXJzKGFwcCwgZGVmYXVsdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VibW9kdWxlcy5mb3JFYWNoKG0gPT4gbS5fX2ZpbHRlcnMoYXBwLCBkZWZhdWx0cykpO1xuICAgIH1cblxuICAgIF9fcm91dGluZyhwYXRoLCBhcHAsIGFjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VibW9kdWxlcy5mb3JFYWNoKG0gPT4gbS5fX3JvdXRpbmcocGF0aCwgYXBwLCBhY3Rpb25zKSk7XG4gICAgfVxuXG4gICAgcGF0aCgpIHtcblxuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ0NvbXBvc2l0ZU1vZHVsZSNwYXRoIGlzIG5vdCBpbXBsZW1lbnRlZCEnKTtcblxuICAgIH1cblxuICAgIGZpbmQocGF0aCkge1xuXG4gICAgICAgIHZhciBzdWJzID0gdGhpcy5zdWJtb2R1bGVzLnNsaWNlKCk7XG5cbiAgICAgICAgdmFyIG5leHQgPSBmdW5jdGlvbihzdWIpIHtcblxuICAgICAgICAgICAgaWYgKCFzdWIpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICBpZiAoKHN1Yi5pc0NoaWxkKHBhdGgpKSB8fCAoc3ViLnBhdGgoKSA9PT0gcGF0aCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Yi5maW5kKHBhdGgpO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV4dChzdWJzLnBvcCgpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHQoc3Vicy5wb3AoKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9zaXRlTW9kdWxlXG4iXX0=