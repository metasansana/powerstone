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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiT25TZXJ2aWNlTGlzdGVuZXIiLCJPblNlcnZlckxpc3RlbmVyIiwiT25Sb3V0ZUxpc3RlbmVyIiwiT25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJBcHBsaWNhdGlvbiIsInBhdGgiLCJfX2Rpcm5hbWUiLCJtYWluIiwic2VydmVyIiwiY29udGV4dCIsIm9uU2VydmljZUxpc3RlbmVyIiwib25TZXJ2ZXJMaXN0ZW5lciIsIm9uUm91dGVMaXN0ZW5lciIsIm9uUm91dGUiLCJyZXEiLCJyZXMiLCJuZXh0Iiwib25Sb3V0ZUVycm9yTGlzdGVuZXIiLCJvblJvdXRlRXJyb3IiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGFjayIsInN0YXR1cyIsImVuZCIsImZyYW1ld29yayIsImxpc3RlbmVyIiwiaW50ZXJmYWNlIiwidXNlIiwibG9hZCIsInRoZW4iLCJjb25maWd1cmF0aW9uIiwicmVhZCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwiSE9TVCIsIl9fY3JlYXRlU2VydmVyIiwic3RhcnQiLCJvblN0YXJ0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7O0lBS01BLGlCOzs7Ozs7Ozs7QUFFRjs7Ozs7O2tDQU1jLENBRWI7Ozs7OztBQUlMOzs7Ozs7SUFNTUMsZ0I7Ozs7Ozs7OztBQUVGOzs7O2dDQUlZLENBRVg7Ozs7OztBQUlMOzs7Ozs7O0lBS01DLGU7Ozs7Ozs7OztBQUVGOzs7Ozs7OEJBTVUsQ0FFVDs7Ozs7O0FBSUw7Ozs7Ozs7SUFLTUMsb0I7Ozs7Ozs7OztBQUVGOzs7Ozs7O21DQU9lLENBRWQ7Ozs7OztBQUlMOzs7Ozs7Ozs7SUFPTUMsVztBQUVGLHlCQUE4QjtBQUFBLFFBQWxCQyxJQUFrQix1RUFBWEMsU0FBVzs7QUFBQTs7QUFFMUIsU0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0UsSUFBTCxHQUFZLElBQVo7QUFD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ICdiZW9mJztcbmltcG9ydCBNYW5hZ2VkU2VydmVyIGZyb20gJy4uL25ldC9NYW5hZ2VkU2VydmVyJztcblxuLyoqXG4gKiBPblNlcnZpY2VMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byByZXNwb25kIHRvXG4gKiB0aGUgc3RhdHVzIGNoYW5nZSBvZiBzZXJ2aWNlcyBjb25maWd1cmVkIGZvciB0aGUgQXBwbGljdGlvbi5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgT25TZXJ2aWNlTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25Db25uZWN0ZWQgaXMgY2FsbGVkIHdoZW4gY29ubmVjdGlvbnMgdG8gYWxsIHRoZSBzZXJ2aWNlc1xuICAgICAqIGhhdmUgYmVlbiBlc3RhYmxpc2hlZCBhbmQgdGhlIEFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvXG4gICAgICogcHJvY2VlZCB0byB0aGUgbmV4dCBwaGFzZSBvZiBib290IHVwLlxuICAgICAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcFxuICAgICAqL1xuICAgIG9uQ29ubmVjdGVkKCkge1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogT25TZXJ2ZXJMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byByZXNwb25kIHRvIGNoYW5nZXMgaW5cbiAqIHRoZSBzdGF0dXMgb2YgdGhlIGludGVybmFsIEhUVFAgc2VydmVyLlxuICogQGludGVyZmFjZVxuICovXG5cbmNsYXNzIE9uU2VydmVyTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25TdGFydGVkIGlzIGNhbGxlZCB3aGVuIHRoZSBodHRwIHNlcnZlciBoYXMgYmVlbiBzdGFydGVkLlxuICAgICAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcFxuICAgICAqL1xuICAgIG9uU3RhcnRlZCgpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIE9uUm91dGVMaXN0ZW5lciBpcyBpbXBsZW1lbnRlZCB0byBwcm9jZWVkIGFsbCByb3V0ZXMgdGhlIGFwcGxpY2F0aW9uXG4gKiBoYW5kbGVzLiBJdCBwcm9jZWVkcyBhbGwgdGhlIHN1Z2FyIHB3ciBhZGRzIG9uIHRvcCBvZiB0aGUgdW5kZXJseWluZyBmcmFtZXdvcmsuXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIE9uUm91dGVMaXN0ZW5lciB7XG5cbiAgICAvKipcbiAgICAgKiBvblJvdXRlXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSByZXFcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZXh0XG4gICAgICovXG4gICAgb25Sb3V0ZSgpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIE9uUm91dGVFcnJvckxpc3RlbmVyIGlzIGltcGxlbWVudGVkIHRvIGhhbmRsZSBlcnJvcnNcbiAqIHRoYXQgb2NjdXIgZHVyaW5nIHJvdXRlIGV4ZWN1dGlvbi5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgT25Sb3V0ZUVycm9yTGlzdGVuZXIge1xuXG4gICAgLyoqXG4gICAgICogb25Sb3V0ZUVycm9yIGhhbmRsZXMgdGhlIGVycm9yXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0fSByZXFcbiAgICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZXh0XG4gICAgICovXG4gICAgb25Sb3V0ZUVycm9yKCkge1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogQXBwbGljYXRpb24gaXMgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIGZyYW1ld29yay5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGludGlhbGl6ZSB0aGlzIEFwcGxpY2F0aW9uIHRvLlxuICogQHByb3BlcnR5IHtNb2R1bGV9IG1haW4gLSBUaGUgbWFpbiBNb2R1bGUgZm9yIHRoaXMgQXBwbGljYXRpb24uXG4gKiBAcHJvcGVydHkge01hbmFnZWRTZXJ2ZXJ9IHNlcnZlciAtIFRoZSBtYW5hZ2VkIGh0dHAgc2VydmVyLlxuICogQHByb3BlcnR5IHtNYW5hZ2VkU2VydmVyfG51bGx9IHNlcnZlciAtIFRoZSBpbnRlcm5hbCBtYW5hZ2VkIHNlcnZlciB0aGF0IHNlcnZlcyBjbGllbnRzLlxuICovXG5jbGFzcyBBcHBsaWNhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXRoID0gX19kaXJuYW1lKSB7XG5cbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgICAgdGhpcy5tYWluID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLm9uU2VydmljZUxpc3RlbmVyID0gbmV3IE9uU2VydmljZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMub25TZXJ2ZXJMaXN0ZW5lciA9IG5ldyBPblNlcnZlckxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMub25Sb3V0ZUxpc3RlbmVyID0geyBvblJvdXRlKHJlcSwgcmVzLCBuZXh0KSB7IG5leHQoKTsgfSB9O1xuICAgICAgICB0aGlzLm9uUm91dGVFcnJvckxpc3RlbmVyID0ge1xuICAgICAgICAgICAgb25Sb3V0ZUVycm9yKGVyciwgcmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVyci5zdGFjayA/IGVyci5zdGFjayA6IGVycik7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApO1xuICAgICAgICAgICAgICAgIHJlcy5lbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mcmFtZXdvcmsgPSBudWxsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0T25TZXJ2aWNlTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge09uU2VydmljZUxpc3RlbmVyfSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldE9uU2VydmljZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG5cbiAgICAgICAgYmVvZih7IGxpc3RlbmVyIH0pLmludGVyZmFjZShsaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5vblNlcnZpY2VMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE9uU2VydmVyTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge09uU2VydmVyTGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0T25TZXJ2ZXJMaXN0ZW5lcihsaXN0ZW5lcikge1xuXG4gICAgICAgIGJlb2YoeyBsaXN0ZW5lciB9KS5pbnRlcmZhY2UoT25TZXJ2ZXJMaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5vblNlcnZlckxpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0T25Sb3V0ZUxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPblJvdXRlTGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0T25Sb3V0ZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG5cbiAgICAgICAgYmVvZih7IGxpc3RlbmVyIH0pLmludGVyZmFjZShsaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5vblJvdXRlTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRPblJvdXRlRXJyb3JMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T25Sb3V0ZUVycm9yTGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0T25Sb3V0ZUVycm9yTGlzdGVuZXIobGlzdGVuZXIpIHtcblxuICAgICAgICBiZW9mKHsgbGlzdGVuZXIgfSkuaW50ZXJmYWNlKE9uUm91dGVFcnJvckxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLm9uUm91dGVFcnJvckxpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc3RhcnQgdGhlIHNlcnZlciBmb3IgdGhpcyBBcHBsaWNhdGlvblxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgdGhpcy5mcmFtZXdvcmsudXNlKChyZXEsIHJlcywgbmV4dCkgPT4gdGhpcy5vblJvdXRlTGlzdGVuZXIub25Sb3V0ZShyZXEsIHJlcywgbmV4dCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1haW4ubG9hZCh0aGlzLmZyYW1ld29yaykuXG4gICAgICAgIHRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgIHRoaXMuc2VydmVyID0gbmV3IE1hbmFnZWRTZXJ2ZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmNvbmZpZ3VyYXRpb24ucmVhZCgncG9ydCcsIHByb2Nlc3MuZW52LlBPUlQgfHwgMjQwNyksXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmNvbmZpZ3VyYXRpb24ucmVhZCgnaG9zdCcsIHByb2Nlc3MuZW52LkhPU1QgfHwgJzAuMC4wLjAnKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9fY3JlYXRlU2VydmVyKCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuc3RhcnQoKTtcblxuICAgICAgICB9KS5cbiAgICAgICAgdGhlbigoKSA9PiB0aGlzLm9uU2VydmVyTGlzdGVuZXIub25TdGFydGVkKHRoaXMuc2VydmVyLCB0aGlzKSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCB7IE9uU2VydmljZUxpc3RlbmVyIGFzIE9uU2VydmljZUxpc3RlbmVyIH07XG5leHBvcnQgeyBPblNlcnZlckxpc3RlbmVyIGFzIE9uU2VydmVyTGlzdGVuZXIgfTtcbmV4cG9ydCB7IE9uUm91dGVMaXN0ZW5lciBhcyBPblJvdXRlTGlzdGVuZXIgfTtcbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uO1xuIl19