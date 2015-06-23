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

    function ManagedServer(server) {
        _classCallCheck(this, ManagedServer);

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
                    return resolve(self);
                });
                self.server.listen();
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
        value: function listen() {
            throw new _UnsupportedMethodError2['default']('listen', 'ManagedServer');
        }
    }, {
        key: 'close',
        value: function close() {
            throw new _UnsupportedMethodError2['default']('listen', 'ManagedServer');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NYW5hZ2VkU2VydmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt3QkFBb0IsVUFBVTs7OztzQ0FDSywwQkFBMEI7Ozs7Ozs7Ozs7Ozs7O0lBV3ZELGFBQWE7Ozs7OztBQUtKLGFBTFQsYUFBYSxDQUtILE1BQU0sRUFBRTs4QkFMbEIsYUFBYTs7QUFNWCxZQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixZQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN0QixZQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztLQUN6Qjs7aUJBVEMsYUFBYTs7ZUFXVCxnQkFBQyxNQUFNLEVBQUU7O0FBRVgsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixnQkFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUM7QUFDdkIsa0JBQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7QUFFckMsa0JBQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVk7QUFDM0IsdUJBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDM0MsQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUM7U0FFL0M7Ozs7Ozs7ZUFLSSxpQkFBRzs7QUFFSixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVoQixrQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsUUFBUSxFQUFFO0FBQ3RELG9CQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLG9CQUFJLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7YUFFaEMsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7O2VBT0ksaUJBQUc7O0FBRUosZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixtQkFBTywwQkFBWSxVQUFVLE9BQU8sRUFBRTtBQUNsQyxvQkFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDckQsb0JBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFBLENBQUM7MkJBQUUsT0FBTyxDQUFDLElBQUksQ0FBQztpQkFBQSxDQUFDLENBQUM7QUFDOUMsb0JBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDeEIsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7O2VBTU8sb0JBQUc7QUFDUCxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLG1CQUFPLDBCQUFZLFVBQVUsT0FBTyxFQUFFO0FBQ2xDLG9CQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFBLENBQUM7MkJBQUUsT0FBTyxDQUFDLElBQUksQ0FBQztpQkFBQSxDQUFDLENBQUM7QUFDcEMsb0JBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoQixDQUFDLENBQUM7U0FFTjs7Ozs7Ozs7ZUFNTSxtQkFBRztBQUNOLG1CQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN0RDs7O2VBRUMsWUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFO0FBQ1YsZ0JBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMxQixtQkFBTyxJQUFJLENBQUM7U0FDZjs7O2VBRUssa0JBQUc7QUFDTCxrQkFBTSx3Q0FBMkIsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQy9EOzs7ZUFFSSxpQkFBRztBQUNKLGtCQUFNLHdDQUEyQixRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDL0Q7OztlQUVnQiw2QkFBRztBQUNoQixtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDMUM7OztXQTFGQyxhQUFhOzs7cUJBOEZKLGFBQWEiLCJmaWxlIjoiTWFuYWdlZFNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBVbnN1cHBvcnRlZE1ldGhvZEVycm9yIGZyb20gJy4vVW5zdXBwb3J0ZWRNZXRob2RFcnJvcic7XG5cbi8qKlxuICogTWFuYWdlZFNlcnZlciB3cmFwcyBhcm91bmQgYSBTZXJ2ZXIgdG8gYWRkIGFkZGl0aW9uYWwgZmVhdHVyZXMuXG4gKlxuICogQnkgd3JhcHBpbmcgYXJvdW5kIHRoZSBzZXJ2ZXIgaW1wbGVtZW50YXRpb24sIHdlIGdhaW4gdGhlIGFiaWxpdHlcbiAqIHRvIHNodXRkb3duIGFuZCByZXN0YXJ0IHRoZSBzZXJ2ZXIgd2hlbiBuZWVkZWQuIEVhY2ggdGltZVxuICogdGhlIHNlcnZlciBpcyBzdG9wcGVkLCB3ZSBkZXN0cm95IGFsbCBleGlzdGluZyBzb2NrZXQgY29ubmVjdGlvbnNcbiAqIHNvIG5vZGUgZG9lcyBub3Qgd2FpdCBvbiB0aGVtIHRvIGVuZCBiZWZvcmUgY2FsbGluZyB0aGUgY2xvc2UoKSBjYWxsYmFjay5cbiAqIEBpbXBsZW1lbnRzIFNlcnZlclxuICovXG5jbGFzcyBNYW5hZ2VkU2VydmVye1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIFNlcnZlciBzZXJ2ZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uSWQgPSAwO1xuICAgIH1cblxuICAgIF9zdG9yZShzb2NrZXQpIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbklkICs9IDE7XG4gICAgICAgIHNvY2tldC5fc2VydmVySWQgPSBzZWxmLmNvbm5lY3Rpb25JZDtcblxuICAgICAgICBzb2NrZXQub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVsZXRlIHNlbGYuY29ubmVjdGlvbnNbdGhpcy5fc2VydmVySWRdO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLmNvbm5lY3Rpb25zW3NvY2tldC5fc2VydmVySWRdID0gc29ja2V0O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZmx1c2ggZGVzdHJveXMgYWxsIGN1cnJlbnQgb3BlbiBjb25uZWN0aW9ucyB0byB0aGUgc2VydmVyLlxuICAgICAqL1xuICAgIGZsdXNoKCkge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBPYmplY3Qua2V5cyhzZWxmLmNvbm5lY3Rpb25zKS5mb3JFYWNoKGZ1bmN0aW9uIChzb2NrZXRJZCkge1xuICAgICAgICAgICAgdmFyIHNvY2tldCA9IHNlbGYuY29ubmVjdGlvbnNbc29ja2V0SWRdO1xuICAgICAgICAgICAgaWYgKHNvY2tldCkgc29ja2V0LmRlc3Ryb3koKTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIHN0YXJ0IHRoaXMgc2VydmVyXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBzdGFydCgpIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgc2VsZi5zZXJ2ZXIub24oJ2Nvbm5lY3Rpb24nLCBzZWxmLl9zdG9yZS5iaW5kKHNlbGYpKTtcbiAgICAgICAgICAgIHNlbGYuc2VydmVyLm9uKCdsaXN0ZW5pbmcnLCB4PT5yZXNvbHZlKHNlbGYpKTtcbiAgICAgICAgICAgIHNlbGYuc2VydmVyLmxpc3RlbigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzaHV0ZG93biB0aGlzIHNlcnZlclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgc2h1dGRvd24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICBzZWxmLnNlcnZlci5jbG9zZSh4PT5yZXNvbHZlKHNlbGYpKTtcbiAgICAgICAgICAgIHNlbGYuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXN0YXJ0IHRoaXMgc2VydmVyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgcmVzdGFydCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2h1dGRvd24oKS50aGVuKHRoaXMuc3RhcnQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIHRoaXMuc2VydmVyLm9uKGV2ZW50LCBmbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxpc3RlbigpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuc3VwcG9ydGVkTWV0aG9kRXJyb3IoJ2xpc3RlbicsICdNYW5hZ2VkU2VydmVyJyk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZE1ldGhvZEVycm9yKCdsaXN0ZW4nLCAnTWFuYWdlZFNlcnZlcicpO1xuICAgIH1cblxuICAgIHRvRnJhbWV3b3JrU2VydmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIudG9GcmFtZVdvcmtTZXJ2ZXIoKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlZFNlcnZlcjtcblxuXG5cblxuXG4iXX0=