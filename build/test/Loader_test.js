'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Loader = require('../Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var loader;
var path;

describe('Loader', function () {

    beforeEach(function () {
        path = path || __dirname + '/loader_tests';
        loader = new _Loader2['default'](path);
    });

    describe('Loader#requireDirSync', function () {

        it('should apply prefixes', function () {

            var module = loader.requireDirSync('modules', null, null, 'mod.');
            (0, _must2['default'])(module['mod.obj1']).eql(1);
            (0, _must2['default'])(module['mod.obj2']).eql(2);
            (0, _must2['default'])(module['mod.obj3']).eql(3);
        });
    });
});