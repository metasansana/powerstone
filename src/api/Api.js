import Promise from 'bluebird';
import restify from 'restify';
import deep_merge from 'deepmerge';
import Application from '../app/Application';
import ApiModule from './ApiModule';
import Configuration from '../app/Configuration';
import ApiContext from '../api/ApiContext';

class Api extends Application {

    __createServer() {

        return this.framework;

    }

    start() {

        this.main = new ApiModule('', new Configuration('apiconf', this.path), this);
        this.context = new ApiContext();
        this.framework = restify.createServer(this.main.configuration.read('restify', null));
        return super.start();

    }

}

export default Api
