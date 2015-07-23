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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L0xvYWRlcl90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7c0JBQW1CLFdBQVc7Ozs7b0JBQ2IsTUFBTTs7OztBQUV2QixJQUFJLE1BQU0sQ0FBQztBQUNYLElBQUksSUFBSSxDQUFDOztBQUVULFFBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBWTs7QUFFM0IsY0FBVSxDQUFDLFlBQVk7QUFDbkIsWUFBSSxHQUFHLElBQUksSUFBSSxTQUFTLEdBQUMsZUFBZSxDQUFDO0FBQ2pELGNBQU0sR0FBRyx3QkFBVyxJQUFJLENBQUMsQ0FBQztLQUNyQixDQUFDLENBQUM7O0FBRUgsWUFBUSxDQUFDLHVCQUF1QixFQUFFLFlBQVk7O0FBRTFDLFVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxZQUFZOztBQUVwQyxnQkFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNsRSxtQ0FBSyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEMsbUNBQUssTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLG1DQUFLLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUVuQyxDQUFDLENBQUM7S0FFTixDQUFDLENBQUM7Q0FFTixDQUFDLENBQUMiLCJmaWxlIjoiTG9hZGVyX3Rlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9hZGVyIGZyb20gJy4uL0xvYWRlcic7XG5pbXBvcnQgbXVzdCBmcm9tICdtdXN0JztcblxudmFyIGxvYWRlcjtcbnZhciBwYXRoO1xuXG5kZXNjcmliZSgnTG9hZGVyJywgZnVuY3Rpb24gKCkge1xuXG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhdGggPSBwYXRoIHx8IF9fZGlybmFtZSsnL2xvYWRlcl90ZXN0cyc7XG5sb2FkZXIgPSBuZXcgTG9hZGVyKHBhdGgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0xvYWRlciNyZXF1aXJlRGlyU3luYycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpdCgnc2hvdWxkIGFwcGx5IHByZWZpeGVzJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgbW9kdWxlID0gbG9hZGVyLnJlcXVpcmVEaXJTeW5jKCdtb2R1bGVzJywgbnVsbCwgbnVsbCwgJ21vZC4nKTtcbiAgICAgICAgICAgIG11c3QobW9kdWxlWydtb2Qub2JqMSddKS5lcWwoMSk7XG4gICAgICAgICAgICBtdXN0KG1vZHVsZVsnbW9kLm9iajInXSkuZXFsKDIpO1xuICAgICAgICAgICAgbXVzdChtb2R1bGVbJ21vZC5vYmozJ10pLmVxbCgzKTtcblxuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTsiXX0=