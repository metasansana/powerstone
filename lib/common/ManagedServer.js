import Promise from 'bluebird';

/**
 * ManagedServer wraps around a Server to add additional features.
 *
 * By wrapping around the server implementation, we gain the ability
 * to shutdown and restart the server when needed. Each time
 * the server is stopped, we destroy all existing socket connections
 * so node does not wait on them to end before calling the close() callback.
 * @implements Server
 */
class ManagedServer {

    /**
     * @param Server server
     */
    constructor(port, host, server) {
        this.port = port;
        this.host = host;
        this.server = server;
        this.connections = {};
        this.connectionId = 0;
    }

    _store(socket) {

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
    flush() {

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
    start() {
        var self = this;
        return new Promise(function (resolve) {
            self.server.on('connection', self._store.bind(self));
            self.server.on('listening', x => resolve(self.port, self.host, self));
            self.server.listen(self.port, self.host);
        });
    }

    /**
     * shutdown this server
     * @return {Promise}
     */
    shutdown() {
        var self = this;
        return new Promise(function (resolve) {
            self.server.close(x => resolve(self));
            self.flush();
        });
    }

    /**
     * restart this server
     * @returns {Promise}
     */
    restart() {
        return this.shutdown().then(this.start.bind(this));
    }

    on(event, fn) {
        this.server.on(event, fn);
        return this;
    }

    listen(port, hostname, callback) {
        console.log('lisetning pon  ', arguments);
        this.server.listen(port, hostname, callback);
    }

    close(cb) {
        this.server.close(cb);
    }

    toFramework() {
        return this.server.toFramework();
    }

}

export default ManagedServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vTWFuYWdlZFNlcnZlci5qcyJdLCJuYW1lcyI6WyJQcm9taXNlIiwiTWFuYWdlZFNlcnZlciIsImNvbnN0cnVjdG9yIiwicG9ydCIsImhvc3QiLCJzZXJ2ZXIiLCJjb25uZWN0aW9ucyIsImNvbm5lY3Rpb25JZCIsIl9zdG9yZSIsInNvY2tldCIsInNlbGYiLCJfc2VydmVySWQiLCJvbiIsImZsdXNoIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJzb2NrZXRJZCIsImRlc3Ryb3kiLCJzdGFydCIsInJlc29sdmUiLCJiaW5kIiwieCIsImxpc3RlbiIsInNodXRkb3duIiwiY2xvc2UiLCJyZXN0YXJ0IiwidGhlbiIsImV2ZW50IiwiZm4iLCJob3N0bmFtZSIsImNhbGxiYWNrIiwiY29uc29sZSIsImxvZyIsImFyZ3VtZW50cyIsImNiIiwidG9GcmFtZXdvcmsiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLE9BQVAsTUFBb0IsVUFBcEI7O0FBRUE7Ozs7Ozs7OztBQVNBLE1BQU1DLGFBQU4sQ0FBb0I7O0FBRWhCOzs7QUFHQUMsZ0JBQVlDLElBQVosRUFBa0JDLElBQWxCLEVBQXdCQyxNQUF4QixFQUFnQztBQUM1QixhQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsYUFBS0MsWUFBTCxHQUFvQixDQUFwQjtBQUNIOztBQUVEQyxXQUFPQyxNQUFQLEVBQWU7O0FBRVgsWUFBSUMsT0FBTyxJQUFYO0FBQ0EsYUFBS0gsWUFBTCxJQUFxQixDQUFyQjtBQUNBRSxlQUFPRSxTQUFQLEdBQW1CRCxLQUFLSCxZQUF4Qjs7QUFFQUUsZUFBT0csRUFBUCxDQUFVLE9BQVYsRUFBbUIsWUFBVztBQUMxQixtQkFBT0YsS0FBS0osV0FBTCxDQUFpQixLQUFLSyxTQUF0QixDQUFQO0FBQ0gsU0FGRDs7QUFJQUQsYUFBS0osV0FBTCxDQUFpQkcsT0FBT0UsU0FBeEIsSUFBcUNGLE1BQXJDO0FBRUg7O0FBRUQ7OztBQUdBSSxZQUFROztBQUVKLFlBQUlILE9BQU8sSUFBWDs7QUFFQUksZUFBT0MsSUFBUCxDQUFZTCxLQUFLSixXQUFqQixFQUE4QlUsT0FBOUIsQ0FBc0MsVUFBU0MsUUFBVCxFQUFtQjtBQUNyRCxnQkFBSVIsU0FBU0MsS0FBS0osV0FBTCxDQUFpQlcsUUFBakIsQ0FBYjtBQUNBLGdCQUFJUixNQUFKLEVBQVlBLE9BQU9TLE9BQVA7QUFFZixTQUpEO0FBS0g7O0FBR0Q7Ozs7QUFJQUMsWUFBUTtBQUNKLFlBQUlULE9BQU8sSUFBWDtBQUNBLGVBQU8sSUFBSVYsT0FBSixDQUFZLFVBQVNvQixPQUFULEVBQWtCO0FBQ2pDVixpQkFBS0wsTUFBTCxDQUFZTyxFQUFaLENBQWUsWUFBZixFQUE2QkYsS0FBS0YsTUFBTCxDQUFZYSxJQUFaLENBQWlCWCxJQUFqQixDQUE3QjtBQUNBQSxpQkFBS0wsTUFBTCxDQUFZTyxFQUFaLENBQWUsV0FBZixFQUE0QlUsS0FBS0YsUUFBUVYsS0FBS1AsSUFBYixFQUFtQk8sS0FBS04sSUFBeEIsRUFBOEJNLElBQTlCLENBQWpDO0FBQ0FBLGlCQUFLTCxNQUFMLENBQVlrQixNQUFaLENBQW1CYixLQUFLUCxJQUF4QixFQUE4Qk8sS0FBS04sSUFBbkM7QUFDSCxTQUpNLENBQVA7QUFLSDs7QUFFRDs7OztBQUlBb0IsZUFBVztBQUNQLFlBQUlkLE9BQU8sSUFBWDtBQUNBLGVBQU8sSUFBSVYsT0FBSixDQUFZLFVBQVNvQixPQUFULEVBQWtCO0FBQ2pDVixpQkFBS0wsTUFBTCxDQUFZb0IsS0FBWixDQUFrQkgsS0FBS0YsUUFBUVYsSUFBUixDQUF2QjtBQUNBQSxpQkFBS0csS0FBTDtBQUNILFNBSE0sQ0FBUDtBQUtIOztBQUVEOzs7O0FBSUFhLGNBQVU7QUFDTixlQUFPLEtBQUtGLFFBQUwsR0FBZ0JHLElBQWhCLENBQXFCLEtBQUtSLEtBQUwsQ0FBV0UsSUFBWCxDQUFnQixJQUFoQixDQUFyQixDQUFQO0FBQ0g7O0FBRURULE9BQUdnQixLQUFILEVBQVVDLEVBQVYsRUFBYztBQUNWLGFBQUt4QixNQUFMLENBQVlPLEVBQVosQ0FBZWdCLEtBQWYsRUFBc0JDLEVBQXRCO0FBQ0EsZUFBTyxJQUFQO0FBQ0g7O0FBRUROLFdBQU9wQixJQUFQLEVBQWEyQixRQUFiLEVBQXVCQyxRQUF2QixFQUFpQztBQUM3QkMsZ0JBQVFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQkMsU0FBL0I7QUFDQSxhQUFLN0IsTUFBTCxDQUFZa0IsTUFBWixDQUFtQnBCLElBQW5CLEVBQXlCMkIsUUFBekIsRUFBbUNDLFFBQW5DO0FBQ0g7O0FBRUROLFVBQU1VLEVBQU4sRUFBVTtBQUNOLGFBQUs5QixNQUFMLENBQVlvQixLQUFaLENBQWtCVSxFQUFsQjtBQUNIOztBQUVEQyxrQkFBYztBQUNWLGVBQU8sS0FBSy9CLE1BQUwsQ0FBWStCLFdBQVosRUFBUDtBQUNIOztBQTVGZTs7QUFnR3BCLGVBQWVuQyxhQUFmIiwiZmlsZSI6Ik1hbmFnZWRTZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbi8qKlxuICogTWFuYWdlZFNlcnZlciB3cmFwcyBhcm91bmQgYSBTZXJ2ZXIgdG8gYWRkIGFkZGl0aW9uYWwgZmVhdHVyZXMuXG4gKlxuICogQnkgd3JhcHBpbmcgYXJvdW5kIHRoZSBzZXJ2ZXIgaW1wbGVtZW50YXRpb24sIHdlIGdhaW4gdGhlIGFiaWxpdHlcbiAqIHRvIHNodXRkb3duIGFuZCByZXN0YXJ0IHRoZSBzZXJ2ZXIgd2hlbiBuZWVkZWQuIEVhY2ggdGltZVxuICogdGhlIHNlcnZlciBpcyBzdG9wcGVkLCB3ZSBkZXN0cm95IGFsbCBleGlzdGluZyBzb2NrZXQgY29ubmVjdGlvbnNcbiAqIHNvIG5vZGUgZG9lcyBub3Qgd2FpdCBvbiB0aGVtIHRvIGVuZCBiZWZvcmUgY2FsbGluZyB0aGUgY2xvc2UoKSBjYWxsYmFjay5cbiAqIEBpbXBsZW1lbnRzIFNlcnZlclxuICovXG5jbGFzcyBNYW5hZ2VkU2VydmVyIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBTZXJ2ZXIgc2VydmVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocG9ydCwgaG9zdCwgc2VydmVyKSB7XG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnQ7XG4gICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XG4gICAgICAgIHRoaXMuc2VydmVyID0gc2VydmVyO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zID0ge307XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbklkID0gMDtcbiAgICB9XG5cbiAgICBfc3RvcmUoc29ja2V0KSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25JZCArPSAxO1xuICAgICAgICBzb2NrZXQuX3NlcnZlcklkID0gc2VsZi5jb25uZWN0aW9uSWQ7XG5cbiAgICAgICAgc29ja2V0Lm9uKCdjbG9zZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVsZXRlIHNlbGYuY29ubmVjdGlvbnNbdGhpcy5fc2VydmVySWRdO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLmNvbm5lY3Rpb25zW3NvY2tldC5fc2VydmVySWRdID0gc29ja2V0O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZmx1c2ggZGVzdHJveXMgYWxsIGN1cnJlbnQgb3BlbiBjb25uZWN0aW9ucyB0byB0aGUgc2VydmVyLlxuICAgICAqL1xuICAgIGZsdXNoKCkge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBPYmplY3Qua2V5cyhzZWxmLmNvbm5lY3Rpb25zKS5mb3JFYWNoKGZ1bmN0aW9uKHNvY2tldElkKSB7XG4gICAgICAgICAgICB2YXIgc29ja2V0ID0gc2VsZi5jb25uZWN0aW9uc1tzb2NrZXRJZF07XG4gICAgICAgICAgICBpZiAoc29ja2V0KSBzb2NrZXQuZGVzdHJveSgpO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogc3RhcnQgdGhpcyBzZXJ2ZXJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgICBzZWxmLnNlcnZlci5vbignY29ubmVjdGlvbicsIHNlbGYuX3N0b3JlLmJpbmQoc2VsZikpO1xuICAgICAgICAgICAgc2VsZi5zZXJ2ZXIub24oJ2xpc3RlbmluZycsIHggPT4gcmVzb2x2ZShzZWxmLnBvcnQsIHNlbGYuaG9zdCwgc2VsZikpO1xuICAgICAgICAgICAgc2VsZi5zZXJ2ZXIubGlzdGVuKHNlbGYucG9ydCwgc2VsZi5ob3N0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2h1dGRvd24gdGhpcyBzZXJ2ZXJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHNodXRkb3duKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgICBzZWxmLnNlcnZlci5jbG9zZSh4ID0+IHJlc29sdmUoc2VsZikpO1xuICAgICAgICAgICAgc2VsZi5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlc3RhcnQgdGhpcyBzZXJ2ZXJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICByZXN0YXJ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaHV0ZG93bigpLnRoZW4odGhpcy5zdGFydC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBvbihldmVudCwgZm4pIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIub24oZXZlbnQsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbGlzdGVuKHBvcnQsIGhvc3RuYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zb2xlLmxvZygnbGlzZXRuaW5nIHBvbiAgJywgYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGlzdGVuKHBvcnQsIGhvc3RuYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgY2xvc2UoY2IpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIuY2xvc2UoY2IpO1xuICAgIH1cblxuICAgIHRvRnJhbWV3b3JrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIudG9GcmFtZXdvcmsoKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlZFNlcnZlcjtcbiJdfQ==