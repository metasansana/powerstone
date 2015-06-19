import http from 'http';
import https from 'https';
import restify from 'restify';

/**
 * ServerFactory
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
    createSecureNativeWebServer(options, app){
        return https.createServer(options, app);
    }

    /**
     * createRestServer creates and returns a restify.Server
     * @params {Object} options
     */
    createRESTServer(options){
        return restify.createServer(options);
    }

}

export default new ServerFactory()
