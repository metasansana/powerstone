'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _PowerError2 = require('../PowerError');

var _PowerError3 = _interopRequireDefault(_PowerError2);

var UnsupportedMethodError = (function (_PowerError) {
    _inherits(UnsupportedMethodError, _PowerError);

    function UnsupportedMethodError(method, path) {
        _classCallCheck(this, UnsupportedMethodError);

        _get(Object.getPrototypeOf(UnsupportedMethodError.prototype), 'constructor', this).call(this, 'Unknown method \'' + method + '\' declared for path \'' + path + '\'');
    }

    /**
     * Route
     * @param {string} method 
     * @param {string} path 
     * @param {object} route 
     * @param {array<function>} actions 
     * @param {FrameworkApplication} app 
     */
    return UnsupportedMethodError;
})(_PowerError3['default']);

var Route = (function () {
    function Route(method, path, actions, app) {
        _classCallCheck(this, Route);

        actions.unshift(this.handleRoute.bind(this));

        if (!app[method]) throw new UnsupportedMethodError(method, path);

        app[method.toLowerCase()].apply(app, [path].concat(actions));
    }

    _createClass(Route, [{
        key: 'handleRoute',
        value: function handleRoute(req, res, next) {

            next();
        }
    }]);

    return Route;
})();

exports['default'] = Route;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcm91dGUvUm91dGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OzsyQkFBdUIsZUFBZTs7OztJQUVoQyxzQkFBc0I7Y0FBdEIsc0JBQXNCOztBQUViLGFBRlQsc0JBQXNCLENBRVosTUFBTSxFQUFFLElBQUksRUFBRTs4QkFGeEIsc0JBQXNCOztBQUlwQixtQ0FKRixzQkFBc0IsbUVBSUssTUFBTSwrQkFBd0IsSUFBSSxTQUFLO0tBRW5FOzs7Ozs7Ozs7O1dBTkMsc0JBQXNCOzs7SUFrQnRCLEtBQUs7QUFFSSxhQUZULEtBQUssQ0FFSyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUU7OEJBRnRDLEtBQUs7O0FBSUgsZUFBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztBQUU3QyxZQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUNaLE1BQU0sSUFBSSxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRW5ELFdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FFaEU7O2lCQVhDLEtBQUs7O2VBYUkscUJBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBRXhCLGdCQUFJLEVBQUUsQ0FBQztTQUVWOzs7V0FqQkMsS0FBSzs7O3FCQXFCSSxLQUFLIiwiZmlsZSI6IlJvdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvd2VyRXJyb3IgZnJvbSAnLi4vUG93ZXJFcnJvcic7XG5cbmNsYXNzIFVuc3VwcG9ydGVkTWV0aG9kRXJyb3IgZXh0ZW5kcyBQb3dlckVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgcGF0aCkge1xuXG4gICAgICAgIHN1cGVyKGBVbmtub3duIG1ldGhvZCAnJHttZXRob2R9JyBkZWNsYXJlZCBmb3IgcGF0aCAnJHtwYXRofSdgKTtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIFJvdXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kIFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggXG4gKiBAcGFyYW0ge29iamVjdH0gcm91dGUgXG4gKiBAcGFyYW0ge2FycmF5PGZ1bmN0aW9uPn0gYWN0aW9ucyBcbiAqIEBwYXJhbSB7RnJhbWV3b3JrQXBwbGljYXRpb259IGFwcCBcbiAqL1xuY2xhc3MgUm91dGUge1xuXG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBwYXRoLCBhY3Rpb25zLCBhcHApIHtcblxuICAgICAgICBhY3Rpb25zLnVuc2hpZnQodGhpcy5oYW5kbGVSb3V0ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICBpZiAoIWFwcFttZXRob2RdKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFVuc3VwcG9ydGVkTWV0aG9kRXJyb3IobWV0aG9kLCBwYXRoKTtcblxuICAgICAgICBhcHBbbWV0aG9kLnRvTG93ZXJDYXNlKCldLmFwcGx5KGFwcCwgW3BhdGhdLmNvbmNhdChhY3Rpb25zKSk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVSb3V0ZShyZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgIG5leHQoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZVxuIl19