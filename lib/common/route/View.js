/**
 * View
 * @implements {Action}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var View = (function () {
  function View(callback) {
    _classCallCheck(this, View);

    this._callback = callback;
  }

  _createClass(View, [{
    key: 'generate',
    value: function generate(method, path, route) {

      if (typeof route.view === 'string') return this._callback(route.view, route.locals || {});
    }
  }]);

  return View;
})();

exports['default'] = View;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUlNLElBQUk7QUFFSyxXQUZULElBQUksQ0FFTSxRQUFRLEVBQUU7MEJBRnBCLElBQUk7O0FBSUosUUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7R0FFM0I7O2VBTkMsSUFBSTs7V0FRRSxrQkFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTs7QUFFMUIsVUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUNoQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBRTNEOzs7U0FiQyxJQUFJOzs7cUJBaUJLLElBQUkiLCJmaWxlIjoiVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVmlld1xuICogQGltcGxlbWVudHMge0FjdGlvbn1cbiAqL1xuY2xhc3MgVmlldyB7XG5cbiAgICBjb25zdHJ1Y3RvcihjYWxsYmFjaykge1xuXG4gICAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgfVxuXG4gICAgZ2VuZXJhdGUobWV0aG9kLCBwYXRoLCByb3V0ZSkge1xuXG4gICAgICAgIGlmICh0eXBlb2Ygcm91dGUudmlldyA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrKHJvdXRlLnZpZXcsIHJvdXRlLmxvY2FscyB8fCB7fSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlld1xuIl19