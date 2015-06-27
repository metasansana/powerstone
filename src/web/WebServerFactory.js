import ServerFactory from '../ServerFactory';

/**
 * WebServerFactory
 */
class WebServerFactory {

    create(app, options){

        if(options)
        return ServerFactory.createSecureNativeWebServer(options, app);

        return ServerFactory.createNativeWebServer(app);
    }

}

export default new WebServerFactory()