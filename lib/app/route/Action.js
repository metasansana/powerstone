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

var _LameFilter = require('../filters/LameFilter');

var _LameFilter2 = _interopRequireDefault(_LameFilter);

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
        this.output = new _LameFilter2.default();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcm91dGUvQWN0aW9uLmpzIl0sIm5hbWVzIjpbIkFjdGlvbiIsIm1ldGhvZCIsImRlZiIsImZhY3RvcnkiLCJzdHJpbmciLCJvYmplY3QiLCJpbnN0YW5jZSIsImlkIiwicm91dGUiLCJjYWxsYmFja3MiLCJvdXRwdXQiLCJwYXRoIiwiZnJhbWV3b3JrIiwicmVzb3VyY2UiLCJwcmVwYXJlIiwidW5zaGlmdCIsImFwcGx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7Ozs7SUFPTUEsTTtBQUVGLG9CQUFZQyxNQUFaLEVBQW9CQyxHQUFwQixFQUF5QkMsT0FBekIsRUFBa0M7QUFBQTs7QUFFOUIsNEJBQUssRUFBRUYsY0FBRixFQUFMLEVBQWlCRyxNQUFqQjtBQUNBLDRCQUFLLEVBQUVGLFFBQUYsRUFBTCxFQUFjRyxNQUFkO0FBQ0EsNEJBQUssRUFBRUYsZ0JBQUYsRUFBTCxFQUFrQkcsUUFBbEI7O0FBRUEsYUFBS0MsRUFBTCxHQUFVTCxJQUFJSyxFQUFKLElBQVUsRUFBcEI7QUFDQSxhQUFLTixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxhQUFLTSxLQUFMLEdBQWEsSUFBYjtBQUNBLGFBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxhQUFLQyxNQUFMLEdBQWMsMEJBQWQ7QUFDQSxhQUFLUCxPQUFMLEdBQWVBLE9BQWY7QUFFSDs7QUFFRDs7Ozs7Ozs7aUNBSVNLLEssRUFBTzs7QUFFWixnQ0FBSyxFQUFFQSxZQUFGLEVBQUwsRUFBZ0JGLFFBQWhCOztBQUVBLGlCQUFLRSxLQUFMLEdBQWFBLEtBQWI7QUFFSDs7QUFFRDs7Ozs7Ozs7O2dDQU1RRyxJLEVBQU1DLFMsRUFBV0MsUSxFQUFVOztBQUUvQixpQ0FBV0MsT0FBWCxDQUFtQixLQUFLWixHQUF4QixFQUE2QixJQUE3QixFQUFtQ1csUUFBbkM7QUFDQSw0QkFBTUMsT0FBTixDQUFjLEtBQUtaLEdBQW5CLEVBQXdCLElBQXhCLEVBQThCVyxRQUE5QjtBQUNBLGtDQUFZQyxPQUFaLENBQW9CLEtBQUtaLEdBQXpCLEVBQThCLElBQTlCLEVBQW9DVyxRQUFwQztBQUNBLHNDQUFnQkMsT0FBaEIsQ0FBd0IsS0FBS1osR0FBN0IsRUFBa0MsSUFBbEMsRUFBd0NXLFFBQXhDOztBQUVBLGlCQUFLSixTQUFMLENBQWVNLE9BQWYsQ0FBdUJKLElBQXZCO0FBQ0FDLHNCQUFVLEtBQUtYLE1BQWYsRUFBdUJlLEtBQXZCLENBQTZCSixTQUE3QixFQUF3QyxLQUFLSCxTQUE3QztBQUVIOzs7Ozs7a0JBSVVULE0iLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJlb2YgZnJvbSAnYmVvZic7XG5pbXBvcnQgTWlkZGxld2FyZSBmcm9tICcuL01pZGRsZXdhcmUnO1xuaW1wb3J0IFZpZXdzIGZyb20gJy4vVmlld3MnO1xuaW1wb3J0IENvbnRyb2xsZXJzIGZyb20gJy4vQ29udHJvbGxlcnMnO1xuaW1wb3J0IFJvdXRlIGZyb20gJy4vUm91dGUnO1xuaW1wb3J0IEh0dHBGYWN0b3J5IGZyb20gJy4uL0h0dHBGYWN0b3J5JztcbmltcG9ydCBPdXRwdXRGaWx0ZXJpbmcgZnJvbSAnLi9PdXRwdXRGaWx0ZXJpbmcnO1xuaW1wb3J0IExhbWVGaWx0ZXIgZnJvbSAnLi4vZmlsdGVycy9MYW1lRmlsdGVyJztcblxuLyoqXG4gKiBBY3Rpb24gcmVwc2VudHMgdGhlIHZhcmlvdXMgdGFza3MgdGhhdCB3aWxsIGJlIHBlcmZvcm1lZCB3aGVuIGEgcm91dGVcbiAqIGlzIGFjY2Vzc2VkIHZpYSBhIHBhcnRpY3VsYXIgdmVyYi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7b2JqZWN0fSBkZWZcbiAqIEBwYXJhbSB7SHR0cEZhY3Rvcnl9IGZhY3RvcnlcbiAqL1xuY2xhc3MgQWN0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgZGVmLCBmYWN0b3J5KSB7XG5cbiAgICAgICAgYmVvZih7IG1ldGhvZCB9KS5zdHJpbmcoKTtcbiAgICAgICAgYmVvZih7IGRlZiB9KS5vYmplY3QoKTtcbiAgICAgICAgYmVvZih7IGZhY3RvcnkgfSkuaW5zdGFuY2UoSHR0cEZhY3RvcnkpO1xuXG4gICAgICAgIHRoaXMuaWQgPSBkZWYuaWQgfHwgJyc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgICAgICB0aGlzLmRlZiA9IGRlZjtcbiAgICAgICAgdGhpcy5yb3V0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgICAgIHRoaXMub3V0cHV0ID0gbmV3IExhbWVGaWx0ZXIoKTtcbiAgICAgICAgdGhpcy5mYWN0b3J5ID0gZmFjdG9yeTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldFJvdXRlXG4gICAgICogQHBhcmFtIHtSb3V0ZX0gcm91dGVcbiAgICAgKi9cbiAgICBzZXRSb3V0ZShyb3V0ZSkge1xuXG4gICAgICAgIGJlb2YoeyByb3V0ZSB9KS5pbnN0YW5jZShSb3V0ZSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZSA9IHJvdXRlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHJlcGFyZSB0aGlzIEFjdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHtleHByZXNzLkFwcGxpY2F0aW9uIHwgcmVzdGlmeS5TZXJ2ZXJ9IGZyYW1ld29ya1xuICAgICAqIEBwYXJhbSB7UmVzb3VyY2V9IHJlc291cmNlXG4gICAgICovXG4gICAgcHJlcGFyZShwYXRoLCBmcmFtZXdvcmssIHJlc291cmNlKSB7XG5cbiAgICAgICAgTWlkZGxld2FyZS5wcmVwYXJlKHRoaXMuZGVmLCB0aGlzLCByZXNvdXJjZSk7XG4gICAgICAgIFZpZXdzLnByZXBhcmUodGhpcy5kZWYsIHRoaXMsIHJlc291cmNlKTtcbiAgICAgICAgQ29udHJvbGxlcnMucHJlcGFyZSh0aGlzLmRlZiwgdGhpcywgcmVzb3VyY2UpO1xuICAgICAgICBPdXRwdXRGaWx0ZXJpbmcucHJlcGFyZSh0aGlzLmRlZiwgdGhpcywgcmVzb3VyY2UpO1xuXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnVuc2hpZnQocGF0aCk7XG4gICAgICAgIGZyYW1ld29ya1t0aGlzLm1ldGhvZF0uYXBwbHkoZnJhbWV3b3JrLCB0aGlzLmNhbGxiYWNrcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uXG4iXX0=