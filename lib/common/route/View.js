'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * View
 * @implements {Action}
 */
var View = function () {
  function View(callback) {
    _classCallCheck(this, View);

    this._callback = callback;
  }

  _createClass(View, [{
    key: 'generate',
    value: function generate(method, path, route, main) {

      if (typeof route.view === 'string') return this._callback(route.view, route.locals || {});
    }
  }]);

  return View;
}();

exports.default = View;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvVmlldy5qcyJdLCJuYW1lcyI6WyJWaWV3IiwiY2FsbGJhY2siLCJfY2FsbGJhY2siLCJtZXRob2QiLCJwYXRoIiwicm91dGUiLCJtYWluIiwidmlldyIsImxvY2FscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSU1BLEk7QUFFRixnQkFBWUMsUUFBWixFQUFzQjtBQUFBOztBQUVwQixTQUFLQyxTQUFMLEdBQWlCRCxRQUFqQjtBQUVEOzs7OzZCQUVRRSxNLEVBQVFDLEksRUFBTUMsSyxFQUFPQyxJLEVBQU07O0FBRWhDLFVBQUksT0FBT0QsTUFBTUUsSUFBYixLQUFzQixRQUExQixFQUNFLE9BQU8sS0FBS0wsU0FBTCxDQUFlRyxNQUFNRSxJQUFyQixFQUEyQkYsTUFBTUcsTUFBTixJQUFnQixFQUEzQyxDQUFQO0FBRUw7Ozs7OztrQkFJVVIsSSIsImZpbGUiOiJWaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBWaWV3XG4gKiBAaW1wbGVtZW50cyB7QWN0aW9ufVxuICovXG5jbGFzcyBWaWV3IHtcblxuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrKSB7XG5cbiAgICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICB9XG5cbiAgICBnZW5lcmF0ZShtZXRob2QsIHBhdGgsIHJvdXRlLCBtYWluKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByb3V0ZS52aWV3ID09PSAnc3RyaW5nJylcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY2FsbGJhY2socm91dGUudmlldywgcm91dGUubG9jYWxzIHx8IHt9KTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBWaWV3XG4iXX0=