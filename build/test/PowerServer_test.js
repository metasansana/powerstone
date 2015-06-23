'use strict';

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

		server = new PowerServer(app, { host: '0.0.0.0', port: 8825 }, reactor);
		done();
	});

	afterEach(function (done) {

		if (server.httpServer) return server.httpServer.close(done);

		done();
	});

	it('must be able to start', function (done) {

		server.start().then(function () {
			must(reactor.HTTP_SERVER_CREATED).be['true']();
			request.get('/').expect(200).end(done);
		});
	});

	it('must be able to restart', function (done) {

		server.start().then(function () {

			return server.restart();
		}).then(function () {
			must(reactor.HTTP_SERVER_CLOSED).be['true']();
			request.get('/').expect(200).end(done);
		});
	});

	it('must be able to be shutdown', function (done) {

		return server.start().then(function () {

			return server.shutdown();
		}).then(function () {

			request.get('/').end(function (err) {

				must(reactor.HTTP_SERVER_CLOSED).be['true']();

				done();
			});
		});
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L1Bvd2VyU2VydmVyX3Rlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUM5QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQzs7QUFFcEQsSUFBSSxNQUFNLENBQUM7QUFDWCxJQUFJLEdBQUcsQ0FBQztBQUNSLElBQUksT0FBTyxDQUFDO0FBQ1osSUFBSSxPQUFPLENBQUM7O0FBRVosUUFBUSxDQUFDLGFBQWEsRUFBRSxZQUFZOztBQUVuQyxXQUFVLENBQUMsVUFBVSxJQUFJLEVBQUU7O0FBRTFCLFNBQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBQ3hCLEtBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUNoQixLQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDaEMsTUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUNqQixDQUFDLENBQUM7O0FBRUgsU0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFekIsUUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RFLE1BQUksRUFBRSxDQUFDO0VBRVAsQ0FBQyxDQUFDOztBQUVILFVBQVMsQ0FBQyxVQUFVLElBQUksRUFBRTs7QUFFekIsTUFBRyxNQUFNLENBQUMsVUFBVSxFQUNwQixPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVyQyxNQUFJLEVBQUUsQ0FBQztFQUNQLENBQUMsQ0FBQzs7QUFFSCxHQUFFLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxJQUFJLEVBQUU7O0FBRTFDLFFBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FDZCxJQUFJLENBQUMsWUFBWTtBQUNoQixPQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxRQUFLLEVBQUUsQ0FBQztBQUM1QyxVQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUNmLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDWCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDWCxDQUFDLENBQUE7RUFDSCxDQUFDLENBQUM7O0FBRUgsR0FBRSxDQUFDLHlCQUF5QixFQUFFLFVBQVUsSUFBSSxFQUFFOztBQUU3QyxRQUFNLENBQUMsS0FBSyxFQUFFLENBQ2IsSUFBSSxDQUFDLFlBQVk7O0FBRWhCLFVBQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ3hCLENBQUMsQ0FDRixJQUFJLENBQUMsWUFBWTtBQUNoQixPQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxRQUFLLEVBQUUsQ0FBQztBQUMzQyxVQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUNmLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDWCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDWCxDQUFDLENBQUE7RUFFSCxDQUFDLENBQUM7O0FBRUgsR0FBRSxDQUFDLDZCQUE2QixFQUFFLFVBQVUsSUFBSSxFQUFFOztBQUVqRCxTQUFPLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FDcEIsSUFBSSxDQUFDLFlBQVk7O0FBRWhCLFVBQU8sTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0dBQ3pCLENBQUMsQ0FDRixJQUFJLENBQUMsWUFBWTs7QUFFaEIsVUFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FDZixHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUU7O0FBRWxCLFFBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFFBQUssRUFBRSxDQUFDOztBQUUzQyxRQUFJLEVBQUUsQ0FBQztJQUNQLENBQUMsQ0FBQztHQUdKLENBQUMsQ0FBQTtFQUVILENBQUMsQ0FBQztDQUNILENBQUMsQ0FBQyIsImZpbGUiOiJQb3dlclNlcnZlcl90ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG11c3QgPSByZXF1aXJlKCdtdXN0Jyk7XG52YXIgc3VwZXJ0ZXN0ID0gcmVxdWlyZSgnc3VwZXJ0ZXN0Jyk7XG52YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbnZhciBQb3dlclNlcnZlciA9IHJlcXVpcmUoJy4uLy4vUG93ZXJTZXJ2ZXInKTtcbnZhciBSZWFjdG9yID0gcmVxdWlyZSgnLi4vaGVscGVycy9Nb2NrSHR0cFJlYWN0b3InKTtcblxudmFyIHNlcnZlcjtcbnZhciBhcHA7XG52YXIgcmVhY3RvcjtcbnZhciByZXF1ZXN0O1xuXG5kZXNjcmliZSgnUG93ZXJTZXJ2ZXInLCBmdW5jdGlvbiAoKSB7XG5cblx0YmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuXG5cdFx0cmVhY3RvciA9IG5ldyBSZWFjdG9yKCk7XG5cdFx0YXBwID0gZXhwcmVzcygpO1xuXHRcdGFwcC5nZXQoJy8nLCBmdW5jdGlvbiAocmVxLCByZXMpIHtcblx0XHRcdHJlcy5zZW5kKCdUZXN0Jyk7XG5cdFx0fSk7XG5cdFx0XG5cdFx0cmVxdWVzdCA9IHN1cGVydGVzdChhcHApO1xuXHRcdFxuXHRcdHNlcnZlciA9IG5ldyBQb3dlclNlcnZlcihhcHAsIHtob3N0OiAnMC4wLjAuMCcsIHBvcnQ6IDg4MjV9LCByZWFjdG9yKTtcblx0XHRkb25lKCk7XG5cblx0fSk7XG5cblx0YWZ0ZXJFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG5cdFx0XG5cdFx0aWYoc2VydmVyLmh0dHBTZXJ2ZXIpXG5cdFx0cmV0dXJuIHNlcnZlci5odHRwU2VydmVyLmNsb3NlKGRvbmUpO1xuXHRcdFxuXHRcdGRvbmUoKTtcblx0fSk7XG5cblx0aXQoJ211c3QgYmUgYWJsZSB0byBzdGFydCcsIGZ1bmN0aW9uIChkb25lKSB7XG5cblx0XHQgc2VydmVyLnN0YXJ0KCkuXG5cdFx0XHR0aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0bXVzdChyZWFjdG9yLkhUVFBfU0VSVkVSX0NSRUFURUQpLmJlLnRydWUoKTtcblx0XHRcdFx0cmVxdWVzdC5nZXQoJy8nKS5cblx0XHRcdFx0XHRleHBlY3QoMjAwKS5cblx0XHRcdFx0XHRlbmQoZG9uZSk7XG5cdFx0XHR9KVxuXHR9KTtcblxuXHRpdCgnbXVzdCBiZSBhYmxlIHRvIHJlc3RhcnQnLCBmdW5jdGlvbiAoZG9uZSkge1xuXG5cdFx0c2VydmVyLnN0YXJ0KCkuXG5cdFx0XHR0aGVuKGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRyZXR1cm4gc2VydmVyLnJlc3RhcnQoKTtcblx0XHRcdH0pLlxuXHRcdFx0dGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdG11c3QocmVhY3Rvci5IVFRQX1NFUlZFUl9DTE9TRUQpLmJlLnRydWUoKTtcblx0XHRcdFx0cmVxdWVzdC5nZXQoJy8nKS5cblx0XHRcdFx0XHRleHBlY3QoMjAwKS5cblx0XHRcdFx0XHRlbmQoZG9uZSk7XG5cdFx0XHR9KVxuXG5cdH0pO1xuXG5cdGl0KCdtdXN0IGJlIGFibGUgdG8gYmUgc2h1dGRvd24nLCBmdW5jdGlvbiAoZG9uZSkge1xuXG5cdFx0cmV0dXJuIHNlcnZlci5zdGFydCgpLlxuXHRcdFx0dGhlbihmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0cmV0dXJuIHNlcnZlci5zaHV0ZG93bigpO1xuXHRcdFx0fSkuXG5cdFx0XHR0aGVuKGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRyZXF1ZXN0LmdldCgnLycpLlxuXHRcdFx0XHRcdGVuZChmdW5jdGlvbiAoZXJyKSB7XG5cblx0XHRcdFx0XHRcdG11c3QocmVhY3Rvci5IVFRQX1NFUlZFUl9DTE9TRUQpLmJlLnRydWUoKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0ZG9uZSgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cblx0XHRcdH0pXG5cblx0fSk7XG59KTtcbiJdfQ==