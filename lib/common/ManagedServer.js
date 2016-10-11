'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ManagedServer wraps around a Server to add additional features.
 *
 * By wrapping around the server implementation, we gain the ability
 * to shutdown and restart the server when needed. Each time
 * the server is stopped, we destroy all existing socket connections
 * so node does not wait on them to end before calling the close() callback.
 * @implements Server
 */
var ManagedServer = function () {

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
            return new _bluebird2.default(function (resolve) {
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
            return new _bluebird2.default(function (resolve) {
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
}();

exports.default = ManagedServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vTWFuYWdlZFNlcnZlci5qcyJdLCJuYW1lcyI6WyJNYW5hZ2VkU2VydmVyIiwicG9ydCIsImhvc3QiLCJzZXJ2ZXIiLCJjb25uZWN0aW9ucyIsImNvbm5lY3Rpb25JZCIsInNvY2tldCIsInNlbGYiLCJfc2VydmVySWQiLCJvbiIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwic29ja2V0SWQiLCJkZXN0cm95IiwicmVzb2x2ZSIsIl9zdG9yZSIsImJpbmQiLCJsaXN0ZW4iLCJjbG9zZSIsImZsdXNoIiwic2h1dGRvd24iLCJ0aGVuIiwic3RhcnQiLCJldmVudCIsImZuIiwiaG9zdG5hbWUiLCJjYWxsYmFjayIsImNvbnNvbGUiLCJsb2ciLCJhcmd1bWVudHMiLCJjYiIsInRvRnJhbWV3b3JrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztBQUVBOzs7Ozs7Ozs7SUFTTUEsYTs7QUFFRjs7O0FBR0EsMkJBQVlDLElBQVosRUFBa0JDLElBQWxCLEVBQXdCQyxNQUF4QixFQUFnQztBQUFBOztBQUM1QixhQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsYUFBS0MsWUFBTCxHQUFvQixDQUFwQjtBQUNIOzs7OytCQUVNQyxNLEVBQVE7O0FBRVgsZ0JBQUlDLE9BQU8sSUFBWDtBQUNBLGlCQUFLRixZQUFMLElBQXFCLENBQXJCO0FBQ0FDLG1CQUFPRSxTQUFQLEdBQW1CRCxLQUFLRixZQUF4Qjs7QUFFQUMsbUJBQU9HLEVBQVAsQ0FBVSxPQUFWLEVBQW1CLFlBQVc7QUFDMUIsdUJBQU9GLEtBQUtILFdBQUwsQ0FBaUIsS0FBS0ksU0FBdEIsQ0FBUDtBQUNILGFBRkQ7O0FBSUFELGlCQUFLSCxXQUFMLENBQWlCRSxPQUFPRSxTQUF4QixJQUFxQ0YsTUFBckM7QUFFSDs7QUFFRDs7Ozs7O2dDQUdROztBQUVKLGdCQUFJQyxPQUFPLElBQVg7O0FBRUFHLG1CQUFPQyxJQUFQLENBQVlKLEtBQUtILFdBQWpCLEVBQThCUSxPQUE5QixDQUFzQyxVQUFTQyxRQUFULEVBQW1CO0FBQ3JELG9CQUFJUCxTQUFTQyxLQUFLSCxXQUFMLENBQWlCUyxRQUFqQixDQUFiO0FBQ0Esb0JBQUlQLE1BQUosRUFBWUEsT0FBT1EsT0FBUDtBQUVmLGFBSkQ7QUFLSDs7QUFHRDs7Ozs7OztnQ0FJUTtBQUNKLGdCQUFJUCxPQUFPLElBQVg7QUFDQSxtQkFBTyx1QkFBWSxVQUFTUSxPQUFULEVBQWtCO0FBQ2pDUixxQkFBS0osTUFBTCxDQUFZTSxFQUFaLENBQWUsWUFBZixFQUE2QkYsS0FBS1MsTUFBTCxDQUFZQyxJQUFaLENBQWlCVixJQUFqQixDQUE3QjtBQUNBQSxxQkFBS0osTUFBTCxDQUFZTSxFQUFaLENBQWUsV0FBZixFQUE0QjtBQUFBLDJCQUFLTSxRQUFRUixLQUFLTixJQUFiLEVBQW1CTSxLQUFLTCxJQUF4QixFQUE4QkssSUFBOUIsQ0FBTDtBQUFBLGlCQUE1QjtBQUNBQSxxQkFBS0osTUFBTCxDQUFZZSxNQUFaLENBQW1CWCxLQUFLTixJQUF4QixFQUE4Qk0sS0FBS0wsSUFBbkM7QUFDSCxhQUpNLENBQVA7QUFLSDs7QUFFRDs7Ozs7OzttQ0FJVztBQUNQLGdCQUFJSyxPQUFPLElBQVg7QUFDQSxtQkFBTyx1QkFBWSxVQUFTUSxPQUFULEVBQWtCO0FBQ2pDUixxQkFBS0osTUFBTCxDQUFZZ0IsS0FBWixDQUFrQjtBQUFBLDJCQUFLSixRQUFRUixJQUFSLENBQUw7QUFBQSxpQkFBbEI7QUFDQUEscUJBQUthLEtBQUw7QUFDSCxhQUhNLENBQVA7QUFLSDs7QUFFRDs7Ozs7OztrQ0FJVTtBQUNOLG1CQUFPLEtBQUtDLFFBQUwsR0FBZ0JDLElBQWhCLENBQXFCLEtBQUtDLEtBQUwsQ0FBV04sSUFBWCxDQUFnQixJQUFoQixDQUFyQixDQUFQO0FBQ0g7OzsyQkFFRU8sSyxFQUFPQyxFLEVBQUk7QUFDVixpQkFBS3RCLE1BQUwsQ0FBWU0sRUFBWixDQUFlZSxLQUFmLEVBQXNCQyxFQUF0QjtBQUNBLG1CQUFPLElBQVA7QUFDSDs7OytCQUVNeEIsSSxFQUFNeUIsUSxFQUFVQyxRLEVBQVU7QUFDN0JDLG9CQUFRQyxHQUFSLENBQVksaUJBQVosRUFBK0JDLFNBQS9CO0FBQ0EsaUJBQUszQixNQUFMLENBQVllLE1BQVosQ0FBbUJqQixJQUFuQixFQUF5QnlCLFFBQXpCLEVBQW1DQyxRQUFuQztBQUNIOzs7OEJBRUtJLEUsRUFBSTtBQUNOLGlCQUFLNUIsTUFBTCxDQUFZZ0IsS0FBWixDQUFrQlksRUFBbEI7QUFDSDs7O3NDQUVhO0FBQ1YsbUJBQU8sS0FBSzVCLE1BQUwsQ0FBWTZCLFdBQVosRUFBUDtBQUNIOzs7Ozs7a0JBSVVoQyxhIiwiZmlsZSI6Ik1hbmFnZWRTZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbi8qKlxuICogTWFuYWdlZFNlcnZlciB3cmFwcyBhcm91bmQgYSBTZXJ2ZXIgdG8gYWRkIGFkZGl0aW9uYWwgZmVhdHVyZXMuXG4gKlxuICogQnkgd3JhcHBpbmcgYXJvdW5kIHRoZSBzZXJ2ZXIgaW1wbGVtZW50YXRpb24sIHdlIGdhaW4gdGhlIGFiaWxpdHlcbiAqIHRvIHNodXRkb3duIGFuZCByZXN0YXJ0IHRoZSBzZXJ2ZXIgd2hlbiBuZWVkZWQuIEVhY2ggdGltZVxuICogdGhlIHNlcnZlciBpcyBzdG9wcGVkLCB3ZSBkZXN0cm95IGFsbCBleGlzdGluZyBzb2NrZXQgY29ubmVjdGlvbnNcbiAqIHNvIG5vZGUgZG9lcyBub3Qgd2FpdCBvbiB0aGVtIHRvIGVuZCBiZWZvcmUgY2FsbGluZyB0aGUgY2xvc2UoKSBjYWxsYmFjay5cbiAqIEBpbXBsZW1lbnRzIFNlcnZlclxuICovXG5jbGFzcyBNYW5hZ2VkU2VydmVyIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBTZXJ2ZXIgc2VydmVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocG9ydCwgaG9zdCwgc2VydmVyKSB7XG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnQ7XG4gICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XG4gICAgICAgIHRoaXMuc2VydmVyID0gc2VydmVyO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zID0ge307XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbklkID0gMDtcbiAgICB9XG5cbiAgICBfc3RvcmUoc29ja2V0KSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25JZCArPSAxO1xuICAgICAgICBzb2NrZXQuX3NlcnZlcklkID0gc2VsZi5jb25uZWN0aW9uSWQ7XG5cbiAgICAgICAgc29ja2V0Lm9uKCdjbG9zZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVsZXRlIHNlbGYuY29ubmVjdGlvbnNbdGhpcy5fc2VydmVySWRdO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLmNvbm5lY3Rpb25zW3NvY2tldC5fc2VydmVySWRdID0gc29ja2V0O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZmx1c2ggZGVzdHJveXMgYWxsIGN1cnJlbnQgb3BlbiBjb25uZWN0aW9ucyB0byB0aGUgc2VydmVyLlxuICAgICAqL1xuICAgIGZsdXNoKCkge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBPYmplY3Qua2V5cyhzZWxmLmNvbm5lY3Rpb25zKS5mb3JFYWNoKGZ1bmN0aW9uKHNvY2tldElkKSB7XG4gICAgICAgICAgICB2YXIgc29ja2V0ID0gc2VsZi5jb25uZWN0aW9uc1tzb2NrZXRJZF07XG4gICAgICAgICAgICBpZiAoc29ja2V0KSBzb2NrZXQuZGVzdHJveSgpO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogc3RhcnQgdGhpcyBzZXJ2ZXJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgICBzZWxmLnNlcnZlci5vbignY29ubmVjdGlvbicsIHNlbGYuX3N0b3JlLmJpbmQoc2VsZikpO1xuICAgICAgICAgICAgc2VsZi5zZXJ2ZXIub24oJ2xpc3RlbmluZycsIHggPT4gcmVzb2x2ZShzZWxmLnBvcnQsIHNlbGYuaG9zdCwgc2VsZikpO1xuICAgICAgICAgICAgc2VsZi5zZXJ2ZXIubGlzdGVuKHNlbGYucG9ydCwgc2VsZi5ob3N0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2h1dGRvd24gdGhpcyBzZXJ2ZXJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHNodXRkb3duKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgICBzZWxmLnNlcnZlci5jbG9zZSh4ID0+IHJlc29sdmUoc2VsZikpO1xuICAgICAgICAgICAgc2VsZi5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlc3RhcnQgdGhpcyBzZXJ2ZXJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICByZXN0YXJ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaHV0ZG93bigpLnRoZW4odGhpcy5zdGFydC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBvbihldmVudCwgZm4pIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIub24oZXZlbnQsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGlzdGVuKHBvcnQsIGhvc3RuYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zb2xlLmxvZygnbGlzZXRuaW5nIHBvbiAgJywgYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGlzdGVuKHBvcnQsIGhvc3RuYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgY2xvc2UoY2IpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIuY2xvc2UoY2IpO1xuICAgIH1cblxuICAgIHRvRnJhbWV3b3JrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIudG9GcmFtZXdvcmsoKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlZFNlcnZlcjtcbiJdfQ==