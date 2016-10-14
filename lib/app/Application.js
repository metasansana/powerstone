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

                _this.server = new _ManagedServer2.default(Number(_this.main.configuration.read('port', process.env.PORT || 2407)), _this.main.configuration.read('host', process.env.HOST || '0.0.0.0'), _this.__createServer());

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiT25TZXJ2aWNlTGlzdGVuZXIiLCJPblNlcnZlckxpc3RlbmVyIiwiT25Sb3V0ZUxpc3RlbmVyIiwiT25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJBcHBsaWNhdGlvbiIsInBhdGgiLCJzdHJpbmciLCJtYWluIiwic2VydmVyIiwiY29udGV4dCIsIm9uU2VydmljZUxpc3RlbmVyIiwib25TZXJ2ZXJMaXN0ZW5lciIsIm9uUm91dGVMaXN0ZW5lciIsIm9uUm91dGUiLCJyZXEiLCJyZXMiLCJuZXh0Iiwib25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJvblJvdXRlRXJyb3IiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGFjayIsInN0YXR1cyIsImVuZCIsImZyYW1ld29yayIsImxpc3RlbmVyIiwiaW50ZXJmYWNlIiwidXNlIiwibG9hZCIsInRoZW4iLCJOdW1iZXIiLCJjb25maWd1cmF0aW9uIiwicmVhZCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwiSE9TVCIsIl9fY3JlYXRlU2VydmVyIiwic3RhcnQiLCJvblN0YXJ0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7O0lBS01BLGlCOzs7Ozs7Ozs7QUFFRjs7Ozs7O3NDQU1jLENBRWI7Ozs7OztBQUlMOzs7Ozs7SUFNTUMsZ0I7Ozs7Ozs7OztBQUVGOzs7O29DQUlZLENBRVg7Ozs7OztBQUlMOzs7Ozs7O0lBS01DLGU7Ozs7Ozs7OztBQUVGOzs7Ozs7a0NBTVUsQ0FFVDs7Ozs7O0FBSUw7Ozs7Ozs7SUFLTUMsb0I7Ozs7Ozs7OztBQUVGOzs7Ozs7O3VDQU9lLENBRWQ7Ozs7OztBQUlMOzs7Ozs7Ozs7SUFPTUMsVztBQUVGLHlCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBRWQsNEJBQUssRUFBRUEsVUFBRixFQUFMLEVBQWVDLE1BQWY7O0FBRUEsYUFBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0Es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ZSI6IkFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJlb2YgZnJvbSAnYmVvZic7XG5pbXBvcnQgTWFuYWdlZFNlcnZlciBmcm9tICcuLi9uZXQvTWFuYWdlZFNlcnZlcic7XG5cbi8qKlxuICogT25TZXJ2aWNlTGlzdGVuZXIgaXMgaW1wbGVtZW50ZWQgdG8gcmVzcG9uZCB0b1xuICogdGhlIHN0YXR1cyBjaGFuZ2Ugb2Ygc2VydmljZXMgY29uZmlndXJlZCBmb3IgdGhlIEFwcGxpY3Rpb24uXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIE9uU2VydmljZUxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uQ29ubmVjdGVkIGlzIGNhbGxlZCB3aGVuIGNvbm5lY3Rpb25zIHRvIGFsbCB0aGUgc2VydmljZXNcbiAgICAgKiBoYXZlIGJlZW4gZXN0YWJsaXNoZWQgYW5kIHRoZSBBcHBsaWNhdGlvbiBpcyByZWFkeSB0b1xuICAgICAqIHByb2NlZWQgdG8gdGhlIG5leHQgcGhhc2Ugb2YgYm9vdCB1cC5cbiAgICAgKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBcbiAgICAgKi9cbiAgICBvbkNvbm5lY3RlZCgpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIE9uU2VydmVyTGlzdGVuZXIgaXMgaW1wbGVtZW50ZWQgdG8gcmVzcG9uZCB0byBjaGFuZ2VzIGluXG4gKiB0aGUgc3RhdHVzIG9mIHRoZSBpbnRlcm5hbCBIVFRQIHNlcnZlci5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuXG5jbGFzcyBPblNlcnZlckxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uU3RhcnRlZCBpcyBjYWxsZWQgd2hlbiB0aGUgaHR0cCBzZXJ2ZXIgaGFzIGJlZW4gc3RhcnRlZC5cbiAgICAgKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBcbiAgICAgKi9cbiAgICBvblN0YXJ0ZWQoKSB7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKiBPblJvdXRlTGlzdGVuZXIgaXMgaW1wbGVtZW50ZWQgdG8gcHJvY2VlZCBhbGwgcm91dGVzIHRoZSBhcHBsaWNhdGlvblxuICogaGFuZGxlcy4gSXQgcHJvY2VlZHMgYWxsIHRoZSBzdWdhciBwd3IgYWRkcyBvbiB0b3Agb2YgdGhlIHVuZGVybHlpbmcgZnJhbWV3b3JrLlxuICogQGludGVyZmFjZVxuICovXG5jbGFzcyBPblJvdXRlTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25Sb3V0ZVxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbmV4dFxuICAgICAqL1xuICAgIG9uUm91dGUoKSB7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKiBPblJvdXRlRXJyb3JMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byBoYW5kbGUgZXJyb3JzXG4gKiB0aGF0IG9jY3VyIGR1cmluZyByb3V0ZSBleGVjdXRpb24uXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIE9uUm91dGVFcnJvckxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uUm91dGVFcnJvciBoYW5kbGVzIHRoZSBlcnJvclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbmV4dFxuICAgICAqL1xuICAgIG9uUm91dGVFcnJvcigpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIEFwcGxpY2F0aW9uIGlzIHRoZSBtYWluIGNsYXNzIG9mIHRoZSBmcmFtZXdvcmsuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBpbnRpYWxpemUgdGhpcyBBcHBsaWNhdGlvbiB0by5cbiAqIEBwcm9wZXJ0eSB7TW9kdWxlfSBtYWluIC0gVGhlIG1haW4gTW9kdWxlIGZvciB0aGlzIEFwcGxpY2F0aW9uLlxuICogQHByb3BlcnR5IHtNYW5hZ2VkU2VydmVyfSBzZXJ2ZXIgLSBUaGUgbWFuYWdlZCBodHRwIHNlcnZlci5cbiAqIEBwcm9wZXJ0eSB7TWFuYWdlZFNlcnZlcnxudWxsfSBzZXJ2ZXIgLSBUaGUgaW50ZXJuYWwgbWFuYWdlZCBzZXJ2ZXIgdGhhdCBzZXJ2ZXMgY2xpZW50cy5cbiAqL1xuY2xhc3MgQXBwbGljYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IocGF0aCkge1xuXG4gICAgICAgIGJlb2YoeyBwYXRoIH0pLnN0cmluZygpO1xuXG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgICAgIHRoaXMubWFpbiA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VydmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5vblNlcnZpY2VMaXN0ZW5lciA9IG5ldyBPblNlcnZpY2VMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm9uU2VydmVyTGlzdGVuZXIgPSBuZXcgT25TZXJ2ZXJMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm9uUm91dGVMaXN0ZW5lciA9IHsgb25Sb3V0ZShyZXEsIHJlcywgbmV4dCkgeyBuZXh0KCk7IH0gfTtcbiAgICAgICAgdGhpcy5vblJvdXRlRXJyb3JMaXN0ZW5lciA9IHtcbiAgICAgICAgICAgIG9uUm91dGVFcnJvcihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2sgPyBlcnIuc3RhY2sgOiBlcnIpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICAgICAgICAgICAgICByZXMuZW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZnJhbWV3b3JrID0gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE9uU2VydmljZUxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPblNlcnZpY2VMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBzZXRPblNlcnZpY2VMaXN0ZW5lcihsaXN0ZW5lcikge1xuXG4gICAgICAgIGJlb2YoeyBsaXN0ZW5lciB9KS5pbnRlcmZhY2UoT25TZXJ2aWNlTGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMub25TZXJ2aWNlTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRPblNlcnZlckxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPblNlcnZlckxpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldE9uU2VydmVyTGlzdGVuZXIobGlzdGVuZXIpIHtcblxuICAgICAgICBiZW9mKHsgbGlzdGVuZXIgfSkuaW50ZXJmYWNlKE9uU2VydmVyTGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMub25TZXJ2ZXJMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE9uUm91dGVMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T25Sb3V0ZUxpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldE9uUm91dGVMaXN0ZW5lcihsaXN0ZW5lcikge1xuXG4gICAgICAgIGJlb2YoeyBsaXN0ZW5lciB9KS5pbnRlcmZhY2UobGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMub25Sb3V0ZUxpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0T25Sb3V0ZUVycm9yTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge09uUm91dGVFcnJvckxpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldE9uUm91dGVFcnJvckxpc3RlbmVyKGxpc3RlbmVyKSB7XG5cbiAgICAgICAgYmVvZih7IGxpc3RlbmVyIH0pLmludGVyZmFjZShPblJvdXRlRXJyb3JMaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5vblJvdXRlRXJyb3JMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHN0YXJ0IHRoZSBzZXJ2ZXIgZm9yIHRoaXMgQXBwbGljYXRpb25cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIHRoaXMuZnJhbWV3b3JrLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHRoaXMub25Sb3V0ZUxpc3RlbmVyLm9uUm91dGUocmVxLCByZXMsIG5leHQpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tYWluLmxvYWQodGhpcy5mcmFtZXdvcmspLlxuICAgICAgICB0aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgTWFuYWdlZFNlcnZlcihcbiAgICAgICAgICAgICAgICBOdW1iZXIodGhpcy5tYWluLmNvbmZpZ3VyYXRpb24ucmVhZCgncG9ydCcsIHByb2Nlc3MuZW52LlBPUlQgfHwgMjQwNykpLFxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQoJ2hvc3QnLCBwcm9jZXNzLmVudi5IT1NUIHx8ICcwLjAuMC4wJyksXG4gICAgICAgICAgICAgICAgdGhpcy5fX2NyZWF0ZVNlcnZlcigpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyLnN0YXJ0KCk7XG5cbiAgICAgICAgfSkuXG4gICAgICAgIHRoZW4oKCkgPT4gdGhpcy5vblNlcnZlckxpc3RlbmVyLm9uU3RhcnRlZCh0aGlzLnNlcnZlciwgdGhpcykpO1xuXG4gICAgfVxufVxuXG5leHBvcnQgeyBPblNlcnZpY2VMaXN0ZW5lciBhcyBPblNlcnZpY2VMaXN0ZW5lciB9O1xuZXhwb3J0IHsgT25TZXJ2ZXJMaXN0ZW5lciBhcyBPblNlcnZlckxpc3RlbmVyIH07XG5leHBvcnQgeyBPblJvdXRlTGlzdGVuZXIgYXMgT25Sb3V0ZUxpc3RlbmVyIH07XG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvbjtcbiJdfQ==