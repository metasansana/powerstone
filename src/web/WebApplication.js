import Promise from 'bluebird';
import express from 'express';
import Application from '../common/Application';
import PowerstoneServer from '../common/PowerstoneServer';
import ManagedServer from '../common/ManagedServer';
import WebServerFactory from './WebServerFactory';
import Router from '../common/Router';
import WebMiddleWareRegistry from './WebMiddleWareRegistry';
import WebViewRegistry from './WebViewRegistry';

var mainWare = ['public', 'method-override', 'morgan',
    'body-parser', 'cookie-parser', 'session', 'csrf'
];
var subWare = ['public'];

class WebApplication extends Application {

    run() {

        return super.run().
        then(() => {

            var app;
            var config;
            var loader;
            var wareOrder;
            var projects = this.projects.slice();
            var mountain = [];
            var mountPoint;
            var isMain = true;
            var router;

            projects.unshift(this.main);

            projects.forEach((project) => {

                config = project.getConfiguration();
                loader = project.getLoader();
                isMain = project.isMain();

                mountPoint = config.readWithDefaults('mount_point', (isMain) ? '' : (config.readWithDefaults('mount_root', false)) ?
                    '' : '/' + loader.getDirName());

                wareOrder = (isMain) ?
                    config.readWithDefaults('middleware', mainWare) :
                    config.readWithDefaults('middleware', subWare);

                app = (isMain) ?
                    express() : (config.read('router') === true) ?
                    express.Router() : express();

                wareOrder.
                forEach(mware =>
                    WebMiddleWareRegistry.get(mware)(mountPoint, app, config, loader, project));

                router = new Router(app, config);
                router.configure(loader.loadFromConf('routes', []), config);

                WebViewRegistry.get(config.readWithDefaults('view_engine', 'nunjucks'))(app, config, loader, project);

                mountain.push({
                    point: mountPoint,
                    app: app
                });

            });

            var mainApp = mountain.shift()['app'];
            mountain.forEach(mount => mainApp.use(mount.point, mount.app));

            this.server = new ManagedServer(
                this.config.readWithDefaults('port', process.env.PORT || 3000),
                this.config.readWithDefaults('host', process.env.HOST || '0.0.0.0'),
                new PowerstoneServer(
                    WebServerFactory.create(mainApp, this.config.https)));

            return this.server.start();

        }).
then(port => this._events.emit(this.events.STARTED, port, this)).
        catch(err => this._events.emit(this.events.ERROR, err, this));


    }

    shutdown() {

        return this.server.shutdown();

    }
}

export default WebApplication
