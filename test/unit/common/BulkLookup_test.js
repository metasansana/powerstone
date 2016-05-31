import BulkLookup from 'libpowerstone/common/BulkLookup';
import UnknownResourceLookupError from 'libpowerstone/common/UnknownResourceLookupError';
import must from 'must';

var lookup;
var makeLookup = function lookup(ret) {
    return {
        lookup() {
            return ret;
        }
    };
};

describe('Lookup', function() {

    describe('Lookup#lookup', function() {

        it('should execute the correct lookup', function() {

            lookup = new BulkLookup('nonesense', makeLookup(1));
            lookup.add('mongodb', makeLookup('mongo'));
            lookup.add('memory', makeLookup('mem'));
            lookup.add('require', makeLookup('module'));
            must(lookup.lookup('memory://path/to/somewhere')).be('mem');

        });

        it('should run the default lookup if the string is not a URL', function() {

            lookup = new BulkLookup('memory', makeLookup('mem'));
            lookup.add('mongodb', makeLookup('mongo'));
            lookup.add('require', makeLookup('module'));
            must(lookup.lookup('path/to/somewhere')).be('mem');

        });

        it('should throw an error if an unknown scheme is used', function() {

            lookup = new BulkLookup('memory', makeLookup('mem'));
            lookup.add('mongodb', makeLookup('mongo'));
            lookup.add('require', makeLookup('module'));

            must(function() {
                lookup.lookup('go://path/to/somewhere');
            }).throw(UnknownLookupError);

        });

    });

});
