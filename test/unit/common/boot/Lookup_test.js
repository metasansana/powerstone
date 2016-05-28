import Lookup from 'libpowerstone/common/boot/Lookup';
import UnknownHandlerError from 'libpowerstone/common/boot/UnknownHandlerError';
import must from 'must';

var lookup;
var makeHandler = function handler(ret) {
    return {
        handle() {
            return ret;
        }
    };
};

describe('Lookup', function() {

    describe('Lookup#handle', function() {

        it('should execute the correct handler', function() {

            lookup = new Lookup('nonesense', makeHandler(1));
            lookup.add('mongodb', makeHandler('mongo'));
            lookup.add('memory', makeHandler('mem'));
            lookup.add('require', makeHandler('module'));
            must(lookup.handle('memory://path/to/somewhere')).be('mem');

        });

        it('should run the default handler if the string is not a URL', function() {

            lookup = new Lookup('memory', makeHandler('mem'));
            lookup.add('mongodb', makeHandler('mongo'));
            lookup.add('require', makeHandler('module'));
            must(lookup.handle('path/to/somewhere')).be('mem');

        });

        it('should throw an error if an unknown scheme is used', function() {

            lookup = new Lookup('memory', makeHandler('mem'));
            lookup.add('mongodb', makeHandler('mongo'));
            lookup.add('require', makeHandler('module'));

            must(function() {
                lookup.handle('go://path/to/somewhere');
            }).throw(UnknownHandlerError);

        });

    });

});
