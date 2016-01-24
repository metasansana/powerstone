import Promise from 'bluebird';
import express from 'express';
import BaseApplication from '../common/Application';
import deep_merge from 'deepmerge';
import PowerstoneServer from '../common/PowerstoneServer';
import ManagedServer from '../common/ManagedServer';
import ServerFactory from '../common/ServerFactory';
import WebLoader from './WebLoader';
import * as middleware from '../middleware/express';

const defaultWares = ['public', 'serve-index', 'method-override', 'morgan',
    'body-parser', 'cookie-parser', 'session', 'csrf'
];

class Application extends BaseApplication {

    getLoader(path) {
        return new WebLoader(path || this.path);
    }

    run() {

        return super.run().
        then(() => {

            var app = express();

            this.framework.express.middleware = deep_merge(this.framework.express.middleware,
                middleware);

            this.modules.main.expressFramework(this.framework.express.middleware,
                this.framework.express.engines);
            this.modules.main.express(app, express, defaultWares);

            this.server = new ManagedServer(
                this.modules.main.configuration.readWithDefaults('port', process.env.PORT || 3000),
                this.modules.main.configuration.readWithDefaults('host', process.env.HOST || '0.0.0.0'),
                new PowerstoneServer(ServerFactory.createWebServer(app, this.modules.main)));

            return this.server.start();

        }).
        then(port => this._events.emit(this.events.STARTED, port, this)).
        catch(err => this._events.emit(this.events.ERROR, err, this));

    }

    shutdown() {

        return this.server.shutdown();

    }
}

export default Application
