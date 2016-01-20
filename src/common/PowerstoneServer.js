import express from 'express';
import ServerFactory from './ServerFactory';

/**
 * PowerstoneServer wraps around the frameworks server to provide
 * a simplified api.
 * @implements Server
 */
class PowerstoneServer {

    /**
     * @param {http.Server|https.Server} server
     */
    constructor(server) {
        this.server = server;
    }

    on(event, fn) {
        this.server.on(event, fn);
        return this;
    }

    listen(port, host, cb) {
        return this.server.listen(port, host, cb);
    }

    close(cb){
        this.server.close(cb);
    }

    toFramework(){
        return this.server;
    }

}

export default PowerstoneServer
