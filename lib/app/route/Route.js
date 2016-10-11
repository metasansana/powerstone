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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvUm91dGUuanMiXSwibmFtZXMiOlsiVW5zdXBwb3J0ZWRNZXRob2RFcnJvciIsIm1ldGhvZCIsInBhdGgiLCJNRVRIT0RTIiwiUm91dGUiLCJtb2R1bGUiLCJhY3Rpb25zIiwic3RyaW5nIiwiaW5zdGFuY2UiLCJhcnJheSIsImZvckVhY2giLCJhIiwic2V0Um91dGUiLCJmcmFtZXdvcmsiLCJyZXNvdXJjZSIsImFjdGlvbiIsInByZXBhcmUiLCJkZWYiLCJmYWN0b3J5IiwiT2JqZWN0IiwibWFwIiwiaGFzT3duUHJvcGVydHkiLCJtIiwiZmlsdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsc0I7OztBQUVGLG9DQUFZQyxNQUFaLEVBQW9CQyxJQUFwQixFQUEwQjtBQUFBOztBQUFBLDRLQUVVRCxNQUZWLCtCQUV3Q0MsSUFGeEM7QUFJekI7Ozs7O0FBSUwsSUFBTUMsVUFBVSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixPQUF2QixFQUFnQyxRQUFoQyxDQUFoQjs7QUFFQTs7Ozs7OztJQU1NQyxLO0FBRUYsbUJBQVlGLElBQVosRUFBa0JHLE1BQWxCLEVBQTBCQyxPQUExQixFQUFtQztBQUFBOztBQUFBOztBQUUvQiw0QkFBSyxFQUFFSixVQUFGLEVBQUwsRUFBZUssTUFBZjtBQUNBLDRCQUFLLEVBQUVGLGNBQUYsRUFBTCxFQUFpQkcsUUFBakI7QUFDQSw0QkFBSyxFQUFFRixnQkFBRixFQUFMLEVBQWtCRyxLQUFsQjs7QUFFQSxhQUFLUCxJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFLRyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxPQUFMLEdBQWVBLE9BQWY7O0FBRUFBLGdCQUFRSSxPQUFSLENBQWdCO0FBQUEsbUJBQUtDLEVBQUVDLFFBQUYsUUFBTDtBQUFBLFNBQWhCO0FBRUg7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7OztnQ0FLUUMsUyxFQUFXQyxRLEVBQVU7QUFBQTs7QUFFekIsaUJBQUtSLE9BQUwsQ0FBYUksT0FBYixDQUFxQjtBQUFBLHVCQUFVSyxPQUFPQyxPQUFQLENBQWUsT0FBS2QsSUFBcEIsRUFBMEJXLFNBQTFCLEVBQXFDQyxRQUFyQyxDQUFWO0FBQUEsYUFBckI7QUFFSDs7O2dDQXBCY0csRyxFQUFLZixJLEVBQU1nQixPLEVBQVNiLE0sRUFBUTs7QUFFdkMsZ0NBQUssRUFBRVksUUFBRixFQUFMLEVBQWNULFFBQWQsQ0FBdUJXLE1BQXZCO0FBQ0EsZ0NBQUssRUFBRWpCLFVBQUYsRUFBTCxFQUFlSyxNQUFmOztBQUVBLG1CQUFPLElBQUlILEtBQUosQ0FBVUYsSUFBVixFQUFnQkcsTUFBaEIsRUFDSEYsUUFBUWlCLEdBQVIsQ0FBWTtBQUFBLHVCQUFNSCxJQUFJSSxjQUFKLENBQW1CQyxDQUFuQixDQUFELEdBQ2IscUJBQVdBLENBQVgsRUFBY0wsSUFBSUssQ0FBSixDQUFkLEVBQXNCSixPQUF0QixDQURhLEdBQ29CLElBRHpCO0FBQUEsYUFBWixFQUMyQ0ssTUFEM0MsQ0FDa0Q7QUFBQSx1QkFBS0QsQ0FBTDtBQUFBLGFBRGxELENBREcsQ0FBUDtBQUlIOzs7Ozs7a0JBZVVsQixLIiwiZmlsZSI6IlJvdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJlb2YgZnJvbSAnYmVvZic7XG5pbXBvcnQgRXJyb3IgZnJvbSAnZXM2LWVycm9yJztcbmltcG9ydCBBY3Rpb24gZnJvbSAnLi9BY3Rpb24nO1xuaW1wb3J0IE1vZHVsZSBmcm9tICcuLi9Nb2R1bGUnO1xuXG5jbGFzcyBVbnN1cHBvcnRlZE1ldGhvZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBwYXRoKSB7XG5cbiAgICAgICAgc3VwZXIoYFJvdXRlOiBVbmtub3duIG1ldGhvZCAnJHttZXRob2R9JyBkZWNsYXJlZCBmb3IgcGF0aCAnJHtwYXRofSdgKTtcblxuICAgIH1cblxufVxuXG5jb25zdCBNRVRIT0RTID0gWydnZXQnLCAncHV0JywgJ3Bvc3QnLCAncGF0Y2gnLCAnZGVsZXRlJ107XG5cbi8qKlxuICogUm91dGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge01vZHVsZX0gbW9kdWxlXG4gKiBAcGFyYW0ge2FycmF5PEFjdGlvbj59IGFjdGlvbnNcbiAqL1xuY2xhc3MgUm91dGUge1xuXG4gICAgY29uc3RydWN0b3IocGF0aCwgbW9kdWxlLCBhY3Rpb25zKSB7XG5cbiAgICAgICAgYmVvZih7IHBhdGggfSkuc3RyaW5nKCk7XG4gICAgICAgIGJlb2YoeyBtb2R1bGUgfSkuaW5zdGFuY2UoTW9kdWxlKTtcbiAgICAgICAgYmVvZih7IGFjdGlvbnMgfSkuYXJyYXkoKTtcblxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgICB0aGlzLm1vZHVsZSA9IG1vZHVsZTtcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcblxuICAgICAgICBhY3Rpb25zLmZvckVhY2goYSA9PiBhLnNldFJvdXRlKHRoaXMpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGZyb21EZWYgY3JlYXRlcyBhIFJvdXRlIGZyb20gYSBkZWZpbml0aW9uIG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZGVmXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0ge0h0dHBGYWN0b3J5fSBmYWN0b3J5XG4gICAgICogQHBhcmFtIHtNb2R1bGV9IG1vZHVsZVxuICAgICAqIEByZXR1cm5zIHtSb3V0ZX1cbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbURlZihkZWYsIHBhdGgsIGZhY3RvcnksIG1vZHVsZSkge1xuXG4gICAgICAgIGJlb2YoeyBkZWYgfSkuaW5zdGFuY2UoT2JqZWN0KTtcbiAgICAgICAgYmVvZih7IHBhdGggfSkuc3RyaW5nKCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSb3V0ZShwYXRoLCBtb2R1bGUsXG4gICAgICAgICAgICBNRVRIT0RTLm1hcChtID0+IChkZWYuaGFzT3duUHJvcGVydHkobSkpID9cbiAgICAgICAgICAgICAgICBuZXcgQWN0aW9uKG0sIGRlZlttXSwgZmFjdG9yeSkgOiBudWxsKS5maWx0ZXIobSA9PiBtKSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwcmVwYXJlIHRoaXMgcm91dGVcbiAgICAgKiBAcGFyYW0ge2V4cHJlc3MuQXBwbGljYXRpb24gfCByZXN0aWZ5LlNlcnZlcn0gZnJhbWV3b3JrXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZX0gcmVzb3VyY2VcbiAgICAgKi9cbiAgICBwcmVwYXJlKGZyYW1ld29yaywgcmVzb3VyY2UpIHtcblxuICAgICAgICB0aGlzLmFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4gYWN0aW9uLnByZXBhcmUodGhpcy5wYXRoLCBmcmFtZXdvcmssIHJlc291cmNlKSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm91dGVcbiJdfQ==