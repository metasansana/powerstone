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
    function Application() {
        var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __dirname;

        _classCallCheck(this, Application);

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

            (0, _beof2.default)({ listener: listener }).interface(listener);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiT25TZXJ2aWNlTGlzdGVuZXIiLCJPblNlcnZlckxpc3RlbmVyIiwiT25Sb3V0ZUxpc3RlbmVyIiwiT25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJBcHBsaWNhdGlvbiIsInBhdGgiLCJfX2Rpcm5hbWUiLCJtYWluIiwic2VydmVyIiwiY29udGV4dCIsIm9uU2VydmljZUxpc3RlbmVyIiwib25TZXJ2ZXJMaXN0ZW5lciIsIm9uUm91dGVMaXN0ZW5lciIsIm9uUm91dGUiLCJyZXEiLCJyZXMiLCJuZXh0Iiwib25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJvblJvdXRlRXJyb3IiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGFjayIsInN0YXR1cyIsImVuZCIsImZyYW1ld29yayIsImxpc3RlbmVyIiwiaW50ZXJmYWNlIiwidXNlIiwibG9hZCIsInRoZW4iLCJjb25maWd1cmF0aW9uIiwicmVhZCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwiSE9TVCIsIl9fY3JlYXRlU2VydmVyIiwic3RhcnQiLCJvblN0YXJ0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7O0lBS01BLGlCOzs7Ozs7Ozs7QUFFRjs7Ozs7O3NDQU1jLENBRWI7Ozs7OztBQUlMOzs7Ozs7SUFNTUMsZ0I7Ozs7Ozs7OztBQUVGOzs7O29DQUlZLENBRVg7Ozs7OztBQUlMOzs7Ozs7O0lBS01DLGU7Ozs7Ozs7OztBQUVGOzs7Ozs7a0NBTVUsQ0FFVDs7Ozs7O0FBSUw7Ozs7Ozs7SUFLTUMsb0I7Ozs7Ozs7OztBQUVGOzs7Ozs7O3VDQU9lLENBRWQ7Ozs7OztBQUlMOzs7Ozs7Ozs7SUFPTUMsVztBQUVGLDJCQUE4QjtBQUFBLFlBQWxCQyxJQUFrQix1RUFBWEMsU0FBVzs7QUFBQTs7QUFFMUIsYUFBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS0UsSUFBTCxHQUFZLElBQVo7QUFD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ImltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuaW1wb3J0IE1hbmFnZWRTZXJ2ZXIgZnJvbSAnLi4vbmV0L01hbmFnZWRTZXJ2ZXInO1xuXG4vKipcbiAqIE9uU2VydmljZUxpc3RlbmVyIGlzIGltcGxlbWVudGVkIHRvIHJlc3BvbmQgdG9cbiAqIHRoZSBzdGF0dXMgY2hhbmdlIG9mIHNlcnZpY2VzIGNvbmZpZ3VyZWQgZm9yIHRoZSBBcHBsaWN0aW9uLlxuICogQGludGVyZmFjZVxuICovXG5jbGFzcyBPblNlcnZpY2VMaXN0ZW5lciB7XG5cbiAgICAvKipcbiAgICAgKiBvbkNvbm5lY3RlZCBpcyBjYWxsZWQgd2hlbiBjb25uZWN0aW9ucyB0byBhbGwgdGhlIHNlcnZpY2VzXG4gICAgICogaGF2ZSBiZWVuIGVzdGFibGlzaGVkIGFuZCB0aGUgQXBwbGljYXRpb24gaXMgcmVhZHkgdG9cbiAgICAgKiBwcm9jZWVkIHRvIHRoZSBuZXh0IHBoYXNlIG9mIGJvb3QgdXAuXG4gICAgICogQHBhcmFtIHtBcHBsaWNhdGlvbn0gYXBwXG4gICAgICovXG4gICAgb25Db25uZWN0ZWQoKSB7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKiBPblNlcnZlckxpc3RlbmVyIGlzIGltcGxlbWVudGVkIHRvIHJlc3BvbmQgdG8gY2hhbmdlcyBpblxuICogdGhlIHN0YXR1cyBvZiB0aGUgaW50ZXJuYWwgSFRUUCBzZXJ2ZXIuXG4gKiBAaW50ZXJmYWNlXG4gKi9cblxuY2xhc3MgT25TZXJ2ZXJMaXN0ZW5lciB7XG5cbiAgICAvKipcbiAgICAgKiBvblN0YXJ0ZWQgaXMgY2FsbGVkIHdoZW4gdGhlIGh0dHAgc2VydmVyIGhhcyBiZWVuIHN0YXJ0ZWQuXG4gICAgICogQHBhcmFtIHtBcHBsaWNhdGlvbn0gYXBwXG4gICAgICovXG4gICAgb25TdGFydGVkKCkge1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogT25Sb3V0ZUxpc3RlbmVyIGlzIGltcGxlbWVudGVkIHRvIHByb2NlZWQgYWxsIHJvdXRlcyB0aGUgYXBwbGljYXRpb25cbiAqIGhhbmRsZXMuIEl0IHByb2NlZWRzIGFsbCB0aGUgc3VnYXIgcHdyIGFkZHMgb24gdG9wIG9mIHRoZSB1bmRlcmx5aW5nIGZyYW1ld29yay5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgT25Sb3V0ZUxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uUm91dGVcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R9IHJlcVxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG5leHRcbiAgICAgKi9cbiAgICBvblJvdXRlKCkge1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogT25Sb3V0ZUVycm9yTGlzdGVuZXIgaXMgaW1wbGVtZW50ZWQgdG8gaGFuZGxlIGVycm9yc1xuICogdGhhdCBvY2N1ciBkdXJpbmcgcm91dGUgZXhlY3V0aW9uLlxuICogQGludGVyZmFjZVxuICovXG5jbGFzcyBPblJvdXRlRXJyb3JMaXN0ZW5lciB7XG5cbiAgICAvKipcbiAgICAgKiBvblJvdXRlRXJyb3IgaGFuZGxlcyB0aGUgZXJyb3JcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R9IHJlcVxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG5leHRcbiAgICAgKi9cbiAgICBvblJvdXRlRXJyb3IoKSB7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKiBBcHBsaWNhdGlvbiBpcyB0aGUgbWFpbiBjbGFzcyBvZiB0aGUgZnJhbWV3b3JrLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gaW50aWFsaXplIHRoaXMgQXBwbGljYXRpb24gdG8uXG4gKiBAcHJvcGVydHkge01vZHVsZX0gbWFpbiAtIFRoZSBtYWluIE1vZHVsZSBmb3IgdGhpcyBBcHBsaWNhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7TWFuYWdlZFNlcnZlcn0gc2VydmVyIC0gVGhlIG1hbmFnZWQgaHR0cCBzZXJ2ZXIuXG4gKiBAcHJvcGVydHkge01hbmFnZWRTZXJ2ZXJ8bnVsbH0gc2VydmVyIC0gVGhlIGludGVybmFsIG1hbmFnZWQgc2VydmVyIHRoYXQgc2VydmVzIGNsaWVudHMuXG4gKi9cbmNsYXNzIEFwcGxpY2F0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKHBhdGggPSBfX2Rpcm5hbWUpIHtcblxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgICB0aGlzLm1haW4gPSBudWxsO1xuICAgICAgICB0aGlzLnNlcnZlciA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMub25TZXJ2aWNlTGlzdGVuZXIgPSBuZXcgT25TZXJ2aWNlTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5vblNlcnZlckxpc3RlbmVyID0gbmV3IE9uU2VydmVyTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5vblJvdXRlTGlzdGVuZXIgPSB7IG9uUm91dGUocmVxLCByZXMsIG5leHQpIHsgbmV4dCgpOyB9IH07XG4gICAgICAgIHRoaXMub25Sb3V0ZUVycm9yTGlzdGVuZXIgPSB7XG4gICAgICAgICAgICBvblJvdXRlRXJyb3IoZXJyLCByZXEsIHJlcywgbmV4dCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrID8gZXJyLnN0YWNrIDogZXJyKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgICAgICAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZyYW1ld29yayA9IG51bGw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRPblNlcnZpY2VMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T25TZXJ2aWNlTGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0T25TZXJ2aWNlTGlzdGVuZXIobGlzdGVuZXIpIHtcblxuICAgICAgICBiZW9mKHsgbGlzdGVuZXIgfSkuaW50ZXJmYWNlKGxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLm9uU2VydmljZUxpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0T25TZXJ2ZXJMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T25TZXJ2ZXJMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBzZXRPblNlcnZlckxpc3RlbmVyKGxpc3RlbmVyKSB7XG5cbiAgICAgICAgYmVvZih7IGxpc3RlbmVyIH0pLmludGVyZmFjZShPblNlcnZlckxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLm9uU2VydmVyTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRPblJvdXRlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge09uUm91dGVMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBzZXRPblJvdXRlTGlzdGVuZXIobGlzdGVuZXIpIHtcblxuICAgICAgICBiZW9mKHsgbGlzdGVuZXIgfSkuaW50ZXJmYWNlKGxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLm9uUm91dGVMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE9uUm91dGVFcnJvckxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPblJvdXRlRXJyb3JMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBzZXRPblJvdXRlRXJyb3JMaXN0ZW5lcihsaXN0ZW5lcikge1xuXG4gICAgICAgIGJlb2YoeyBsaXN0ZW5lciB9KS5pbnRlcmZhY2UoT25Sb3V0ZUVycm9yTGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMub25Sb3V0ZUVycm9yTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdGFydCB0aGUgc2VydmVyIGZvciB0aGlzIEFwcGxpY2F0aW9uXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBzdGFydCgpIHtcblxuICAgICAgICB0aGlzLmZyYW1ld29yay51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB0aGlzLm9uUm91dGVMaXN0ZW5lci5vblJvdXRlKHJlcSwgcmVzLCBuZXh0KSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbi5sb2FkKHRoaXMuZnJhbWV3b3JrKS5cbiAgICAgICAgdGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuc2VydmVyID0gbmV3IE1hbmFnZWRTZXJ2ZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmNvbmZpZ3VyYXRpb24ucmVhZCgncG9ydCcsIHByb2Nlc3MuZW52LlBPUlQgfHwgMjQwNyksXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmNvbmZpZ3VyYXRpb24ucmVhZCgnaG9zdCcsIHByb2Nlc3MuZW52LkhPU1QgfHwgJzAuMC4wLjAnKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9fY3JlYXRlU2VydmVyKCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuc3RhcnQoKTtcblxuICAgICAgICB9KS5cbiAgICAgICAgdGhlbigoKSA9PiB0aGlzLm9uU2VydmVyTGlzdGVuZXIub25TdGFydGVkKHRoaXMuc2VydmVyLCB0aGlzKSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCB7IE9uU2VydmljZUxpc3RlbmVyIGFzIE9uU2VydmljZUxpc3RlbmVyIH07XG5leHBvcnQgeyBPblNlcnZlckxpc3RlbmVyIGFzIE9uU2VydmVyTGlzdGVuZXIgfTtcbmV4cG9ydCB7IE9uUm91dGVMaXN0ZW5lciBhcyBPblJvdXRlTGlzdGVuZXIgfTtcbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uO1xuIl19