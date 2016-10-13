import Promise from 'bluebird';
import express from 'express';
import Application from '../app/Application';
import Configuration from '../app/Configuration';
import WebContext from './WebContext';
import WebModule from './WebModule';
import ServerFactory from './ServerFactory';

class Web extends Application {

    __createServer() {
        return ServerFactory.createWebServer(this.framework, this.main);
    }

    start() {

        this.main = new WebModule('', new Configuration('webconf', this.path), this, null);
        this.framework = express();
        this.context = new WebContext();
        return super.start();

    }

}

export default Web
