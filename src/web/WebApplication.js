import Promise from  'bluebird';
import express from 'express';
import Application from '../Application';
import PowerstoneServer from '../PowerstoneServer';
import ManagedServer from '../ManagedServer';
import Builtin from './Builtin';
import WebServerFactory from './WebServerFactory';
import WebRouting from './WebRouting';
import WebMiddleWareRegistry from './WebMiddleWareRegistry';
import WebViewRegistry from './WebViewRegistry';

var mainWare = ['public', 'method-override', 'morgan',
    'body-parser', 'cookie-parser', 'session', 'csrf'];
var subWare = ['public'];

class WebApplication extends Application {

    run() {

        return Application.prototype.run.call(this).
            then(()=> {

                var app;
                var config;
                var loader;
                var wareOrder;
                var projects = this.projects.slice();
                var mountain = [];
                var mountPoint;
                var isMain = true;

                projects.unshift(this.main);

                projects.forEach((project)=> {

                    config = project.getConfiguration();
                    loader = project.getLoader();
                    isMain = project.isMain();

                    mountPoint = config.readWithDefaults('mount_point',
                        (isMain)? '':'/'+loader.getDirName());

                    wareOrder = (isMain)?
                        config.readWithDefaults('middleware', mainWare) :
                        config.readWithDefaults('middleware', subWare);

                    app = (isMain)?
                        express():(config.read('router')===true)?
                        express.Router():express();

                    wareOrder.
                        forEach(mware=>
                            WebMiddleWareRegistry.get(mware)
                            (mountPoint, app, config, loader, project));

                    WebRouting.configure(app,
                        loader.
                            loadFromConf('routes', []), config);

                    WebViewRegistry.get(config.readWithDefaults('view_engine','nunjucks'))
                    (app, config, loader, project);

                    mountain.push({point:mountPoint, app:app});

                });

                var mainApp = mountain.shift()['app'];
                mountain.forEach(mount=>mainApp.use(mount.point, mount.app));

                var server = new ManagedServer(
                    this.config.readWithDefaults('port', process.env.PORT || 3000),
                    this.config.readWithDefaults('host', process.env.HOST || '0.0.0.0'),
                    new PowerstoneServer(
                        WebServerFactory.create(mainApp, this.config.https)));

                return server.start().
                    then(this.serverStarted);

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

export default WebApplication
