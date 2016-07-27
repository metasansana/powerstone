'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcCommonLoader = require('../../../src/common/Loader');

var _srcCommonLoader2 = _interopRequireDefault(_srcCommonLoader);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var loader;
var path;

describe('Loader', function () {

    beforeEach(function () {
        path = path || __dirname + '/assets/modules';
        loader = new _srcCommonLoader2['default'](path);
    });

    describe('Loader#require', function () {

        xit('should work', function () {

            var o = {};

            loader.require('abc', o, 'mod');

            (0, _must2['default'])(o['mod.a']).eql('a');
            (0, _must2['default'])(o['mod.b']).eql('b');
            (0, _must2['default'])(o['mod.c']).eql('c');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90ZXN0L3VuaXQvY29tbW9uL0xvYWRlcl90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7K0JBQW1CLDRCQUE0Qjs7OztvQkFDOUIsTUFBTTs7OztBQUV2QixJQUFJLE1BQU0sQ0FBQztBQUNYLElBQUksSUFBSSxDQUFDOztBQUVULFFBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBVzs7QUFFMUIsY0FBVSxDQUFDLFlBQVc7QUFDbEIsWUFBSSxHQUFHLElBQUksSUFBSSxTQUFTLEdBQUcsaUJBQWlCLENBQUM7QUFDN0MsY0FBTSxHQUFHLGlDQUFXLElBQUksQ0FBQyxDQUFDO0tBQzdCLENBQUMsQ0FBQzs7QUFFSCxZQUFRLENBQUMsZ0JBQWdCLEVBQUUsWUFBVzs7QUFFbEMsV0FBRyxDQUFDLGFBQWEsRUFBRSxZQUFXOztBQUUxQixnQkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUVYLGtCQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRWhDLG1DQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixtQ0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsbUNBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBRTdCLENBQUMsQ0FBQztLQUVOLENBQUMsQ0FBQztDQUVOLENBQUMsQ0FBQyIsImZpbGUiOiJMb2FkZXJfdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2FkZXIgZnJvbSAnLi4vLi4vLi4vc3JjL2NvbW1vbi9Mb2FkZXInO1xuaW1wb3J0IG11c3QgZnJvbSAnbXVzdCc7XG5cbnZhciBsb2FkZXI7XG52YXIgcGF0aDtcblxuZGVzY3JpYmUoJ0xvYWRlcicsIGZ1bmN0aW9uKCkge1xuXG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgcGF0aCA9IHBhdGggfHwgX19kaXJuYW1lICsgJy9hc3NldHMvbW9kdWxlcyc7XG4gICAgICAgIGxvYWRlciA9IG5ldyBMb2FkZXIocGF0aCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnTG9hZGVyI3JlcXVpcmUnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICB4aXQoJ3Nob3VsZCB3b3JrJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIHZhciBvID0ge307XG5cbiAgICAgICAgICAgIGxvYWRlci5yZXF1aXJlKCdhYmMnLCBvLCAnbW9kJyk7XG5cbiAgICAgICAgICAgIG11c3Qob1snbW9kLmEnXSkuZXFsKCdhJyk7XG4gICAgICAgICAgICBtdXN0KG9bJ21vZC5iJ10pLmVxbCgnYicpO1xuICAgICAgICAgICAgbXVzdChvWydtb2QuYyddKS5lcWwoJ2MnKTtcblxuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTtcbiJdfQ==