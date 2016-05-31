import http from 'http';
import https from 'https';

/**
 * ServerFactory provides new instances for http.Server or the
 * framework's own wrapper.
 *
 * Powerstone wraps these in its own wrapper to provide a maintainable api.
 */
class ServerFactory {

    /**
     * createNativeWebServer creates and returns a http.Server
     * @param {express.Application} app
     * @returns {*}
     */
    createNativeWebServer(app) {
        return http.createServer(app);
    }

    /**
     * createSecureNativeWebServer creates and returns a https.Server
     * @param {Object} options
     * @param {express.Application} app
     * @returns {*}
     */
    createSecureNativeWebServer(options, app) {
        return https.createServer(options, app);
    }

    createApiServer(restify, module) {

        var s = restify.createServer(module.configuration.readWithDefaults('api.options', null));

        s.on('uncaughtException', (req, res, route, err) => {
            res.status(500);
            res.send();
            events.emit('error', err);
        });

        return s;
    }

    createWebServer(app, module) {

        var options = module.configuration.readWithDefaults('web.https', null);

        if (options)
            return this.createSecureNativeWebServer(options, app);

        return this.createNativeWebServer(app);
    }

}

export default new ServerFactory();
