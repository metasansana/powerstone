'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Promise = require('bluebird');

/**
 * WebServer wraps around the framework's server implementation to provide
 * the ability to stop and restart the server properly.
 */

var Server = (function () {

    /**
     * @param ServerStrategy strategy
     */

    function Server(strategy) {
        _classCallCheck(this, Server);

        this.server = strategy;
        this.connections = {};
        this.connectionId = 0;
    }

    _createClass(Server, [{
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
         * Starts the server listening on the configured port.
         * @return {Promise}
         */
        value: function start() {

            var self = this;
            return new Promise(function (resolve) {

                self.httpServer = self.app.listen(self.address.port, self.address.host);
                self.reactor.httpServerCreated(self.httpServer, self.address);

                self.server.initialize();
                self.httpServer.on('connection', self.store.bind(self));
                self.httpServer.on('listening', function () {
                    resolve(self);
                });
            });
        }
    }, {
        key: 'shutdown',

        /** Returns a promise that will be fulfilled when the server stops.
         * If the server has not been started, the promise will be fulfilled
         * immediately
         * @return {Promise}
         */
        value: function shutdown() {

            var self = this;

            return new Promise(function (resolve) {
                self.server.close(function (x) {
                    return resolve();
                });
                self.flush();
            });
        }
    }, {
        key: 'restart',
        value: function restart() {
            return this.shutdown().then(this.start.bind(this));
        }
    }]);

    return Server;
})();

exports['default'] = Server;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvU2VydmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7Ozs7SUFNNUIsTUFBTTs7Ozs7O0FBS0csYUFMVCxNQUFNLENBS0ksUUFBUSxFQUFFOzhCQUxwQixNQUFNOztBQU1KLFlBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLFlBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLFlBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCOztpQkFUQyxNQUFNOztlQVdGLGdCQUFDLE1BQU0sRUFBRTs7QUFFWCxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGdCQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQztBQUN2QixrQkFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztBQUVyQyxrQkFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWTtBQUMzQix1QkFBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMzQyxDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztTQUUvQzs7Ozs7OztlQUtJLGlCQUFHOztBQUVKLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWhCLGtCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxRQUFRLEVBQUU7QUFDdEQsb0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEMsb0JBQUksTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUVoQyxDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7ZUFPSSxpQkFBRzs7QUFFSixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFOztBQUVsQyxvQkFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hFLG9CQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUU5RCxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUMzQixvQkFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDeEQsb0JBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxZQUFZO0FBQ3hDLDJCQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2pCLENBQUMsQ0FBQzthQUdOLENBQUMsQ0FBQztTQUNOOzs7Ozs7Ozs7ZUFPTyxvQkFBRzs7QUFFUCxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVoQixtQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRTtBQUNsQyxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBQSxDQUFDOzJCQUFFLE9BQU8sRUFBRTtpQkFBQSxDQUFDLENBQUM7QUFDbEMsb0JBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoQixDQUFDLENBQUM7U0FFTjs7O2VBRU0sbUJBQUc7QUFDTixtQkFBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDdEQ7OztXQWhGQyxNQUFNOzs7cUJBc0ZHLE1BQU0iLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xuXG4vKipcbiAqIFdlYlNlcnZlciB3cmFwcyBhcm91bmQgdGhlIGZyYW1ld29yaydzIHNlcnZlciBpbXBsZW1lbnRhdGlvbiB0byBwcm92aWRlXG4gKiB0aGUgYWJpbGl0eSB0byBzdG9wIGFuZCByZXN0YXJ0IHRoZSBzZXJ2ZXIgcHJvcGVybHkuXG4gKi9cbmNsYXNzIFNlcnZlciB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gU2VydmVyU3RyYXRlZ3kgc3RyYXRlZ3lcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzdHJhdGVneSkge1xuICAgICAgICB0aGlzLnN0cmF0ZWd5ID0gc3RyYXRlZ3k7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uSWQgPSAwO1xuICAgIH1cblxuICAgIF9zdG9yZShzb2NrZXQpIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbklkICs9IDE7XG4gICAgICAgIHNvY2tldC5fc2VydmVySWQgPSBzZWxmLmNvbm5lY3Rpb25JZDtcblxuICAgICAgICBzb2NrZXQub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVsZXRlIHNlbGYuY29ubmVjdGlvbnNbdGhpcy5fc2VydmVySWRdO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLmNvbm5lY3Rpb25zW3NvY2tldC5fc2VydmVySWRdID0gc29ja2V0O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZmx1c2ggZGVzdHJveXMgYWxsIGN1cnJlbnQgb3BlbiBjb25uZWN0aW9ucyB0byB0aGUgc2VydmVyLlxuICAgICAqL1xuICAgIGZsdXNoKCkge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBPYmplY3Qua2V5cyhzZWxmLmNvbm5lY3Rpb25zKS5mb3JFYWNoKGZ1bmN0aW9uIChzb2NrZXRJZCkge1xuICAgICAgICAgICAgdmFyIHNvY2tldCA9IHNlbGYuY29ubmVjdGlvbnNbc29ja2V0SWRdO1xuICAgICAgICAgICAgaWYgKHNvY2tldCkgc29ja2V0LmRlc3Ryb3koKTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0aGUgc2VydmVyIGxpc3RlbmluZyBvbiB0aGUgY29uZmlndXJlZCBwb3J0LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblxuICAgICAgICAgICAgc2VsZi5odHRwU2VydmVyID0gc2VsZi5hcHAubGlzdGVuKHNlbGYuYWRkcmVzcy5wb3J0LCBzZWxmLmFkZHJlc3MuaG9zdCk7XG4gICAgICAgICAgICBzZWxmLnJlYWN0b3IuaHR0cFNlcnZlckNyZWF0ZWQoc2VsZi5odHRwU2VydmVyLCBzZWxmLmFkZHJlc3MpO1xuXG4gICAgICAgICAgICBzZWxmLnN0cmF0ZWd5LmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgIHNlbGYuaHR0cFNlcnZlci5vbignY29ubmVjdGlvbicsIHNlbGYuc3RvcmUuYmluZChzZWxmKSk7XG4gICAgICAgICAgICBzZWxmLmh0dHBTZXJ2ZXIub24oJ2xpc3RlbmluZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHNlbGYpO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGJlIGZ1bGZpbGxlZCB3aGVuIHRoZSBzZXJ2ZXIgc3RvcHMuXG4gICAgICogSWYgdGhlIHNlcnZlciBoYXMgbm90IGJlZW4gc3RhcnRlZCwgdGhlIHByb21pc2Ugd2lsbCBiZSBmdWxmaWxsZWRcbiAgICAgKiBpbW1lZGlhdGVseVxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgc2h1dGRvd24oKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgc2VsZi5zdHJhdGVneS5jbG9zZSh4PT5yZXNvbHZlKCkpO1xuICAgICAgICAgICAgc2VsZi5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHJlc3RhcnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNodXRkb3duKCkudGhlbih0aGlzLnN0YXJ0LmJpbmQodGhpcykpO1xuICAgIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgU2VydmVyO1xuXG5cblxuXG5cbiJdfQ==