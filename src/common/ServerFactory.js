import http from 'http';
import https from 'https';
import restify from 'restify';

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

    /**
     * createRestServer creates and returns a restify.Server
     * @params {Object} options
     */
    createRestServer(options) {
        return restify.createServer(options);
    }

}

export default new ServerFactory();
