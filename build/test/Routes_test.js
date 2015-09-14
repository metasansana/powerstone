'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var _Routes = require('../Routes');

var _Routes2 = _interopRequireDefault(_Routes);

describe('Routes', function () {

    describe('Routes#flatten', function () {

        it('should return arrays of routes flattened ', function () {

            (0, _must2['default'])(_Routes2['default'].flatten([{ routes: [{ href: 1 }] }, { routes: [{ href: 2 }] }, { routes: [{ href: 3 }] }])).eql([{ href: 1 }, { href: 2 }, { href: 3 }]);
        });

        it('should return a single route if that\'s all', function () {

            (0, _must2['default'])(_Routes2['default'].flatten({ routes: [{ href: 1 }] })).eql([{ href: 1 }]);
        });
    });
});
//# sourceMappingURL=Routes_test.js.map