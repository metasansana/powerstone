import Promise from 'bluebird';
import restify from 'restify';
import ServerFactory from '../common/ServerFactory';
import Application from '../common/Application';
import PowerstoneServer from '../common/PowerstoneServer';
import ManagedServer from '../common/ManagedServer';
import Router from '../common/Router';
import Plugins from './Plugins';

const DEFAULT_PLUGINS = [];

class ApiApplication extends Application {

    run() {

        return super.run().
        then(() => {

            var server = ServerFactory.createApiServer(this.config.readWithDefaults('https', undefined));
            var config;
            var loader;
            var projects = this.projects.slice();
            var plugins;
            var router;

            projects.unshift(this.main);

            projects.forEach((project) => {

                config = project.getConfiguration();
                loader = project.getLoader();
                plugins = config.readWithDefaults('plugins', DEFAULT_PLUGINS);
                plugins.forEach(plugin => Plugins.get(plugin)(server, config, loader, project));
                router = new Router(server, config);
                router.configure(loader.loadFromConf('routes', []));

            });

            server = new ManagedServer(
                this.config.readWithDefaults('port', process.env.PORT || 3000),
                this.config.readWithDefaults('host', process.env.HOST || '0.0.0.0'),
                new PowerstoneServer(server));
            return server.start();

        }).
        then(port => this._events.emit(this.events.STARTED, port, this)).
        catch(err => this._events.emit(this.events.ERROR, err, this));

    }

    shutdown() {

        var self = this;

        return new Promise(function(resolve, reject) {

            self.server.shutdown().
            then(function() {

                for (var key in self.databases)
                    if (self.databases.hasOwnProperty(key))
                        self.databases[key].close(resolve);

            }).
            catch(function(err) {
                reject(err);
                return err;
            });
        });

    }
}

export default ApiApplication
