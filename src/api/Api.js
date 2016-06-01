import Promise from 'bluebird';
import restify from 'restify';
import deep_merge from 'deepmerge';
import Application from '../common/Application';
import ApiModule from './ApiModule';
import Configuration from '../common/Configuration';
import ApiContext from '../api/ApiContext';

function handleException(req, res, next, err) {

    console.error(err.stack);
    res.status(500);
    res.end();

}

class Api extends Application {

    constructor(path) {

        super(path);

        this.main = new ApiModule('', new Configuration('apiconf', path),
            new ApiContext(), this);

        this.frameworkApp = restify.createServer(this.main.configuration.read('restify', null));
        this.frameworkApp.on('uncaughtException', handleException);

    }

    __createServer() {

        return this.frameworkApp;

    }


}

export default Api
