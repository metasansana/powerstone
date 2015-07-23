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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L1Byb2plY3RfdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O29CQUFpQixNQUFNOzs7O3VCQUNILFlBQVk7Ozs7QUFFaEMsSUFBSSxPQUFPLENBQUM7QUFDWixJQUFJLE1BQU0sQ0FBQztBQUNYLElBQUksV0FBVyxDQUFDO0FBQ2hCLElBQUksTUFBTSxDQUFDO0FBQ1gsSUFBSSxPQUFPLENBQUM7O0FBRVosUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZOztBQUU1QixjQUFVLENBQUMsWUFBWTs7QUFFbkIsY0FBTSxHQUFHO0FBQ0wsNEJBQWdCLEVBQUEsMEJBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRTtBQUM1QixvQkFBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQ2YsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDcEIsdUJBQU8sUUFBUSxDQUFDO2FBQ25CO1NBQ0osQ0FBQzs7QUFFRixjQUFNLEdBQUc7O0FBRUwsd0JBQVksRUFBQSxzQkFBQyxJQUFJLEVBQUU7O0FBRWYsb0JBQUcsSUFBSSxLQUFLLFFBQVEsRUFDcEIsT0FBTyxFQUVOLENBQUM7YUFFTDs7U0FFSixDQUFDO0tBRUwsQ0FBQyxDQUFDOztBQUVILFlBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZOztBQUVuQyxVQUFFLENBQUMsbUNBQW1DLEVBQUUsWUFBWTtBQUNqRCxtQkFBTyxHQUFJLHlCQUFZLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDNUMsbUNBQUssT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDLENBQUMsQ0FBQzs7QUFFSCxVQUFFLENBQUMsbUNBQW1DLEVBQUUsWUFBWTtBQUNoRCxtQkFBTyxHQUFHLHlCQUFZLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDOUMsbUNBQUssT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDLENBQUMsQ0FBQztLQUVOLENBQUMsQ0FBQzs7QUFFSCxZQUFRLENBQUMsd0JBQXdCLEVBQUUsWUFBWTs7QUFFM0Msa0JBQVUsQ0FBQyxZQUFZOztBQUVuQix1QkFBVyxHQUFHO0FBQ1Ysc0JBQU0sRUFBQSxnQkFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUN4Qix3QkFBSSxDQUFDLElBQUksR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsT0FBTyxFQUFDLENBQUM7aUJBQ3ZEO2FBQ0osQ0FBQzs7QUFFRixtQkFBTyxHQUFHO0FBQ04sMkJBQVcsRUFBRTtBQUNULHdCQUFJLEVBQUMsTUFBTTtBQUNYLHdCQUFJLEVBQUMsaUJBQWlCO0FBQ3RCLDJCQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztpQkFDbEI7YUFDSixDQUFDOztBQUVGLG1CQUFPLEdBQUcseUJBQVksSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM1QyxtQkFBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxtQ0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFDLGlCQUFpQixFQUFFLElBQUksRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7U0FFdEYsQ0FBQyxDQUFDO0tBRU4sQ0FBQyxDQUFDOztBQUVILFlBQVEsQ0FBQyx3QkFBd0IsRUFBRSxZQUFXOztBQUUxQyxVQUFFLENBQUMsb0RBQW9ELEVBQUUsWUFBWTs7QUFFakUsbUJBQU8sR0FBRztBQUNOLHdCQUFRLEVBQUUsQ0FBQyxTQUFTLEdBQUMsb0JBQW9CLEVBQ3JDLFNBQVMsR0FBQyxvQkFBb0IsRUFDOUIsU0FBUyxHQUFDLG9CQUFvQixDQUFDO2FBQ3RDLENBQUM7O0FBRUYsbUJBQU8sR0FBRyx5QkFBWSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzVDLGdCQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDeEMsbUNBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixvQkFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87dUJBQUUsdUJBQUssT0FBTyxDQUFDLENBQUMsVUFBVSxzQkFBUzthQUFBLENBQUMsQ0FBQztTQUtoRSxDQUFDLENBQUM7S0FFTixDQUFDLENBQUM7Q0FFTixDQUFDLENBQUMiLCJmaWxlIjoiUHJvamVjdF90ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG11c3QgZnJvbSAnbXVzdCc7XG5pbXBvcnQgUHJvamVjdCBmcm9tICcuLi9Qcm9qZWN0JztcblxudmFyIHByb2plY3Q7XG52YXIgbG9hZGVyO1xudmFyIENvbm5lY3Rpb25zO1xudmFyIGNvbmZpZztcbnZhciAkY29uZmlnO1xuXG5kZXNjcmliZSgnUHJvamVjdCcsIGZ1bmN0aW9uICgpIHtcblxuICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIHJlYWRXaXRoRGVmYXVsdHMoa2V5LCBkZWZhdWx0cykge1xuICAgICAgICAgICAgICAgIGlmKCRjb25maWdba2V5XSlcbiAgICAgICAgICAgICAgICByZXR1cm4gJGNvbmZpZ1trZXldO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBsb2FkZXIgPSB7XG5cbiAgICAgICAgICAgIGxvYWRGcm9tQ29uZihmaWxlKSB7XG5cbiAgICAgICAgICAgICAgICBpZihmaWxlID09PSAnY29uZmlnJylcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdQcm9qZWN0I2lzTWFpbicsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdpdGggbm8gcHJlZml4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICBwcm9qZWN0ID0gIG5ldyBQcm9qZWN0KG51bGwsIGNvbmZpZywgbG9hZGVyKTtcbiAgICAgICAgICAgIG11c3QocHJvamVjdC5pc01haW4oKSkuZXFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aXRoIGEgcHJlZml4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHJvamVjdCA9IG5ldyBQcm9qZWN0KCdhcHBzJywgY29uZmlnLCBsb2FkZXIpO1xuICAgICAgICAgICAgbXVzdChwcm9qZWN0LmlzTWFpbigpKS5lcWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1Byb2plY3Qjc2V0Q29ubmVjdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIENvbm5lY3Rpb25zID0ge1xuICAgICAgICAgICAgICAgIGNyZWF0ZShuYW1lLCB0eXBlLCBmYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbiA9IHtuYW1lOm5hbWUsIHR5cGU6dHlwZSwgZmFjdG9yeTpmYWN0b3J5fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6J3Rlc3QnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOid0ZXN0LWNvbm5lY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOlsxLDIsM11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBwcm9qZWN0ID0gbmV3IFByb2plY3QobnVsbCwgY29uZmlnLCBsb2FkZXIpO1xuICAgICAgICAgICAgcHJvamVjdC5zZXRDb25uZWN0aW9ucyhDb25uZWN0aW9ucyk7XG4gICAgICAgICAgICBtdXN0KENvbm5lY3Rpb25zLm9wZW4pLmVxbCh7bmFtZTondGVzdC1jb25uZWN0aW9uJywgdHlwZTondGVzdCcsIG9wdGlvbnM6WzEsMiwzXX0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnUHJvamVjdCNnZXRTdWJQcm9qZWN0cycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIG5ldyBwcm9qZWN0cyBmcm9tIHRoZSBwcm9qZWN0cyBmaWVsZCcsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgJGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0czogW19fZGlybmFtZSsnL3Byb2plY3RfdGVzdC9hcHAxJyxcbiAgICAgICAgICAgICAgICAgICAgX19kaXJuYW1lKycvcHJvamVjdF90ZXN0L2FwcDInLFxuICAgICAgICAgICAgICAgICAgICBfX2Rpcm5hbWUrJy9wcm9qZWN0X3Rlc3QvYXBwMyddXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBwcm9qZWN0ID0gbmV3IFByb2plY3QobnVsbCwgY29uZmlnLCBsb2FkZXIpO1xuICAgICAgICAgICAgdmFyIHByb2plY3RzID0gcHJvamVjdC5nZXRTdWJQcm9qZWN0cygpO1xuICAgICAgICAgICAgbXVzdChwcm9qZWN0cy5sZW5ndGgpLmJlKDMpO1xuICAgICAgICAgICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0PT5tdXN0KHByb2plY3QpLmluc3RhbmNlT2YoUHJvamVjdCkpO1xuXG5cblxuXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pO1xuIl19