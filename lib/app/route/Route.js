'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

var _Module = require('../Module');

var _Module2 = _interopRequireDefault(_Module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnsupportedMethodError = function (_Error) {
    _inherits(UnsupportedMethodError, _Error);

    function UnsupportedMethodError(method, path) {
        _classCallCheck(this, UnsupportedMethodError);

        return _possibleConstructorReturn(this, (UnsupportedMethodError.__proto__ || Object.getPrototypeOf(UnsupportedMethodError)).call(this, 'Route: Unknown method \'' + method + '\' declared for path \'' + path + '\''));
    }

    return UnsupportedMethodError;
}(_es6Error2.default);

var METHODS = ['get', 'put', 'post', 'patch', 'delete'];

/**
 * Route
 * @param {string} path
 * @param {Module} module
 * @param {array<Action>} actions
 */

var Route = function () {
    function Route(path, module, actions) {
        var _this2 = this;

        _classCallCheck(this, Route);

        (0, _beof2.default)({ path: path }).string();
        (0, _beof2.default)({ module: module }).instance(_Module2.default);
        (0, _beof2.default)({ actions: actions }).array();

        this.path = path;
        this.module = module;
        this.actions = actions;

        actions.forEach(function (a) {
            return a.setRoute(_this2);
        });
    }

    /**
     * fromDef creates a Route from a definition object.
     * @param {object} def
     * @param {string} path
     * @param {HttpFactory} factory
     * @param {Module} module
     * @returns {Route}
     */


    _createClass(Route, [{
        key: 'prepare',


        /**
         * prepare this route
         * @param {express.Application | restify.Server} framework
         * @param {Resource} resource
         */
        value: function prepare(framework, resource) {
            var _this3 = this;

            this.actions.forEach(function (action) {
                return action.prepare(_this3.path, framework, resource);
            });
        }
    }, {
        key: 'toString',
        value: function toString() {
            var _this4 = this;

            return this.actions.map(function (action) {
                return _this4.method + ' ' + _this4.path + ' ' + (action.middleware ? action.middleware : '') + (' ' + (action.action ? action.action : '') + ' ' + (action.output ? action.output : ''));
            }).join('\n');
        }
    }], [{
        key: 'fromDef',
        value: function fromDef(def, path, factory, module) {

            (0, _beof2.default)({ def: def }).instance(Object);
            (0, _beof2.default)({ path: path }).string();

            return new Route(path, module, METHODS.map(function (m) {
                return def.hasOwnProperty(m) ? new _Action2.default(m, def[m], factory) : null;
            }).filter(function (m) {
                return m;
            }));
        }
    }]);

    return Route;
}();

exports.default = Route;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvUm91dGUuanMiXSwibmFtZXMiOlsiVW5zdXBwb3J0ZWRNZXRob2RFcnJvciIsIm1ldGhvZCIsInBhdGgiLCJNRVRIT0RTIiwiUm91dGUiLCJtb2R1bGUiLCJhY3Rpb25zIiwic3RyaW5nIiwiaW5zdGFuY2UiLCJhcnJheSIsImZvckVhY2giLCJhIiwic2V0Um91dGUiLCJmcmFtZXdvcmsiLCJyZXNvdXJjZSIsImFjdGlvbiIsInByZXBhcmUiLCJtYXAiLCJtaWRkbGV3YXJlIiwib3V0cHV0Iiwiam9pbiIsImRlZiIsImZhY3RvcnkiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsIm0iLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxzQjs7O0FBRUYsb0NBQVlDLE1BQVosRUFBb0JDLElBQXBCLEVBQTBCO0FBQUE7O0FBQUEsNEtBRVVELE1BRlYsK0JBRXdDQyxJQUZ4QztBQUl6Qjs7Ozs7QUFJTCxJQUFNQyxVQUFVLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxNQUFmLEVBQXVCLE9BQXZCLEVBQWdDLFFBQWhDLENBQWhCOztBQUVBOzs7Ozs7O0lBTU1DLEs7QUFFRixtQkFBWUYsSUFBWixFQUFrQkcsTUFBbEIsRUFBMEJDLE9BQTFCLEVBQW1DO0FBQUE7O0FBQUE7O0FBRS9CLDRCQUFLLEVBQUVKLFVBQUYsRUFBTCxFQUFlSyxNQUFmO0FBQ0EsNEJBQUssRUFBRUYsY0FBRixFQUFMLEVBQWlCRyxRQUFqQjtBQUNBLDRCQUFLLEVBQUVGLGdCQUFGLEVBQUwsRUFBa0JHLEtBQWxCOztBQUVBLGFBQUtQLElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtHLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtDLE9BQUwsR0FBZUEsT0FBZjs7QUFFQUEsZ0JBQVFJLE9BQVIsQ0FBZ0I7QUFBQSxtQkFBS0MsRUFBRUMsUUFBRixRQUFMO0FBQUEsU0FBaEI7QUFFSDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7QUFtQkE7Ozs7O2dDQUtRQyxTLEVBQVdDLFEsRUFBVTtBQUFBOztBQUV6QixpQkFBS1IsT0FBTCxDQUFhSSxPQUFiLENBQXFCO0FBQUEsdUJBQVVLLE9BQU9DLE9BQVAsQ0FBZSxPQUFLZCxJQUFwQixFQUEwQlcsU0FBMUIsRUFBcUNDLFFBQXJDLENBQVY7QUFBQSxhQUFyQjtBQUVIOzs7bUNBRVU7QUFBQTs7QUFFSCxtQkFBTyxLQUFLUixPQUFMLENBQWFXLEdBQWIsQ0FBaUI7QUFBQSx1QkFDYixPQUFLaEIsTUFBUixTQUFrQixPQUFLQyxJQUF2QixVQUErQmEsT0FBT0csVUFBUCxHQUFrQkgsT0FBT0csVUFBekIsR0FBb0MsRUFBbkUsWUFDSUgsT0FBT0EsTUFBUCxHQUFjQSxPQUFPQSxNQUFyQixHQUE0QixFQURoQyxXQUNzQ0EsT0FBT0ksTUFBUCxHQUFjSixPQUFPSSxNQUFyQixHQUE0QixFQURsRSxFQURnQjtBQUFBLGFBQWpCLEVBRXlFQyxJQUZ6RSxDQUU4RSxJQUY5RSxDQUFQO0FBSVA7OztnQ0E1QmNDLEcsRUFBS25CLEksRUFBTW9CLE8sRUFBU2pCLE0sRUFBUTs7QUFFdkMsZ0NBQUssRUFBRWdCLFFBQUYsRUFBTCxFQUFjYixRQUFkLENBQXVCZSxNQUF2QjtBQUNBLGdDQUFLLEVBQUVyQixVQUFGLEVBQUwsRUFBZUssTUFBZjs7QUFFQSxtQkFBTyxJQUFJSCxLQUFKLENBQVVGLElBQVYsRUFBZ0JHLE1BQWhCLEVBQ0hGLFFBQVFjLEdBQVIsQ0FBWTtBQUFBLHVCQUFNSSxJQUFJRyxjQUFKLENBQW1CQyxDQUFuQixDQUFELEdBQ2IscUJBQVdBLENBQVgsRUFBY0osSUFBSUksQ0FBSixDQUFkLEVBQXNCSCxPQUF0QixDQURhLEdBQ29CLElBRHpCO0FBQUEsYUFBWixFQUMyQ0ksTUFEM0MsQ0FDa0Q7QUFBQSx1QkFBS0QsQ0FBTDtBQUFBLGFBRGxELENBREcsQ0FBUDtBQUlIOzs7Ozs7a0JBdUJVckIsSyIsImZpbGUiOiJSb3V0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IEVycm9yIGZyb20gJ2VzNi1lcnJvcic7XG5pbXBvcnQgQWN0aW9uIGZyb20gJy4vQWN0aW9uJztcbmltcG9ydCBNb2R1bGUgZnJvbSAnLi4vTW9kdWxlJztcblxuY2xhc3MgVW5zdXBwb3J0ZWRNZXRob2RFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgcGF0aCkge1xuXG4gICAgICAgIHN1cGVyKGBSb3V0ZTogVW5rbm93biBtZXRob2QgJyR7bWV0aG9kfScgZGVjbGFyZWQgZm9yIHBhdGggJyR7cGF0aH0nYCk7XG5cbiAgICB9XG5cbn1cblxuY29uc3QgTUVUSE9EUyA9IFsnZ2V0JywgJ3B1dCcsICdwb3N0JywgJ3BhdGNoJywgJ2RlbGV0ZSddO1xuXG4vKipcbiAqIFJvdXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICogQHBhcmFtIHtNb2R1bGV9IG1vZHVsZVxuICogQHBhcmFtIHthcnJheTxBY3Rpb24+fSBhY3Rpb25zXG4gKi9cbmNsYXNzIFJvdXRlIHtcblxuICAgIGNvbnN0cnVjdG9yKHBhdGgsIG1vZHVsZSwgYWN0aW9ucykge1xuXG4gICAgICAgIGJlb2YoeyBwYXRoIH0pLnN0cmluZygpO1xuICAgICAgICBiZW9mKHsgbW9kdWxlIH0pLmluc3RhbmNlKE1vZHVsZSk7XG4gICAgICAgIGJlb2YoeyBhY3Rpb25zIH0pLmFycmF5KCk7XG5cbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgICAgdGhpcy5tb2R1bGUgPSBtb2R1bGU7XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnM7XG5cbiAgICAgICAgYWN0aW9ucy5mb3JFYWNoKGEgPT4gYS5zZXRSb3V0ZSh0aGlzKSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmcm9tRGVmIGNyZWF0ZXMgYSBSb3V0ZSBmcm9tIGEgZGVmaW5pdGlvbiBvYmplY3QuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRlZlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHtIdHRwRmFjdG9yeX0gZmFjdG9yeVxuICAgICAqIEBwYXJhbSB7TW9kdWxlfSBtb2R1bGVcbiAgICAgKiBAcmV0dXJucyB7Um91dGV9XG4gICAgICovXG4gICAgc3RhdGljIGZyb21EZWYoZGVmLCBwYXRoLCBmYWN0b3J5LCBtb2R1bGUpIHtcblxuICAgICAgICBiZW9mKHsgZGVmIH0pLmluc3RhbmNlKE9iamVjdCk7XG4gICAgICAgIGJlb2YoeyBwYXRoIH0pLnN0cmluZygpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUm91dGUocGF0aCwgbW9kdWxlLFxuICAgICAgICAgICAgTUVUSE9EUy5tYXAobSA9PiAoZGVmLmhhc093blByb3BlcnR5KG0pKSA/XG4gICAgICAgICAgICAgICAgbmV3IEFjdGlvbihtLCBkZWZbbV0sIGZhY3RvcnkpIDogbnVsbCkuZmlsdGVyKG0gPT4gbSkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHJlcGFyZSB0aGlzIHJvdXRlXG4gICAgICogQHBhcmFtIHtleHByZXNzLkFwcGxpY2F0aW9uIHwgcmVzdGlmeS5TZXJ2ZXJ9IGZyYW1ld29ya1xuICAgICAqIEBwYXJhbSB7UmVzb3VyY2V9IHJlc291cmNlXG4gICAgICovXG4gICAgcHJlcGFyZShmcmFtZXdvcmssIHJlc291cmNlKSB7XG5cbiAgICAgICAgdGhpcy5hY3Rpb25zLmZvckVhY2goYWN0aW9uID0+IGFjdGlvbi5wcmVwYXJlKHRoaXMucGF0aCwgZnJhbWV3b3JrLCByZXNvdXJjZSkpO1xuXG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGlvbnMubWFwKGFjdGlvbiA9PlxuICAgICAgICAgICAgICAgICAgICBgJHt0aGlzLm1ldGhvZH0gJHt0aGlzLnBhdGh9ICR7YWN0aW9uLm1pZGRsZXdhcmU/YWN0aW9uLm1pZGRsZXdhcmU6Jyd9YCArXG4gICAgICAgICAgICAgICAgICAgIGAgJHthY3Rpb24uYWN0aW9uP2FjdGlvbi5hY3Rpb246Jyd9ICR7YWN0aW9uLm91dHB1dD9hY3Rpb24ub3V0cHV0OicnfWApLmpvaW4oJ1xcbicpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlXG4iXX0=