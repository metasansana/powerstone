import Loader from '../Loader';
import must from 'must';

var loader;
var path;

describe('Loader', function () {

    beforeEach(function () {
        path = path || __dirname+'/loader_tests';
loader = new Loader(path);
    });

    describe('Loader#requireDirSync', function () {

        it('should apply prefixes', function () {

            var module = loader.requireDirSync('modules', null, null, 'mod.');
            must(module['mod.obj1']).eql(1);
            must(module['mod.obj2']).eql(2);
            must(module['mod.obj3']).eql(3);

        });

    });

});