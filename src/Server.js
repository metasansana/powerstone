/**
 * Server provides a normalized interface for interacting with
 * a framework's server implementation (express, restify).
 * @interface
 */
class Server {

    /**
     * on binds a handler to a specific server event.
     * @param {String} event
     * @param {Function} handler
     */
    on(event, handler){}

    /***
     * open starts listening for connections
     * @param {Function} cb
     */
    listen(cb){}

    /**
     * close calls the close method on the server
     * @param {Function} cb
     */
    close(cb){}

    /**
     * toFrameworkServer returns the framework's server implementation.
     * @return {Object}
     */
    toFrameworkServer(){}

}

export default Server
