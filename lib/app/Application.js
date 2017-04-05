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

            console.error('powerstone: error occured!');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiT25TZXJ2aWNlTGlzdGVuZXIiLCJPblNlcnZlckxpc3RlbmVyIiwiT25Sb3V0ZUxpc3RlbmVyIiwiT25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJBcHBsaWNhdGlvbiIsInBhdGgiLCJzdHJpbmciLCJwcm9jZXNzIiwib24iLCJoYW5kbGVDcml0aWNhbEVycm9yIiwiZSIsImhhbmRsZXJDcml0aWNhbEVycm9yIiwibWFpbiIsInNlcnZlciIsImNvbnRleHQiLCJvblNlcnZpY2VMaXN0ZW5lciIsIm9uU2VydmVyTGlzdGVuZXIiLCJvblJvdXRlTGlzdGVuZXIiLCJvblJvdXRlIiwicmVxIiwicmVzIiwibmV4dCIsIm9uUm91dGVFcnJvckxpc3RlbmVyIiwib25Sb3V0ZUVycm9yIiwiZXJyIiwiZXJyb3IiLCJmcmFtZXdvcmsiLCJsaXN0ZW5lciIsImludGVyZmFjZSIsImNvbm5lY3QiLCJ1c2UiLCJsb2FkIiwidGhlbiIsIk51bWJlciIsImNvbmZpZ3VyYXRpb24iLCJyZWFkIiwiZW52IiwiUE9SVCIsIkhPU1QiLCJfX2NyZWF0ZVNlcnZlciIsInN0YXJ0Iiwib25TdGFydGVkIiwiY29uc29sZSIsInN0YWNrIiwiZXhpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7SUFLTUEsaUI7Ozs7Ozs7OztBQUVGOzs7Ozs7c0NBTWMsQ0FFYjs7Ozs7O0FBSUw7Ozs7OztJQU1NQyxnQjs7Ozs7Ozs7O0FBRUY7Ozs7b0NBSVksQ0FFWDs7Ozs7O0FBSUw7Ozs7Ozs7SUFLTUMsZTs7Ozs7Ozs7O0FBRUY7Ozs7OztrQ0FNVSxDQUVUOzs7Ozs7QUFJTDs7Ozs7OztJQUtNQyxvQjs7Ozs7Ozs7O0FBRUY7Ozs7Ozs7dUNBT2UsQ0FFZDs7Ozs7O0FBSUw7Ozs7Ozs7OztJQU9NQyxXO0FBRUYseUJBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFBQTs7QUFFZCw0QkFB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QUFkOztBQUtBLHVCQUFPLE9BQUsxQixNQUFMLENBQVkyQixLQUFaLEVBQVA7QUFFSCxhQVZNLEVBV1BSLElBWE8sQ0FXRjtBQUFBLHVCQUFNLE9BQUtoQixnQkFBTCxDQUFzQnlCLFNBQXRCLENBQWdDLE9BQUs1QixNQUFyQyxTQUFOO0FBQUEsYUFYRSxDQUFQO0FBYUg7O0FBRUQ7Ozs7Ozs0Q0FHb0JILEMsRUFBRzs7QUFFbkI7QUFDQTs7QUFFQWdDLG9CQUFRakIsS0FBUixDQUFjLDRCQUFkO0FBQ0FpQixvQkFBUWpCLEtBQVIsQ0FBY2YsRUFBRWlDLEtBQUYsR0FBVWpDLEVBQUVpQyxLQUFaLEdBQW9CakMsQ0FBbEM7QUFDQUgsb0JBQVFxQyxJQUFSLENBQWEsQ0FBQyxDQUFkO0FBRUg7Ozs7OztRQUd5QjVDLGlCLEdBQXJCQSxpQjtRQUNvQkMsZ0IsR0FBcEJBLGdCO1FBQ21CQyxlLEdBQW5CQSxlO2tCQUNNRSxXIiwiZmlsZSI6IkFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJlb2YgZnJvbSAnYmVvZic7XG5pbXBvcnQgTWFuYWdlZFNlcnZlciBmcm9tICcuLi9uZXQvTWFuYWdlZFNlcnZlcic7XG5cbi8qKlxuICogT25TZXJ2aWNlTGlzdGVuZXIgaXMgaW1wbGVtZW50ZWQgdG8gcmVzcG9uZCB0b1xuICogdGhlIHN0YXR1cyBjaGFuZ2Ugb2Ygc2VydmljZXMgY29uZmlndXJlZCBmb3IgdGhlIEFwcGxpY3Rpb24uXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIE9uU2VydmljZUxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uQ29ubmVjdGVkIGlzIGNhbGxlZCB3aGVuIGNvbm5lY3Rpb25zIHRvIGFsbCB0aGUgc2VydmljZXNcbiAgICAgKiBoYXZlIGJlZW4gZXN0YWJsaXNoZWQgYW5kIHRoZSBBcHBsaWNhdGlvbiBpcyByZWFkeSB0b1xuICAgICAqIHByb2NlZWQgdG8gdGhlIG5leHQgcGhhc2Ugb2YgYm9vdCB1cC5cbiAgICAgKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBcbiAgICAgKi9cbiAgICBvbkNvbm5lY3RlZCgpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIE9uU2VydmVyTGlzdGVuZXIgaXMgaW1wbGVtZW50ZWQgdG8gcmVzcG9uZCB0byBjaGFuZ2VzIGluXG4gKiB0aGUgc3RhdHVzIG9mIHRoZSBpbnRlcm5hbCBIVFRQIHNlcnZlci5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuXG5jbGFzcyBPblNlcnZlckxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uU3RhcnRlZCBpcyBjYWxsZWQgd2hlbiB0aGUgaHR0cCBzZXJ2ZXIgaGFzIGJlZW4gc3RhcnRlZC5cbiAgICAgKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBcbiAgICAgKi9cbiAgICBvblN0YXJ0ZWQoKSB7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKiBPblJvdXRlTGlzdGVuZXIgaXMgaW1wbGVtZW50ZWQgdG8gcHJvY2VlZCBhbGwgcm91dGVzIHRoZSBhcHBsaWNhdGlvblxuICogaGFuZGxlcy4gSXQgcHJvY2VlZHMgYWxsIHRoZSBzdWdhciBwd3IgYWRkcyBvbiB0b3Agb2YgdGhlIHVuZGVybHlpbmcgZnJhbWV3b3JrLlxuICogQGludGVyZmFjZVxuICovXG5jbGFzcyBPblJvdXRlTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25Sb3V0ZVxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbmV4dFxuICAgICAqL1xuICAgIG9uUm91dGUoKSB7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKiBPblJvdXRlRXJyb3JMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byBoYW5kbGUgZXJyb3JzXG4gKiB0aGF0IG9jY3VyIGR1cmluZyByb3V0ZSBleGVjdXRpb24uXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIE9uUm91dGVFcnJvckxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uUm91dGVFcnJvciBoYW5kbGVzIHRoZSBlcnJvclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbmV4dFxuICAgICAqL1xuICAgIG9uUm91dGVFcnJvcigpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIEFwcGxpY2F0aW9uIGlzIHRoZSBtYWluIGNsYXNzIG9mIHRoZSBmcmFtZXdvcmsuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBpbnRpYWxpemUgdGhpcyBBcHBsaWNhdGlvbiB0by5cbiAqIEBwcm9wZXJ0eSB7TW9kdWxlfSBtYWluIC0gVGhlIG1haW4gTW9kdWxlIGZvciB0aGlzIEFwcGxpY2F0aW9uLlxuICogQHByb3BlcnR5IHtNYW5hZ2VkU2VydmVyfSBzZXJ2ZXIgLSBUaGUgbWFuYWdlZCBodHRwIHNlcnZlci5cbiAqIEBwcm9wZXJ0eSB7TWFuYWdlZFNlcnZlcnxudWxsfSBzZXJ2ZXIgLSBUaGUgaW50ZXJuYWwgbWFuYWdlZCBzZXJ2ZXIgdGhhdCBzZXJ2ZXMgY2xpZW50cy5cbiAqL1xuY2xhc3MgQXBwbGljYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IocGF0aCkge1xuXG4gICAgICAgIGJlb2YoeyBwYXRoIH0pLnN0cmluZygpO1xuXG4gICAgICAgIC8vQHRvZG8gUmVmYWN0b3IgdGhpcyBpbiB0aGUgZnV0dXJlLlxuICAgICAgICBwcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCBlID0+IHRoaXMuaGFuZGxlQ3JpdGljYWxFcnJvcihlKSk7XG4gICAgICAgIHByb2Nlc3Mub24oJ3VuaGFuZGxlZEV4Y2VwdGlvbicsIGUgPT4gdGhpcy5oYW5kbGVyQ3JpdGljYWxFcnJvcihlKSk7XG5cbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgICAgdGhpcy5tYWluID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLm9uU2VydmljZUxpc3RlbmVyID0gbmV3IE9uU2VydmljZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMub25TZXJ2ZXJMaXN0ZW5lciA9IG5ldyBPblNlcnZlckxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMub25Sb3V0ZUxpc3RlbmVyID0geyBvblJvdXRlKHJlcSwgcmVzLCBuZXh0KSB7IG5leHQoKTsgfSB9O1xuICAgICAgICB0aGlzLm9uUm91dGVFcnJvckxpc3RlbmVyID0ge1xuICAgICAgICAgICAgb25Sb3V0ZUVycm9yKGVyciwgcmVxLCByZXMsIG5leHQpIHtcblxuICAgICAgICAgICAgICAgIHJlcy5lcnJvcihlcnIpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZnJhbWV3b3JrID0gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE9uU2VydmljZUxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPblNlcnZpY2VMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBzZXRPblNlcnZpY2VMaXN0ZW5lcihsaXN0ZW5lcikge1xuXG4gICAgICAgIGJlb2YoeyBsaXN0ZW5lciB9KS5pbnRlcmZhY2UoT25TZXJ2aWNlTGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMub25TZXJ2aWNlTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRPblNlcnZlckxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPblNlcnZlckxpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldE9uU2VydmVyTGlzdGVuZXIobGlzdGVuZXIpIHtcblxuICAgICAgICBiZW9mKHsgbGlzdGVuZXIgfSkuaW50ZXJmYWNlKE9uU2VydmVyTGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMub25TZXJ2ZXJMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE9uUm91dGVMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T25Sb3V0ZUxpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldE9uUm91dGVMaXN0ZW5lcihsaXN0ZW5lcikge1xuXG4gICAgICAgIGJlb2YoeyBsaXN0ZW5lciB9KS5pbnRlcmZhY2UobGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMub25Sb3V0ZUxpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0T25Sb3V0ZUVycm9yTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge09uUm91dGVFcnJvckxpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldE9uUm91dGVFcnJvckxpc3RlbmVyKGxpc3RlbmVyKSB7XG5cbiAgICAgICAgYmVvZih7IGxpc3RlbmVyIH0pLmludGVyZmFjZShPblJvdXRlRXJyb3JMaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5vblJvdXRlRXJyb3JMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbm5lY3QgdGhlIGFwcGxpY2F0aW9uIHRvIGl0J3MgZGF0YWJhc2VzIGFuZCBvdGhlciBzZXJ2aWNlc1xuICAgICAqIGJ1dCBkbyBub3Qgc2V0dXAgcm91dGluZyBhbmQgdGhlIGh0dHAgc2VydmVyLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGNvbm5lY3QoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbi5jb25uZWN0KCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdGFydCB0aGUgc2VydmVyIGZvciB0aGlzIEFwcGxpY2F0aW9uXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBzdGFydCgpIHtcblxuICAgICAgICB0aGlzLmZyYW1ld29yay51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB0aGlzLm9uUm91dGVMaXN0ZW5lci5vblJvdXRlKHJlcSwgcmVzLCBuZXh0KSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbi5sb2FkKHRoaXMuZnJhbWV3b3JrKS5cbiAgICAgICAgdGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuc2VydmVyID0gbmV3IE1hbmFnZWRTZXJ2ZXIoXG4gICAgICAgICAgICAgICAgTnVtYmVyKHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQoJ3BvcnQnLCBwcm9jZXNzLmVudi5QT1JUIHx8IDI0MDcpKSxcbiAgICAgICAgICAgICAgICB0aGlzLm1haW4uY29uZmlndXJhdGlvbi5yZWFkKCdob3N0JywgcHJvY2Vzcy5lbnYuSE9TVCB8fCAnMC4wLjAuMCcpLFxuICAgICAgICAgICAgICAgIHRoaXMuX19jcmVhdGVTZXJ2ZXIoKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZlci5zdGFydCgpO1xuXG4gICAgICAgIH0pLlxuICAgICAgICB0aGVuKCgpID0+IHRoaXMub25TZXJ2ZXJMaXN0ZW5lci5vblN0YXJ0ZWQodGhpcy5zZXJ2ZXIsIHRoaXMpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGhhbmRsZUNyaXRpY2FsRXJyb3JcbiAgICAgKi9cbiAgICBoYW5kbGVDcml0aWNhbEVycm9yKGUpIHtcblxuICAgICAgICAvL0B0b2RvIHJlZmFjdG9yIDogbm90ZSB0aGUgaWRlYSBoZXJlIHdhcyB0byBtYWtlIHJvb20gZm9yIHNodXR0aW5nIGRvd25cbiAgICAgICAgLy9jb25uZWN0aW9ucyBiZWZvcmUgdGVybWluYXRpbmcgZXRjLlxuXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Bvd2Vyc3RvbmU6IGVycm9yIG9jY3VyZWQhJyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZS5zdGFjayA/IGUuc3RhY2sgOiBlKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KC0xKTtcblxuICAgIH1cbn1cblxuZXhwb3J0IHsgT25TZXJ2aWNlTGlzdGVuZXIgYXMgT25TZXJ2aWNlTGlzdGVuZXIgfTtcbmV4cG9ydCB7IE9uU2VydmVyTGlzdGVuZXIgYXMgT25TZXJ2ZXJMaXN0ZW5lciB9O1xuZXhwb3J0IHsgT25Sb3V0ZUxpc3RlbmVyIGFzIE9uUm91dGVMaXN0ZW5lciB9O1xuZXhwb3J0IGRlZmF1bHQgQXBwbGljYXRpb247XG4iXX0=