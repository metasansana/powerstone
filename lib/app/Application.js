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
        var _this = this;

        _classCallCheck(this, Application);

        (0, _beof2.default)({ path: path }).string();

        //@todo Refactor this in the future.
        process.on('unhandledRejection', function (e) {
            return _this.handleCriticalError(e);
        });
        process.on('unhandledException', function (e) {
            return _this.handlerCriticalError(e);
        });

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

                res.error(err);
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
         * connect the application to it's databases and other services
         * but do not setup routing and the http server.
         * @returns {Promise}
         */

    }, {
        key: 'connect',
        value: function connect() {

            return this.main.connect();
        }

        /**
         * start the server for this Application
         * @return {Promise}
         */

    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            this.framework.use(function (req, res, next) {
                return _this2.onRouteListener.onRoute(req, res, next);
            });

            return this.main.load(this.framework).then(function () {

                _this2.server = new _ManagedServer2.default(Number(_this2.main.configuration.read('port', process.env.PORT || 2407)), _this2.main.configuration.read('host', process.env.HOST || '0.0.0.0'), _this2.__createServer());

                return _this2.server.start();
            }).then(function () {
                return _this2.onServerListener.onStarted(_this2.server, _this2);
            });
        }

        /**
         * handleCriticalError
         */

    }, {
        key: 'handleCriticalError',
        value: function handleCriticalError(e) {

            //@todo refactor : note the idea here was to make room for shutting down
            //connections before terminating etc.

            console.error(e.stack ? e.stack : e);
            process.exit(-1);
        }
    }]);

    return Application;
}();

exports.OnServiceListener = OnServiceListener;
exports.OnServerListener = OnServerListener;
exports.OnRouteListener = OnRouteListener;
exports.default = Application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiT25TZXJ2aWNlTGlzdGVuZXIiLCJPblNlcnZlckxpc3RlbmVyIiwiT25Sb3V0ZUxpc3RlbmVyIiwiT25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJBcHBsaWNhdGlvbiIsInBhdGgiLCJzdHJpbmciLCJwcm9jZXNzIiwib24iLCJoYW5kbGVDcml0aWNhbEVycm9yIiwiZSIsImhhbmRsZXJDcml0aWNhbEVycm9yIiwibWFpbiIsInNlcnZlciIsImNvbnRleHQiLCJvblNlcnZpY2VMaXN0ZW5lciIsIm9uU2VydmVyTGlzdGVuZXIiLCJvblJvdXRlTGlzdGVuZXIiLCJvblJvdXRlIiwicmVxIiwicmVzIiwibmV4dCIsIm9uUm91dGVFcnJvckxpc3RlbmVyIiwib25Sb3V0ZUVycm9yIiwiZXJyIiwiZXJyb3IiLCJmcmFtZXdvcmsiLCJsaXN0ZW5lciIsImludGVyZmFjZSIsImNvbm5lY3QiLCJ1c2UiLCJsb2FkIiwidGhlbiIsIk51bWJlciIsImNvbmZpZ3VyYXRpb24iLCJyZWFkIiwiZW52IiwiUE9SVCIsIkhPU1QiLCJfX2NyZWF0ZVNlcnZlciIsInN0YXJ0Iiwib25TdGFydGVkIiwiY29uc29sZSIsInN0YWNrIiwiZXhpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7SUFLTUEsaUI7Ozs7Ozs7OztBQUVGOzs7Ozs7c0NBTWMsQ0FFYjs7Ozs7O0FBSUw7Ozs7OztJQU1NQyxnQjs7Ozs7Ozs7O0FBRUY7Ozs7b0NBSVksQ0FFWDs7Ozs7O0FBSUw7Ozs7Ozs7SUFLTUMsZTs7Ozs7Ozs7O0FBRUY7Ozs7OztrQ0FNVSxDQUVUOzs7Ozs7QUFJTDs7Ozs7OztJQUtNQyxvQjs7Ozs7Ozs7O0FBRUY7Ozs7Ozs7dUNBT2UsQ0FFZDs7Ozs7O0FBSUw7Ozs7Ozs7OztJQU9NQyxXO0FBRUYseUJBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFBQTs7QUFFZCw0QkFB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QUFkOztBQUtBLHVCQUFPLE9BQUsxQixNQUFMLENBQVkyQixLQUFaLEVBQVA7QUFFSCxhQVZNLEVBV1BSLElBWE8sQ0FXRjtBQUFBLHVCQUFNLE9BQUtoQixnQkFBTCxDQUFzQnlCLFNBQXRCLENBQWdDLE9BQUs1QixNQUFyQyxTQUFOO0FBQUEsYUFYRSxDQUFQO0FBYUg7O0FBRUQ7Ozs7Ozs0Q0FHb0JILEMsRUFBRzs7QUFFbkI7QUFDQTs7QUFFQWdDLG9CQUFRakIsS0FBUixDQUFjZixFQUFFaUMsS0FBRixHQUFVakMsRUFBRWlDLEtBQVosR0FBb0JqQyxDQUFsQztBQUNBSCxvQkFBUXFDLElBQVIsQ0FBYSxDQUFDLENBQWQ7QUFFSDs7Ozs7O1FBR3lCNUMsaUIsR0FBckJBLGlCO1FBQ29CQyxnQixHQUFwQkEsZ0I7UUFDbUJDLGUsR0FBbkJBLGU7a0JBQ01FLFciLCJmaWxlIjoiQXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCBNYW5hZ2VkU2VydmVyIGZyb20gJy4uL25ldC9NYW5hZ2VkU2VydmVyJztcblxuLyoqXG4gKiBPblNlcnZpY2VMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byByZXNwb25kIHRvXG4gKiB0aGUgc3RhdHVzIGNoYW5nZSBvZiBzZXJ2aWNlcyBjb25maWd1cmVkIGZvciB0aGUgQXBwbGljdGlvbi5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgT25TZXJ2aWNlTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25Db25uZWN0ZWQgaXMgY2FsbGVkIHdoZW4gY29ubmVjdGlvbnMgdG8gYWxsIHRoZSBzZXJ2aWNlc1xuICAgICAqIGhhdmUgYmVlbiBlc3RhYmxpc2hlZCBhbmQgdGhlIEFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvXG4gICAgICogcHJvY2VlZCB0byB0aGUgbmV4dCBwaGFzZSBvZiBib290IHVwLlxuICAgICAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcFxuICAgICAqL1xuICAgIG9uQ29ubmVjdGVkKCkge1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogT25TZXJ2ZXJMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byByZXNwb25kIHRvIGNoYW5nZXMgaW5cbiAqIHRoZSBzdGF0dXMgb2YgdGhlIGludGVybmFsIEhUVFAgc2VydmVyLlxuICogQGludGVyZmFjZVxuICovXG5cbmNsYXNzIE9uU2VydmVyTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25TdGFydGVkIGlzIGNhbGxlZCB3aGVuIHRoZSBodHRwIHNlcnZlciBoYXMgYmVlbiBzdGFydGVkLlxuICAgICAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcFxuICAgICAqL1xuICAgIG9uU3RhcnRlZCgpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIE9uUm91dGVMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byBwcm9jZWVkIGFsbCByb3V0ZXMgdGhlIGFwcGxpY2F0aW9uXG4gKiBoYW5kbGVzLiBJdCBwcm9jZWVkcyBhbGwgdGhlIHN1Z2FyIHB3ciBhZGRzIG9uIHRvcCBvZiB0aGUgdW5kZXJseWluZyBmcmFtZXdvcmsuXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIE9uUm91dGVMaXN0ZW5lciB7XG5cbiAgICAvKipcbiAgICAgKiBvblJvdXRlXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSByZXFcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZXh0XG4gICAgICovXG4gICAgb25Sb3V0ZSgpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIE9uUm91dGVFcnJvckxpc3RlbmVyIGlzIGltcGxlbWVudGVkIHRvIGhhbmRsZSBlcnJvcnNcbiAqIHRoYXQgb2NjdXIgZHVyaW5nIHJvdXRlIGV4ZWN1dGlvbi5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgT25Sb3V0ZUVycm9yTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25Sb3V0ZUVycm9yIGhhbmRsZXMgdGhlIGVycm9yXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSByZXFcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZXh0XG4gICAgICovXG4gICAgb25Sb3V0ZUVycm9yKCkge1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogQXBwbGljYXRpb24gaXMgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIGZyYW1ld29yay5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGludGlhbGl6ZSB0aGlzIEFwcGxpY2F0aW9uIHRvLlxuICogQHByb3BlcnR5IHtNb2R1bGV9IG1haW4gLSBUaGUgbWFpbiBNb2R1bGUgZm9yIHRoaXMgQXBwbGljYXRpb24uXG4gKiBAcHJvcGVydHkge01hbmFnZWRTZXJ2ZXJ9IHNlcnZlciAtIFRoZSBtYW5hZ2VkIGh0dHAgc2VydmVyLlxuICogQHByb3BlcnR5IHtNYW5hZ2VkU2VydmVyfG51bGx9IHNlcnZlciAtIFRoZSBpbnRlcm5hbCBtYW5hZ2VkIHNlcnZlciB0aGF0IHNlcnZlcyBjbGllbnRzLlxuICovXG5jbGFzcyBBcHBsaWNhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXRoKSB7XG5cbiAgICAgICAgYmVvZih7IHBhdGggfSkuc3RyaW5nKCk7XG5cbiAgICAgICAgLy9AdG9kbyBSZWZhY3RvciB0aGlzIGluIHRoZSBmdXR1cmUuXG4gICAgICAgIHByb2Nlc3Mub24oJ3VuaGFuZGxlZFJlamVjdGlvbicsIGUgPT4gdGhpcy5oYW5kbGVDcml0aWNhbEVycm9yKGUpKTtcbiAgICAgICAgcHJvY2Vzcy5vbigndW5oYW5kbGVkRXhjZXB0aW9uJywgZSA9PiB0aGlzLmhhbmRsZXJDcml0aWNhbEVycm9yKGUpKTtcblxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgICB0aGlzLm1haW4gPSBudWxsO1xuICAgICAgICB0aGlzLnNlcnZlciA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMub25TZXJ2aWNlTGlzdGVuZXIgPSBuZXcgT25TZXJ2aWNlTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5vblNlcnZlckxpc3RlbmVyID0gbmV3IE9uU2VydmVyTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5vblJvdXRlTGlzdGVuZXIgPSB7IG9uUm91dGUocmVxLCByZXMsIG5leHQpIHsgbmV4dCgpOyB9IH07XG4gICAgICAgIHRoaXMub25Sb3V0ZUVycm9yTGlzdGVuZXIgPSB7XG4gICAgICAgICAgICBvblJvdXRlRXJyb3IoZXJyLCByZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgICAgICAgICAgcmVzLmVycm9yKGVycik7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mcmFtZXdvcmsgPSBudWxsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0T25TZXJ2aWNlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge09uU2VydmljZUxpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldE9uU2VydmljZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG5cbiAgICAgICAgYmVvZih7IGxpc3RlbmVyIH0pLmludGVyZmFjZShPblNlcnZpY2VMaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5vblNlcnZpY2VMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE9uU2VydmVyTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge09uU2VydmVyTGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0T25TZXJ2ZXJMaXN0ZW5lcihsaXN0ZW5lcikge1xuXG4gICAgICAgIGJlb2YoeyBsaXN0ZW5lciB9KS5pbnRlcmZhY2UoT25TZXJ2ZXJMaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5vblNlcnZlckxpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0T25Sb3V0ZUxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPblJvdXRlTGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0T25Sb3V0ZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG5cbiAgICAgICAgYmVvZih7IGxpc3RlbmVyIH0pLmludGVyZmFjZShsaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5vblJvdXRlTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRPblJvdXRlRXJyb3JMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T25Sb3V0ZUVycm9yTGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0T25Sb3V0ZUVycm9yTGlzdGVuZXIobGlzdGVuZXIpIHtcblxuICAgICAgICBiZW9mKHsgbGlzdGVuZXIgfSkuaW50ZXJmYWNlKE9uUm91dGVFcnJvckxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLm9uUm91dGVFcnJvckxpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29ubmVjdCB0aGUgYXBwbGljYXRpb24gdG8gaXQncyBkYXRhYmFzZXMgYW5kIG90aGVyIHNlcnZpY2VzXG4gICAgICogYnV0IGRvIG5vdCBzZXR1cCByb3V0aW5nIGFuZCB0aGUgaHR0cCBzZXJ2ZXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgY29ubmVjdCgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5tYWluLmNvbm5lY3QoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHN0YXJ0IHRoZSBzZXJ2ZXIgZm9yIHRoaXMgQXBwbGljYXRpb25cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIHRoaXMuZnJhbWV3b3JrLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHRoaXMub25Sb3V0ZUxpc3RlbmVyLm9uUm91dGUocmVxLCByZXMsIG5leHQpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tYWluLmxvYWQodGhpcy5mcmFtZXdvcmspLlxuICAgICAgICB0aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgTWFuYWdlZFNlcnZlcihcbiAgICAgICAgICAgICAgICBOdW1iZXIodGhpcy5tYWluLmNvbmZpZ3VyYXRpb24ucmVhZCgncG9ydCcsIHByb2Nlc3MuZW52LlBPUlQgfHwgMjQwNykpLFxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQoJ2hvc3QnLCBwcm9jZXNzLmVudi5IT1NUIHx8ICcwLjAuMC4wJyksXG4gICAgICAgICAgICAgICAgdGhpcy5fX2NyZWF0ZVNlcnZlcigpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyLnN0YXJ0KCk7XG5cbiAgICAgICAgfSkuXG4gICAgICAgIHRoZW4oKCkgPT4gdGhpcy5vblNlcnZlckxpc3RlbmVyLm9uU3RhcnRlZCh0aGlzLnNlcnZlciwgdGhpcykpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlQ3JpdGljYWxFcnJvclxuICAgICAqL1xuICAgIGhhbmRsZUNyaXRpY2FsRXJyb3IoZSkge1xuXG4gICAgICAgIC8vQHRvZG8gcmVmYWN0b3IgOiBub3RlIHRoZSBpZGVhIGhlcmUgd2FzIHRvIG1ha2Ugcm9vbSBmb3Igc2h1dHRpbmcgZG93blxuICAgICAgICAvL2Nvbm5lY3Rpb25zIGJlZm9yZSB0ZXJtaW5hdGluZyBldGMuXG5cbiAgICAgICAgY29uc29sZS5lcnJvcihlLnN0YWNrID8gZS5zdGFjayA6IGUpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoLTEpO1xuXG4gICAgfVxufVxuXG5leHBvcnQgeyBPblNlcnZpY2VMaXN0ZW5lciBhcyBPblNlcnZpY2VMaXN0ZW5lciB9O1xuZXhwb3J0IHsgT25TZXJ2ZXJMaXN0ZW5lciBhcyBPblNlcnZlckxpc3RlbmVyIH07XG5leHBvcnQgeyBPblJvdXRlTGlzdGVuZXIgYXMgT25Sb3V0ZUxpc3RlbmVyIH07XG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvbjtcbiJdfQ==