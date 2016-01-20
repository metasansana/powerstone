import Promise from 'bluebird';
import restify from 'restify';
import deep_merge from 'deepmerge';
import ServerFactory from '../common/ServerFactory';
import BaseApplication from '../common/Application';
import PowerstoneServer from '../common/PowerstoneServer';
import ManagedServer from '../common/ManagedServer';
import ApiLoader from './ApiLoader';
import * as plugins from '../middleware/restify';

class Application extends BaseApplication {

    getLoader(path) {
        return new ApiLoader(path || this.path);
    }

    run() {

        return super.run().
        then(() => {

            var engine = ServerFactory.createApiServer(restify, this.modules.main);

            this.framework.restify.plugins = deep_merge(this.framework.restify.plugins, plugins);
            this.modules.main.restifyFramework(this.framework.restify.plugins);
            this.modules.main.restify(engine, ['body_parser', 'query_parser'], '');

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
