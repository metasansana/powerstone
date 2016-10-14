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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiT25TZXJ2aWNlTGlzdGVuZXIiLCJPblNlcnZlckxpc3RlbmVyIiwiT25Sb3V0ZUxpc3RlbmVyIiwiT25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJBcHBsaWNhdGlvbiIsInBhdGgiLCJzdHJpbmciLCJtYWluIiwic2VydmVyIiwiY29udGV4dCIsIm9uU2VydmljZUxpc3RlbmVyIiwib25TZXJ2ZXJMaXN0ZW5lciIsIm9uUm91dGVMaXN0ZW5lciIsIm9uUm91dGUiLCJyZXEiLCJyZXMiLCJuZXh0Iiwib25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJvblJvdXRlRXJyb3IiLCJlcnIiLCJlcnJvciIsImZyYW1ld29yayIsImxpc3RlbmVyIiwiaW50ZXJmYWNlIiwidXNlIiwibG9hZCIsInRoZW4iLCJOdW1iZXIiLCJjb25maWd1cmF0aW9uIiwicmVhZCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwiSE9TVCIsIl9fY3JlYXRlU2VydmVyIiwic3RhcnQiLCJvblN0YXJ0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7O0lBS01BLGlCOzs7Ozs7Ozs7QUFFRjs7Ozs7O3NDQU1jLENBRWI7Ozs7OztBQUlMOzs7Ozs7SUFNTUMsZ0I7Ozs7Ozs7OztBQUVGOzs7O29DQUlZLENBRVg7Ozs7OztBQUlMOzs7Ozs7O0lBS01DLGU7Ozs7Ozs7OztBQUVGOzs7Ozs7a0NBTVUsQ0FFVDs7Ozs7O0FBSUw7Ozs7Ozs7SUFLTUMsb0I7Ozs7Ozs7OztBQUVGOzs7Ozs7O3VDQU9lLENBRWQ7Ozs7OztBQUlMOzs7Ozs7Ozs7SUFPTUMsVztBQUVGLHlCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBRWQsNEJBQUssRUFBRUEsVUFBRixFQUFMLEVBQWVDLE1BQWY7O0FBRUEsYUFBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS0UsSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLGFBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0EsYUFBS0MsaUJBQUwsR0FBeUIsSUFBSVYsaUJBQUosRUFBekI7QUFDQSxhQUFLVyxnQkFBTCxHQUF3QixJQUFJVixnQkFBSixFQUF4QjtBQUNBLGFBQUtXLGVBQUwsR0FBdUI7QUFBRUMsbUJBQUYsbUJBQVVDLEdBQVYsRUFBZUMsR0FBZixFQUFvQkMsSUFBcEIsRUFBMEI7QUFBRUE7QUFBUztBQUFyQyxTQUF2QjtBQUNBLGFBQUtDLG9CQUFMLEdBQTRCO0FBQ3hCQyx3QkFEd0Isd0JBQ1hDLEdBRFcsRUFDTkwsR0FETSxFQUNEQyxHQURDLEVBQ0lDLElBREosRUFDVTs7QUFFOUJELG9CQUFJSyxLQUFKLENBQVVELEdBQVY7QUFFSDtBQUx1QixTQUE1QjtBQU9BLGFBQUtFLFNBQUwsR0FBaUIsSUFBakI7QUFFSDs7QUFFRDs7Ozs7Ozs7NkNBSXFCQyxRLEVBQVU7O0FBRTNCLGdDQUFLLEVBQUVBLGtCQUFGLEVBQUwsRUFBbUJDLFNBQW5CLENBQTZCdkIsaUJBQTdCOztBQUVBLGlCQUFLVSxpQkFBTCxHQUF5QlksUUFBekI7QUFDQSxtQkFBTyxJQUFQO0FBRUg7O0FBRUQ7Ozs7Ozs7NENBSW9CQSxRLEVBQVU7O0FBRTFCLGdDQUFLLEVBQUVBLGtCQUFGLEVBQUwsRUFBbUJDLFNBQW5CLENBQTZCdEIsZ0JBQTdCOztBQUVBLGlCQUFLVSxnQkFBTCxHQUF3QlcsUUFBeEI7QUFDQSxtQkFBTyxJQUFQO0FBRUg7O0FBRUQ7Ozs7Ozs7MkNBSW1CQSxRLEVBQVU7O0FBRXpCLGdDQUFLLEVBQUVBLGtCQUFGLEVBQUwsRUFBbUJDLFNBQW5CLENBQTZCRCxRQUE3Qjs7QUFFQSxpQkFBS1YsZUFBTCxHQUF1QlUsUUFBdkI7QUFDQSxtQkFBTyxJQUFQO0FBRUg7O0FBRUQ7Ozs7Ozs7Z0RBSXdCQSxRLEVBQVU7O0FBRTlCLGdDQUFLLEVBQUVBLGtCQUFGLEVBQUwsRUFBbUJDLFNBQW5CLENBQTZCcEIsb0JBQTdCOztBQUVBLGlCQUFLYyxvQkFBTCxHQUE0QkssUUFBNUI7QUFDQSxtQkFBTyxJQUFQO0FBRUg7O0FBRUQ7Ozs7Ozs7Z0NBSVE7QUFBQTs7QUFFSixpQkFBS0QsU0FBTCxDQUFlRyxHQUFmLENBQW1CLFVBQUNWLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxJQUFYO0FBQUEsdUJBQW9CLE1BQUtKLGVBQUwsQ0FBcUJDLE9BQXJCLENBQTZCQyxHQUE3QixFQUFrQ0MsR0FBbEMsRUFBdUNDLElBQXZDLENBQXBCO0FBQUEsYUFBbkI7O0FBRUEsbUJBQU8sS0FBS1QsSUFBTCxDQUFVa0IsSUFBVixDQUFlLEtBQUtKLFNBQXBCLEVBQ1BLLElBRE8sQ0FDRixZQUFNOztBQUVQLHNCQUFLbEIsTUFBTCxHQUFjLDRCQUNWbUIsT0FBTyxNQUFLcEIsSUFBTCxDQUFVcUIsYUFBVixDQUF3QkMsSUFBeEIsQ0FBNkIsTUFBN0IsRUFBcUNDLFFBQVFDLEdBQVIsQ0FBWUMsSUFBWixJQUFvQixJQUF6RCxDQUFQLENBRFUsRUFFVixNQUFLekIsSUFBTCxDQUFVcUIsYUFBVixDQUF3QkMsSUFBeEIsQ0FBNkIsTUFBN0IsRUFBcUNDLFFBQVFDLEdBQVIsQ0FBWUUsSUFBWixJQUFvQixTQUF6RCxDQUZVLEVBR1YsTUFBS0MsY0FBTCxFQUhVLENBQWQ7O0FBS0EsdUJBQU8sTUFBSzFCLE1BQUwsQ0FBWTJCLEtBQVosRUFBUDtBQUVILGFBVk0sRUFXUFQsSUFYTyxDQVdGO0FBQUEsdUJBQU0sTUFBS2YsZ0JBQUwsQ0FBc0J5QixTQUF0QixDQUFnQyxNQUFLNUIsTUFBckMsUUFBTjtBQUFBLGFBWEUsQ0FBUDtBQWFIOzs7Ozs7UUFHeUJSLGlCLEdBQXJCQSxpQjtRQUNvQkMsZ0IsR0FBcEJBLGdCO1FBQ21CQyxlLEdBQW5CQSxlO2tCQUNNRSxXIiwiZmlsZSI6IkFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJlb2YgZnJvbSAnYmVvZic7XG5pbXBvcnQgTWFuYWdlZFNlcnZlciBmcm9tICcuLi9uZXQvTWFuYWdlZFNlcnZlcic7XG5cbi8qKlxuICogT25TZXJ2aWNlTGlzdGVuZXIgaXMgaW1wbGVtZW50ZWQgdG8gcmVzcG9uZCB0b1xuICogdGhlIHN0YXR1cyBjaGFuZ2Ugb2Ygc2VydmljZXMgY29uZmlndXJlZCBmb3IgdGhlIEFwcGxpY3Rpb24uXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIE9uU2VydmljZUxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uQ29ubmVjdGVkIGlzIGNhbGxlZCB3aGVuIGNvbm5lY3Rpb25zIHRvIGFsbCB0aGUgc2VydmljZXNcbiAgICAgKiBoYXZlIGJlZW4gZXN0YWJsaXNoZWQgYW5kIHRoZSBBcHBsaWNhdGlvbiBpcyByZWFkeSB0b1xuICAgICAqIHByb2NlZWQgdG8gdGhlIG5leHQgcGhhc2Ugb2YgYm9vdCB1cC5cbiAgICAgKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBcbiAgICAgKi9cbiAgICBvbkNvbm5lY3RlZCgpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIE9uU2VydmVyTGlzdGVuZXIgaXMgaW1wbGVtZW50ZWQgdG8gcmVzcG9uZCB0byBjaGFuZ2VzIGluXG4gKiB0aGUgc3RhdHVzIG9mIHRoZSBpbnRlcm5hbCBIVFRQIHNlcnZlci5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuXG5jbGFzcyBPblNlcnZlckxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uU3RhcnRlZCBpcyBjYWxsZWQgd2hlbiB0aGUgaHR0cCBzZXJ2ZXIgaGFzIGJlZW4gc3RhcnRlZC5cbiAgICAgKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBcbiAgICAgKi9cbiAgICBvblN0YXJ0ZWQoKSB7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKiBPblJvdXRlTGlzdGVuZXIgaXMgaW1wbGVtZW50ZWQgdG8gcHJvY2VlZCBhbGwgcm91dGVzIHRoZSBhcHBsaWNhdGlvblxuICogaGFuZGxlcy4gSXQgcHJvY2VlZHMgYWxsIHRoZSBzdWdhciBwd3IgYWRkcyBvbiB0b3Agb2YgdGhlIHVuZGVybHlpbmcgZnJhbWV3b3JrLlxuICogQGludGVyZmFjZVxuICovXG5jbGFzcyBPblJvdXRlTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25Sb3V0ZVxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbmV4dFxuICAgICAqL1xuICAgIG9uUm91dGUoKSB7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKiBPblJvdXRlRXJyb3JMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byBoYW5kbGUgZXJyb3JzXG4gKiB0aGF0IG9jY3VyIGR1cmluZyByb3V0ZSBleGVjdXRpb24uXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIE9uUm91dGVFcnJvckxpc3RlbmVyIHtcblxuICAgIC8qKlxuICAgICAqIG9uUm91dGVFcnJvciBoYW5kbGVzIHRoZSBlcnJvclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICAgICAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxXG4gICAgICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbmV4dFxuICAgICAqL1xuICAgIG9uUm91dGVFcnJvcigpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIEFwcGxpY2F0aW9uIGlzIHRoZSBtYWluIGNsYXNzIG9mIHRoZSBmcmFtZXdvcmsuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBpbnRpYWxpemUgdGhpcyBBcHBsaWNhdGlvbiB0by5cbiAqIEBwcm9wZXJ0eSB7TW9kdWxlfSBtYWluIC0gVGhlIG1haW4gTW9kdWxlIGZvciB0aGlzIEFwcGxpY2F0aW9uLlxuICogQHByb3BlcnR5IHtNYW5hZ2VkU2VydmVyfSBzZXJ2ZXIgLSBUaGUgbWFuYWdlZCBodHRwIHNlcnZlci5cbiAqIEBwcm9wZXJ0eSB7TWFuYWdlZFNlcnZlcnxudWxsfSBzZXJ2ZXIgLSBUaGUgaW50ZXJuYWwgbWFuYWdlZCBzZXJ2ZXIgdGhhdCBzZXJ2ZXMgY2xpZW50cy5cbiAqL1xuY2xhc3MgQXBwbGljYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IocGF0aCkge1xuXG4gICAgICAgIGJlb2YoeyBwYXRoIH0pLnN0cmluZygpO1xuXG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgICAgIHRoaXMubWFpbiA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VydmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5vblNlcnZpY2VMaXN0ZW5lciA9IG5ldyBPblNlcnZpY2VMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm9uU2VydmVyTGlzdGVuZXIgPSBuZXcgT25TZXJ2ZXJMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm9uUm91dGVMaXN0ZW5lciA9IHsgb25Sb3V0ZShyZXEsIHJlcywgbmV4dCkgeyBuZXh0KCk7IH0gfTtcbiAgICAgICAgdGhpcy5vblJvdXRlRXJyb3JMaXN0ZW5lciA9IHtcbiAgICAgICAgICAgIG9uUm91dGVFcnJvcihlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG5cbiAgICAgICAgICAgICAgICByZXMuZXJyb3IoZXJyKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZyYW1ld29yayA9IG51bGw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRPblNlcnZpY2VMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T25TZXJ2aWNlTGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0T25TZXJ2aWNlTGlzdGVuZXIobGlzdGVuZXIpIHtcblxuICAgICAgICBiZW9mKHsgbGlzdGVuZXIgfSkuaW50ZXJmYWNlKE9uU2VydmljZUxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLm9uU2VydmljZUxpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0T25TZXJ2ZXJMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T25TZXJ2ZXJMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBzZXRPblNlcnZlckxpc3RlbmVyKGxpc3RlbmVyKSB7XG5cbiAgICAgICAgYmVvZih7IGxpc3RlbmVyIH0pLmludGVyZmFjZShPblNlcnZlckxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLm9uU2VydmVyTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRPblJvdXRlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge09uUm91dGVMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBzZXRPblJvdXRlTGlzdGVuZXIobGlzdGVuZXIpIHtcblxuICAgICAgICBiZW9mKHsgbGlzdGVuZXIgfSkuaW50ZXJmYWNlKGxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLm9uUm91dGVMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE9uUm91dGVFcnJvckxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPblJvdXRlRXJyb3JMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBzZXRPblJvdXRlRXJyb3JMaXN0ZW5lcihsaXN0ZW5lcikge1xuXG4gICAgICAgIGJlb2YoeyBsaXN0ZW5lciB9KS5pbnRlcmZhY2UoT25Sb3V0ZUVycm9yTGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMub25Sb3V0ZUVycm9yTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdGFydCB0aGUgc2VydmVyIGZvciB0aGlzIEFwcGxpY2F0aW9uXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBzdGFydCgpIHtcblxuICAgICAgICB0aGlzLmZyYW1ld29yay51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB0aGlzLm9uUm91dGVMaXN0ZW5lci5vblJvdXRlKHJlcSwgcmVzLCBuZXh0KSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbi5sb2FkKHRoaXMuZnJhbWV3b3JrKS5cbiAgICAgICAgdGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuc2VydmVyID0gbmV3IE1hbmFnZWRTZXJ2ZXIoXG4gICAgICAgICAgICAgICAgTnVtYmVyKHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQoJ3BvcnQnLCBwcm9jZXNzLmVudi5QT1JUIHx8IDI0MDcpKSxcbiAgICAgICAgICAgICAgICB0aGlzLm1haW4uY29uZmlndXJhdGlvbi5yZWFkKCdob3N0JywgcHJvY2Vzcy5lbnYuSE9TVCB8fCAnMC4wLjAuMCcpLFxuICAgICAgICAgICAgICAgIHRoaXMuX19jcmVhdGVTZXJ2ZXIoKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZlci5zdGFydCgpO1xuXG4gICAgICAgIH0pLlxuICAgICAgICB0aGVuKCgpID0+IHRoaXMub25TZXJ2ZXJMaXN0ZW5lci5vblN0YXJ0ZWQodGhpcy5zZXJ2ZXIsIHRoaXMpKTtcblxuICAgIH1cbn1cblxuZXhwb3J0IHsgT25TZXJ2aWNlTGlzdGVuZXIgYXMgT25TZXJ2aWNlTGlzdGVuZXIgfTtcbmV4cG9ydCB7IE9uU2VydmVyTGlzdGVuZXIgYXMgT25TZXJ2ZXJMaXN0ZW5lciB9O1xuZXhwb3J0IHsgT25Sb3V0ZUxpc3RlbmVyIGFzIE9uUm91dGVMaXN0ZW5lciB9O1xuZXhwb3J0IGRlZmF1bHQgQXBwbGljYXRpb247XG4iXX0=