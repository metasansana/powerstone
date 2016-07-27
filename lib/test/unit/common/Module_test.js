'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _srcCommonModule = require('../../../src/common/Module');

var _srcCommonModule2 = _interopRequireDefault(_srcCommonModule);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var m;
var config_js;
var config;
var loader;
var files;

describe('Module', function () {

    beforeEach(function () {

        config = {
            readWithDefaults: function readWithDefaults(key, defaults) {
                return config_js[key] || defaults;
            }
        };

        loader = {
            basename: function basename() {
                return _path2['default'].basename(this.path);
            },
            join: function join(v) {
                return _path2['default'].join(this.path, v);
            },
            load: function load(path, defaults) {
                return files[path] ? files[path] : defaults;
            }
        };

        config_js = {};
        files = {};
    });

    describe('.modules()', function () {

        xit('should load all the submodules into memory', function () {

            var o = {};

            config_js = {
                modules: ['m0', 'm1', 'm2']
            };

            loader.path = __dirname + '/assets';

            m = new _srcCommonModule2['default']('main', 'main', config, loader, {});
            m.modules(o);
            (0, _must2['default'])(Object.keys(o).length).equal(config_js['modules'].length);
        });
    });

    describe('.connections()', function () {

        xit('should intiate all connections', function () {

            var o = {};
            var connection = {};
            var types = {
                t: function t(cfg, yes, no) {
                    yes('t');
                },
                p: function p(cfg, yes, no) {
                    yes('p');
                },
                q: function q(cfg, yes, no) {
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

            m = new _srcCommonModule2['default']('main', 'main', config, loader, {});
            _bluebird2['default'].all(m.connections(types, o)).then(function (conns) {
                return (0, _must2['default'])(o).eql({
                    session: 'p',
                    q: 'q',
                    main: 't'
                });
            });
        });
    });

    describe('.restify()', function () {

        xit('should configure restify', function () {

            var server = _restify2['default'].createServer();
            m = new _srcCommonModule2['default']('main', 'main', config, loader, {
                controllers: {},
                models: {},
                middleware: {}
            });

            files['routes.js'] = {
                '/usage': {
                    get: function get(req, res, next) {
                        res.send(200);
                    }
                }
            };

            m.restify(server, null);

            return (0, _supertestAsPromised2['default'])(server).get('/usage').expect(200);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L3VuaXQvY29tbW9uL01vZHVsZV90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7b0JBQWlCLE1BQU07Ozs7bUNBQ0gsdUJBQXVCOzs7O3VCQUN2QixTQUFTOzs7O3VCQUNULFNBQVM7Ozs7b0JBQ1osTUFBTTs7OzsrQkFDSiw0QkFBNEI7Ozs7d0JBQzNCLFVBQVU7Ozs7QUFFOUIsSUFBSSxDQUFDLENBQUM7QUFDTixJQUFJLFNBQVMsQ0FBQztBQUNkLElBQUksTUFBTSxDQUFDO0FBQ1gsSUFBSSxNQUFNLENBQUM7QUFDWCxJQUFJLEtBQUssQ0FBQzs7QUFFVixRQUFRLENBQUMsUUFBUSxFQUFFLFlBQVc7O0FBRTFCLGNBQVUsQ0FBQyxZQUFXOztBQUVsQixjQUFNLEdBQUc7QUFDTCw0QkFBZ0IsRUFBQSwwQkFBQyxHQUFHLEVBQUUsUUFBUSxFQUFFO0FBQzVCLHVCQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUM7YUFDckM7U0FDSixDQUFDOztBQUVGLGNBQU0sR0FBRztBQUNMLG9CQUFRLEVBQUEsb0JBQUc7QUFDSCx1QkFBTyxrQkFBSyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25DO0FBQ0QsZ0JBQUksRUFBQSxjQUFDLENBQUMsRUFBRTtBQUNKLHVCQUFPLGtCQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2xDO0FBQ0QsZ0JBQUksRUFBQSxjQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDakIsdUJBQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUE7YUFDOUM7U0FDUixDQUFBOztBQUVELGlCQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ2YsYUFBSyxHQUFHLEVBQUUsQ0FBQztLQUNkLENBQUMsQ0FBQzs7QUFFSCxZQUFRLENBQUMsWUFBWSxFQUFF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RyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDakI7aUJBQ0o7YUFDSixDQUFBOztBQUVELGFBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUV4QixtQkFBTyxzQ0FBUSxNQUFNLENBQUMsQ0FDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUdmLENBQUMsQ0FBQztLQUNOLENBQUMsQ0FBQztDQUNOLENBQUMsQ0FBQyIsImZpbGUiOiJNb2R1bGVfdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtdXN0IGZyb20gJ211c3QnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnc3VwZXJ0ZXN0LWFzLXByb21pc2VkJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHJlc3RpZnkgZnJvbSAncmVzdGlmeSc7XG5pbXBvcnQgUGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBNb2R1bGUgZnJvbSAnLi4vLi4vLi4vc3JjL2NvbW1vbi9Nb2R1bGUnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG52YXIgbTtcbnZhciBjb25maWdfanM7XG52YXIgY29uZmlnO1xudmFyIGxvYWRlcjtcbnZhciBmaWxlcztcblxuZGVzY3JpYmUoJ01vZHVsZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICByZWFkV2l0aERlZmF1bHRzKGtleSwgZGVmYXVsdHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnX2pzW2tleV0gfHwgZGVmYXVsdHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbG9hZGVyID0ge1xuICAgICAgICAgICAgYmFzZW5hbWUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQYXRoLmJhc2VuYW1lKHRoaXMucGF0aCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBqb2luKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFBhdGguam9pbih0aGlzLnBhdGgsIHYpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbG9hZChwYXRoLCBkZWZhdWx0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsZXNbcGF0aF0gPyBmaWxlc1twYXRoXSA6IGRlZmF1bHRzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnX2pzID0ge307XG4gICAgICAgIGZpbGVzID0ge307XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnLm1vZHVsZXMoKScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHhpdCgnc2hvdWxkIGxvYWQgYWxsIHRoZSBzdWJtb2R1bGVzIGludG8gbWVtb3J5JywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIHZhciBvID0ge307XG5cbiAgICAgICAgICAgIGNvbmZpZ19qcyA9IHtcbiAgICAgICAgICAgICAgICBtb2R1bGVzOiBbJ20wJywgJ20xJywgJ20yJ11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxvYWRlci5wYXRoID0gX19kaXJuYW1lICsgJy9hc3NldHMnO1xuXG4gICAgICAgICAgICBtID0gbmV3IE1vZHVsZSgnbWFpbicsICdtYWluJywgY29uZmlnLCBsb2FkZXIsIHt9KTtcbiAgICAgICAgICAgIG0ubW9kdWxlcyhvKTtcbiAgICAgICAgICAgIG11c3QoT2JqZWN0LmtleXMobykubGVuZ3RoKS5lcXVhbChjb25maWdfanNbJ21vZHVsZXMnXS5sZW5ndGgpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnLmNvbm5lY3Rpb25zKCknLCBmdW5jdGlvbigpIHtcblxuICAgICAgICB4aXQoJ3Nob3VsZCBpbnRpYXRlIGFsbCBjb25uZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICB2YXIgbyA9IHt9O1xuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB7fTtcbiAgICAgICAgICAgIHZhciB0eXBlcyA9IHtcbiAgICAgICAgICAgICAgICB0KGNmZywgeWVzLCBubykge1xuICAgICAgICAgICAgICAgICAgICAgICAgeWVzKCd0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHAoY2ZnLCB5ZXMsIG5vKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ZXMoJ3AnKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcShjZmcsIHllcywgbm8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHllcygncycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25maWdfanMgPSB7XG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3QnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBxOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxvYWRlci5wYXRoID0gX19kaXJuYW1lICsgJy9hc3NldHMnO1xuXG4gICAgICAgICAgICBtID0gbmV3IE1vZHVsZSgnbWFpbicsICdtYWluJywgY29uZmlnLCBsb2FkZXIsIHt9KTtcbiAgICAgICAgICAgIFByb21pc2UuYWxsKG0uY29ubmVjdGlvbnModHlwZXMsIG8pKS50aGVuKGNvbm5zID0+XG4gICAgICAgICAgICAgICAgbXVzdChvKS5lcWwoe1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uOiAncCcsXG4gICAgICAgICAgICAgICAgICAgIHE6ICdxJyxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjogJ3QnXG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnLnJlc3RpZnkoKScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHhpdCgnc2hvdWxkIGNvbmZpZ3VyZSByZXN0aWZ5JywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSByZXN0aWZ5LmNyZWF0ZVNlcnZlcigpO1xuICAgICAgICAgICAgbSA9IG5ldyBNb2R1bGUoJ21haW4nLCAnbWFpbicsIGNvbmZpZywgbG9hZGVyLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcnM6IHt9LFxuICAgICAgICAgICAgICAgIG1vZGVsczoge30sXG4gICAgICAgICAgICAgICAgbWlkZGxld2FyZToge31cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmaWxlc1sncm91dGVzLmpzJ10gPSB7XG4gICAgICAgICAgICAgICAgJy91c2FnZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoMjAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbS5yZXN0aWZ5KHNlcnZlciwgbnVsbCk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0KHNlcnZlcikuXG4gICAgICAgICAgICBnZXQoJy91c2FnZScpLlxuICAgICAgICAgICAgZXhwZWN0KDIwMCk7XG5cblxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19