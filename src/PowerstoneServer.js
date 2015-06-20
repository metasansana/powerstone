import express from 'express';
import ServerFactory from '../ServerFactory';

/**
 * PowerstoneServer wraps around the frameworks server to provide
 * a simplified api.
 * @implements Server
 */
class PowerstoneServer {

    /**
     * @param {http.Server|https.Server} server
     * @param {Number} port
     * @param {String} host
     */
    constructor(server, port, host) {
        this.server = server;
        this.port = port;
        this.host = host;
    }

    on(event, fn) {
        this.server.on(event, fn);
        return this;
    }

    listen(cb) {
        return this.server.listen(this.port, this.host, cb);
    }

    close(cb){
        this.server.close(cb);
    }

    toFrameworkServer(){
        return this.server;
    }

}

export default PowerstoneServer
