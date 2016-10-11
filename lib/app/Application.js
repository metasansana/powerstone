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

var _Pool = require('../net/Pool');

var _Pool2 = _interopRequireDefault(_Pool);

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
        key: 'onError',


        /**
         * onError handles the error
         * @param {Error} err
         * @param {Request} req
         * @param {Response} res
         * @param {function} next
         */
        value: function onError() {}
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
        this.connections = _Pool2.default;
        this.onServiceListener = new OnServiceListener();
        this.onServerListener = new OnServerListener();
        this.onRouteListener = {
            onRoute: function onRoute(req, res, next) {
                next();
            }
        };
        this.onRouteErrorListener = {
            onError: function onError(err, req, res, next) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiT25TZXJ2aWNlTGlzdGVuZXIiLCJPblNlcnZlckxpc3RlbmVyIiwiT25Sb3V0ZUxpc3RlbmVyIiwiT25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJBcHBsaWNhdGlvbiIsInBhdGgiLCJfX2Rpcm5hbWUiLCJtYWluIiwic2VydmVyIiwiY29udGV4dCIsImNvbm5lY3Rpb25zIiwib25TZXJ2aWNlTGlzdGVuZXIiLCJvblNlcnZlckxpc3RlbmVyIiwib25Sb3V0ZUxpc3RlbmVyIiwib25Sb3V0ZSIsInJlcSIsInJlcyIsIm5leHQiLCJvblJvdXRlRXJyb3JMaXN0ZW5lciIsIm9uRXJyb3IiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGFjayIsInN0YXR1cyIsImVuZCIsImZyYW1ld29yayIsImxpc3RlbmVyIiwiaW50ZXJmYWNlIiwidXNlIiwibG9hZCIsInRoZW4iLCJjb25maWd1cmF0aW9uIiwicmVhZCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwiSE9TVCIsIl9fY3JlYXRlU2VydmVyIiwic3RhcnQiLCJvblN0YXJ0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7SUFLTUEsaUI7Ozs7Ozs7OztBQUVGOzs7Ozs7c0NBTWMsQ0FFYjs7Ozs7O0FBSUw7Ozs7OztJQU1NQyxnQjs7Ozs7Ozs7O0FBRUY7Ozs7b0NBSVksQ0FFWDs7Ozs7O0FBSUw7Ozs7Ozs7SUFLTUMsZTs7Ozs7Ozs7O0FBRUY7Ozs7OztrQ0FNVSxDQUVUOzs7Ozs7QUFJTDs7Ozs7OztJQUtNQyxvQjs7Ozs7Ozs7O0FBRUY7Ozs7Ozs7a0NBT1UsQ0FFVDs7Ozs7O0FBSUw7Ozs7Ozs7OztJQU9NQyxXO0FBRUYsMkJBQThCO0FBQUEsWUFBbEJDLElBQWtCLHVFQUFYQyxTQUFXOztBQUFBOztBQUUxQixhQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFLRSxJ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IkFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJlb2YgZnJvbSAnYmVvZic7XG5pbXBvcnQgTWFuYWdlZFNlcnZlciBmcm9tICcuLi9uZXQvTWFuYWdlZFNlcnZlcic7XG5pbXBvcnQgUG9vbCBmcm9tICcuLi9uZXQvUG9vbCc7XG5cbi8qKlxuICogT25TZXJ2aWNlTGlzdGVuZXIgaXMgaW1wbGVtZW50ZWQgdG8gcmVzcG9uZCB0b1xuICogdGhlIHN0YXR1cyBjaGFuZ2Ugb2Ygc2VydmljZXMgY29uZmlndXJlZCBmb3IgdGhlIEFwcGxpY3Rpb24uXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIE9uU2VydmljZUxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uQ29ubmVjdGVkIGlzIGNhbGxlZCB3aGVuIGNvbm5lY3Rpb25zIHRvIGFsbCB0aGUgc2VydmljZXNcbiAgICAgKiBoYXZlIGJlZW4gZXN0YWJsaXNoZWQgYW5kIHRoZSBBcHBsaWNhdGlvbiBpcyByZWFkeSB0b1xuICAgICAqIHByb2NlZWQgdG8gdGhlIG5leHQgcGhhc2Ugb2YgYm9vdCB1cC5cbiAgICAgKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBcbiAgICAgKi9cbiAgICBvbkNvbm5lY3RlZCgpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIE9uU2VydmVyTGlzdGVuZXIgaXMgaW1wbGVtZW50ZWQgdG8gcmVzcG9uZCB0byBjaGFuZ2VzIGluXG4gKiB0aGUgc3RhdHVzIG9mIHRoZSBpbnRlcm5hbCBIVFRQIHNlcnZlci5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuXG5jbGFzcyBPblNlcnZlckxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uU3RhcnRlZCBpcyBjYWxsZWQgd2hlbiB0aGUgaHR0cCBzZXJ2ZXIgaGFzIGJlZW4gc3RhcnRlZC5cbiAgICAgKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBcbiAgICAgKi9cbiAgICBvblN0YXJ0ZWQoKSB7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKiBPblJvdXRlTGlzdGVuZXIgaXMgaW1wbGVtZW50ZWQgdG8gcHJvY2VlZCBhbGwgcm91dGVzIHRoZSBhcHBsaWNhdGlvblxuICogaGFuZGxlcy4gSXQgcHJvY2VlZHMgYWxsIHRoZSBzdWdhciBwd3IgYWRkcyBvbiB0b3Agb2YgdGhlIHVuZGVybHlpbmcgZnJhbWV3b3JrLlxuICogQGludGVyZmFjZVxuICovXG5jbGFzcyBPblJvdXRlTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25Sb3V0ZVxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbmV4dFxuICAgICAqL1xuICAgIG9uUm91dGUoKSB7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKiBPblJvdXRlRXJyb3JMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byBoYW5kbGUgZXJyb3JzXG4gKiB0aGF0IG9jY3VyIGR1cmluZyByb3V0ZSBleGVjdXRpb24uXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIE9uUm91dGVFcnJvckxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uRXJyb3IgaGFuZGxlcyB0aGUgZXJyb3JcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3R9IHJlcVxuICAgICAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG5leHRcbiAgICAgKi9cbiAgICBvbkVycm9yKCkge1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogQXBwbGljYXRpb24gaXMgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIGZyYW1ld29yay5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGludGlhbGl6ZSB0aGlzIEFwcGxpY2F0aW9uIHRvLlxuICogQHByb3BlcnR5IHtNb2R1bGV9IG1haW4gLSBUaGUgbWFpbiBNb2R1bGUgZm9yIHRoaXMgQXBwbGljYXRpb24uXG4gKiBAcHJvcGVydHkge01hbmFnZWRTZXJ2ZXJ9IHNlcnZlciAtIFRoZSBtYW5hZ2VkIGh0dHAgc2VydmVyLlxuICogQHByb3BlcnR5IHtNYW5hZ2VkU2VydmVyfG51bGx9IHNlcnZlciAtIFRoZSBpbnRlcm5hbCBtYW5hZ2VkIHNlcnZlciB0aGF0IHNlcnZlcyBjbGllbnRzLlxuICovXG5jbGFzcyBBcHBsaWNhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXRoID0gX19kaXJuYW1lKSB7XG5cbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgICAgdGhpcy5tYWluID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zID0gUG9vbDtcbiAgICAgICAgdGhpcy5vblNlcnZpY2VMaXN0ZW5lciA9IG5ldyBPblNlcnZpY2VMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm9uU2VydmVyTGlzdGVuZXIgPSBuZXcgT25TZXJ2ZXJMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm9uUm91dGVMaXN0ZW5lciA9IHsgb25Sb3V0ZShyZXEsIHJlcywgbmV4dCkgeyBuZXh0KCk7IH0gfTtcbiAgICAgICAgdGhpcy5vblJvdXRlRXJyb3JMaXN0ZW5lciA9IHtcbiAgICAgICAgICAgIG9uRXJyb3IoZXJyLCByZXEsIHJlcywgbmV4dCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrID8gZXJyLnN0YWNrIDogZXJyKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCk7XG4gICAgICAgICAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZyYW1ld29yayA9IG51bGw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRPblNlcnZpY2VMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T25TZXJ2aWNlTGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0T25TZXJ2aWNlTGlzdGVuZXIobGlzdGVuZXIpIHtcblxuICAgICAgICBiZW9mKHsgbGlzdGVuZXIgfSkuaW50ZXJmYWNlKGxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLm9uU2VydmljZUxpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0T25TZXJ2ZXJMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T25TZXJ2ZXJMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBzZXRPblNlcnZlckxpc3RlbmVyKGxpc3RlbmVyKSB7XG5cbiAgICAgICAgYmVvZih7IGxpc3RlbmVyIH0pLmludGVyZmFjZShPblNlcnZlckxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLm9uU2VydmVyTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRPblJvdXRlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge09uUm91dGVMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBzZXRPblJvdXRlTGlzdGVuZXIobGlzdGVuZXIpIHtcblxuICAgICAgICBiZW9mKHsgbGlzdGVuZXIgfSkuaW50ZXJmYWNlKGxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLm9uUm91dGVMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE9uUm91dGVFcnJvckxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPblJvdXRlRXJyb3JMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBzZXRPblJvdXRlRXJyb3JMaXN0ZW5lcihsaXN0ZW5lcikge1xuXG4gICAgICAgIGJlb2YoeyBsaXN0ZW5lciB9KS5pbnRlcmZhY2UoT25Sb3V0ZUVycm9yTGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMub25Sb3V0ZUVycm9yTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdGFydCB0aGUgc2VydmVyIGZvciB0aGlzIEFwcGxpY2F0aW9uXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBzdGFydCgpIHtcblxuICAgICAgICB0aGlzLmZyYW1ld29yay51c2UoKHJlcSwgcmVzLCBuZXh0KT0+dGhpcy5vblJvdXRlTGlzdGVuZXIub25Sb3V0ZShyZXEsIHJlcywgbmV4dCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1haW4ubG9hZCh0aGlzLmZyYW1ld29yaykuXG4gICAgICAgIHRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBNYW5hZ2VkU2VydmVyKFxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQoJ3BvcnQnLCBwcm9jZXNzLmVudi5QT1JUIHx8IDI0MDcpLFxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQoJ2hvc3QnLCBwcm9jZXNzLmVudi5IT1NUIHx8ICcwLjAuMC4wJyksXG4gICAgICAgICAgICAgICAgdGhpcy5fX2NyZWF0ZVNlcnZlcigpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyLnN0YXJ0KCk7XG5cbiAgICAgICAgfSkuXG4gICAgICAgIHRoZW4oKCkgPT4gdGhpcy5vblNlcnZlckxpc3RlbmVyLm9uU3RhcnRlZCh0aGlzLnNlcnZlciwgdGhpcykpO1xuXG4gICAgfVxufVxuXG5leHBvcnQgeyBPblNlcnZpY2VMaXN0ZW5lciBhcyBPblNlcnZpY2VMaXN0ZW5lciB9O1xuZXhwb3J0IHsgT25TZXJ2ZXJMaXN0ZW5lciBhcyBPblNlcnZlckxpc3RlbmVyIH07XG5leHBvcnQgeyBPblJvdXRlTGlzdGVuZXIgYXMgT25Sb3V0ZUxpc3RlbmVyIH07XG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvbjtcbiJdfQ==