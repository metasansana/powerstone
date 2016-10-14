import beof from 'beof';
import ManagedServer from '../net/ManagedServer';

/**
 * OnServiceListener is implemented to respond to
 * the status change of services configured for the Appliction.
 * @interface
 */
class OnServiceListener {

    /**
     * onConnected is called when connections to all the services
     * have been established and the Application is ready to
     * proceed to the next phase of boot up.
     * @param {Application} app
     */
    onConnected() {

    }

}

/**
 * OnServerListener is implemented to respond to changes in
 * the status of the internal HTTP server.
 * @interface
 */

class OnServerListener {

    /**
     * onStarted is called when the http server has been started.
     * @param {Application} app
     */
    onStarted() {

    }

}

/**
 * OnRouteListener is implemented to proceed all routes the application
 * handles. It proceeds all the sugar pwr adds on top of the underlying framework.
 * @interface
 */
class OnRouteListener {

    /**
     * onRoute
     * @param {Request} req
     * @param {Response} res
     * @param {function} next
     */
    onRoute() {

    }

}

/**
 * OnRouteErrorListener is implemented to handle errors
 * that occur during route execution.
 * @interface
 */
class OnRouteErrorListener {

    /**
     * onRouteError handles the error
     * @param {Error} err
     * @param {Request} req
     * @param {Response} res
     * @param {function} next
     */
    onRouteError() {

    }

}

/**
 * Application is the main class of the framework.
 * @param {string} path The path to intialize this Application to.
 * @property {Module} main - The main Module for this Application.
 * @property {ManagedServer} server - The managed http server.
 * @property {ManagedServer|null} server - The internal managed server that serves clients.
 */
class Application {

    constructor(path) {

        beof({ path }).string();

        this.path = path;
        this.main = null;
        this.server = null;
        this.context = null;
        this.onServiceListener = new OnServiceListener();
        this.onServerListener = new OnServerListener();
        this.onRouteListener = { onRoute(req, res, next) { next(); } };
        this.onRouteErrorListener = {
            onRouteError(err, req, res, next) {
                console.error(err.stack ? err.stack : err);
                res.status(500);
                res.end();
            }
        };
        this.framework = null;

    }

    /**
     * setOnServiceListener
     * @param {OnServiceListener} listener
     */
    setOnServiceListener(listener) {

        beof({ listener }).interface(OnServiceListener);

        this.onServiceListener = listener;
        return this;

    }

    /**
     * setOnServerListener
     * @param {OnServerListener} listener
     */
    setOnServerListener(listener) {

        beof({ listener }).interface(OnServerListener);

        this.onServerListener = listener;
        return this;

    }

    /**
     * setOnRouteListener
     * @param {OnRouteListener} listener
     */
    setOnRouteListener(listener) {

        beof({ listener }).interface(listener);

        this.onRouteListener = listener;
        return this;

    }

    /**
     * setOnRouteErrorListener
     * @param {OnRouteErrorListener} listener
     */
    setOnRouteErrorListener(listener) {

        beof({ listener }).interface(OnRouteErrorListener);

        this.onRouteErrorListener = listener;
        return this;

    }

    /**
     * start the server for this Application
     * @return {Promise}
     */
    start() {

        this.framework.use((req, res, next) => this.onRouteListener.onRoute(req, res, next));

        return this.main.load(this.framework).
        then(() => {

            this.server = new ManagedServer(
                Number(this.main.configuration.read('port', process.env.PORT || 2407)),
                this.main.configuration.read('host', process.env.HOST || '0.0.0.0'),
                this.__createServer());

            return this.server.start();

        }).
        then(() => this.onServerListener.onStarted(this.server, this));

    }
}

export { OnServiceListener as OnServiceListener };
export { OnServerListener as OnServerListener };
export { OnRouteListener as OnRouteListener };
export default Application;
