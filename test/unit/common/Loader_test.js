import Loader from '../../../src/common/Loader';
import must from 'must';

var loader;
var path;

describe('Loader', function() {

    beforeEach(function() {
        path = path || __dirname + '/assets/modules';
        loader = new Loader(path);
    });

    describe('Loader#require', function() {

        xit('should work', function() {

            var o = {};

            loader.require('abc', o, 'mod');

            must(o['mod.a']).eql('a');
            must(o['mod.b']).eql('b');
            must(o['mod.c']).eql('c');

        });

    });

});
