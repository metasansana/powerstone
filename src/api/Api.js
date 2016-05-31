import Promise from 'bluebird';
import restify from 'restify';
import deep_merge from 'deepmerge';
import Application from '../common/Application';
import PowerstoneServer from '../common/PowerstoneServer';
import ManagedServer from '../common/ManagedServer';
import ApiLoader from './ApiLoader';

function handleException(req, res, next, err) {

    console.error(err.stack);
    res.status(500);
    res.end();

}

class Api extends Application {

    constructor(path) {

        super(path);
        this.main = new ApiModule('', new Configuration('apiconf', path), this);
        this.frameworkApp = restify.createServer(this.main.configuration.readOrDefault('restify', null));

    }

    run() {

        this.main.load(this.frameworkApp).
        then(() => {

            this.framework.restify.plugins = deep_merge(this.framework.restify.plugins, plugins);
            this.modules.main.restifyFramework(this.framework.restify.plugins);
            this.modules.main.restify(engine, ['body_parser', 'query_parser'], '');
            this.frameworkApp.on('uncaughtException', handleException);

            this.server = new ManagedServer(
                this.modules.main.configuration.readWithDefaults('port', process.env.PORT || 3000),
                this.modules.main.configuration.readWithDefaults('host', process.env.HOST || '0.0.0.0'),
                new PowerstoneServer(engine));

            return this.server.start();

        }).
        then(port => this._events.emit(this.events.STARTED, port, this)).
        catch(err => this._events.emit(this.events.ERROR, err, this));

    }

}

export default Application
