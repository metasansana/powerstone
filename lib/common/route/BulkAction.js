/**
 * BulkAction provides an api for grouping actions together
 * so that the Route class has an easier time utilizing them.
 * @param {array<Action>} actions 
 * @implments {Action}
 */
class BulkAction {

    constructor(actions) {

        this._actions = actions;
    }

    generate(method, path, route) {

        var all = [];

        this._actions.forEach(a => {

            var action = a.generate(method, path, route);

            if (Array.isArray(action)) {
                all.push.apply(all, a.generate(method, path, route));
            } else {
                all.push(action);
            }
        });

        return all.filter(f => f);
    }

}

export default BulkAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvQnVsa0FjdGlvbi5qcyJdLCJuYW1lcyI6WyJCdWxrQWN0aW9uIiwiY29uc3RydWN0b3IiLCJhY3Rpb25zIiwiX2FjdGlvbnMiLCJnZW5lcmF0ZSIsIm1ldGhvZCIsInBhdGgiLCJyb3V0ZSIsImFsbCIsImZvckVhY2giLCJhIiwiYWN0aW9uIiwiQXJyYXkiLCJpc0FycmF5IiwicHVzaCIsImFwcGx5IiwiZmlsdGVyIiwiZiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLE1BQU1BLFVBQU4sQ0FBaUI7O0FBRWJDLGdCQUFZQyxPQUFaLEVBQXFCOztBQUVqQixhQUFLQyxRQUFMLEdBQWdCRCxPQUFoQjtBQUVIOztBQUVERSxhQUFTQyxNQUFULEVBQWlCQyxJQUFqQixFQUF1QkMsS0FBdkIsRUFBOEI7O0FBRTFCLFlBQUlDLE1BQU0sRUFBVjs7QUFFQSxhQUFLTCxRQUFMLENBQWNNLE9BQWQsQ0FBc0JDLEtBQUs7O0FBRXZCLGdCQUFJQyxTQUFTRCxFQUFFTixRQUFGLENBQVdDLE1BQVgsRUFBbUJDLElBQW5CLEVBQXlCQyxLQUF6QixDQUFiOztBQUVBLGdCQUFJSyxNQUFNQyxPQUFOLENBQWNGLE1BQWQsQ0FBSixFQUEyQjtBQUN2Qkgsb0JBQUlNLElBQUosQ0FBU0MsS0FBVCxDQUFlUCxHQUFmLEVBQW9CRSxFQUFFTixRQUFGLENBQVdDLE1BQVgsRUFBbUJDLElBQW5CLEVBQXlCQyxLQUF6QixDQUFwQjtBQUNILGFBRkQsTUFFTztBQUNIQyxvQkFBSU0sSUFBSixDQUFTSCxNQUFUO0FBQ0g7QUFFSixTQVZEOztBQVlBLGVBQU9ILElBQUlRLE1BQUosQ0FBV0MsS0FBS0EsQ0FBaEIsQ0FBUDtBQUVIOztBQTFCWTs7QUE4QmpCLGVBQWVqQixVQUFmIiwiZmlsZSI6IkJ1bGtBY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEJ1bGtBY3Rpb24gcHJvdmlkZXMgYW4gYXBpIGZvciBncm91cGluZyBhY3Rpb25zIHRvZ2V0aGVyXG4gKiBzbyB0aGF0IHRoZSBSb3V0ZSBjbGFzcyBoYXMgYW4gZWFzaWVyIHRpbWUgdXRpbGl6aW5nIHRoZW0uXG4gKiBAcGFyYW0ge2FycmF5PEFjdGlvbj59IGFjdGlvbnMgXG4gKiBAaW1wbG1lbnRzIHtBY3Rpb259XG4gKi9cbmNsYXNzIEJ1bGtBY3Rpb24ge1xuXG4gICAgY29uc3RydWN0b3IoYWN0aW9ucykge1xuXG4gICAgICAgIHRoaXMuX2FjdGlvbnMgPSBhY3Rpb25zO1xuXG4gICAgfVxuXG4gICAgZ2VuZXJhdGUobWV0aG9kLCBwYXRoLCByb3V0ZSkge1xuXG4gICAgICAgIHZhciBhbGwgPSBbXTtcblxuICAgICAgICB0aGlzLl9hY3Rpb25zLmZvckVhY2goYSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBhLmdlbmVyYXRlKG1ldGhvZCwgcGF0aCwgcm91dGUpO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgYWxsLnB1c2guYXBwbHkoYWxsLCBhLmdlbmVyYXRlKG1ldGhvZCwgcGF0aCwgcm91dGUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxsLnB1c2goYWN0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYWxsLmZpbHRlcihmID0+IGYpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1bGtBY3Rpb25cbiJdfQ==