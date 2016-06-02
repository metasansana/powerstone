import Promise from 'bluebird';
import express from 'express';
import Application from '../common/Application';
import Configuration from '../common/Configuration';
import WebContext from './WebContext';
import WebModule from './WebModule';
import ServerFactory from './ServerFactory';

class Web extends Application {

    constructor(path) {

        super(path);

        this.main = new WebModule('', new Configuration('webconf', path),
            new WebContext(), this);

        this.frameworkApp = express();

    }

    __createServer() {
        return ServerFactory.createWebServer(this.frameworkApp, this.main);
    }

}

export default Web
