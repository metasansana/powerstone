import must from 'must';
import supertest from 'supertest';
import express from 'express';
import http from 'http';
import ManagedServer from 'pwr/net/ManagedServer';

var server;
var app;
var request;
var impl;

function newImpl() {

    return {

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

}

describe('ManagedServer', function() {

    beforeEach(function(done) {

        app = express();

        app.get('/', function(req, res) {
            res.status(204).send();
        });

        impl = newImpl();

        request = supertest(app);
        server = new ManagedServer(2333, '0.0.0.0', impl);
        done();

    });

    afterEach(function(done) {
        return impl.server.close(done);
    });

    it('must be able to start', function(done) {
        server.start().
        then(function() {
            request.get('/').
            expect(204).
            end(done);
        });
    });

    it('must be able to restart', function(done) {

        return server.start().
        then(() => server.restart()).
        then(function() {
            request.get('/').
            expect(204).
            end(done);
        });

    });

    xit('must be able to be shutdown', function(done) {

        //There has to be a better way to test if the server is shutdown.
        app = express();

        app.get('/', function(req, res) {
            res.status(204).send();
        });

        impl = newImpl();
        request = supertest(app);
        server = new ManagedServer(2333, '0.0.0.0', impl);

        return server.start().
        then(() => server.shutdown()).
        then(function() {
            request.get('/').
            end(function(err, res) {

                must(err).not.be(null);
                done();

            });
        })
    })
});
