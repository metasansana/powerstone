'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

var _commonPowerstoneServer = require('../common/PowerstoneServer');

var _commonPowerstoneServer2 = _interopRequireDefault(_commonPowerstoneServer);

var _commonManagedServer = require('../common/ManagedServer');

var _commonManagedServer2 = _interopRequireDefault(_commonManagedServer);

var _StateManager = require('./StateManager');

var _StateManager2 = _interopRequireDefault(_StateManager);

var _tasksScheduler = require('../tasks/Scheduler');

var _tasksScheduler2 = _interopRequireDefault(_tasksScheduler);

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

var Application = (function () {
    function Application(path) {
        _classCallCheck(this, Application);

        this.path = path;
        this.name = 'main';
        this.server = null;
        this.controllers = {};
        this.models = {};
        this.middleware = {};
        this.connectors = {};
        this._stateManager = new _StateManager2['default'](this, Application.states.INITIAL);
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

            return this._stateManager.addListener(_tasksScheduler2['default']).addListener({

                onStateChange: function onStateChange(app) {

                    if (app.getState() === 'listening') console.log('Server started ' + app.server.host + ':' + app.server.port + '.');
                }

            }).setState(Application.states.BOOTSTRAP).then(function () {
                return _this.main.load(_this.frameworkApp);
            }).then(function () {
                return _this._stateManager.setState(Application.states.CONNECTED);
            }).then(function () {

                _this.server = new _commonManagedServer2['default'](_this.main.configuration.read('port', process.env.PORT || 3000), _this.main.configuration.read('host', process.env.HOST || '0.0.0.0'), new _commonPowerstoneServer2['default'](_this.__createServer()));

                return _this.server.start();
            }).then(function () {
                return _this._stateManager.setState(Application.states.LISTENING);
            })['catch'](function (e) {
                console.error(e.stack);
                process.exit(1);
            });
        }
    }]);

    return Application;
})();

Application.states = {
    INITIAL: 'initial',
    BOOTSTRAP: 'bootstrap',
    CONNECTED: 'connected',
    LISTENING: 'listening'
};

exports['default'] = Application;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vQXBwbGljYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzRCQUFxQixlQUFlOzs7O3NDQUNQLDRCQUE0Qjs7OzttQ0FDL0IseUJBQXlCOzs7OzRCQUMxQixnQkFBZ0I7Ozs7OEJBQ25CLG9CQUFvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFjcEMsV0FBVztBQUVGLGFBRlQsV0FBVyxDQUVELElBQUksRUFBRTs4QkFGaEIsV0FBVzs7QUFJVCxZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixZQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNuQixZQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUNuQixZQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN0QixZQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNqQixZQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNyQixZQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNyQixZQUFJLENBQUMsYUFBYSxHQUFHLDhCQUFpQixJQUFJLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUUzRTs7Ozs7OztpQkFiQyxXQUFXOztlQW1CTCxvQkFBRztBQUNQLG1CQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1NBQ25DOzs7Ozs7OztlQU1VLHVCQUFHOztBQUVWLG1CQUFPLElBQUksQ0FBQztTQUVmOzs7Ozs7Ozs7O2VBUU0saUJBQUMsR0FBRyxFQUFFOztBQUVULG1CQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixtQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLG1CQUFPLElBQUksQ0FBQztTQUVmOzs7Ozs7O2VBS0MsY0FBRztBQUNELGdCQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNsRDs7O2VBRUcsZ0JBQUc7QUFDSCxtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUMzRDs7Ozs7Ozs7ZUFNSSxpQkFBRzs7O0FBRUosbUJBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLDZCQUFXLENBQ2hELFdBQVcsQ0FBQzs7QUFFUiw2QkFBYSxFQUFBLHVCQUFDLEdBQUcsRUFBRTs7QUFFZix3QkFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssV0FBVyxFQUM5QixPQUFPLENBQUMsR0FBRyxxQkFBbUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQUksQ0FBQztpQkFFNUU7O2FBRUosQ0FBQyxDQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUN0QyxJQUFJLENBQUM7dUJBQU0sTUFBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUssWUFBWSxDQUFDO2FBQUEsQ0FBQyxDQUM3QyxJQUFJLENBQUM7dUJBQU0sTUFBSyxhQUFhLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2FBQUEsQ0FBQyxDQUNyRSxJQUFJLENBQUMsWUFBTTs7QUFFUCxzQkFBSyxNQUFNLEdBQUcscUNBRVYsTUFBSyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQzlELE1BQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxFQUNuRSx3Q0FBcUIsTUFBSyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRWpELHVCQUFPLE1BQUssTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBRTlCLENBQUMsQ0FDRixJQUFJLENBQUM7dUJBQU0sTUFBSyxhQUFhLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2FBQUEsQ0FBQyxTQUNoRSxDQUFDLFVBQUEsQ0FBQyxFQUFJO0FBQ1AsdUJBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCLHVCQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25CLENBQUMsQ0FBQztTQUVOOzs7V0EvRkMsV0FBVzs7O0FBa0dqQixXQUFXLENBQUMsTUFBTSxHQUFHO0FBQ2pCLFdBQU8sRUFBRSxTQUFTO0FBQ2xCLGFBQVMsRUFBRSxXQUFXO0FBQ3RCLGFBQVMsRUFBRSxXQUFXO0FBQ3RCLGFBQVMsRUFBRSxXQUFXO0NBQ3pCLENBQUM7O3FCQUVhLFdBQVciLCJmaWxlIjoiQXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcGVydHkgZnJvbSAncHJvcGVydHktc2Vlayc7XG5pbXBvcnQgUG93ZXJzdG9uZVNlcnZlciBmcm9tICcuLi9jb21tb24vUG93ZXJzdG9uZVNlcnZlcic7XG5pbXBvcnQgTWFuYWdlZFNlcnZlciBmcm9tICcuLi9jb21tb24vTWFuYWdlZFNlcnZlcic7XG5pbXBvcnQgU3RhdGVNYW5hZ2VyIGZyb20gJy4vU3RhdGVNYW5hZ2VyJztcbmltcG9ydCBTY2hlZHVsZXIgZnJvbSAnLi4vdGFza3MvU2NoZWR1bGVyJztcblxuLyoqXG4gKiBBcHBsaWNhdGlvbiBpcyB0aGUgbWFpbiBjbGFzcyBvZiB0aGUgZnJhbWV3b3JrLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gaW50aWFsaXplIHRoaXMgQXBwbGljYXRpb24gdG8uIFxuICpcbiAqIEBwcm9wZXJ0eSB7TW9kdWxlfSBtYWluIC0gVGhlIG1haW4gTW9kdWxlIGZvciB0aGlzIEFwcGxpY2F0aW9uLlxuICogQHByb3BlcnR5IHtNYW5hZ2VkU2VydmVyfSBzZXJ2ZXIgLSBUaGUgbWFuYWdlZCBodHRwIHNlcnZlci4gIFxuICogQHByb3BlcnR5IHtvYmplY3R9IGNvbnRyb2xsZXJzIC0gQ29udHJvbGxlcnMgbG9hZGVkIGludG8gbWVtb3J5LlxuICogQHByb3BlcnR5IHtvYmplY3R9IG1vZGVscyAtIE1vZGVscyBsb2FkZWQgaW50byBtZW1vcnkuXG4gKiBAcHJvcGVydHkge29iamVjdH0gY29ubmVjdG9ycyAtIFZhcmlvdXMgY29ubmVjdG9ycyBkZWZpbmVkIGZvciBlc3RhYmxpc2hpbmcgcmVtb3RlIGNvbm5lY3Rpb25zXG4gKiBAcHJvcGVydHkge29iamVjdH0gbWlkZGxld2FyZSAtIE1pZGRsZXdhcmUgbG9hZGVkIGludG8gbWVtb3J5LlxuICogQHByb3BlcnR5IHtNYW5hZ2VkU2VydmVyfG51bGx9IHNlcnZlciAtIFRoZSBpbnRlcm5hbCBtYW5hZ2VkIHNlcnZlciB0aGF0IHNlcnZlcyBjbGllbnRzLlxuICovXG5jbGFzcyBBcHBsaWNhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXRoKSB7XG5cbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgICAgdGhpcy5uYW1lID0gJ21haW4nO1xuICAgICAgICB0aGlzLnNlcnZlciA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udHJvbGxlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5tb2RlbHMgPSB7fTtcbiAgICAgICAgdGhpcy5taWRkbGV3YXJlID0ge307XG4gICAgICAgIHRoaXMuY29ubmVjdG9ycyA9IHt9O1xuICAgICAgICB0aGlzLl9zdGF0ZU1hbmFnZXIgPSBuZXcgU3RhdGVNYW5hZ2VyKHRoaXMsIEFwcGxpY2F0aW9uLnN0YXRlcy5JTklUSUFMKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldFN0YXRlIHJldHVybnMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIEFwcGxpY2F0aW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBcbiAgICAgKi9cbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlTWFuYWdlci5zdGF0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvbkNvbm5lY3RlZCBpcyBjYWxsZWQgd2hlbiBjb25uZWN0aW9ucyBoYXZlIGJlZW4gZXN0YWJsaXNoZWQuXG4gICAgICogQHJldHVybiB7UHJvbWlzZXxudWxsfVxuICAgICAqL1xuICAgIG9uQ29ubmVjdGVkKCkge1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogb25FcnJvciBpcyBjYWxsZWQgd2hlbiBzb21lIHNlZW1pbmdseSB1bnJlY292ZXJhYmxlIGVycm9yXG4gICAgICogb2NjdXJzLCBvdmVycmlkZSBpdCB0byBoYW5kbGUgZXJyb3JzIG9uIHlvdXIgb3duLlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGVyciBcbiAgICAgKiBAcmV0dXJucyB7bnVsbHxQcm9taXNlfVxuICAgICAqL1xuICAgIG9uRXJyb3IoZXJyKSB7XG5cbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2spO1xuICAgICAgICBwcm9jZXNzLmV4aXQoLTEpO1xuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG9uIFxuICAgICAqL1xuICAgIG9uKCkge1xuICAgICAgICB0aGlzLl9ldmVudHMub24uYXBwbHkodGhpcy5fZXZlbnRzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGVtaXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHMuZW1pdC5hcHBseSh0aGlzLl9ldmVudHMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc3RhcnQgdGhlIHNlcnZlciBmb3IgdGhpcyBBcHBsaWNhdGlvblxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlTWFuYWdlci5hZGRMaXN0ZW5lcihTY2hlZHVsZXIpLlxuICAgICAgICBhZGRMaXN0ZW5lcih7XG5cbiAgICAgICAgICAgIG9uU3RhdGVDaGFuZ2UoYXBwKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoYXBwLmdldFN0YXRlKCkgPT09ICdsaXN0ZW5pbmcnKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgU2VydmVyIHN0YXJ0ZWQgJHthcHAuc2VydmVyLmhvc3R9OiR7YXBwLnNlcnZlci5wb3J0fS5gKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pLlxuICAgICAgICBzZXRTdGF0ZShBcHBsaWNhdGlvbi5zdGF0ZXMuQk9PVFNUUkFQKS5cbiAgICAgICAgdGhlbigoKSA9PiB0aGlzLm1haW4ubG9hZCh0aGlzLmZyYW1ld29ya0FwcCkpLlxuICAgICAgICB0aGVuKCgpID0+IHRoaXMuX3N0YXRlTWFuYWdlci5zZXRTdGF0ZShBcHBsaWNhdGlvbi5zdGF0ZXMuQ09OTkVDVEVEKSkuXG4gICAgICAgIHRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBNYW5hZ2VkU2VydmVyKFxuXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmNvbmZpZ3VyYXRpb24ucmVhZCgncG9ydCcsIHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCksXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluLmNvbmZpZ3VyYXRpb24ucmVhZCgnaG9zdCcsIHByb2Nlc3MuZW52LkhPU1QgfHwgJzAuMC4wLjAnKSxcbiAgICAgICAgICAgICAgICBuZXcgUG93ZXJzdG9uZVNlcnZlcih0aGlzLl9fY3JlYXRlU2VydmVyKCkpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyLnN0YXJ0KCk7XG5cbiAgICAgICAgfSkuXG4gICAgICAgIHRoZW4oKCkgPT4gdGhpcy5fc3RhdGVNYW5hZ2VyLnNldFN0YXRlKEFwcGxpY2F0aW9uLnN0YXRlcy5MSVNURU5JTkcpKS5cbiAgICAgICAgY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUuc3RhY2spO1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICB9KTtcblxuICAgIH1cbn1cblxuQXBwbGljYXRpb24uc3RhdGVzID0ge1xuICAgIElOSVRJQUw6ICdpbml0aWFsJyxcbiAgICBCT09UU1RSQVA6ICdib290c3RyYXAnLFxuICAgIENPTk5FQ1RFRDogJ2Nvbm5lY3RlZCcsXG4gICAgTElTVEVOSU5HOiAnbGlzdGVuaW5nJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwbGljYXRpb247XG4iXX0=