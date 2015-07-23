import must from 'must';
import Routes from '../Routes';

describe('Routes', function () {

    describe('Routes#flatten', function () {

        it('should return arrays of routes flattened ', function () {

            must(Routes.flatten([
                {routes: [{href: 1}]},
                {routes: [{href: 2}]},
                {routes: [{href: 3}]}])).
                eql([{href: 1}, {href: 2}, {href: 3}])
        });

        it('should return a single route if that\'s all', function () {

            must(Routes.flatten({routes: [{href: 1}]})).
                eql([{href: 1}]);
        })
    })
});