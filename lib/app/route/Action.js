'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _Middleware = require('./Middleware');

var _Middleware2 = _interopRequireDefault(_Middleware);

var _Views = require('./Views');

var _Views2 = _interopRequireDefault(_Views);

var _Controllers = require('./Controllers');

var _Controllers2 = _interopRequireDefault(_Controllers);

var _Route = require('./Route');

var _Route2 = _interopRequireDefault(_Route);

var _HttpFactory = require('../HttpFactory');

var _HttpFactory2 = _interopRequireDefault(_HttpFactory);

var _OutputFiltering = require('./OutputFiltering');

var _OutputFiltering2 = _interopRequireDefault(_OutputFiltering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Action repsents the various tasks that will be performed when a route
 * is accessed via a particular verb.
 * @param {string} method
 * @param {object} def
 * @param {HttpFactory} factory
 */
var Action = function () {
    function Action(method, def, factory) {
        _classCallCheck(this, Action);

        (0, _beof2.default)({ method: method }).string();
        (0, _beof2.default)({ def: def }).object();
        (0, _beof2.default)({ factory: factory }).instance(_HttpFactory2.default);

        this.id = def.id || '';
        this.method = method;
        this.def = def;
        this.route = null;
        this.callbacks = [];
        this.outputs = [];
        this.factory = factory;
    }

    /**
     * setRoute
     * @param {Route} route
     */


    _createClass(Action, [{
        key: 'setRoute',
        value: function setRoute(route) {

            (0, _beof2.default)({ route: route }).instance(_Route2.default);

            this.route = route;
        }

        /**
         * prepare this Action
         * @param {string} path
         * @param {express.Application | restify.Server} framework
         * @param {Resource} resource
         */

    }, {
        key: 'prepare',
        value: function prepare(path, framework, resource) {

            _Middleware2.default.prepare(this.def, this, resource);
            _Views2.default.prepare(this.def, this, resource);
            _Controllers2.default.prepare(this.def, this, resource);
            _OutputFiltering2.default.prepare(this.def, this, resource);

            this.callbacks.unshift(path);
            framework[this.method].apply(framework, this.callbacks);
        }
    }]);

    return Action;
}();

exports.default = Action;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvQWN0aW9uLmpzIl0sIm5hbWVzIjpbIkFjdGlvbiIsIm1ldGhvZCIsImRlZiIsImZhY3RvcnkiLCJzdHJpbmciLCJvYmplY3QiLCJpbnN0YW5jZSIsImlkIiwicm91dGUiLCJjYWxsYmFja3MiLCJvdXRwdXRzIiwicGF0aCIsImZyYW1ld29yayIsInJlc291cmNlIiwicHJlcGFyZSIsInVuc2hpZnQiLCJhcHBseSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7OztJQU9NQSxNO0FBRUYsb0JBQVlDLE1BQVosRUFBb0JDLEdBQXBCLEVBQXlCQyxPQUF6QixFQUFrQztBQUFBOztBQUU5Qiw0QkFBSyxFQUFFRixjQUFGLEVBQUwsRUFBaUJHLE1BQWpCO0FBQ0EsNEJBQUssRUFBRUYsUUFBRixFQUFMLEVBQWNHLE1BQWQ7QUFDQSw0QkFBSyxFQUFFRixnQkFBRixFQUFMLEVBQWtCRyxRQUFsQjs7QUFFQSxhQUFLQyxFQUFMLEdBQVVMLElBQUlLLEVBQUosSUFBVSxFQUFwQjtBQUNBLGFBQUtOLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtDLEdBQUwsR0FBV0EsR0FBWDtBQUNBLGFBQUtNLEtBQUwsR0FBYSxJQUFiO0FBQ0EsYUFBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNBLGFBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsYUFBS1AsT0FBTCxHQUFlQSxPQUFmO0FBRUg7O0FBRUQ7Ozs7Ozs7O2lDQUlTSyxLLEVBQU87O0FBRVosZ0NBQUssRUFBRUEsWUFBRixFQUFMLEVBQWdCRixRQUFoQjs7QUFFQSxpQkFBS0UsS0FBTCxHQUFhQSxLQUFiO0FBRUg7O0FBRUQ7Ozs7Ozs7OztnQ0FNUUcsSSxFQUFNQyxTLEVBQVdDLFEsRUFBVTs7QUFFL0IsaUNBQVdDLE9BQVgsQ0FBbUIsS0FBS1osR0FBeEIsRUFBNkIsSUFBN0IsRUFBbUNXLFFBQW5DO0FBQ0EsNEJBQU1DLE9BQU4sQ0FBYyxLQUFLWixHQUFuQixFQUF3QixJQUF4QixFQUE4QlcsUUFBOUI7QUFDQSxrQ0FBWUMsT0FBWixDQUFvQixLQUFLWixHQUF6QixFQUE4QixJQUE5QixFQUFvQ1csUUFBcEM7QUFDQSxzQ0FBZ0JDLE9BQWhCLENBQXdCLEtBQUtaLEdBQTdCLEVBQWtDLElBQWxDLEVBQXdDVyxRQUF4Qzs7QUFFQSxpQkFBS0osU0FBTCxDQUFlTSxPQUFmLENBQXVCSixJQUF2QjtBQUNBQyxzQkFBVSxLQUFLWCxNQUFmLEVBQXVCZSxLQUF2QixDQUE2QkosU0FBN0IsRUFBd0MsS0FBS0gsU0FBN0M7QUFFSDs7Ozs7O2tCQUlVVCxNIiwiZmlsZSI6IkFjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IE1pZGRsZXdhcmUgZnJvbSAnLi9NaWRkbGV3YXJlJztcbmltcG9ydCBWaWV3cyBmcm9tICcuL1ZpZXdzJztcbmltcG9ydCBDb250cm9sbGVycyBmcm9tICcuL0NvbnRyb2xsZXJzJztcbmltcG9ydCBSb3V0ZSBmcm9tICcuL1JvdXRlJztcbmltcG9ydCBIdHRwRmFjdG9yeSBmcm9tICcuLi9IdHRwRmFjdG9yeSc7XG5pbXBvcnQgT3V0cHV0RmlsdGVyaW5nIGZyb20gJy4vT3V0cHV0RmlsdGVyaW5nJztcblxuLyoqXG4gKiBBY3Rpb24gcmVwc2VudHMgdGhlIHZhcmlvdXMgdGFza3MgdGhhdCB3aWxsIGJlIHBlcmZvcm1lZCB3aGVuIGEgcm91dGVcbiAqIGlzIGFjY2Vzc2VkIHZpYSBhIHBhcnRpY3VsYXIgdmVyYi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7b2JqZWN0fSBkZWZcbiAqIEBwYXJhbSB7SHR0cEZhY3Rvcnl9IGZhY3RvcnlcbiAqL1xuY2xhc3MgQWN0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgZGVmLCBmYWN0b3J5KSB7XG5cbiAgICAgICAgYmVvZih7IG1ldGhvZCB9KS5zdHJpbmcoKTtcbiAgICAgICAgYmVvZih7IGRlZiB9KS5vYmplY3QoKTtcbiAgICAgICAgYmVvZih7IGZhY3RvcnkgfSkuaW5zdGFuY2UoSHR0cEZhY3RvcnkpO1xuXG4gICAgICAgIHRoaXMuaWQgPSBkZWYuaWQgfHwgJyc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgICAgICB0aGlzLmRlZiA9IGRlZjtcbiAgICAgICAgdGhpcy5yb3V0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgICAgIHRoaXMub3V0cHV0cyA9IFtdO1xuICAgICAgICB0aGlzLmZhY3RvcnkgPSBmYWN0b3J5O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0Um91dGVcbiAgICAgKiBAcGFyYW0ge1JvdXRlfSByb3V0ZVxuICAgICAqL1xuICAgIHNldFJvdXRlKHJvdXRlKSB7XG5cbiAgICAgICAgYmVvZih7IHJvdXRlIH0pLmluc3RhbmNlKFJvdXRlKTtcblxuICAgICAgICB0aGlzLnJvdXRlID0gcm91dGU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwcmVwYXJlIHRoaXMgQWN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0ge2V4cHJlc3MuQXBwbGljYXRpb24gfCByZXN0aWZ5LlNlcnZlcn0gZnJhbWV3b3JrXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZX0gcmVzb3VyY2VcbiAgICAgKi9cbiAgICBwcmVwYXJlKHBhdGgsIGZyYW1ld29yaywgcmVzb3VyY2UpIHtcblxuICAgICAgICBNaWRkbGV3YXJlLnByZXBhcmUodGhpcy5kZWYsIHRoaXMsIHJlc291cmNlKTtcbiAgICAgICAgVmlld3MucHJlcGFyZSh0aGlzLmRlZiwgdGhpcywgcmVzb3VyY2UpO1xuICAgICAgICBDb250cm9sbGVycy5wcmVwYXJlKHRoaXMuZGVmLCB0aGlzLCByZXNvdXJjZSk7XG4gICAgICAgIE91dHB1dEZpbHRlcmluZy5wcmVwYXJlKHRoaXMuZGVmLCB0aGlzLCByZXNvdXJjZSk7XG5cbiAgICAgICAgdGhpcy5jYWxsYmFja3MudW5zaGlmdChwYXRoKTtcbiAgICAgICAgZnJhbWV3b3JrW3RoaXMubWV0aG9kXS5hcHBseShmcmFtZXdvcmssIHRoaXMuY2FsbGJhY2tzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBY3Rpb25cbiJdfQ==