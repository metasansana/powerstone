import Promise from 'bluebird';
import beof from 'beof';

/**
 * HttpServer
 * @interface
 */
class HttpServer {

    listen() {}

    on() {}

    close() {}

}


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
     * @param {number} port
     * @param {string} host
     * @param {HttpServer} server
     */
    constructor(port, host, server) {

        beof({ port }).number();
        beof({ host }).string();
        beof({ server }).interface(HttpServer);

        this.port = port;
        this.host = host;
        this.server = server;
        this.connections = {};
        this.connectionId = 0;

    }

    _store(socket) {

        this.connectionId += 1;
        socket._serverId = this.connectionId;

        socket.on('close', () => {
            this.connections[this._serverId] = null;
        });

        this.connections[socket._serverId] = socket;

    }

    /**
     * flush destroys all current open connections to the server.
     */
    flush() {

        Object.keys(this.connections).forEach((socketId) => {
            if (this.connections[socketId])
                this.connections[socketId].destroy();
        });

    }


    /**
     * start this server
     * @return {Promise}
     */
    start() {

        return new Promise((resolve) => {
            this.server.on('connection', socket => this._store(socket));
            this.server.on('listening', x => resolve(this.port, this.host, this));
            this.server.listen(this.port, this.host);
        });

    }

    /**
     * shutdown this server
     * @return {Promise}
     */
    shutdown() {

        return new Promise((resolve) => {
            this.server.close(x => resolve(this));
            this.flush();
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

}

export default ManagedServer;
