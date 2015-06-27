import Promise from  'bluebird';
import express from 'express';
import crypto from 'crypto';
import nunjucks from 'nunjucks';
import Application from '../Application';
import PowerstoneServer from '../PowerstoneServer';
import ManagedServer from '../ManagedServer';
import Builtin from './Builtin';
import WebAppRoutingFramework from './WebAppRoutingFramework';
import WebAppFramework from './WebAppFramework';
import StringConversion from'./StringConversion';
import defaultConfig from './defaultConfig';
import WebServerFactory from './WebServerFactory';

class WebApplication extends Application {

    _defaultConfig() {
        return defaultConfig;
    }

    getAppViewEngine(path, app) {

        return nunjucks.configure(path, {
            autoescape: true,
            express: app
        });

    }

    run() {

        var self = this;

        //If the session config describes a store we use it to configure a connection.
        if (self.config.session)
            if (self.config.session.store)
                self.connections.create('session',
                    self.config.session.store.type, self.config.session.store.options);

        return Application.prototype.run.call(this).
            then(function () {
                var app = express();
                var routingFramework = new WebAppRoutingFramework(express.Router(), new StringConversion());
                var appFramework = new WebAppFramework(app, self.config);
                var conf = self.config;

                conf.views = conf.views || 'views';
                conf.views = self.parent + '/' + conf.views;
                conf.public = conf.public || 'public';

                appFramework.
                    usePublic(self.parent).
                    useMethodOverride().
                    useLogging().
                    useBodyParser().
                    useCookieParser().
                    useSessions(self.connections).
                    useCSRF();

                self.routes.forEach(function (route) {
                    routingFramework.configureSchema(route);
                    routingFramework.configureMiddleWare(route, self.middleware);
                    routingFramework.configureQueries(route, self.models, self.queries);
                    routingFramework.configureControllers(route, self.controllers);
                    routingFramework.configureViews(route);
                });

                self.getAppViewEngine(conf.views, app);
                app.use('/', routingFramework.toRouter());
                app.use(Builtin.send404Page);

                var server = new ManagedServer(
                    conf.port,
                    conf.host,
                    new PowerstoneServer(
                        WebServerFactory.create(app, conf.https)));

                return server.start();

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
