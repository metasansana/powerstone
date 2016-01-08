import Promise from 'bluebird';
import UnsupportedMethodError from './UnsupportedMethodError';

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
            self.server.on('listening', x=>resolve(self.port, self.host, self));
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
            self.server.close(x=>resolve(self));
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
        this.server.listen(port, hostname, callback);
    }

    close(cb) {
        this.server.close(cb);
    }

    toFrameworkServer() {
        return this.server.toFrameWorkServer();
    }

}

export default ManagedServer;





