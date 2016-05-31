import Promise from 'bluebird';
import restify from 'restify';
import deep_merge from 'deepmerge';
import Application from '../common/Application';
import ApiModule from './ApiModule';
import PowerstoneServer from '../common/PowerstoneServer';
import ManagedServer from '../common/ManagedServer';
import Configuration from '../common/Configuration';
import Context from '../common/Context';

function handleException(req, res, next, err) {

    console.error(err.stack);
    res.status(500);
    res.end();

}

class Api extends Application {

    constructor(path) {

        super(path);

        this.main = new ApiModule('', new Configuration('apiconf', path),
            new Context(), this);

        this.frameworkApp = restify.createServer(this.main.configuration.read('restify', null));

    }

    run() {

        return this.main.load(this.frameworkApp).
        then(() => {

            this.frameworkApp.on('uncaughtException', handleException);

            this.server = new ManagedServer(
                this.main.configuration.read('port', process.env.PORT || 3000),
                this.main.configuration.read('host', process.env.HOST || '0.0.0.0'),
                new PowerstoneServer(this.frameworkApp));

            return this.server.start();

        }).
        then(port => console.log(port));

    }

}

export default Api
