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
    }

    /**
     * onConnected is called when connections have been established.
     * @return {Promise|null}
     */

    _createClass(Application, [{
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

            if (this.server !== null) return this.server.start();

            return this.main.load(this.frameworkApp).then(function () {

                _this.server = new _commonManagedServer2['default'](_this.main.configuration.read('port', process.env.PORT || 3000), _this.main.configuration.read('host', process.env.HOST || '0.0.0.0'), new _commonPowerstoneServer2['default'](_this.__createServer()));

                return _this.server.start();
            }).then(function (port) {
                return console.log(port);
            })['catch'](function (e) {
                return _this.onError(e);
            });
        }
    }]);

    return Application;
})();

exports['default'] = Application;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vQXBwbGljYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzRCQUFxQixlQUFlOzs7O3NDQUNQLDRCQUE0Qjs7OzttQ0FDL0IseUJBQXlCOzs7Ozs7Ozs7Ozs7Ozs7OztJQWM3QyxXQUFXO0FBRUYsYUFGVCxXQUFXLENBRUQsSUFBSSxFQUFFOzhCQUZoQixXQUFXOztBQUlULFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ25CLFlBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFlBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLFlBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLFlBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0tBRXhCOzs7Ozs7O2lCQVpDLFdBQVc7O2VBa0JGLHVCQUFHOztBQUVWLG1CQUFPLElBQUksQ0FBQztTQUVmOzs7Ozs7Ozs7O2VBUU0saUJBQUMsR0FBRyxFQUFFOztBQUVYLG1CQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixtQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLG1CQUFPLElBQUksQ0FBQztTQUViOzs7Ozs7O2VBS0MsY0FBRztBQUNELGdCQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNsRDs7O2VBRUcsZ0JBQUc7QUFDSCxtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUMzRDs7Ozs7Ozs7ZUFNSSxpQkFBRzs7O0FBRUosZ0JBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFL0IsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUN4QyxJQUFJLENBQUMsWUFBTTs7QUFHUCxzQkFBSyxNQUFNLEdBQUcscUNBQ1YsTUFBSyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQzlELE1BQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxFQUNuRSx3Q0FBcUIsTUFBSyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRWpELHVCQUFPLE1BQUssTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBRTlCLENBQUMsQ0FDRixJQUFJLENBQUMsVUFBQSxJQUFJO3VCQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO2FBQUEsQ0FBQyxTQUMxQixDQUFDLFVBQUEsQ0FBQzt1QkFBRSxNQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFBQSxDQUFDLENBQUM7U0FHN0I7OztXQTFFQyxXQUFXOzs7cUJBNkVGLFdBQVciLCJmaWxlIjoiQXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcGVydHkgZnJvbSAncHJvcGVydHktc2Vlayc7XG5pbXBvcnQgUG93ZXJzdG9uZVNlcnZlciBmcm9tICcuLi9jb21tb24vUG93ZXJzdG9uZVNlcnZlcic7XG5pbXBvcnQgTWFuYWdlZFNlcnZlciBmcm9tICcuLi9jb21tb24vTWFuYWdlZFNlcnZlcic7XG5cbi8qKlxuICogQXBwbGljYXRpb24gaXMgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIGZyYW1ld29yay5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGludGlhbGl6ZSB0aGlzIEFwcGxpY2F0aW9uIHRvLiBcbiAqXG4gKiBAcHJvcGVydHkge01vZHVsZX0gbWFpbiAtIFRoZSBtYWluIE1vZHVsZSBmb3IgdGhpcyBBcHBsaWNhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7TWFuYWdlZFNlcnZlcn0gc2VydmVyIC0gVGhlIG1hbmFnZWQgaHR0cCBzZXJ2ZXIuICBcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBjb250cm9sbGVycyAtIENvbnRyb2xsZXJzIGxvYWRlZCBpbnRvIG1lbW9yeS5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBtb2RlbHMgLSBNb2RlbHMgbG9hZGVkIGludG8gbWVtb3J5LlxuICogQHByb3BlcnR5IHtvYmplY3R9IGNvbm5lY3RvcnMgLSBWYXJpb3VzIGNvbm5lY3RvcnMgZGVmaW5lZCBmb3IgZXN0YWJsaXNoaW5nIHJlbW90ZSBjb25uZWN0aW9uc1xuICogQHByb3BlcnR5IHtvYmplY3R9IG1pZGRsZXdhcmUgLSBNaWRkbGV3YXJlIGxvYWRlZCBpbnRvIG1lbW9yeS5cbiAqIEBwcm9wZXJ0eSB7TWFuYWdlZFNlcnZlcnxudWxsfSBzZXJ2ZXIgLSBUaGUgaW50ZXJuYWwgbWFuYWdlZCBzZXJ2ZXIgdGhhdCBzZXJ2ZXMgY2xpZW50cy5cbiAqL1xuY2xhc3MgQXBwbGljYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IocGF0aCkge1xuXG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgICAgIHRoaXMubmFtZSA9ICdtYWluJztcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJzID0ge307XG4gICAgICAgIHRoaXMubW9kZWxzID0ge307XG4gICAgICAgIHRoaXMubWlkZGxld2FyZSA9IHt9O1xuICAgICAgICB0aGlzLmNvbm5lY3RvcnMgPSB7fTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG9uQ29ubmVjdGVkIGlzIGNhbGxlZCB3aGVuIGNvbm5lY3Rpb25zIGhhdmUgYmVlbiBlc3RhYmxpc2hlZC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfG51bGx9XG4gICAgICovXG4gICAgb25Db25uZWN0ZWQoKSB7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvbkVycm9yIGlzIGNhbGxlZCB3aGVuIHNvbWUgc2VlbWluZ2x5IHVucmVjb3ZlcmFibGUgZXJyb3JcbiAgICAgKiBvY2N1cnMsIG92ZXJyaWRlIGl0IHRvIGhhbmRsZSBlcnJvcnMgb24geW91ciBvd24uXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXJyIFxuICAgICAqIEByZXR1cm5zIHtudWxsfFByb21pc2V9XG4gICAgICovXG4gICAgb25FcnJvcihlcnIpIHtcblxuICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2spO1xuICAgICAgcHJvY2Vzcy5leGl0KC0xKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogb24gXG4gICAgICovXG4gICAgb24oKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5vbi5hcHBseSh0aGlzLl9ldmVudHMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgZW1pdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cy5lbWl0LmFwcGx5KHRoaXMuX2V2ZW50cywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdGFydCB0aGUgc2VydmVyIGZvciB0aGlzIEFwcGxpY2F0aW9uXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBzdGFydCgpIHtcblxuICAgICAgICBpZiAodGhpcy5zZXJ2ZXIgIT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuc3RhcnQoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tYWluLmxvYWQodGhpcy5mcmFtZXdvcmtBcHApLlxuICAgICAgICB0aGVuKCgpID0+IHtcblxuXG4gICAgICAgICAgICB0aGlzLnNlcnZlciA9IG5ldyBNYW5hZ2VkU2VydmVyKFxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQoJ3BvcnQnLCBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDApLFxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQoJ2hvc3QnLCBwcm9jZXNzLmVudi5IT1NUIHx8ICcwLjAuMC4wJyksXG4gICAgICAgICAgICAgICAgbmV3IFBvd2Vyc3RvbmVTZXJ2ZXIodGhpcy5fX2NyZWF0ZVNlcnZlcigpKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZlci5zdGFydCgpO1xuXG4gICAgICAgIH0pLlxuICAgICAgICB0aGVuKHBvcnQgPT4gY29uc29sZS5sb2cocG9ydCkpLlxuICAgICAgICBjYXRjaChlPT50aGlzLm9uRXJyb3IoZSkpO1xuICAgICAgICBcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwbGljYXRpb247XG4iXX0=