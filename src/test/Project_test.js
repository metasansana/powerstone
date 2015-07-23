import must from 'must';
import Project from '../Project';

var project;
var loader;
var Connections;
var config;
var $config;

describe('Project', function () {

    beforeEach(function () {

        config = {
            readWithDefaults(key, defaults) {
                if($config[key])
                return $config[key];
                return defaults;
            }
        };

        loader = {

            loadFromConf(file) {

                if(file === 'config')
                return {

                };

            }

        };

    });

    describe('Project#isMain', function () {

        it('should return true with no prefix', function () {
           project =  new Project(null, config, loader);
            must(project.isMain()).eql(true);
        });

        it('should return false with a prefix', function () {
            project = new Project('apps', config, loader);
            must(project.isMain()).eql(false);
        });

    });

    describe('Project#setConnections', function () {

        beforeEach(function () {

            Connections = {
                create(name, type, factory) {
                    this.open = {name:name, type:type, factory:factory};
                }
            };

            $config = {
                connections: {
                    type:'test',
                    name:'test-connection',
                    options:[1,2,3]
                }
            };

            project = new Project(null, config, loader);
            project.setConnections(Connections);
            must(Connections.open).eql({name:'test-connection', type:'test', options:[1,2,3]});

        });

    });

    describe('Project#getSubProjects', function() {

        it('should create new projects from the projects field', function () {

            $config = {
                projects: [__dirname+'/project_test/app1',
                    __dirname+'/project_test/app2',
                    __dirname+'/project_test/app3']
            };

            project = new Project(null, config, loader);
            var projects = project.getSubProjects();
            must(projects.length).be(3);
            projects.forEach(project=>must(project).instanceOf(Project));




        });

    });

});
