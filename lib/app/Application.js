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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiT25TZXJ2aWNlTGlzdGVuZXIiLCJPblNlcnZlckxpc3RlbmVyIiwiT25Sb3V0ZUxpc3RlbmVyIiwiT25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJBcHBsaWNhdGlvbiIsInBhdGgiLCJzdHJpbmciLCJwcm9jZXNzIiwib24iLCJoYW5kbGVDcml0aWNhbEVycm9yIiwiZSIsImhhbmRsZXJDcml0aWNhbEVycm9yIiwibWFpbiIsInNlcnZlciIsImNvbnRleHQiLCJvblNlcnZpY2VMaXN0ZW5lciIsIm9uU2VydmVyTGlzdGVuZXIiLCJvblJvdXRlTGlzdGVuZXIiLCJvblJvdXRlIiwicmVxIiwicmVzIiwibmV4dCIsIm9uUm91dGVFcnJvckxpc3RlbmVyIiwib25Sb3V0ZUVycm9yIiwiZXJyIiwiZXJyb3IiLCJmcmFtZXdvcmsiLCJsaXN0ZW5lciIsImludGVyZmFjZSIsInVzZSIsImxvYWQiLCJ0aGVuIiwiTnVtYmVyIiwiY29uZmlndXJhdGlvbiIsInJlYWQiLCJlbnYiLCJQT1JUIiwiSE9TVCIsIl9fY3JlYXRlU2VydmVyIiwic3RhcnQiLCJvblN0YXJ0ZWQiLCJjb25zb2xlIiwic3RhY2siLCJleGl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7OztJQUtNQSxpQjs7Ozs7Ozs7O0FBRUY7Ozs7OztzQ0FNYyxDQUViOzs7Ozs7QUFJTDs7Ozs7O0lBTU1DLGdCOzs7Ozs7Ozs7QUFFRjs7OztvQ0FJWSxDQUVYOzs7Ozs7QUFJTDs7Ozs7OztJQUtNQyxlOzs7Ozs7Ozs7QUFFRjs7Ozs7O2tDQU1VLENBRVQ7Ozs7OztBQUlMOzs7Ozs7O0lBS01DLG9COzs7Ozs7Ozs7QUFFRjs7Ozs7Ozt1Q0FPZSxDQUVkOzs7Ozs7QUFJTDs7Ozs7Ozs7O0lBT01DLFc7QUFFRix5QkFBWUMsSUFBWixFQUFrQjtBQUFBOztBQUFBOztBQUVkLDRCQUFLLEVBQUVBLFVB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QSx1QkFBTSxPQUFLZixnQkFBTCxDQUFzQndCLFNBQXRCLENBQWdDLE9BQUszQixNQUFyQyxTQUFOO0FBQUEsYUFYRSxDQUFQO0FBYUg7O0FBRUQ7Ozs7Ozs0Q0FHb0JILEMsRUFBRzs7QUFFbkI7QUFDQTs7QUFFQStCLG9CQUFRaEIsS0FBUixDQUFjZixFQUFFZ0MsS0FBRixHQUFVaEMsRUFBRWdDLEtBQVosR0FBb0JoQyxDQUFsQztBQUNBSCxvQkFBUW9DLElBQVIsQ0FBYSxDQUFDLENBQWQ7QUFFSDs7Ozs7O1FBR3lCM0MsaUIsR0FBckJBLGlCO1FBQ29CQyxnQixHQUFwQkEsZ0I7UUFDbUJDLGUsR0FBbkJBLGU7a0JBQ01FLFciLCJmaWxlIjoiQXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmVvZiBmcm9tICdiZW9mJztcbmltcG9ydCBNYW5hZ2VkU2VydmVyIGZyb20gJy4uL25ldC9NYW5hZ2VkU2VydmVyJztcblxuLyoqXG4gKiBPblNlcnZpY2VMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byByZXNwb25kIHRvXG4gKiB0aGUgc3RhdHVzIGNoYW5nZSBvZiBzZXJ2aWNlcyBjb25maWd1cmVkIGZvciB0aGUgQXBwbGljdGlvbi5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgT25TZXJ2aWNlTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25Db25uZWN0ZWQgaXMgY2FsbGVkIHdoZW4gY29ubmVjdGlvbnMgdG8gYWxsIHRoZSBzZXJ2aWNlc1xuICAgICAqIGhhdmUgYmVlbiBlc3RhYmxpc2hlZCBhbmQgdGhlIEFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvXG4gICAgICogcHJvY2VlZCB0byB0aGUgbmV4dCBwaGFzZSBvZiBib290IHVwLlxuICAgICAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcFxuICAgICAqL1xuICAgIG9uQ29ubmVjdGVkKCkge1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogT25TZXJ2ZXJMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byByZXNwb25kIHRvIGNoYW5nZXMgaW5cbiAqIHRoZSBzdGF0dXMgb2YgdGhlIGludGVybmFsIEhUVFAgc2VydmVyLlxuICogQGludGVyZmFjZVxuICovXG5cbmNsYXNzIE9uU2VydmVyTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25TdGFydGVkIGlzIGNhbGxlZCB3aGVuIHRoZSBodHRwIHNlcnZlciBoYXMgYmVlbiBzdGFydGVkLlxuICAgICAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcFxuICAgICAqL1xuICAgIG9uU3RhcnRlZCgpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIE9uUm91dGVMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byBwcm9jZWVkIGFsbCByb3V0ZXMgdGhlIGFwcGxpY2F0aW9uXG4gKiBoYW5kbGVzLiBJdCBwcm9jZWVkcyBhbGwgdGhlIHN1Z2FyIHB3ciBhZGRzIG9uIHRvcCBvZiB0aGUgdW5kZXJseWluZyBmcmFtZXdvcmsuXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIE9uUm91dGVMaXN0ZW5lciB7XG5cbiAgICAvKipcbiAgICAgKiBvblJvdXRlXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSByZXFcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZXh0XG4gICAgICovXG4gICAgb25Sb3V0ZSgpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIE9uUm91dGVFcnJvckxpc3RlbmVyIGlzIGltcGxlbWVudGVkIHRvIGhhbmRsZSBlcnJvcnNcbiAqIHRoYXQgb2NjdXIgZHVyaW5nIHJvdXRlIGV4ZWN1dGlvbi5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgT25Sb3V0ZUVycm9yTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25Sb3V0ZUVycm9yIGhhbmRsZXMgdGhlIGVycm9yXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSByZXFcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZXh0XG4gICAgICovXG4gICAgb25Sb3V0ZUVycm9yKCkge1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogQXBwbGljYXRpb24gaXMgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIGZyYW1ld29yay5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGludGlhbGl6ZSB0aGlzIEFwcGxpY2F0aW9uIHRvLlxuICogQHByb3BlcnR5IHtNb2R1bGV9IG1haW4gLSBUaGUgbWFpbiBNb2R1bGUgZm9yIHRoaXMgQXBwbGljYXRpb24uXG4gKiBAcHJvcGVydHkge01hbmFnZWRTZXJ2ZXJ9IHNlcnZlciAtIFRoZSBtYW5hZ2VkIGh0dHAgc2VydmVyLlxuICogQHByb3BlcnR5IHtNYW5hZ2VkU2VydmVyfG51bGx9IHNlcnZlciAtIFRoZSBpbnRlcm5hbCBtYW5hZ2VkIHNlcnZlciB0aGF0IHNlcnZlcyBjbGllbnRzLlxuICovXG5jbGFzcyBBcHBsaWNhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXRoKSB7XG5cbiAgICAgICAgYmVvZih7IHBhdGggfSkuc3RyaW5nKCk7XG5cbiAgICAgICAgLy9AdG9kbyBSZWZhY3RvciB0aGlzIGluIHRoZSBmdXR1cmUuXG4gICAgICAgIHByb2Nlc3Mub24oJ3VuaGFuZGxlZFJlamVjdGlvbicsIGUgPT4gdGhpcy5oYW5kbGVDcml0aWNhbEVycm9yKGUpKTtcbiAgICAgICAgcHJvY2Vzcy5vbigndW5oYW5kbGVkRXhjZXB0aW9uJywgZSA9PiB0aGlzLmhhbmRsZXJDcml0aWNhbEVycm9yKGUpKTtcblxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgICB0aGlzLm1haW4gPSBudWxsO1xuICAgICAgICB0aGlzLnNlcnZlciA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMub25TZXJ2aWNlTGlzdGVuZXIgPSBuZXcgT25TZXJ2aWNlTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5vblNlcnZlckxpc3RlbmVyID0gbmV3IE9uU2VydmVyTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5vblJvdXRlTGlzdGVuZXIgPSB7IG9uUm91dGUocmVxLCByZXMsIG5leHQpIHsgbmV4dCgpOyB9IH07XG4gICAgICAgIHRoaXMub25Sb3V0ZUVycm9yTGlzdGVuZXIgPSB7XG4gICAgICAgICAgICBvblJvdXRlRXJyb3IoZXJyLCByZXEsIHJlcywgbmV4dCkge1xuXG4gICAgICAgICAgICAgICAgcmVzLmVycm9yKGVycik7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mcmFtZXdvcmsgPSBudWxsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0T25TZXJ2aWNlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge09uU2VydmljZUxpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldE9uU2VydmljZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG5cbiAgICAgICAgYmVvZih7IGxpc3RlbmVyIH0pLmludGVyZmFjZShPblNlcnZpY2VMaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5vblNlcnZpY2VMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE9uU2VydmVyTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge09uU2VydmVyTGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0T25TZXJ2ZXJMaXN0ZW5lcihsaXN0ZW5lcikge1xuXG4gICAgICAgIGJlb2YoeyBsaXN0ZW5lciB9KS5pbnRlcmZhY2UoT25TZXJ2ZXJMaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5vblNlcnZlckxpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0T25Sb3V0ZUxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPblJvdXRlTGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0T25Sb3V0ZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG5cbiAgICAgICAgYmVvZih7IGxpc3RlbmVyIH0pLmludGVyZmFjZShsaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5vblJvdXRlTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRPblJvdXRlRXJyb3JMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T25Sb3V0ZUVycm9yTGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0T25Sb3V0ZUVycm9yTGlzdGVuZXIobGlzdGVuZXIpIHtcblxuICAgICAgICBiZW9mKHsgbGlzdGVuZXIgfSkuaW50ZXJmYWNlKE9uUm91dGVFcnJvckxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLm9uUm91dGVFcnJvckxpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc3RhcnQgdGhlIHNlcnZlciBmb3IgdGhpcyBBcHBsaWNhdGlvblxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgdGhpcy5mcmFtZXdvcmsudXNlKChyZXEsIHJlcywgbmV4dCkgPT4gdGhpcy5vblJvdXRlTGlzdGVuZXIub25Sb3V0ZShyZXEsIHJlcywgbmV4dCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1haW4ubG9hZCh0aGlzLmZyYW1ld29yaykuXG4gICAgICAgIHRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBNYW5hZ2VkU2VydmVyKFxuICAgICAgICAgICAgICAgIE51bWJlcih0aGlzLm1haW4uY29uZmlndXJhdGlvbi5yZWFkKCdwb3J0JywgcHJvY2Vzcy5lbnYuUE9SVCB8fCAyNDA3KSksXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmNvbmZpZ3VyYXRpb24ucmVhZCgnaG9zdCcsIHByb2Nlc3MuZW52LkhPU1QgfHwgJzAuMC4wLjAnKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9fY3JlYXRlU2VydmVyKCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuc3RhcnQoKTtcblxuICAgICAgICB9KS5cbiAgICAgICAgdGhlbigoKSA9PiB0aGlzLm9uU2VydmVyTGlzdGVuZXIub25TdGFydGVkKHRoaXMuc2VydmVyLCB0aGlzKSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBoYW5kbGVDcml0aWNhbEVycm9yXG4gICAgICovXG4gICAgaGFuZGxlQ3JpdGljYWxFcnJvcihlKSB7XG5cbiAgICAgICAgLy9AdG9kbyByZWZhY3RvciA6IG5vdGUgdGhlIGlkZWEgaGVyZSB3YXMgdG8gbWFrZSByb29tIGZvciBzaHV0dGluZyBkb3duXG4gICAgICAgIC8vY29ubmVjdGlvbnMgYmVmb3JlIHRlcm1pbmF0aW5nIGV0Yy5cblxuICAgICAgICBjb25zb2xlLmVycm9yKGUuc3RhY2sgPyBlLnN0YWNrIDogZSk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgtMSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCB7IE9uU2VydmljZUxpc3RlbmVyIGFzIE9uU2VydmljZUxpc3RlbmVyIH07XG5leHBvcnQgeyBPblNlcnZlckxpc3RlbmVyIGFzIE9uU2VydmVyTGlzdGVuZXIgfTtcbmV4cG9ydCB7IE9uUm91dGVMaXN0ZW5lciBhcyBPblJvdXRlTGlzdGVuZXIgfTtcbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uO1xuIl19