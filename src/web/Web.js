import Promise from 'bluebird';
import express from 'express';
import Application from '../common/Application';
import Configuration from '../common/Configuration';
import Context from '../common/Context';
import WebModule from './WebModule';
import ServerFactory from './ServerFactory';

const defaultWares = ['public', 'serve-index', 'method-override', 'morgan',
    'body-parser', 'cookie-parser', 'session', 'csrf'
];

class Web extends Application {

    constructor(path) {

        super(path);

        this.main = new WebModule('', new Configuration('webconf', path),
            new Context(), this);

        this.frameworkApp = express();

    }

    __createServer() {
        return ServerFactory.createWebServer(this.frameworkApp, this.main);
    }

}

export default Web
