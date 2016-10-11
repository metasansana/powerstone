'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

var _PowerstoneServer = require('../common/PowerstoneServer');

var _PowerstoneServer2 = _interopRequireDefault(_PowerstoneServer);

var _ManagedServer = require('../common/ManagedServer');

var _ManagedServer2 = _interopRequireDefault(_ManagedServer);

var _StateManager = require('./StateManager');

var _StateManager2 = _interopRequireDefault(_StateManager);

var _Scheduler = require('../tasks/Scheduler');

var _Scheduler2 = _interopRequireDefault(_Scheduler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Application is the main class of the framework.
 * @param {string} path The path to intialize this Application to. 
 *
 * @property {Module} main - The main Module for this Application.
 * @property {ManagedServer} server - The managed http server.  
 * @property {object} controllers - Controllers loaded into memory.
 * @property {object} models - Models loaded into memory.
 * @property {object} connectors - Various connectors defined for establishing remote connections
 * @property {object} middleware - Middleware loaded into memory.
 * @property {ManagedServer|null} server - The internal managed server that serves clients.
 */
var Application = function () {
    function Application(path) {
        _classCallCheck(this, Application);

        this.path = path;
        this.name = 'main';
        this.server = null;
        this.controllers = {};
        this.models = {};
        this.middleware = {};
        this.connectors = {};
        this._stateManager = new _StateManager2.default(this, Application.states.INITIAL);
    }

    /**
     * getState returns the current state of the Application
     * @return {string} 
     */


    _createClass(Application, [{
        key: 'getState',
        value: function getState() {
            return this._stateManager.state;
        }

        /**
         * onConnected is called when connections have been established.
         * @return {Promise|null}
         */

    }, {
        key: 'onConnected',
        value: function onConnected() {

            return null;
        }

        /**
         * onError is called when some seemingly unrecoverable error
         * occurs, override it to handle errors on your own.
         * @param {Error} err 
         * @returns {null|Promise}
         */

    }, {
        key: 'onError',
        value: function onError(err) {

            console.error(err.stack);
            process.exit(-1);
            return null;
        }

        /**
         * on 
         */

    }, {
        key: 'on',
        value: function on() {
            this._events.on.apply(this._events, arguments);
        }
    }, {
        key: 'emit',
        value: function emit() {
            return this._events.emit.apply(this._events, arguments);
        }

        /**
         * start the server for this Application
         * @return {Promise}
         */

    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            return this._stateManager.addListener(_Scheduler2.default).addListener({
                onStateChange: function onStateChange(app) {

                    if (app.getState() === 'listening') console.log('Server started ' + app.server.host + ':' + app.server.port + '.');
                }
            }).setState(Application.states.BOOTSTRAP).then(function () {
                return _this.main.load(_this.frameworkApp);
            }).then(function () {
                return _this._stateManager.setState(Application.states.CONNECTED);
            }).then(function () {

                _this.server = new _ManagedServer2.default(_this.main.configuration.read('port', process.env.PORT || 3000), _this.main.configuration.read('host', process.env.HOST || '0.0.0.0'), new _PowerstoneServer2.default(_this.__createServer()));

                return _this.server.start();
            }).then(function () {
                return _this._stateManager.setState(Application.states.LISTENING);
            }).catch(function (e) {
                console.error(e.stack ? e.stack : e);
                process.exit(1);
            });
        }
    }]);

    return Application;
}();

Application.states = {
    INITIAL: 'initial',
    BOOTSTRAP: 'bootstrap',
    CONNECTED: 'connected',
    LISTENING: 'listening'
};

exports.default = Application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiQXBwbGljYXRpb24iLCJwYXRoIiwibmFtZSIsInNlcnZlciIsImNvbnRyb2xsZXJzIiwibW9kZWxzIiwibWlkZGxld2FyZSIsImNvbm5lY3RvcnMiLCJfc3RhdGVNYW5hZ2VyIiwic3RhdGVzIiwiSU5JVElBTCIsInN0YXRlIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwic3RhY2siLCJwcm9jZXNzIiwiZXhpdCIsIl9ldmVudHMiLCJvbiIsImFwcGx5IiwiYXJndW1lbnRzIiwiZW1pdCIsImFkZExpc3RlbmVyIiwib25TdGF0ZUNoYW5nZSIsImFwcCIsImdldFN0YXRlIiwibG9nIiwiaG9zdCIsInBvcnQiLCJzZXRTdGF0ZSIsIkJPT1RTVFJBUCIsInRoZW4iLCJtYWluIiwibG9hZCIsImZyYW1ld29ya0FwcCIsIkNPTk5FQ1RFRCIsImNvbmZpZ3VyYXRpb24iLCJyZWFkIiwiZW52IiwiUE9SVCIsIkhPU1QiLCJfX2NyZWF0ZVNlcnZlciIsInN0YXJ0IiwiTElTVEVOSU5HIiwiY2F0Y2giLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7OztJQVlNQSxXO0FBRUYseUJBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFFZCxhQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFLQyxJQUFMLEdBQVksTUFBWjtBQUNBLGFBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLGFBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsYUFBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLGFBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxhQUFLQyxhQUFMLEdBQXFCLDJCQUFpQixJQUFqQixFQUF1QlIsWUFBWVMsTUFBWixDQUFtQkMsT0FBMUMsQ0FBckI7QUFFSDs7QUFFRDs7Ozs7Ozs7bUNBSVc7QUFDUCxtQkFBTyxLQUFLRixhQUFMLENBQW1CRyxLQUExQjtBQUNIOztBQUVEOzs7Ozs7O3NDQUljOztBQUVWLG1CQUFPLElBQVA7QUFFSDs7QUFFRDs7Ozs7Ozs7O2dDQU1RQyxHLEVBQUs7O0FBRVRDLG9CQUFRQyxLQUFSLENBQWNGLElBQUlHLEtBQWxCO0FBQ0FDLG9CQUFRQyxJQUFSLENBQWEsQ0FBQyxDQUFkO0FBQ0EsbUJBQU8sSUFBUDtBQUVIOztBQUVEOzs7Ozs7NkJBR0s7QUFDRCxpQkFBS0MsT0FBTCxDQUFhQyxFQUFiLENBQWdCQyxLQUFoQixDQUFzQixLQUFLRixPQUEzQixFQUFvQ0csU0FBcEM7QUFDSDs7OytCQUVNO0FBQ0gsbUJBQU8sS0FBS0gsT0FBTCxDQUFhSSxJQUFiLENBQWtCRixLQUFsQixDQUF3QixLQUFLRixPQUE3QixFQUFzQ0csU0FBdEMsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7O2dDQUlRO0FBQUE7O0FBRUosbUJBQU8sS0FBS2IsYUFBTCxDQUFtQmUsV0FBbkIsc0JBQ1BBLFdBRE8sQ0FDSztBQUVSQyw2QkFGUSx5QkFFTUMsR0FGTixFQUVXOztBQUVmLHdCQUFJQSxJQUFJQyxRQUFKLE9BQW1CLFdBQXZCLEVBQ0liLFFBQVFjLEdBQVIscUJBQThCRixJQUFJdEIsTUFBSixDQUFXeUIsSUFBekMsU0FBaURILElBQUl0QixNQUFKLENBQVcwQixJQUE1RDtBQUVQO0FBUE8sYUFETCxFQVdQQyxRQVhPLENBV0U5QixZQUFZUyxNQUFaLENBQW1Cc0IsU0FYckIsRUFZUEMsSUFaTyxDQVlGO0FBQUEsdUJBQU0sTUFBS0MsSUFBTCxDQUFVQyxJQUFWLENBQWUsTUFBS0MsWUFBcEIsQ0FBTjtBQUFBLGFBWkUsRUFhUEgsSUFiTyxDQWFGO0FBQUEsdUJBQU0sTUFBS3hCLGFBQUwsQ0FBbUJzQixRQUFuQixDQUE0QjlCLFlBQVlTLE1BQVosQ0FBbUIyQixTQUEvQyxDQUFOO0FBQUEsYUFiRSxFQWNQSixJQWRPLENBY0YsWUFBTTs7QUFFUCxzQkFBSzdCLE1BQUwsR0FBYyw0QkFFVixNQUFLOEIsSUFBTCxDQUFVSSxhQUFWLENBQXdCQyxJQUF4QixDQUE2QixNQUE3QixFQUFxQ3RCLFFBQVF1QixHQUFSLENBQVlDLElBQVosSUFBb0IsSUFBekQsQ0FGVSxFQUdWLE1BQUtQLElBQUwsQ0FBVUksYUFBVixDQUF3QkMsSUFBeEIsQ0FBNkIsTUFBN0IsRUFBcUN0QixRQUFRdUIsR0FBUixDQUFZRSxJQUFaLElBQW9CLFNBQXpELENBSFUsRUFJViwrQkFBcUIsTUFBS0MsY0FBTCxFQUFyQixDQUpVLENBQWQ7O0FBTUEsdUJBQU8sTUFBS3ZDLE1BQUwsQ0FBWXdDLEtBQVosRUFBUDtBQUVILGFBeEJNLEVBeUJQWCxJQXpCTyxDQXlCRjtBQUFBLHVCQUFNLE1BQUt4QixhQUFMLENBQW1Cc0IsUUFBbkIsQ0FBNEI5QixZQUFZUyxNQUFaLENBQW1CbUMsU0FBL0MsQ0FBTjtBQUFBLGFBekJFLEVBMEJQQyxLQTFCTyxDQTBCRCxhQUFLO0FBQ1BoQyx3QkFBUUMsS0FBUixDQUFjZ0MsRUFBRS9CLEtBQUYsR0FBUStCLEVBQUUvQixLQUFWLEdBQWdCK0IsQ0FBOUI7QUFDQTlCLHdCQUFRQyxJQUFSLENBQWEsQ0FBYjtBQUNILGFBN0JNLENBQVA7QUErQkg7Ozs7OztBQUdMakIsWUFBWVMsTUFBWixHQUFxQjtBQUNqQkMsYUFBUyxTQURRO0FBRWpCcUIsZUFBVyxXQUZNO0FBR2pCSyxlQUFXLFdBSE07QUFJakJRLGVBQVc7QUFKTSxDQUFyQjs7a0JBT2U1QyxXIiwiZmlsZSI6IkFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BlcnR5IGZyb20gJ3Byb3BlcnR5LXNlZWsnO1xuaW1wb3J0IFBvd2Vyc3RvbmVTZXJ2ZXIgZnJvbSAnLi4vY29tbW9uL1Bvd2Vyc3RvbmVTZXJ2ZXInO1xuaW1wb3J0IE1hbmFnZWRTZXJ2ZXIgZnJvbSAnLi4vY29tbW9uL01hbmFnZWRTZXJ2ZXInO1xuaW1wb3J0IFN0YXRlTWFuYWdlciBmcm9tICcuL1N0YXRlTWFuYWdlcic7XG5pbXBvcnQgU2NoZWR1bGVyIGZyb20gJy4uL3Rhc2tzL1NjaGVkdWxlcic7XG5cbi8qKlxuICogQXBwbGljYXRpb24gaXMgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIGZyYW1ld29yay5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGludGlhbGl6ZSB0aGlzIEFwcGxpY2F0aW9uIHRvLiBcbiAqXG4gKiBAcHJvcGVydHkge01vZHVsZX0gbWFpbiAtIFRoZSBtYWluIE1vZHVsZSBmb3IgdGhpcyBBcHBsaWNhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7TWFuYWdlZFNlcnZlcn0gc2VydmVyIC0gVGhlIG1hbmFnZWQgaHR0cCBzZXJ2ZXIuICBcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBjb250cm9sbGVycyAtIENvbnRyb2xsZXJzIGxvYWRlZCBpbnRvIG1lbW9yeS5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBtb2RlbHMgLSBNb2RlbHMgbG9hZGVkIGludG8gbWVtb3J5LlxuICogQHByb3BlcnR5IHtvYmplY3R9IGNvbm5lY3RvcnMgLSBWYXJpb3VzIGNvbm5lY3RvcnMgZGVmaW5lZCBmb3IgZXN0YWJsaXNoaW5nIHJlbW90ZSBjb25uZWN0aW9uc1xuICogQHByb3BlcnR5IHtvYmplY3R9IG1pZGRsZXdhcmUgLSBNaWRkbGV3YXJlIGxvYWRlZCBpbnRvIG1lbW9yeS5cbiAqIEBwcm9wZXJ0eSB7TWFuYWdlZFNlcnZlcnxudWxsfSBzZXJ2ZXIgLSBUaGUgaW50ZXJuYWwgbWFuYWdlZCBzZXJ2ZXIgdGhhdCBzZXJ2ZXMgY2xpZW50cy5cbiAqL1xuY2xhc3MgQXBwbGljYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IocGF0aCkge1xuXG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgICAgIHRoaXMubmFtZSA9ICdtYWluJztcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJzID0ge307XG4gICAgICAgIHRoaXMubW9kZWxzID0ge307XG4gICAgICAgIHRoaXMubWlkZGxld2FyZSA9IHt9O1xuICAgICAgICB0aGlzLmNvbm5lY3RvcnMgPSB7fTtcbiAgICAgICAgdGhpcy5fc3RhdGVNYW5hZ2VyID0gbmV3IFN0YXRlTWFuYWdlcih0aGlzLCBBcHBsaWNhdGlvbi5zdGF0ZXMuSU5JVElBTCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXRTdGF0ZSByZXR1cm5zIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBBcHBsaWNhdGlvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gXG4gICAgICovXG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZU1hbmFnZXIuc3RhdGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogb25Db25uZWN0ZWQgaXMgY2FsbGVkIHdoZW4gY29ubmVjdGlvbnMgaGF2ZSBiZWVuIGVzdGFibGlzaGVkLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V8bnVsbH1cbiAgICAgKi9cbiAgICBvbkNvbm5lY3RlZCgpIHtcblxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG9uRXJyb3IgaXMgY2FsbGVkIHdoZW4gc29tZSBzZWVtaW5nbHkgdW5yZWNvdmVyYWJsZSBlcnJvclxuICAgICAqIG9jY3Vycywgb3ZlcnJpZGUgaXQgdG8gaGFuZGxlIGVycm9ycyBvbiB5b3VyIG93bi5cbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBlcnIgXG4gICAgICogQHJldHVybnMge251bGx8UHJvbWlzZX1cbiAgICAgKi9cbiAgICBvbkVycm9yKGVycikge1xuXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KC0xKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvbiBcbiAgICAgKi9cbiAgICBvbigpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzLm9uLmFwcGx5KHRoaXMuX2V2ZW50cywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBlbWl0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzLmVtaXQuYXBwbHkodGhpcy5fZXZlbnRzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHN0YXJ0IHRoZSBzZXJ2ZXIgZm9yIHRoaXMgQXBwbGljYXRpb25cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZU1hbmFnZXIuYWRkTGlzdGVuZXIoU2NoZWR1bGVyKS5cbiAgICAgICAgYWRkTGlzdGVuZXIoe1xuXG4gICAgICAgICAgICBvblN0YXRlQ2hhbmdlKGFwcCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGFwcC5nZXRTdGF0ZSgpID09PSAnbGlzdGVuaW5nJylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFNlcnZlciBzdGFydGVkICR7YXBwLnNlcnZlci5ob3N0fToke2FwcC5zZXJ2ZXIucG9ydH0uYCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KS5cbiAgICAgICAgc2V0U3RhdGUoQXBwbGljYXRpb24uc3RhdGVzLkJPT1RTVFJBUCkuXG4gICAgICAgIHRoZW4oKCkgPT4gdGhpcy5tYWluLmxvYWQodGhpcy5mcmFtZXdvcmtBcHApKS5cbiAgICAgICAgdGhlbigoKSA9PiB0aGlzLl9zdGF0ZU1hbmFnZXIuc2V0U3RhdGUoQXBwbGljYXRpb24uc3RhdGVzLkNPTk5FQ1RFRCkpLlxuICAgICAgICB0aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgTWFuYWdlZFNlcnZlcihcblxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQoJ3BvcnQnLCBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDApLFxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQoJ2hvc3QnLCBwcm9jZXNzLmVudi5IT1NUIHx8ICcwLjAuMC4wJyksXG4gICAgICAgICAgICAgICAgbmV3IFBvd2Vyc3RvbmVTZXJ2ZXIodGhpcy5fX2NyZWF0ZVNlcnZlcigpKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZlci5zdGFydCgpO1xuXG4gICAgICAgIH0pLlxuICAgICAgICB0aGVuKCgpID0+IHRoaXMuX3N0YXRlTWFuYWdlci5zZXRTdGF0ZShBcHBsaWNhdGlvbi5zdGF0ZXMuTElTVEVOSU5HKSkuXG4gICAgICAgIGNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlLnN0YWNrP2Uuc3RhY2s6ZSk7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5BcHBsaWNhdGlvbi5zdGF0ZXMgPSB7XG4gICAgSU5JVElBTDogJ2luaXRpYWwnLFxuICAgIEJPT1RTVFJBUDogJ2Jvb3RzdHJhcCcsXG4gICAgQ09OTkVDVEVEOiAnY29ubmVjdGVkJyxcbiAgICBMSVNURU5JTkc6ICdsaXN0ZW5pbmcnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvbjtcbiJdfQ==