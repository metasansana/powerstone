'use strict';

var must = require('must');
var supertest = require('supertest');
var express = require('express');
var ManagedServer = require('../ManagedServer');

var server;
var app;
var request;
var impl;

describe('ManagedServer', function () {

    beforeEach(function (done) {

        app = express();

        app.get('/', function (req, res) {
            res.send('Test');
        });

        impl = {

            server: app.listen(7777),

            listen: function listen() {},

            on: function on() {
                this.server.on.apply(this.server, arguments);
            },

            close: function close() {
                this.server.close();
            }
        };

        request = supertest(app);
        server = new ManagedServer(impl);
        done();
    });

    afterEach(function (done) {
        if (impl.server) return impl.server.close(done);
    });

    it('must be able to start', function (done) {
        server.start().then(function () {
            request.get('/').expect(200).end(done);
        });
    });

    it('must be able to restart', function (done) {

        server.start().then(function (server) {
            return server.restart();
        }).then(function () {
            request.get('/').expect(200).end(done);
        });
    });

    xit('must be able to be shutdown', function (done) {

        return server.start().then(function (server) {
            return server.shutdown();
        }).then(function () {

            request.get('/').end(function (err) {
                must(true).be['true']();
                done();
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L01hbmFnZWRTZXJ2ZXJfdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUVoRCxJQUFJLE1BQU0sQ0FBQztBQUNYLElBQUksR0FBRyxDQUFDO0FBQ1IsSUFBSSxPQUFPLENBQUM7QUFDWixJQUFJLElBQUksQ0FBQzs7QUFFVCxRQUFRLENBQUMsZUFBZSxFQUFFLFlBQVk7O0FBRWxDLGNBQVUsQ0FBQyxVQUFVLElBQUksRUFBRTs7QUFFdkIsV0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDOztBQUVoQixXQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDN0IsZUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQixDQUFDLENBQUM7O0FBRUgsWUFBSSxHQUFHOztBQUVILGtCQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7O0FBRXhCLGtCQUFNLEVBQUUsa0JBQVksRUFFbkI7O0FBRUQsY0FBRSxFQUFFLGNBQVk7QUFDWixvQkFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDaEQ7O0FBRUQsaUJBQUssRUFBRSxpQkFBWTtBQUNmLG9CQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3ZCO1NBQ0osQ0FBQzs7QUFFRixlQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLGNBQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxZQUFJLEVBQUUsQ0FBQztLQUVWLENBQUMsQ0FBQzs7QUFFSCxhQUFTLENBQUMsVUFBVSxJQUFJLEVBQUU7QUFDdEIsWUFBSSxJQUFJLENBQUMsTUFBTSxFQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEMsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyx1QkFBdUIsRUFBRSxVQUFVLElBQUksRUFBRTtBQUN4QyxjQUFNLENBQUMsS0FBSyxFQUFFLENBQ1YsSUFBSSxDQUFDLFlBQVk7QUFDYixtQkFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FDWixNQUFNLENBQUMsR0FBRyxDQUFDLENBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCLENBQUMsQ0FBQztLQUNWLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMseUJBQXlCLEVBQUUsVUFBVSxJQUFJLEVBQUU7O0FBRTFDLGNBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FDVixJQUFJLENBQUMsVUFBVSxNQUFNLEVBQUU7QUFDbkIsbUJBQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNCLENBQUMsQ0FDRixJQUFJLENBQUMsWUFBWTtBQUNiLG1CQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUNaLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDWCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakIsQ0FBQyxDQUFDO0tBRVYsQ0FBQyxDQUFDOztBQUVILE9BQUcsQ0FBQyw2QkFBNkIsRUFBRSxVQUFVLElBQUksRUFBRTs7QUFFL0MsZUFBTyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQ2pCLElBQUksQ0FBQyxVQUFVLE1BQU0sRUFBRTtBQUNuQixtQkFBTyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDNUIsQ0FBQyxDQUNGLElBQUksQ0FBQyxZQUFZOztBQUViLG1CQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUNaLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNmLG9CQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxRQUFLLEVBQUUsQ0FBQztBQUNyQixvQkFBSSxFQUFFLENBQUM7YUFDVixDQUFDLENBQUM7U0FDVixDQUFDLENBQUE7S0FDVCxDQUFDLENBQUM7Q0FDTixDQUFDLENBQUMiLCJmaWxlIjoiTWFuYWdlZFNlcnZlcl90ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG11c3QgPSByZXF1aXJlKCdtdXN0Jyk7XG52YXIgc3VwZXJ0ZXN0ID0gcmVxdWlyZSgnc3VwZXJ0ZXN0Jyk7XG52YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbnZhciBNYW5hZ2VkU2VydmVyID0gcmVxdWlyZSgnLi4vTWFuYWdlZFNlcnZlcicpO1xuXG52YXIgc2VydmVyO1xudmFyIGFwcDtcbnZhciByZXF1ZXN0O1xudmFyIGltcGw7XG5cbmRlc2NyaWJlKCdNYW5hZ2VkU2VydmVyJywgZnVuY3Rpb24gKCkge1xuXG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoZG9uZSkge1xuXG4gICAgICAgIGFwcCA9IGV4cHJlc3MoKTtcblxuICAgICAgICBhcHAuZ2V0KCcvJywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gICAgICAgICAgICByZXMuc2VuZCgnVGVzdCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpbXBsID0ge1xuXG4gICAgICAgICAgICBzZXJ2ZXI6IGFwcC5saXN0ZW4oNzc3NyksXG5cbiAgICAgICAgICAgIGxpc3RlbjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmVyLm9uLmFwcGx5KHRoaXMuc2VydmVyLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZlci5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3QgPSBzdXBlcnRlc3QoYXBwKTtcbiAgICAgICAgc2VydmVyID0gbmV3IE1hbmFnZWRTZXJ2ZXIoaW1wbCk7XG4gICAgICAgIGRvbmUoKTtcblxuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgIGlmIChpbXBsLnNlcnZlcilcbiAgICAgICAgICAgIHJldHVybiBpbXBsLnNlcnZlci5jbG9zZShkb25lKTtcbiAgICB9KTtcblxuICAgIGl0KCdtdXN0IGJlIGFibGUgdG8gc3RhcnQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICBzZXJ2ZXIuc3RhcnQoKS5cbiAgICAgICAgICAgIHRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuZ2V0KCcvJykuXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdCgyMDApLlxuICAgICAgICAgICAgICAgICAgICBlbmQoZG9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdtdXN0IGJlIGFibGUgdG8gcmVzdGFydCcsIGZ1bmN0aW9uIChkb25lKSB7XG5cbiAgICAgICAgc2VydmVyLnN0YXJ0KCkuXG4gICAgICAgICAgICB0aGVuKGZ1bmN0aW9uIChzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmVyLnJlc3RhcnQoKTtcbiAgICAgICAgICAgIH0pLlxuICAgICAgICAgICAgdGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5nZXQoJy8nKS5cbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KDIwMCkuXG4gICAgICAgICAgICAgICAgICAgIGVuZChkb25lKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICB4aXQoJ211c3QgYmUgYWJsZSB0byBiZSBzaHV0ZG93bicsIGZ1bmN0aW9uIChkb25lKSB7XG5cbiAgICAgICAgcmV0dXJuIHNlcnZlci5zdGFydCgpLlxuICAgICAgICAgICAgdGhlbihmdW5jdGlvbiAoc2VydmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZlci5zaHV0ZG93bigpO1xuICAgICAgICAgICAgfSkuXG4gICAgICAgICAgICB0aGVuKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHJlcXVlc3QuZ2V0KCcvJykuXG4gICAgICAgICAgICAgICAgICAgIGVuZChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtdXN0KHRydWUpLmJlLnRydWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgIH0pO1xufSk7XG4iXX0=