var must = require('must');
var supertest = require('supertest');
var express = require('express');
var http = require('http');
var ManagedServer = require('../../../src/common/ManagedServer');

var server;
var app;
var request;
var impl;
var DO_NOT_CLOSE = false;

describe('ManagedServer', function() {

    beforeEach(function(done) {

        app = express();

        app.get('/', function(req, res) {
            res.status(204).send();
        });

        impl = {

            server: http.createServer(app),

            listen: function() {
                this.server.listen(7777);
            },

            on: function() {
                this.server.on.apply(this.server, arguments);
            },

            close: function(cb) {
                this.server.close(cb);
            }
        };

        request = supertest(app);
        server = new ManagedServer(impl);
        done();

    });

    afterEach(function(done) {
        if (DO_NOT_CLOSE) return done();
        return impl.server.close(done);
    });

    afterEach(function() {
        DO_NOT_CLOSE = false;
    });

    xit('must be able to start', function(done) {
        server.start().
        then(function() {
            request.get('/').
            expect(204).
            end(done);
        });
    });

    xit('must be able to restart', function(done) {

        server.start().
        then(function(server) {
            return server.restart();
        }).
        then(function() {
            request.get('/').
            expect(204).
            end(done);
        }).
        catch(done);

    });

    xit('must be able to be shutdown', function(done) {

        DO_NOT_CLOSE = true;

        return server.start().
        then(function(server) {
            return server.shutdown();
        }).
        then(function() {
            request.get('/').
            end(function(err) {
                must(true).be.true();
                done();
            });
        })
    })
});
