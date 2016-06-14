'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

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

        /**
         * flush destroys all current open connections to the server.
         */
    }, {
        key: 'flush',
        value: function flush() {

            var self = this;

            Object.keys(self.connections).forEach(function (socketId) {
                var socket = self.connections[socketId];
                if (socket) socket.destroy();
            });
        }

        /**
         * start this server
         * @return {Promise}
         */
    }, {
        key: 'start',
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

        /**
         * shutdown this server
         * @return {Promise}
         */
    }, {
        key: 'shutdown',
        value: function shutdown() {
            var self = this;
            return new _bluebird2['default'](function (resolve) {
                self.server.close(function (x) {
                    return resolve(self);
                });
                self.flush();
            });
        }

        /**
         * restart this server
         * @returns {Promise}
         */
    }, {
        key: 'restart',
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
            console.log('lisetning pon  ', arguments);
            this.server.listen(port, hostname, callback);
        }
    }, {
        key: 'close',
        value: function close(cb) {
            this.server.close(cb);
        }
    }, {
        key: 'toFramework',
        value: function toFramework() {
            return this.server.toFramework();
        }
    }]);

    return ManagedServer;
})();

exports['default'] = ManagedServer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vTWFuYWdlZFNlcnZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7d0JBQW9CLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0lBV3hCLGFBQWE7Ozs7OztBQUtKLGFBTFQsYUFBYSxDQUtILElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFOzhCQUw5QixhQUFhOztBQU1YLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFlBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLFlBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCOztpQkFYQyxhQUFhOztlQWFULGdCQUFDLE1BQU0sRUFBRTs7QUFFWCxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGdCQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQztBQUN2QixrQkFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztBQUVyQyxrQkFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBVztBQUMxQix1QkFBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMzQyxDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztTQUUvQzs7Ozs7OztlQUtJLGlCQUFHOztBQUVKLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWhCLGtCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxRQUFRLEVBQUU7QUFDckQsb0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEMsb0JBQUksTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUVoQyxDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7ZUFPSSxpQkFBRztBQUNKLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsbUJBQU8sMEJBQVksVUFBUyxPQUFPLEVBQUU7QUFDakMsb0JBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3JELG9CQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQSxDQUFDOzJCQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO2lCQUFBLENBQUMsQ0FBQztBQUN0RSxvQkFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7O2VBTU8sb0JBQUc7QUFDUCxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLG1CQUFPLDBCQUFZLFVBQVMsT0FBTyxFQUFFO0FBQ2pDLG9CQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFBLENBQUM7MkJBQUksT0FBTyxDQUFDLElBQUksQ0FBQztpQkFBQSxDQUFDLENBQUM7QUFDdEMsb0JBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoQixDQUFDLENBQUM7U0FFTjs7Ozs7Ozs7ZUFNTSxtQkFBRztBQUNOLG1CQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN0RDs7O2VBRUMsWUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFO0FBQ1YsZ0JBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMxQixtQkFBTyxJQUFJLENBQUM7U0FDZjs7O2VBRUssZ0JBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7QUFDN0IsbUJBQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDMUMsZ0JBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDaEQ7OztlQUVJLGVBQUMsRUFBRSxFQUFFO0FBQ04sZ0JBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pCOzs7ZUFFVSx1QkFBRztBQUNWLG1CQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEM7OztXQTVGQyxhQUFhOzs7cUJBZ0dKLGFBQWEiLCJmaWxlIjoiTWFuYWdlZFNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcblxuLyoqXG4gKiBNYW5hZ2VkU2VydmVyIHdyYXBzIGFyb3VuZCBhIFNlcnZlciB0byBhZGQgYWRkaXRpb25hbCBmZWF0dXJlcy5cbiAqXG4gKiBCeSB3cmFwcGluZyBhcm91bmQgdGhlIHNlcnZlciBpbXBsZW1lbnRhdGlvbiwgd2UgZ2FpbiB0aGUgYWJpbGl0eVxuICogdG8gc2h1dGRvd24gYW5kIHJlc3RhcnQgdGhlIHNlcnZlciB3aGVuIG5lZWRlZC4gRWFjaCB0aW1lXG4gKiB0aGUgc2VydmVyIGlzIHN0b3BwZWQsIHdlIGRlc3Ryb3kgYWxsIGV4aXN0aW5nIHNvY2tldCBjb25uZWN0aW9uc1xuICogc28gbm9kZSBkb2VzIG5vdCB3YWl0IG9uIHRoZW0gdG8gZW5kIGJlZm9yZSBjYWxsaW5nIHRoZSBjbG9zZSgpIGNhbGxiYWNrLlxuICogQGltcGxlbWVudHMgU2VydmVyXG4gKi9cbmNsYXNzIE1hbmFnZWRTZXJ2ZXIge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIFNlcnZlciBzZXJ2ZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwb3J0LCBob3N0LCBzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uSWQgPSAwO1xuICAgIH1cblxuICAgIF9zdG9yZShzb2NrZXQpIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbklkICs9IDE7XG4gICAgICAgIHNvY2tldC5fc2VydmVySWQgPSBzZWxmLmNvbm5lY3Rpb25JZDtcblxuICAgICAgICBzb2NrZXQub24oJ2Nsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZWxldGUgc2VsZi5jb25uZWN0aW9uc1t0aGlzLl9zZXJ2ZXJJZF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGYuY29ubmVjdGlvbnNbc29ja2V0Ll9zZXJ2ZXJJZF0gPSBzb2NrZXQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmbHVzaCBkZXN0cm95cyBhbGwgY3VycmVudCBvcGVuIGNvbm5lY3Rpb25zIHRvIHRoZSBzZXJ2ZXIuXG4gICAgICovXG4gICAgZmx1c2goKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHNlbGYuY29ubmVjdGlvbnMpLmZvckVhY2goZnVuY3Rpb24oc29ja2V0SWQpIHtcbiAgICAgICAgICAgIHZhciBzb2NrZXQgPSBzZWxmLmNvbm5lY3Rpb25zW3NvY2tldElkXTtcbiAgICAgICAgICAgIGlmIChzb2NrZXQpIHNvY2tldC5kZXN0cm95KCk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBzdGFydCB0aGlzIHNlcnZlclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICAgIHNlbGYuc2VydmVyLm9uKCdjb25uZWN0aW9uJywgc2VsZi5fc3RvcmUuYmluZChzZWxmKSk7XG4gICAgICAgICAgICBzZWxmLnNlcnZlci5vbignbGlzdGVuaW5nJywgeCA9PiByZXNvbHZlKHNlbGYucG9ydCwgc2VsZi5ob3N0LCBzZWxmKSk7XG4gICAgICAgICAgICBzZWxmLnNlcnZlci5saXN0ZW4oc2VsZi5wb3J0LCBzZWxmLmhvc3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzaHV0ZG93biB0aGlzIHNlcnZlclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgc2h1dGRvd24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICAgIHNlbGYuc2VydmVyLmNsb3NlKHggPT4gcmVzb2x2ZShzZWxmKSk7XG4gICAgICAgICAgICBzZWxmLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVzdGFydCB0aGlzIHNlcnZlclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHJlc3RhcnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNodXRkb3duKCkudGhlbih0aGlzLnN0YXJ0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG9uKGV2ZW50LCBmbikge1xuICAgICAgICB0aGlzLnNlcnZlci5vbihldmVudCwgZm4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBsaXN0ZW4ocG9ydCwgaG9zdG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdsaXNldG5pbmcgcG9uICAnLCBhcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnNlcnZlci5saXN0ZW4ocG9ydCwgaG9zdG5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBjbG9zZShjYikge1xuICAgICAgICB0aGlzLnNlcnZlci5jbG9zZShjYik7XG4gICAgfVxuXG4gICAgdG9GcmFtZXdvcmsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlci50b0ZyYW1ld29yaygpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VkU2VydmVyO1xuIl19