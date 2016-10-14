'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OnRouteListener = exports.OnServerListener = exports.OnServiceListener = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _ManagedServer = require('../net/ManagedServer');

var _ManagedServer2 = _interopRequireDefault(_ManagedServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * OnServiceListener is implemented to respond to
 * the status change of services configured for the Appliction.
 * @interface
 */
var OnServiceListener = function () {
    function OnServiceListener() {
        _classCallCheck(this, OnServiceListener);
    }

    _createClass(OnServiceListener, [{
        key: 'onConnected',


        /**
         * onConnected is called when connections to all the services
         * have been established and the Application is ready to
         * proceed to the next phase of boot up.
         * @param {Application} app
         */
        value: function onConnected() {}
    }]);

    return OnServiceListener;
}();

/**
 * OnServerListener is implemented to respond to changes in
 * the status of the internal HTTP server.
 * @interface
 */

var OnServerListener = function () {
    function OnServerListener() {
        _classCallCheck(this, OnServerListener);
    }

    _createClass(OnServerListener, [{
        key: 'onStarted',


        /**
         * onStarted is called when the http server has been started.
         * @param {Application} app
         */
        value: function onStarted() {}
    }]);

    return OnServerListener;
}();

/**
 * OnRouteListener is implemented to proceed all routes the application
 * handles. It proceeds all the sugar pwr adds on top of the underlying framework.
 * @interface
 */


var OnRouteListener = function () {
    function OnRouteListener() {
        _classCallCheck(this, OnRouteListener);
    }

    _createClass(OnRouteListener, [{
        key: 'onRoute',


        /**
         * onRoute
         * @param {Request} req
         * @param {Response} res
         * @param {function} next
         */
        value: function onRoute() {}
    }]);

    return OnRouteListener;
}();

/**
 * OnRouteErrorListener is implemented to handle errors
 * that occur during route execution.
 * @interface
 */


var OnRouteErrorListener = function () {
    function OnRouteErrorListener() {
        _classCallCheck(this, OnRouteErrorListener);
    }

    _createClass(OnRouteErrorListener, [{
        key: 'onRouteError',


        /**
         * onRouteError handles the error
         * @param {Error} err
         * @param {Request} req
         * @param {Response} res
         * @param {function} next
         */
        value: function onRouteError() {}
    }]);

    return OnRouteErrorListener;
}();

/**
 * Application is the main class of the framework.
 * @param {string} path The path to intialize this Application to.
 * @property {Module} main - The main Module for this Application.
 * @property {ManagedServer} server - The managed http server.
 * @property {ManagedServer|null} server - The internal managed server that serves clients.
 */


var Application = function () {
    function Application(path) {
        _classCallCheck(this, Application);

        (0, _beof2.default)({ path: path }).string();

        this.path = path;
        this.main = null;
        this.server = null;
        this.context = null;
        this.onServiceListener = new OnServiceListener();
        this.onServerListener = new OnServerListener();
        this.onRouteListener = {
            onRoute: function onRoute(req, res, next) {
                next();
            }
        };
        this.onRouteErrorListener = {
            onRouteError: function onRouteError(err, req, res, next) {
                console.error(err.stack ? err.stack : err);
                res.status(500);
                res.end();
            }
        };
        this.framework = null;
    }

    /**
     * setOnServiceListener
     * @param {OnServiceListener} listener
     */


    _createClass(Application, [{
        key: 'setOnServiceListener',
        value: function setOnServiceListener(listener) {

            (0, _beof2.default)({ listener: listener }).interface(OnServiceListener);

            this.onServiceListener = listener;
            return this;
        }

        /**
         * setOnServerListener
         * @param {OnServerListener} listener
         */

    }, {
        key: 'setOnServerListener',
        value: function setOnServerListener(listener) {

            (0, _beof2.default)({ listener: listener }).interface(OnServerListener);

            this.onServerListener = listener;
            return this;
        }

        /**
         * setOnRouteListener
         * @param {OnRouteListener} listener
         */

    }, {
        key: 'setOnRouteListener',
        value: function setOnRouteListener(listener) {

            (0, _beof2.default)({ listener: listener }).interface(listener);

            this.onRouteListener = listener;
            return this;
        }

        /**
         * setOnRouteErrorListener
         * @param {OnRouteErrorListener} listener
         */

    }, {
        key: 'setOnRouteErrorListener',
        value: function setOnRouteErrorListener(listener) {

            (0, _beof2.default)({ listener: listener }).interface(OnRouteErrorListener);

            this.onRouteErrorListener = listener;
            return this;
        }

        /**
         * start the server for this Application
         * @return {Promise}
         */

    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            this.framework.use(function (req, res, next) {
                return _this.onRouteListener.onRoute(req, res, next);
            });

            return this.main.load(this.framework).then(function () {

                _this.server = new _ManagedServer2.default(_this.main.configuration.read('port', process.env.PORT || 2407), _this.main.configuration.read('host', process.env.HOST || '0.0.0.0'), _this.__createServer());

                return _this.server.start();
            }).then(function () {
                return _this.onServerListener.onStarted(_this.server, _this);
            });
        }
    }]);

    return Application;
}();

exports.OnServiceListener = OnServiceListener;
exports.OnServerListener = OnServerListener;
exports.OnRouteListener = OnRouteListener;
exports.default = Application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiT25TZXJ2aWNlTGlzdGVuZXIiLCJPblNlcnZlckxpc3RlbmVyIiwiT25Sb3V0ZUxpc3RlbmVyIiwiT25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJBcHBsaWNhdGlvbiIsInBhdGgiLCJzdHJpbmciLCJtYWluIiwic2VydmVyIiwiY29udGV4dCIsIm9uU2VydmljZUxpc3RlbmVyIiwib25TZXJ2ZXJMaXN0ZW5lciIsIm9uUm91dGVMaXN0ZW5lciIsIm9uUm91dGUiLCJyZXEiLCJyZXMiLCJuZXh0Iiwib25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJvblJvdXRlRXJyb3IiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGFjayIsInN0YXR1cyIsImVuZCIsImZyYW1ld29yayIsImxpc3RlbmVyIiwiaW50ZXJmYWNlIiwidXNlIiwibG9hZCIsInRoZW4iLCJjb25maWd1cmF0aW9uIiwicmVhZCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwiSE9TVCIsIl9fY3JlYXRlU2VydmVyIiwic3RhcnQiLCJvblN0YXJ0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7O0lBS01BLGlCOzs7Ozs7Ozs7QUFFRjs7Ozs7O3NDQU1jLENBRWI7Ozs7OztBQUlMOzs7Ozs7SUFNTUMsZ0I7Ozs7Ozs7OztBQUVGOzs7O29DQUlZLENBRVg7Ozs7OztBQUlMOzs7Ozs7O0lBS01DLGU7Ozs7Ozs7OztBQUVGOzs7Ozs7a0NBTVUsQ0FFVDs7Ozs7O0FBSUw7Ozs7Ozs7SUFLTUMsb0I7Ozs7Ozs7OztBQUVGOzs7Ozs7O3VDQU9lLENBRWQ7Ozs7OztBQUlMOzs7Ozs7Ozs7SUFPTUMsVztBQUVGLHlCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBRWQsNEJBQUssRUFBQ0EsVUFBRCxFQUFMLEVBQWFDLE1BQWI7O0FBRUEsYUFBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS0UsSUFB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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCBNYW5hZ2VkU2VydmVyIGZyb20gJy4uL25ldC9NYW5hZ2VkU2VydmVyJztcblxuLyoqXG4gKiBPblNlcnZpY2VMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byByZXNwb25kIHRvXG4gKiB0aGUgc3RhdHVzIGNoYW5nZSBvZiBzZXJ2aWNlcyBjb25maWd1cmVkIGZvciB0aGUgQXBwbGljdGlvbi5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgT25TZXJ2aWNlTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25Db25uZWN0ZWQgaXMgY2FsbGVkIHdoZW4gY29ubmVjdGlvbnMgdG8gYWxsIHRoZSBzZXJ2aWNlc1xuICAgICAqIGhhdmUgYmVlbiBlc3RhYmxpc2hlZCBhbmQgdGhlIEFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvXG4gICAgICogcHJvY2VlZCB0byB0aGUgbmV4dCBwaGFzZSBvZiBib290IHVwLlxuICAgICAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcFxuICAgICAqL1xuICAgIG9uQ29ubmVjdGVkKCkge1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogT25TZXJ2ZXJMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byByZXNwb25kIHRvIGNoYW5nZXMgaW5cbiAqIHRoZSBzdGF0dXMgb2YgdGhlIGludGVybmFsIEhUVFAgc2VydmVyLlxuICogQGludGVyZmFjZVxuICovXG5cbmNsYXNzIE9uU2VydmVyTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25TdGFydGVkIGlzIGNhbGxlZCB3aGVuIHRoZSBodHRwIHNlcnZlciBoYXMgYmVlbiBzdGFydGVkLlxuICAgICAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcFxuICAgICAqL1xuICAgIG9uU3RhcnRlZCgpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIE9uUm91dGVMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byBwcm9jZWVkIGFsbCByb3V0ZXMgdGhlIGFwcGxpY2F0aW9uXG4gKiBoYW5kbGVzLiBJdCBwcm9jZWVkcyBhbGwgdGhlIHN1Z2FyIHB3ciBhZGRzIG9uIHRvcCBvZiB0aGUgdW5kZXJseWluZyBmcmFtZXdvcmsuXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIE9uUm91dGVMaXN0ZW5lciB7XG5cbiAgICAvKipcbiAgICAgKiBvblJvdXRlXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSByZXFcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZXh0XG4gICAgICovXG4gICAgb25Sb3V0ZSgpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIE9uUm91dGVFcnJvckxpc3RlbmVyIGlzIGltcGxlbWVudGVkIHRvIGhhbmRsZSBlcnJvcnNcbiAqIHRoYXQgb2NjdXIgZHVyaW5nIHJvdXRlIGV4ZWN1dGlvbi5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgT25Sb3V0ZUVycm9yTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25Sb3V0ZUVycm9yIGhhbmRsZXMgdGhlIGVycm9yXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSByZXFcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZXh0XG4gICAgICovXG4gICAgb25Sb3V0ZUVycm9yKCkge1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogQXBwbGljYXRpb24gaXMgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIGZyYW1ld29yay5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGludGlhbGl6ZSB0aGlzIEFwcGxpY2F0aW9uIHRvLlxuICogQHByb3BlcnR5IHtNb2R1bGV9IG1haW4gLSBUaGUgbWFpbiBNb2R1bGUgZm9yIHRoaXMgQXBwbGljYXRpb24uXG4gKiBAcHJvcGVydHkge01hbmFnZWRTZXJ2ZXJ9IHNlcnZlciAtIFRoZSBtYW5hZ2VkIGh0dHAgc2VydmVyLlxuICogQHByb3BlcnR5IHtNYW5hZ2VkU2VydmVyfG51bGx9IHNlcnZlciAtIFRoZSBpbnRlcm5hbCBtYW5hZ2VkIHNlcnZlciB0aGF0IHNlcnZlcyBjbGllbnRzLlxuICovXG5jbGFzcyBBcHBsaWNhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXRoKSB7XG5cbiAgICAgICAgYmVvZih7cGF0aH0pLnN0cmluZygpO1xuXG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgICAgIHRoaXMubWFpbiA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VydmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5vblNlcnZpY2VMaXN0ZW5lciA9IG5ldyBPblNlcnZpY2VMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm9uU2VydmVyTGlzdGVuZXIgPSBuZXcgT25TZXJ2ZXJMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm9uUm91dGVMaXN0ZW5lciA9IHsgb25Sb3V0ZShyZXEsIHJlcywgbmV4dCkgeyBuZXh0KCk7IH0gfTtcbiAgICAgICAgdGhpcy5vblJvdXRlRXJyb3JMaXN0ZW5lciA9IHtcbiAgICAgICAgICAgIG9uUm91dGVFcnJvcihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2sgPyBlcnIuc3RhY2sgOiBlcnIpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICAgICAgICAgICAgICByZXMuZW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZnJhbWV3b3JrID0gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE9uU2VydmljZUxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPblNlcnZpY2VMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBzZXRPblNlcnZpY2VMaXN0ZW5lcihsaXN0ZW5lcikge1xuXG4gICAgICAgIGJlb2YoeyBsaXN0ZW5lciB9KS5pbnRlcmZhY2UoT25TZXJ2aWNlTGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMub25TZXJ2aWNlTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRPblNlcnZlckxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPblNlcnZlckxpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldE9uU2VydmVyTGlzdGVuZXIobGlzdGVuZXIpIHtcblxuICAgICAgICBiZW9mKHsgbGlzdGVuZXIgfSkuaW50ZXJmYWNlKE9uU2VydmVyTGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMub25TZXJ2ZXJMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE9uUm91dGVMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T25Sb3V0ZUxpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldE9uUm91dGVMaXN0ZW5lcihsaXN0ZW5lcikge1xuXG4gICAgICAgIGJlb2YoeyBsaXN0ZW5lciB9KS5pbnRlcmZhY2UobGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMub25Sb3V0ZUxpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0T25Sb3V0ZUVycm9yTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge09uUm91dGVFcnJvckxpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldE9uUm91dGVFcnJvckxpc3RlbmVyKGxpc3RlbmVyKSB7XG5cbiAgICAgICAgYmVvZih7IGxpc3RlbmVyIH0pLmludGVyZmFjZShPblJvdXRlRXJyb3JMaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5vblJvdXRlRXJyb3JMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHN0YXJ0IHRoZSBzZXJ2ZXIgZm9yIHRoaXMgQXBwbGljYXRpb25cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIHRoaXMuZnJhbWV3b3JrLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHRoaXMub25Sb3V0ZUxpc3RlbmVyLm9uUm91dGUocmVxLCByZXMsIG5leHQpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tYWluLmxvYWQodGhpcy5mcmFtZXdvcmspLlxuICAgICAgICB0aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgTWFuYWdlZFNlcnZlcihcbiAgICAgICAgICAgICAgICB0aGlzLm1haW4uY29uZmlndXJhdGlvbi5yZWFkKCdwb3J0JywgcHJvY2Vzcy5lbnYuUE9SVCB8fCAyNDA3KSxcbiAgICAgICAgICAgICAgICB0aGlzLm1haW4uY29uZmlndXJhdGlvbi5yZWFkKCdob3N0JywgcHJvY2Vzcy5lbnYuSE9TVCB8fCAnMC4wLjAuMCcpLFxuICAgICAgICAgICAgICAgIHRoaXMuX19jcmVhdGVTZXJ2ZXIoKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZlci5zdGFydCgpO1xuXG4gICAgICAgIH0pLlxuICAgICAgICB0aGVuKCgpID0+IHRoaXMub25TZXJ2ZXJMaXN0ZW5lci5vblN0YXJ0ZWQodGhpcy5zZXJ2ZXIsIHRoaXMpKTtcblxuICAgIH1cbn1cblxuZXhwb3J0IHsgT25TZXJ2aWNlTGlzdGVuZXIgYXMgT25TZXJ2aWNlTGlzdGVuZXIgfTtcbmV4cG9ydCB7IE9uU2VydmVyTGlzdGVuZXIgYXMgT25TZXJ2ZXJMaXN0ZW5lciB9O1xuZXhwb3J0IHsgT25Sb3V0ZUxpc3RlbmVyIGFzIE9uUm91dGVMaXN0ZW5lciB9O1xuZXhwb3J0IGRlZmF1bHQgQXBwbGljYXRpb247XG4iXX0=