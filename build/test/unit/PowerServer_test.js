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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L3VuaXQvUG93ZXJTZXJ2ZXJfdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzlDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDOztBQUVwRCxJQUFJLE1BQU0sQ0FBQztBQUNYLElBQUksR0FBRyxDQUFDO0FBQ1IsSUFBSSxPQUFPLENBQUM7QUFDWixJQUFJLE9BQU8sQ0FBQzs7QUFFWixRQUFRLENBQUMsYUFBYSxFQUFFLFlBQVk7O0FBRW5DLFdBQVUsQ0FBQyxVQUFVLElBQUksRUFBRTs7QUFFMUIsU0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7QUFDeEIsS0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ2hCLEtBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNoQyxNQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ2pCLENBQUMsQ0FBQzs7QUFFSCxTQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUV6QixRQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdEUsTUFBSSxFQUFFLENBQUM7RUFFUCxDQUFDLENBQUM7O0FBRUgsVUFBUyxDQUFDLFVBQVUsSUFBSSxFQUFFOztBQUV6QixNQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQ3BCLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRXJDLE1BQUksRUFBRSxDQUFDO0VBQ1AsQ0FBQyxDQUFDOztBQUVILEdBQUUsQ0FBQyx1QkFBdUIsRUFBRSxVQUFVLElBQUksRUFBRTs7QUFFMUMsUUFBTSxDQUFDLEtBQUssRUFBRSxDQUNkLElBQUksQ0FBQyxZQUFZO0FBQ2hCLE9BQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLFFBQUssRUFBRSxDQUFDO0FBQzVDLFVBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNYLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUNYLENBQUMsQ0FBQTtFQUNILENBQUMsQ0FBQzs7QUFFSCxHQUFFLENBQUMseUJBQXlCLEVBQUUsVUFBVSxJQUFJLEVBQUU7O0FBRTdDLFFBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FDYixJQUFJLENBQUMsWUFBWTs7QUFFaEIsVUFBTyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7R0FDeEIsQ0FBQyxDQUNGLElBQUksQ0FBQyxZQUFZO0FBQ2hCLE9BQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLFFBQUssRUFBRSxDQUFDO0FBQzNDLFVBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNYLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUNYLENBQUMsQ0FBQTtFQUVILENBQUMsQ0FBQzs7QUFFSCxHQUFFLENBQUMsNkJBQTZCLEVBQUUsVUFBVSxJQUFJLEVBQUU7O0FBRWpELFNBQU8sTUFBTSxDQUFDLEtBQUssRUFBRSxDQUNwQixJQUFJLENBQUMsWUFBWTs7QUFFaEIsVUFBTyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7R0FDekIsQ0FBQyxDQUNGLElBQUksQ0FBQyxZQUFZOztBQUVoQixVQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUNmLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRTs7QUFFbEIsUUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsUUFBSyxFQUFFLENBQUM7O0FBRTNDLFFBQUksRUFBRSxDQUFDO0lBQ1AsQ0FBQyxDQUFDO0dBR0osQ0FBQyxDQUFBO0VBRUgsQ0FBQyxDQUFDO0NBQ0gsQ0FBQyxDQUFDIiwiZmlsZSI6IlBvd2VyU2VydmVyX3Rlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbXVzdCA9IHJlcXVpcmUoJ211c3QnKTtcbnZhciBzdXBlcnRlc3QgPSByZXF1aXJlKCdzdXBlcnRlc3QnKTtcbnZhciBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xudmFyIFBvd2VyU2VydmVyID0gcmVxdWlyZSgnLi4vLi9Qb3dlclNlcnZlcicpO1xudmFyIFJlYWN0b3IgPSByZXF1aXJlKCcuLi9oZWxwZXJzL01vY2tIdHRwUmVhY3RvcicpO1xuXG52YXIgc2VydmVyO1xudmFyIGFwcDtcbnZhciByZWFjdG9yO1xudmFyIHJlcXVlc3Q7XG5cbmRlc2NyaWJlKCdQb3dlclNlcnZlcicsIGZ1bmN0aW9uICgpIHtcblxuXHRiZWZvcmVFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG5cblx0XHRyZWFjdG9yID0gbmV3IFJlYWN0b3IoKTtcblx0XHRhcHAgPSBleHByZXNzKCk7XG5cdFx0YXBwLmdldCgnLycsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuXHRcdFx0cmVzLnNlbmQoJ1Rlc3QnKTtcblx0XHR9KTtcblx0XHRcblx0XHRyZXF1ZXN0ID0gc3VwZXJ0ZXN0KGFwcCk7XG5cdFx0XG5cdFx0c2VydmVyID0gbmV3IFBvd2VyU2VydmVyKGFwcCwge2hvc3Q6ICcwLjAuMC4wJywgcG9ydDogODgyNX0sIHJlYWN0b3IpO1xuXHRcdGRvbmUoKTtcblxuXHR9KTtcblxuXHRhZnRlckVhY2goZnVuY3Rpb24gKGRvbmUpIHtcblx0XHRcblx0XHRpZihzZXJ2ZXIuaHR0cFNlcnZlcilcblx0XHRyZXR1cm4gc2VydmVyLmh0dHBTZXJ2ZXIuY2xvc2UoZG9uZSk7XG5cdFx0XG5cdFx0ZG9uZSgpO1xuXHR9KTtcblxuXHRpdCgnbXVzdCBiZSBhYmxlIHRvIHN0YXJ0JywgZnVuY3Rpb24gKGRvbmUpIHtcblxuXHRcdCBzZXJ2ZXIuc3RhcnQoKS5cblx0XHRcdHRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRtdXN0KHJlYWN0b3IuSFRUUF9TRVJWRVJfQ1JFQVRFRCkuYmUudHJ1ZSgpO1xuXHRcdFx0XHRyZXF1ZXN0LmdldCgnLycpLlxuXHRcdFx0XHRcdGV4cGVjdCgyMDApLlxuXHRcdFx0XHRcdGVuZChkb25lKTtcblx0XHRcdH0pXG5cdH0pO1xuXG5cdGl0KCdtdXN0IGJlIGFibGUgdG8gcmVzdGFydCcsIGZ1bmN0aW9uIChkb25lKSB7XG5cblx0XHRzZXJ2ZXIuc3RhcnQoKS5cblx0XHRcdHRoZW4oZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHJldHVybiBzZXJ2ZXIucmVzdGFydCgpO1xuXHRcdFx0fSkuXG5cdFx0XHR0aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0bXVzdChyZWFjdG9yLkhUVFBfU0VSVkVSX0NMT1NFRCkuYmUudHJ1ZSgpO1xuXHRcdFx0XHRyZXF1ZXN0LmdldCgnLycpLlxuXHRcdFx0XHRcdGV4cGVjdCgyMDApLlxuXHRcdFx0XHRcdGVuZChkb25lKTtcblx0XHRcdH0pXG5cblx0fSk7XG5cblx0aXQoJ211c3QgYmUgYWJsZSB0byBiZSBzaHV0ZG93bicsIGZ1bmN0aW9uIChkb25lKSB7XG5cblx0XHRyZXR1cm4gc2VydmVyLnN0YXJ0KCkuXG5cdFx0XHR0aGVuKGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRyZXR1cm4gc2VydmVyLnNodXRkb3duKCk7XG5cdFx0XHR9KS5cblx0XHRcdHRoZW4oZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdHJlcXVlc3QuZ2V0KCcvJykuXG5cdFx0XHRcdFx0ZW5kKGZ1bmN0aW9uIChlcnIpIHtcblxuXHRcdFx0XHRcdFx0bXVzdChyZWFjdG9yLkhUVFBfU0VSVkVSX0NMT1NFRCkuYmUudHJ1ZSgpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRkb25lKCk7XG5cdFx0XHRcdFx0fSk7XG5cblxuXHRcdFx0fSlcblxuXHR9KTtcbn0pO1xuIl19