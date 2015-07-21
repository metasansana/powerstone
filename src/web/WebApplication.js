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

var mainMWare = ['public', 'method-override', 'morgan',
    'body-parser', 'cookie-parser', 'session', 'csrf'];

var subMWare = [];

class WebApplication extends Application {

    run() {

        return Application.prototype.run.call(this).
            then(() => {

                var app = express();

                this.config.
                    readWithDefaults('middleware', mainMWare).
                    forEach(mware=>
                        WebMiddleWareRegistry.get(mware)
                        (this.config.readWithDefaults('mount', ''), app, this.main));

                WebRouting.configure(app,
                    this.main.getLoader().
                        loadFromConf('routes', []), this.config);

                WebViewRegistry.get(this.config.readWithDefaults('view_engine','nunjucks'))
                (app, this.config, this.main);

                var server = new ManagedServer(
                    this.config.readWithDefaults('port', process.env.PORT || 3000),
                    this.config.readWithDefaults('host', process.env.HOST || '0.0.0.0'),
                    new PowerstoneServer(
                        WebServerFactory.create(app, this.config.https)));

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
