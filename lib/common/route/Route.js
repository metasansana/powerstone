'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerError2 = require('../PowerError');

var _PowerError3 = _interopRequireDefault(_PowerError2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnsupportedMethodError = function (_PowerError) {
    _inherits(UnsupportedMethodError, _PowerError);

    function UnsupportedMethodError(method, path) {
        _classCallCheck(this, UnsupportedMethodError);

        return _possibleConstructorReturn(this, (UnsupportedMethodError.__proto__ || Object.getPrototypeOf(UnsupportedMethodError)).call(this, 'Unknown method \'' + method + '\' declared for path \'' + path + '\''));
    }

    return UnsupportedMethodError;
}(_PowerError3.default);

/**
 * Route
 * @param {string} method 
 * @param {string} path 
 * @param {object} route 
 * @param {array<function>} actions 
 * @param {FrameworkApplication} app 
 */


var Route = function () {
    function Route(method, path, spec, actions, app) {
        _classCallCheck(this, Route);

        this.spec = spec;

        actions.unshift(this.handleRoute.bind(this));

        if (!app[method]) throw new UnsupportedMethodError(method, path);

        app[method.toLowerCase()].apply(app, [path].concat(actions));
    }

    _createClass(Route, [{
        key: 'handleRoute',
        value: function handleRoute(req, res, next) {

            req.power = {

                route: this.spec

            };

            next();
        }
    }]);

    return Route;
}();

exports.default = Route;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvUm91dGUuanMiXSwibmFtZXMiOlsiVW5zdXBwb3J0ZWRNZXRob2RFcnJvciIsIm1ldGhvZCIsInBhdGgiLCJSb3V0ZSIsInNwZWMiLCJhY3Rpb25zIiwiYXBwIiwidW5zaGlmdCIsImhhbmRsZVJvdXRlIiwiYmluZCIsInRvTG93ZXJDYXNlIiwiYXBwbHkiLCJjb25jYXQiLCJyZXEiLCJyZXMiLCJuZXh0IiwicG93ZXIiLCJyb3V0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRU1BLHNCOzs7QUFFRixvQ0FBWUMsTUFBWixFQUFvQkMsSUFBcEIsRUFBMEI7QUFBQTs7QUFBQSxxS0FFR0QsTUFGSCwrQkFFaUNDLElBRmpDO0FBSXpCOzs7OztBQUlMOzs7Ozs7Ozs7O0lBUU1DLEs7QUFFRixtQkFBWUYsTUFBWixFQUFvQkMsSUFBcEIsRUFBMEJFLElBQTFCLEVBQWdDQyxPQUFoQyxFQUF5Q0MsR0FBekMsRUFBOEM7QUFBQTs7QUFFMUMsYUFBS0YsSUFBTCxHQUFZQSxJQUFaOztBQUVBQyxnQkFBUUUsT0FBUixDQUFnQixLQUFLQyxXQUFMLENBQWlCQyxJQUFqQixDQUFzQixJQUF0QixDQUFoQjs7QUFFQSxZQUFJLENBQUNILElBQUlMLE1BQUosQ0FBTCxFQUNJLE1BQU0sSUFBSUQsc0JBQUosQ0FBMkJDLE1BQTNCLEVBQW1DQyxJQUFuQyxDQUFOOztBQUVKSSxZQUFJTCxPQUFPUyxXQUFQLEVBQUosRUFBMEJDLEtBQTFCLENBQWdDTCxHQUFoQyxFQUFxQyxDQUFDSixJQUFELEVBQU9VLE1BQVAsQ0FBY1AsT0FBZCxDQUFyQztBQUVIOzs7O29DQUVXUSxHLEVBQUtDLEcsRUFBS0MsSSxFQUFNOztBQUUxQkYsZ0JBQUlHLEtBQUosR0FBWTs7QUFFVkMsdUJBQU8sS0FBS2I7O0FBRkYsYUFBWjs7QUFNRVc7QUFFSDs7Ozs7O2tCQUlVWixLIiwiZmlsZSI6IlJvdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvd2VyRXJyb3IgZnJvbSAnLi4vUG93ZXJFcnJvcic7XG5cbmNsYXNzIFVuc3VwcG9ydGVkTWV0aG9kRXJyb3IgZXh0ZW5kcyBQb3dlckVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgcGF0aCkge1xuXG4gICAgICAgIHN1cGVyKGBVbmtub3duIG1ldGhvZCAnJHttZXRob2R9JyBkZWNsYXJlZCBmb3IgcGF0aCAnJHtwYXRofSdgKTtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIFJvdXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kIFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggXG4gKiBAcGFyYW0ge29iamVjdH0gcm91dGUgXG4gKiBAcGFyYW0ge2FycmF5PGZ1bmN0aW9uPn0gYWN0aW9ucyBcbiAqIEBwYXJhbSB7RnJhbWV3b3JrQXBwbGljYXRpb259IGFwcCBcbiAqL1xuY2xhc3MgUm91dGUge1xuXG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBwYXRoLCBzcGVjLCBhY3Rpb25zLCBhcHApIHtcblxuICAgICAgICB0aGlzLnNwZWMgPSBzcGVjO1xuXG4gICAgICAgIGFjdGlvbnMudW5zaGlmdCh0aGlzLmhhbmRsZVJvdXRlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGlmICghYXBwW21ldGhvZF0pXG4gICAgICAgICAgICB0aHJvdyBuZXcgVW5zdXBwb3J0ZWRNZXRob2RFcnJvcihtZXRob2QsIHBhdGgpO1xuXG4gICAgICAgIGFwcFttZXRob2QudG9Mb3dlckNhc2UoKV0uYXBwbHkoYXBwLCBbcGF0aF0uY29uY2F0KGFjdGlvbnMpKTtcblxuICAgIH1cblxuICAgIGhhbmRsZVJvdXRlKHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgICAgIHJlcS5wb3dlciA9IHtcblxuICAgICAgICByb3V0ZTogdGhpcy5zcGVjXG5cbiAgICAgIH07XG5cbiAgICAgICAgbmV4dCgpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlXG4iXX0=