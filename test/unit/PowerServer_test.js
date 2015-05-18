var must = require('must');
var supertest = require('supertest');
var express = require('express');
var PowerServer = require('.././PowerServer');
var Reactor = require('../helpers/MockHttpReactor');

var server;
var app;
var reactor;
var request;

describe('PowerServer', function () {

	beforeEach(function (done) {

		reactor = new Reactor();
		app = express();
		app.get('/', function (req, res) {
			res.send('Test');
		});
		
		request = supertest(app);
		
		server = new PowerServer(app, {host: '0.0.0.0', port: 8825}, reactor);
		done();

	});

	afterEach(function (done) {
		
		if(server.httpServer)
		return server.httpServer.close(done);
		
		done();
	});

	it('must be able to start', function (done) {

		 server.start().
			then(function () {
				must(reactor.HTTP_SERVER_CREATED).be.true();
				request.get('/').
					expect(200).
					end(done);
			})
	});

	it('must be able to restart', function (done) {

		server.start().
			then(function () {

				return server.restart();
			}).
			then(function () {
				must(reactor.HTTP_SERVER_CLOSED).be.true();
				request.get('/').
					expect(200).
					end(done);
			})

	});

	it('must be able to be shutdown', function (done) {

		return server.start().
			then(function () {

				return server.shutdown();
			}).
			then(function () {

				request.get('/').
					end(function (err) {

						must(reactor.HTTP_SERVER_CLOSED).be.true();
						
						done();
					});


			})

	});
});
