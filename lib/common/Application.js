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

                _this.server = new _commonManagedServer2['default'](_this.main.configuration.read(_this.configuration.keys.PORT, process.env.PORT || 3000), _this.main.configuration.read(_this.configuration.keys.PORT, process.env.HOST || '0.0.0.0'), new _commonPowerstoneServer2['default'](_this.__createServer()));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vQXBwbGljYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzRCQUFxQixlQUFlOzs7O3NDQUNQLDRCQUE0Qjs7OzttQ0FDL0IseUJBQXlCOzs7Ozs7Ozs7Ozs7Ozs7OztJQWM3QyxXQUFXO0FBRUYsYUFGVCxXQUFXLENBRUQsSUFBSSxFQUFFOzhCQUZoQixXQUFXOztBQUlULFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ25CLFlBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFlBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLFlBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLFlBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0tBRXhCOzs7Ozs7O2lCQVpDLFdBQVc7O2VBa0JGLHVCQUFHOztBQUVWLG1CQUFPLElBQUksQ0FBQztTQUVmOzs7Ozs7Ozs7O2VBUU0saUJBQUMsR0FBRyxFQUFFOztBQUVULG1CQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixtQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLG1CQUFPLElBQUksQ0FBQztTQUVmOzs7Ozs7O2VBS0MsY0FBRztBQUNELGdCQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNsRDs7O2VBRUcsZ0JBQUc7QUFDSCxtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUMzRDs7Ozs7Ozs7ZUFNSSxpQkFBRzs7O0FBRUosZ0JBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFL0IsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUN4QyxJQUFJLENBQUMsWUFBTTs7QUFHUCxzQkFBSyxNQUFNLEdBQUcscUNBRVYsTUFBSyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsRUFFN0IsTUFBSyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsRUFFbEMsd0NBQXFCLE1BQUssY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUVqRCx1QkFBTyxNQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUU5QixDQUFDLENBQ0YsSUFBSSxDQUFDLFVBQUEsSUFBSTt1QkFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQzthQUFBLENBQUMsU0FDMUIsQ0FBQyxVQUFBLENBQUM7dUJBQUksTUFBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQUEsQ0FBQyxDQUFDO1NBRy9COzs7V0EvRUMsV0FBVzs7O3FCQWtGRixXQUFXIiwiZmlsZSI6IkFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BlcnR5IGZyb20gJ3Byb3BlcnR5LXNlZWsnO1xuaW1wb3J0IFBvd2Vyc3RvbmVTZXJ2ZXIgZnJvbSAnLi4vY29tbW9uL1Bvd2Vyc3RvbmVTZXJ2ZXInO1xuaW1wb3J0IE1hbmFnZWRTZXJ2ZXIgZnJvbSAnLi4vY29tbW9uL01hbmFnZWRTZXJ2ZXInO1xuXG4vKipcbiAqIEFwcGxpY2F0aW9uIGlzIHRoZSBtYWluIGNsYXNzIG9mIHRoZSBmcmFtZXdvcmsuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBpbnRpYWxpemUgdGhpcyBBcHBsaWNhdGlvbiB0by4gXG4gKlxuICogQHByb3BlcnR5IHtNb2R1bGV9IG1haW4gLSBUaGUgbWFpbiBNb2R1bGUgZm9yIHRoaXMgQXBwbGljYXRpb24uXG4gKiBAcHJvcGVydHkge01hbmFnZWRTZXJ2ZXJ9IHNlcnZlciAtIFRoZSBtYW5hZ2VkIGh0dHAgc2VydmVyLiAgXG4gKiBAcHJvcGVydHkge29iamVjdH0gY29udHJvbGxlcnMgLSBDb250cm9sbGVycyBsb2FkZWQgaW50byBtZW1vcnkuXG4gKiBAcHJvcGVydHkge29iamVjdH0gbW9kZWxzIC0gTW9kZWxzIGxvYWRlZCBpbnRvIG1lbW9yeS5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBjb25uZWN0b3JzIC0gVmFyaW91cyBjb25uZWN0b3JzIGRlZmluZWQgZm9yIGVzdGFibGlzaGluZyByZW1vdGUgY29ubmVjdGlvbnNcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBtaWRkbGV3YXJlIC0gTWlkZGxld2FyZSBsb2FkZWQgaW50byBtZW1vcnkuXG4gKiBAcHJvcGVydHkge01hbmFnZWRTZXJ2ZXJ8bnVsbH0gc2VydmVyIC0gVGhlIGludGVybmFsIG1hbmFnZWQgc2VydmVyIHRoYXQgc2VydmVzIGNsaWVudHMuXG4gKi9cbmNsYXNzIEFwcGxpY2F0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKHBhdGgpIHtcblxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgICB0aGlzLm5hbWUgPSAnbWFpbic7XG4gICAgICAgIHRoaXMuc2VydmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250cm9sbGVycyA9IHt9O1xuICAgICAgICB0aGlzLm1vZGVscyA9IHt9O1xuICAgICAgICB0aGlzLm1pZGRsZXdhcmUgPSB7fTtcbiAgICAgICAgdGhpcy5jb25uZWN0b3JzID0ge307XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvbkNvbm5lY3RlZCBpcyBjYWxsZWQgd2hlbiBjb25uZWN0aW9ucyBoYXZlIGJlZW4gZXN0YWJsaXNoZWQuXG4gICAgICogQHJldHVybiB7UHJvbWlzZXxudWxsfVxuICAgICAqL1xuICAgIG9uQ29ubmVjdGVkKCkge1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogb25FcnJvciBpcyBjYWxsZWQgd2hlbiBzb21lIHNlZW1pbmdseSB1bnJlY292ZXJhYmxlIGVycm9yXG4gICAgICogb2NjdXJzLCBvdmVycmlkZSBpdCB0byBoYW5kbGUgZXJyb3JzIG9uIHlvdXIgb3duLlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGVyciBcbiAgICAgKiBAcmV0dXJucyB7bnVsbHxQcm9taXNlfVxuICAgICAqL1xuICAgIG9uRXJyb3IoZXJyKSB7XG5cbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2spO1xuICAgICAgICBwcm9jZXNzLmV4aXQoLTEpO1xuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG9uIFxuICAgICAqL1xuICAgIG9uKCkge1xuICAgICAgICB0aGlzLl9ldmVudHMub24uYXBwbHkodGhpcy5fZXZlbnRzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGVtaXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHMuZW1pdC5hcHBseSh0aGlzLl9ldmVudHMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc3RhcnQgdGhlIHNlcnZlciBmb3IgdGhpcyBBcHBsaWNhdGlvblxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VydmVyICE9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyLnN0YXJ0KCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWFpbi5sb2FkKHRoaXMuZnJhbWV3b3JrQXBwKS5cbiAgICAgICAgdGhlbigoKSA9PiB7XG5cblxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgTWFuYWdlZFNlcnZlcihcblxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuUE9SVCxcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwKSxcblxuICAgICAgICAgICAgICAgIHRoaXMubWFpbi5jb25maWd1cmF0aW9uLnJlYWQodGhpcy5jb25maWd1cmF0aW9uLmtleXMuUE9SVCxcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuSE9TVCB8fCAnMC4wLjAuMCcpLFxuXG4gICAgICAgICAgICAgICAgbmV3IFBvd2Vyc3RvbmVTZXJ2ZXIodGhpcy5fX2NyZWF0ZVNlcnZlcigpKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZlci5zdGFydCgpO1xuXG4gICAgICAgIH0pLlxuICAgICAgICB0aGVuKHBvcnQgPT4gY29uc29sZS5sb2cocG9ydCkpLlxuICAgICAgICBjYXRjaChlID0+IHRoaXMub25FcnJvcihlKSk7XG5cblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwbGljYXRpb247XG4iXX0=