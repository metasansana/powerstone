'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * HttpServer
 * @interface
 */
var HttpServer = function () {
    function HttpServer() {
        _classCallCheck(this, HttpServer);
    }

    _createClass(HttpServer, [{
        key: 'listen',
        value: function listen() {}
    }, {
        key: 'on',
        value: function on() {}
    }, {
        key: 'close',
        value: function close() {}
    }]);

    return HttpServer;
}();

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
     * @param {number} port
     * @param {string} host
     * @param {HttpServer} server
     */
    function ManagedServer(port, host, server) {
        _classCallCheck(this, ManagedServer);

        (0, _beof2.default)({ port: port }).number();
        (0, _beof2.default)({ host: host }).string();
        (0, _beof2.default)({ server: server }).interface(HttpServer);

        this.port = port;
        this.host = host;
        this.server = server;
        this.connections = {};
        this.connectionId = 0;
    }

    _createClass(ManagedServer, [{
        key: '_store',
        value: function _store(socket) {
            var _this = this;

            this.connectionId += 1;
            socket._serverId = this.connectionId;

            socket.on('close', function () {
                _this.connections[_this._serverId] = null;
            });

            this.connections[socket._serverId] = socket;
        }

        /**
         * flush destroys all current open connections to the server.
         */

    }, {
        key: 'flush',
        value: function flush() {
            var _this2 = this;

            Object.keys(this.connections).forEach(function (socketId) {
                if (_this2.connections[socketId]) _this2.connections[socketId].destroy();
            });
        }

        /**
         * start this server
         * @return {Promise}
         */

    }, {
        key: 'start',
        value: function start() {
            var _this3 = this;

            return new _bluebird2.default(function (resolve) {
                _this3.server.on('connection', function (socket) {
                    return _this3._store(socket);
                });
                _this3.server.on('listening', function (x) {
                    return resolve(_this3.port, _this3.host, _this3);
                });
                _this3.server.listen(_this3.port, _this3.host);
            });
        }

        /**
         * shutdown this server
         * @return {Promise}
         */

    }, {
        key: 'shutdown',
        value: function shutdown() {
            var _this4 = this;

            return new _bluebird2.default(function (resolve) {
                _this4.server.close(function (x) {
                    return resolve(_this4);
                });
                _this4.flush();
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

            this.server.listen(port, hostname, callback);
        }
    }, {
        key: 'close',
        value: function close(cb) {

            this.server.close(cb);
        }
    }]);

    return ManagedServer;
}();

exports.default = ManagedServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXQvTWFuYWdlZFNlcnZlci5qcyJdLCJuYW1lcyI6WyJIdHRwU2VydmVyIiwiTWFuYWdlZFNlcnZlciIsInBvcnQiLCJob3N0Iiwic2VydmVyIiwibnVtYmVyIiwic3RyaW5nIiwiaW50ZXJmYWNlIiwiY29ubmVjdGlvbnMiLCJjb25uZWN0aW9uSWQiLCJzb2NrZXQiLCJfc2VydmVySWQiLCJvbiIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwic29ja2V0SWQiLCJkZXN0cm95IiwicmVzb2x2ZSIsIl9zdG9yZSIsImxpc3RlbiIsImNsb3NlIiwiZmx1c2giLCJzaHV0ZG93biIsInRoZW4iLCJzdGFydCIsImJpbmQiLCJldmVudCIsImZuIiwiaG9zdG5hbWUiLCJjYWxsYmFjayIsImNiIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7Ozs7SUFJTUEsVTs7Ozs7OztpQ0FFTyxDQUFFOzs7NkJBRU4sQ0FBRTs7O2dDQUVDLENBQUU7Ozs7OztBQUtkOzs7Ozs7Ozs7OztJQVNNQyxhOztBQUVGOzs7OztBQUtBLDJCQUFZQyxJQUFaLEVBQWtCQyxJQUFsQixFQUF3QkMsTUFBeEIsRUFBZ0M7QUFBQTs7QUFFNUIsNEJBQUssRUFBRUYsVUFBRixFQUFMLEVBQWVHLE1BQWY7QUFDQSw0QkFBSyxFQUFFRixVQUFGLEVBQUwsRUFBZUcsTUFBZjtBQUNBLDRCQUFLLEVBQUVGLGNBQUYsRUFBTCxFQUFpQkcsU0FBakIsQ0FBMkJQLFVBQTNCOztBQUVBLGFBQUtFLElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtJLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxhQUFLQyxZQUFMLEdBQW9CLENBQXBCO0FBRUg7Ozs7K0JBRU1DLE0sRUFBUTtBQUFBOztBQUVYLGlCQUFLRCxZQUFMLElBQXFCLENBQXJCO0FBQ0FDLG1CQUFPQyxTQUFQLEdBQW1CLEtBQUtGLFlBQXhCOztBQUVBQyxtQkFBT0UsRUFBUCxDQUFVLE9BQVYsRUFBbUIsWUFBTTtBQUNyQixzQkFBS0osV0FBTCxDQUFpQixNQUFLRyxTQUF0QixJQUFtQyxJQUFuQztBQUNILGFBRkQ7O0FBSUEsaUJBQUtILFdBQUwsQ0FBaUJFLE9BQU9DLFNBQXhCLElBQXFDRCxNQUFyQztBQUVIOztBQUVEOzs7Ozs7Z0NBR1E7QUFBQTs7QUFFSkcsbUJBQU9DLElBQVAsQ0FBWSxLQUFLTixXQUFqQixFQUE4Qk8sT0FBOUIsQ0FBc0MsVUFBQ0MsUUFBRCxFQUFjO0FBQ2hELG9CQUFJLE9BQUtSLFdBQUwsQ0FBaUJRLFFBQWpCLENBQUosRUFDSSxPQUFLUixXQUFMLENBQWlCUSxRQUFqQixFQUEyQkMsT0FBM0I7QUFDUCxhQUhEO0FBS0g7O0FBR0Q7Ozs7Ozs7Z0NBSVE7QUFBQTs7QUFFSixtQkFBTyx1QkFBWSxVQUFDQyxPQUFELEVBQWE7QUFDNUIsdUJBQUtkLE1BQUwsQ0FBWVEsRUFBWixDQUFlLFlBQWYsRUFBNkI7QUFBQSwyQkFBVSxPQUFLTyxNQUFMLENBQVlULE1BQVosQ0FBVjtBQUFBLGlCQUE3QjtBQUNBLHVCQUFLTixNQUFMLENBQVlRLEVBQVosQ0FBZSxXQUFmLEVBQTRCO0FBQUEsMkJBQUtNLFFBQVEsT0FBS2hCLElBQWIsRUFBbUIsT0FBS0MsSUFBeEIsU0FBTDtBQUFBLGlCQUE1QjtBQUNBLHVCQUFLQyxNQUFMLENBQVlnQixNQUFaLENBQW1CLE9BQUtsQixJQUF4QixFQUE4QixPQUFLQyxJQUFuQztBQUNILGFBSk0sQ0FBUDtBQU1IOztBQUVEOzs7Ozs7O21DQUlXO0FBQUE7O0FBRVAsbUJBQU8sdUJBQVksVUFBQ2UsT0FBRCxFQUFhO0FBQzVCLHVCQUFLZCxNQUFMLENBQVlpQixLQUFaLENBQWtCO0FBQUEsMkJBQUtILGVBQUw7QUFBQSxpQkFBbEI7QUFDQSx1QkFBS0ksS0FBTDtBQUNILGFBSE0sQ0FBUDtBQUtIOztBQUVEOzs7Ozs7O2tDQUlVOztBQUVOLG1CQUFPLEtBQUtDLFFBQUwsR0FBZ0JDLElBQWhCLENBQXFCLEtBQUtDLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQixJQUFoQixDQUFyQixDQUFQO0FBRUg7OzsyQkFFRUMsSyxFQUFPQyxFLEVBQUk7O0FBRVYsaUJBQUt4QixNQUFMLENBQVlRLEVBQVosQ0FBZWUsS0FBZixFQUFzQkMsRUFBdEI7QUFDQSxtQkFBTyxJQUFQO0FBRUg7OzsrQkFFTTFCLEksRUFBTTJCLFEsRUFBVUMsUSxFQUFVOztBQUU3QixpQkFBSzFCLE1BQUwsQ0FBWWdCLE1BQVosQ0FBbUJsQixJQUFuQixFQUF5QjJCLFFBQXpCLEVBQW1DQyxRQUFuQztBQUVIOzs7OEJBRUtDLEUsRUFBSTs7QUFFTixpQkFBSzNCLE1BQUwsQ0FBWWlCLEtBQVosQ0FBa0JVLEVBQWxCO0FBRUg7Ozs7OztrQkFJVTlCLGEiLCJmaWxlIjoiTWFuYWdlZFNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBiZW9mIGZyb20gJ2Jlb2YnO1xuXG4vKipcbiAqIEh0dHBTZXJ2ZXJcbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgSHR0cFNlcnZlciB7XG5cbiAgICBsaXN0ZW4oKSB7fVxuXG4gICAgb24oKSB7fVxuXG4gICAgY2xvc2UoKSB7fVxuXG59XG5cblxuLyoqXG4gKiBNYW5hZ2VkU2VydmVyIHdyYXBzIGFyb3VuZCBhIFNlcnZlciB0byBhZGQgYWRkaXRpb25hbCBmZWF0dXJlcy5cbiAqXG4gKiBCeSB3cmFwcGluZyBhcm91bmQgdGhlIHNlcnZlciBpbXBsZW1lbnRhdGlvbiwgd2UgZ2FpbiB0aGUgYWJpbGl0eVxuICogdG8gc2h1dGRvd24gYW5kIHJlc3RhcnQgdGhlIHNlcnZlciB3aGVuIG5lZWRlZC4gRWFjaCB0aW1lXG4gKiB0aGUgc2VydmVyIGlzIHN0b3BwZWQsIHdlIGRlc3Ryb3kgYWxsIGV4aXN0aW5nIHNvY2tldCBjb25uZWN0aW9uc1xuICogc28gbm9kZSBkb2VzIG5vdCB3YWl0IG9uIHRoZW0gdG8gZW5kIGJlZm9yZSBjYWxsaW5nIHRoZSBjbG9zZSgpIGNhbGxiYWNrLlxuICogQGltcGxlbWVudHMgU2VydmVyXG4gKi9cbmNsYXNzIE1hbmFnZWRTZXJ2ZXIge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBvcnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaG9zdFxuICAgICAqIEBwYXJhbSB7SHR0cFNlcnZlcn0gc2VydmVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocG9ydCwgaG9zdCwgc2VydmVyKSB7XG5cbiAgICAgICAgYmVvZih7IHBvcnQgfSkubnVtYmVyKCk7XG4gICAgICAgIGJlb2YoeyBob3N0IH0pLnN0cmluZygpO1xuICAgICAgICBiZW9mKHsgc2VydmVyIH0pLmludGVyZmFjZShIdHRwU2VydmVyKTtcblxuICAgICAgICB0aGlzLnBvcnQgPSBwb3J0O1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgICAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9ucyA9IHt9O1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25JZCA9IDA7XG5cbiAgICB9XG5cbiAgICBfc3RvcmUoc29ja2V0KSB7XG5cbiAgICAgICAgdGhpcy5jb25uZWN0aW9uSWQgKz0gMTtcbiAgICAgICAgc29ja2V0Ll9zZXJ2ZXJJZCA9IHRoaXMuY29ubmVjdGlvbklkO1xuXG4gICAgICAgIHNvY2tldC5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW3RoaXMuX3NlcnZlcklkXSA9IG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbnNbc29ja2V0Ll9zZXJ2ZXJJZF0gPSBzb2NrZXQ7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmbHVzaCBkZXN0cm95cyBhbGwgY3VycmVudCBvcGVuIGNvbm5lY3Rpb25zIHRvIHRoZSBzZXJ2ZXIuXG4gICAgICovXG4gICAgZmx1c2goKSB7XG5cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5jb25uZWN0aW9ucykuZm9yRWFjaCgoc29ja2V0SWQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25zW3NvY2tldElkXSlcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zW3NvY2tldElkXS5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBzdGFydCB0aGlzIHNlcnZlclxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlcnZlci5vbignY29ubmVjdGlvbicsIHNvY2tldCA9PiB0aGlzLl9zdG9yZShzb2NrZXQpKTtcbiAgICAgICAgICAgIHRoaXMuc2VydmVyLm9uKCdsaXN0ZW5pbmcnLCB4ID0+IHJlc29sdmUodGhpcy5wb3J0LCB0aGlzLmhvc3QsIHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuc2VydmVyLmxpc3Rlbih0aGlzLnBvcnQsIHRoaXMuaG9zdCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2h1dGRvd24gdGhpcyBzZXJ2ZXJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHNodXRkb3duKCkge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIuY2xvc2UoeCA9PiByZXNvbHZlKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXN0YXJ0IHRoaXMgc2VydmVyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgcmVzdGFydCgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5zaHV0ZG93bigpLnRoZW4odGhpcy5zdGFydC5iaW5kKHRoaXMpKTtcblxuICAgIH1cblxuICAgIG9uKGV2ZW50LCBmbikge1xuXG4gICAgICAgIHRoaXMuc2VydmVyLm9uKGV2ZW50LCBmbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgbGlzdGVuKHBvcnQsIGhvc3RuYW1lLCBjYWxsYmFjaykge1xuXG4gICAgICAgIHRoaXMuc2VydmVyLmxpc3Rlbihwb3J0LCBob3N0bmFtZSwgY2FsbGJhY2spO1xuXG4gICAgfVxuXG4gICAgY2xvc2UoY2IpIHtcblxuICAgICAgICB0aGlzLnNlcnZlci5jbG9zZShjYik7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlZFNlcnZlcjtcbiJdfQ==