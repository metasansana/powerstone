import must from 'must';
import request from 'supertest-as-promised';
import express from 'express';
import restify from 'restify';
import Path from 'path';
import Module from '../../../src/common/Module';
import Promise from 'bluebird';

var m;
var config_js;
var config;
var loader;
var files;

describe('Module', function() {

    beforeEach(function() {

        config = {
            readWithDefaults(key, defaults) {
                return config_js[key] || defaults;
            }
        };

        loader = {
            basename() {
                    return Path.basename(this.path);
                },
                join(v) {
                    return Path.join(this.path, v);
                },
                load(path, defaults) {
                    return files[path] ? files[path] : defaults
                }
        }

        config_js = {};
        files = {};
    });

    describe('.modules()', function() {

        xit('should load all the submodules into memory', function() {

            var o = {};

            config_js = {
                modules: ['m0', 'm1', 'm2']
            };

            loader.path = __dirname + '/assets';

            m = new Module('main', 'main', config, loader, {});
            m.modules(o);
            must(Object.keys(o).length).equal(config_js['modules'].length);

        });

    });

    describe('.connections()', function() {

        xit('should intiate all connections', function() {

            var o = {};
            var connection = {};
            var types = {
                t(cfg, yes, no) {
                        yes('t');
                    },
                    p(cfg, yes, no) {
                        yes('p');
                    },
                    q(cfg, yes, no) {
                        yes('s');
                    }
            };

            config_js = {
                connections: {
                    main: {
                        type: 't'
                    },
                    session: {
                        type: 'p'
                    },
                    q: {
                        type: 'q'
                    }
                }
            };

            loader.path = __dirname + '/assets';

            m = new Module('main', 'main', config, loader, {});
            Promise.all(m.connections(types, o)).then(conns =>
                must(o).eql({
                    session: 'p',
                    q: 'q',
                    main: 't'
                }));

        });

    });

    describe('.restify()', function() {

        xit('should configure restify', function() {

            var server = restify.createServer();
            m = new Module('main', 'main', config, loader, {
                controllers: {},
                models: {},
                middleware: {}
            });

            files['routes.js'] = {
                '/usage': {
                    get: function(req, res, next) {
                        res.send(200);
                    }
                }
            }

            m.restify(server, null);

            return request(server).
            get('/usage').
            expect(200);


        });
    });
});
