"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * BulkAction provides an api for grouping actions together
 * so that the Route class has an easier time utilizing them.
 * @param {array<Action>} actions 
 * @implments {Action}
 */
var BulkAction = function () {
    function BulkAction(actions) {
        _classCallCheck(this, BulkAction);

        this._actions = actions;
    }

    _createClass(BulkAction, [{
        key: "generate",
        value: function generate(method, path, route, main) {

            var all = [];

            this._actions.forEach(function (a) {

                var action = a.generate(method, path, route, main);

                if (Array.isArray(action)) {
                    all.push.apply(all, a.generate(method, path, route, main));
                } else {
                    all.push(action);
                }
            });

            return all.filter(function (f) {
                return f;
            });
        }
    }]);

    return BulkAction;
}();

exports.default = BulkAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvQnVsa0FjdGlvbi5qcyJdLCJuYW1lcyI6WyJCdWxrQWN0aW9uIiwiYWN0aW9ucyIsIl9hY3Rpb25zIiwibWV0aG9kIiwicGF0aCIsInJvdXRlIiwibWFpbiIsImFsbCIsImZvckVhY2giLCJhY3Rpb24iLCJhIiwiZ2VuZXJhdGUiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwiYXBwbHkiLCJmaWx0ZXIiLCJmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztJQU1NQSxVO0FBRUYsd0JBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFFakIsYUFBS0MsUUFBTCxHQUFnQkQsT0FBaEI7QUFFSDs7OztpQ0FFUUUsTSxFQUFRQyxJLEVBQU1DLEssRUFBT0MsSSxFQUFNOztBQUVoQyxnQkFBSUMsTUFBTSxFQUFWOztBQUVBLGlCQUFLTCxRQUFMLENBQWNNLE9BQWQsQ0FBc0IsYUFBSzs7QUFFdkIsb0JBQUlDLFNBQVNDLEVBQUVDLFFBQUYsQ0FBV1IsTUFBWCxFQUFtQkMsSUFBbkIsRUFBeUJDLEtBQXpCLEVBQWdDQyxJQUFoQyxDQUFiOztBQUVBLG9CQUFJTSxNQUFNQyxPQUFOLENBQWNKLE1BQWQsQ0FBSixFQUEyQjtBQUN2QkYsd0JBQUlPLElBQUosQ0FBU0MsS0FBVCxDQUFlUixHQUFmLEVBQW9CRyxFQUFFQyxRQUFGLENBQVdSLE1BQVgsRUFBbUJDLElBQW5CLEVBQXlCQyxLQUF6QixFQUFnQ0MsSUFBaEMsQ0FBcEI7QUFDSCxpQkFGRCxNQUVPO0FBQ0hDLHdCQUFJTyxJQUFKLENBQVNMLE1BQVQ7QUFDSDtBQUVKLGFBVkQ7O0FBWUEsbUJBQU9GLElBQUlTLE1BQUosQ0FBVztBQUFBLHVCQUFLQyxDQUFMO0FBQUEsYUFBWCxDQUFQO0FBRUg7Ozs7OztrQkFJVWpCLFUiLCJmaWxlIjoiQnVsa0FjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQnVsa0FjdGlvbiBwcm92aWRlcyBhbiBhcGkgZm9yIGdyb3VwaW5nIGFjdGlvbnMgdG9nZXRoZXJcbiAqIHNvIHRoYXQgdGhlIFJvdXRlIGNsYXNzIGhhcyBhbiBlYXNpZXIgdGltZSB1dGlsaXppbmcgdGhlbS5cbiAqIEBwYXJhbSB7YXJyYXk8QWN0aW9uPn0gYWN0aW9ucyBcbiAqIEBpbXBsbWVudHMge0FjdGlvbn1cbiAqL1xuY2xhc3MgQnVsa0FjdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihhY3Rpb25zKSB7XG5cbiAgICAgICAgdGhpcy5fYWN0aW9ucyA9IGFjdGlvbnM7XG5cbiAgICB9XG5cbiAgICBnZW5lcmF0ZShtZXRob2QsIHBhdGgsIHJvdXRlLCBtYWluKSB7XG5cbiAgICAgICAgdmFyIGFsbCA9IFtdO1xuXG4gICAgICAgIHRoaXMuX2FjdGlvbnMuZm9yRWFjaChhID0+IHtcblxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGEuZ2VuZXJhdGUobWV0aG9kLCBwYXRoLCByb3V0ZSwgbWFpbik7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFjdGlvbikpIHtcbiAgICAgICAgICAgICAgICBhbGwucHVzaC5hcHBseShhbGwsIGEuZ2VuZXJhdGUobWV0aG9kLCBwYXRoLCByb3V0ZSwgbWFpbikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGwucHVzaChhY3Rpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBhbGwuZmlsdGVyKGYgPT4gZik7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVsa0FjdGlvblxuIl19