import Promise from 'bluebird';
import restify from 'restify';
import ServerFactory from '../ServerFactory';
import Application from '../Application';
import PowerstoneServer from '../PowerstoneServer';
import ManagedServer from '../ManagedServer';
import Routing from './Routing';
import Plugins from './Plugins';

const DEFAULT_PLUGINS=[];

class RESTApplication extends Application {

    run() {

        return Application.prototype.run.call(this).
        then(()=> {

            var server = ServerFactory.createRESTServer(this.config.readWithDefaults('https', undefined));
            var config;
            var loader;
            var projects = this.projects.slice();
            var plugins;

            projects.unshift(this.main);

            projects.forEach((project)=> {

                config = project.getConfiguration();
                loader = project.getLoader();
                plugins = config.readWithDefaults('plugins', DEFAULT_PLUGINS);
                plugins.forEach(plugin=>Plugins.get(plugin)(server,config,loader,project));
                Routing.configure(server, loader.loadFromConf('routes', []), config);

            });

            var server = new ManagedServer(
                this.config.readWithDefaults('port', process.env.PORT || 3000),
                this.config.readWithDefaults('host', process.env.HOST || '0.0.0.0'),
                new PowerstoneServer(server));

            return server.start().then(this.serverStarted);

        });

}

shutdown() {

    var self = this;

    return new Promise(function (resolve, reject) {

        self.server.shutdown().
        then(function () {

            for (var key in self.databases)
                if (self.databases.hasOwnProperty(key)) {
                    self.databases[key].close(function () {
                        resolve();
                    })
                }
            }).
        catch(function (err) {
            reject(err);
            return err;
        });
    });

}
}

export default RESTApplication
