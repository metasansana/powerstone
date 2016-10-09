/**
 * BulkAction provides an api for grouping actions together
 * so that the Route class has an easier time utilizing them.
 * @param {array<Action>} actions 
 * @implments {Action}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BulkAction = (function () {
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
})();

exports["default"] = BulkAction;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvQnVsa0FjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBTU0sVUFBVTtBQUVELGFBRlQsVUFBVSxDQUVBLE9BQU8sRUFBRTs4QkFGbkIsVUFBVTs7QUFJUixZQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztLQUUzQjs7aUJBTkMsVUFBVTs7ZUFRSixrQkFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7O0FBRWhDLGdCQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7O0FBRWIsZ0JBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxFQUFJOztBQUV2QixvQkFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFbkQsb0JBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUN2Qix1QkFBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDOUQsTUFBTTtBQUNILHVCQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNwQjthQUVKLENBQUMsQ0FBQzs7QUFFSCxtQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQzt1QkFBSSxDQUFDO2FBQUEsQ0FBQyxDQUFDO1NBRTdCOzs7V0ExQkMsVUFBVTs7O3FCQThCRCxVQUFVIiwiZmlsZSI6IkJ1bGtBY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEJ1bGtBY3Rpb24gcHJvdmlkZXMgYW4gYXBpIGZvciBncm91cGluZyBhY3Rpb25zIHRvZ2V0aGVyXG4gKiBzbyB0aGF0IHRoZSBSb3V0ZSBjbGFzcyBoYXMgYW4gZWFzaWVyIHRpbWUgdXRpbGl6aW5nIHRoZW0uXG4gKiBAcGFyYW0ge2FycmF5PEFjdGlvbj59IGFjdGlvbnMgXG4gKiBAaW1wbG1lbnRzIHtBY3Rpb259XG4gKi9cbmNsYXNzIEJ1bGtBY3Rpb24ge1xuXG4gICAgY29uc3RydWN0b3IoYWN0aW9ucykge1xuXG4gICAgICAgIHRoaXMuX2FjdGlvbnMgPSBhY3Rpb25zO1xuXG4gICAgfVxuXG4gICAgZ2VuZXJhdGUobWV0aG9kLCBwYXRoLCByb3V0ZSwgbWFpbikge1xuXG4gICAgICAgIHZhciBhbGwgPSBbXTtcblxuICAgICAgICB0aGlzLl9hY3Rpb25zLmZvckVhY2goYSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBhLmdlbmVyYXRlKG1ldGhvZCwgcGF0aCwgcm91dGUsIG1haW4pO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgYWxsLnB1c2guYXBwbHkoYWxsLCBhLmdlbmVyYXRlKG1ldGhvZCwgcGF0aCwgcm91dGUsIG1haW4pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxsLnB1c2goYWN0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYWxsLmZpbHRlcihmID0+IGYpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1bGtBY3Rpb25cbiJdfQ==