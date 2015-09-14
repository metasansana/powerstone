'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var project;
var loader;
var Connections;
var config;
var $config;

describe('Project', function () {

    beforeEach(function () {

        config = {
            readWithDefaults: function readWithDefaults(key, defaults) {
                if ($config[key]) return $config[key];
                return defaults;
            }
        };

        loader = {

            loadFromConf: function loadFromConf(file) {

                if (file === 'config') return {};
            }

        };
    });

    describe('Project#isMain', function () {

        it('should return true with no prefix', function () {
            project = new _Project2['default'](null, config, loader);
            (0, _must2['default'])(project.isMain()).eql(true);
        });

        it('should return false with a prefix', function () {
            project = new _Project2['default']('apps', config, loader);
            (0, _must2['default'])(project.isMain()).eql(false);
        });
    });

    describe('Project#setConnections', function () {

        beforeEach(function () {

            Connections = {
                create: function create(name, type, factory) {
                    this.open = { name: name, type: type, factory: factory };
                }
            };

            $config = {
                connections: {
                    type: 'test',
                    name: 'test-connection',
                    options: [1, 2, 3]
                }
            };

            project = new _Project2['default'](null, config, loader);
            project.setConnections(Connections);
            (0, _must2['default'])(Connections.open).eql({ name: 'test-connection', type: 'test', options: [1, 2, 3] });
        });
    });

    describe('Project#getSubProjects', function () {

        it('should create new projects from the projects field', function () {

            $config = {
                projects: [__dirname + '/project_test/app1', __dirname + '/project_test/app2', __dirname + '/project_test/app3']
            };

            project = new _Project2['default'](null, config, loader);
            var projects = project.getSubProjects();
            (0, _must2['default'])(projects.length).be(3);
            projects.forEach(function (project) {
                return (0, _must2['default'])(project).instanceOf(_Project2['default']);
            });
        });
    });
});
//# sourceMappingURL=Project_test.js.map