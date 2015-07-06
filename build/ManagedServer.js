'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _UnsupportedMethodError = require('./UnsupportedMethodError');

var _UnsupportedMethodError2 = _interopRequireDefault(_UnsupportedMethodError);

/**
 * ManagedServer wraps around a Server to add additional features.
 *
 * By wrapping around the server implementation, we gain the ability
 * to shutdown and restart the server when needed. Each time
 * the server is stopped, we destroy all existing socket connections
 * so node does not wait on them to end before calling the close() callback.
 * @implements Server
 */

var ManagedServer = (function () {

    /**
     * @param Server server
     */

    function ManagedServer(port, host, server) {
        _classCallCheck(this, ManagedServer);

        this.port = port;
        this.host = host;
        this.server = server;
        this.connections = {};
        this.connectionId = 0;
    }

    _createClass(ManagedServer, [{
        key: '_store',
        value: function _store(socket) {

            var self = this;
            this.connectionId += 1;
            socket._serverId = self.connectionId;

            socket.on('close', function () {
                delete self.connections[this._serverId];
            });

            self.connections[socket._serverId] = socket;
        }
    }, {
        key: 'flush',

        /**
         * flush destroys all current open connections to the server.
         */
        value: function flush() {

            var self = this;

            Object.keys(self.connections).forEach(function (socketId) {
                var socket = self.connections[socketId];
                if (socket) socket.destroy();
            });
        }
    }, {
        key: 'start',

        /**
         * start this server
         * @return {Promise}
         */
        value: function start() {
            var self = this;
            return new _bluebird2['default'](function (resolve) {
                self.server.on('connection', self._store.bind(self));
                self.server.on('listening', function (x) {
                    return resolve(self.port, self.host, self);
                });
                self.server.listen(self.port, self.host);
            });
        }
    }, {
        key: 'shutdown',

        /**
         * shutdown this server
         * @return {Promise}
         */
        value: function shutdown() {
            var self = this;
            return new _bluebird2['default'](function (resolve) {
                self.server.close(function (x) {
                    return resolve(self);
                });
                self.flush();
            });
        }
    }, {
        key: 'restart',

        /**
         * restart this server
         * @returns {Promise}
         */
        value: function restart() {
            return this.shutdown().then(this.start.bind(this));
        }
    }, {
        key: 'on',
        value: function on(event, fn) {
            this.server.on(event, fn);
            return this;
        }
    }, {
        key: 'listen',
        value: function listen(port, hostname, callback) {
            this.server.listen(port, hostname, callback);
        }
    }, {
        key: 'close',
        value: function close(cb) {
            this.server.close(cb);
        }
    }, {
        key: 'toFrameworkServer',
        value: function toFrameworkServer() {
            return this.server.toFrameWorkServer();
        }
    }]);

    return ManagedServer;
})();

exports['default'] = ManagedServer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NYW5hZ2VkU2VydmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt3QkFBb0IsVUFBVTs7OztzQ0FDSywwQkFBMEI7Ozs7Ozs7Ozs7Ozs7O0lBV3ZELGFBQWE7Ozs7OztBQUtKLGFBTFQsYUFBYSxDQUtILElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFOzhCQUw5QixhQUFhOztBQU1YLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFlBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLFlBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCOztpQkFYQyxhQUFhOztlQWFULGdCQUFDLE1BQU0sRUFBRTs7QUFFWCxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGdCQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQztBQUN2QixrQkFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztBQUVyQyxrQkFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWTtBQUMzQix1QkFBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMzQyxDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztTQUUvQzs7Ozs7OztlQUtJLGlCQUFHOztBQUVKLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWhCLGtCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxRQUFRLEVBQUU7QUFDdEQsb0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEMsb0JBQUksTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUVoQyxDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7ZUFPSSxpQkFBRztBQUNKLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsbUJBQU8sMEJBQVksVUFBVSxPQUFPLEVBQUU7QUFDbEMsb0JBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3JELG9CQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQSxDQUFDOzJCQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO2lCQUFBLENBQUMsQ0FBQztBQUNwRSxvQkFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7O2VBTU8sb0JBQUc7QUFDUCxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLG1CQUFPLDBCQUFZLFVBQVUsT0FBTyxFQUFFO0FBQ2xDLG9CQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFBLENBQUM7MkJBQUUsT0FBTyxDQUFDLElBQUksQ0FBQztpQkFBQSxDQUFDLENBQUM7QUFDcEMsb0JBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoQixDQUFDLENBQUM7U0FFTjs7Ozs7Ozs7ZUFNTSxtQkFBRztBQUNOLG1CQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN0RDs7O2VBRUMsWUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFO0FBQ1YsZ0JBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMxQixtQkFBTyxJQUFJLENBQUM7U0FDZjs7O2VBRUssZ0JBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7QUFDN0IsZ0JBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDaEQ7OztlQUVJLGVBQUMsRUFBRSxFQUFFO0FBQ04sZ0JBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pCOzs7ZUFFZ0IsNkJBQUc7QUFDaEIsbUJBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFDOzs7V0EzRkMsYUFBYTs7O3FCQStGSixhQUFhIiwiZmlsZSI6Ik1hbmFnZWRTZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgVW5zdXBwb3J0ZWRNZXRob2RFcnJvciBmcm9tICcuL1Vuc3VwcG9ydGVkTWV0aG9kRXJyb3InO1xuXG4vKipcbiAqIE1hbmFnZWRTZXJ2ZXIgd3JhcHMgYXJvdW5kIGEgU2VydmVyIHRvIGFkZCBhZGRpdGlvbmFsIGZlYXR1cmVzLlxuICpcbiAqIEJ5IHdyYXBwaW5nIGFyb3VuZCB0aGUgc2VydmVyIGltcGxlbWVudGF0aW9uLCB3ZSBnYWluIHRoZSBhYmlsaXR5XG4gKiB0byBzaHV0ZG93biBhbmQgcmVzdGFydCB0aGUgc2VydmVyIHdoZW4gbmVlZGVkLiBFYWNoIHRpbWVcbiAqIHRoZSBzZXJ2ZXIgaXMgc3RvcHBlZCwgd2UgZGVzdHJveSBhbGwgZXhpc3Rpbmcgc29ja2V0IGNvbm5lY3Rpb25zXG4gKiBzbyBub2RlIGRvZXMgbm90IHdhaXQgb24gdGhlbSB0byBlbmQgYmVmb3JlIGNhbGxpbmcgdGhlIGNsb3NlKCkgY2FsbGJhY2suXG4gKiBAaW1wbGVtZW50cyBTZXJ2ZXJcbiAqL1xuY2xhc3MgTWFuYWdlZFNlcnZlciB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gU2VydmVyIHNlcnZlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBvcnQsIGhvc3QsIHNlcnZlcikge1xuICAgICAgICB0aGlzLnBvcnQgPSBwb3J0O1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgICAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9ucyA9IHt9O1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25JZCA9IDA7XG4gICAgfVxuXG4gICAgX3N0b3JlKHNvY2tldCkge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uSWQgKz0gMTtcbiAgICAgICAgc29ja2V0Ll9zZXJ2ZXJJZCA9IHNlbGYuY29ubmVjdGlvbklkO1xuXG4gICAgICAgIHNvY2tldC5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkZWxldGUgc2VsZi5jb25uZWN0aW9uc1t0aGlzLl9zZXJ2ZXJJZF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuY29ubmVjdGlvbnNbc29ja2V0Ll9zZXJ2ZXJJZF0gPSBzb2NrZXQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmbHVzaCBkZXN0cm95cyBhbGwgY3VycmVudCBvcGVuIGNvbm5lY3Rpb25zIHRvIHRoZSBzZXJ2ZXIuXG4gICAgICovXG4gICAgZmx1c2goKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHNlbGYuY29ubmVjdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKHNvY2tldElkKSB7XG4gICAgICAgICAgICB2YXIgc29ja2V0ID0gc2VsZi5jb25uZWN0aW9uc1tzb2NrZXRJZF07XG4gICAgICAgICAgICBpZiAoc29ja2V0KSBzb2NrZXQuZGVzdHJveSgpO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogc3RhcnQgdGhpcyBzZXJ2ZXJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgc2VsZi5zZXJ2ZXIub24oJ2Nvbm5lY3Rpb24nLCBzZWxmLl9zdG9yZS5iaW5kKHNlbGYpKTtcbiAgICAgICAgICAgIHNlbGYuc2VydmVyLm9uKCdsaXN0ZW5pbmcnLCB4PT5yZXNvbHZlKHNlbGYucG9ydCwgc2VsZi5ob3N0LCBzZWxmKSk7XG4gICAgICAgICAgICBzZWxmLnNlcnZlci5saXN0ZW4oc2VsZi5wb3J0LCBzZWxmLmhvc3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzaHV0ZG93biB0aGlzIHNlcnZlclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgc2h1dGRvd24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICBzZWxmLnNlcnZlci5jbG9zZSh4PT5yZXNvbHZlKHNlbGYpKTtcbiAgICAgICAgICAgIHNlbGYuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXN0YXJ0IHRoaXMgc2VydmVyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgcmVzdGFydCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2h1dGRvd24oKS50aGVuKHRoaXMuc3RhcnQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIHRoaXMuc2VydmVyLm9uKGV2ZW50LCBmbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxpc3Rlbihwb3J0LCBob3N0bmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGlzdGVuKHBvcnQsIGhvc3RuYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgY2xvc2UoY2IpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIuY2xvc2UoY2IpO1xuICAgIH1cblxuICAgIHRvRnJhbWV3b3JrU2VydmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIudG9GcmFtZVdvcmtTZXJ2ZXIoKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlZFNlcnZlcjtcblxuXG5cblxuXG4iXX0=