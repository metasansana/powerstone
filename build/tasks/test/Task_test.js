'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Task2 = require('../Task');

var _Task3 = _interopRequireDefault(_Task2);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var SomeTask = (function (_Task) {
    function SomeTask() {
        _classCallCheck(this, SomeTask);

        if (_Task != null) {
            _Task.apply(this, arguments);
        }
    }

    _inherits(SomeTask, _Task);

    _createClass(SomeTask, [{
        key: 'runTask',
        value: function runTask(report, cb) {

            setTimeout(function () {
                cb();
            }, 1000);
        }
    }]);

    return SomeTask;
})(_Task3['default']);

describe('Task', function () {

    it('should work ', function (done) {

        var task = new SomeTask();
        var report = {
            taskStarted: function taskStarted() {
                this.called = true;
            },
            taskCompleted: function taskCompleted() {}

        };

        task.run(report, function () {
            (0, _must2['default'])(report.called).be['true']();
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YXNrcy90ZXN0L1Rhc2tfdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3FCQUFpQixTQUFTOzs7O29CQUNULE1BQU07Ozs7SUFFakIsUUFBUTthQUFSLFFBQVE7OEJBQVIsUUFBUTs7Ozs7OztjQUFSLFFBQVE7O2lCQUFSLFFBQVE7O2VBRUgsaUJBQUMsTUFBTSxFQUFFLEVBQUUsRUFBQzs7QUFFZixzQkFBVSxDQUFDLFlBQVc7QUFDbEIsa0JBQUUsRUFBRSxDQUFDO2FBQ1IsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUVaOzs7V0FSQyxRQUFROzs7QUFZZCxRQUFRLENBQUMsTUFBTSxFQUFFLFlBQVc7O0FBRXhCLE1BQUUsQ0FBQyxjQUFjLEVBQUUsVUFBUyxJQUFJLEVBQUU7O0FBRTlCLFlBQUksSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7QUFDMUIsWUFBSSxNQUFNLEdBQUc7QUFDVCx1QkFBVyxFQUFFLHVCQUFXO0FBQ3BCLG9CQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN0QjtBQUNELHlCQUFhLEVBQUUseUJBQVcsRUFDekI7O1NBRUosQ0FBQTs7QUFFRCxZQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxZQUFVO0FBQ3ZCLG1DQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQUssRUFBRSxDQUFDO0FBQzlCLGdCQUFJLEVBQUUsQ0FBQztTQUNWLENBQUMsQ0FBQztLQUVOLENBQUMsQ0FBQztDQUVOLENBQUMsQ0FBQyIsImZpbGUiOiJUYXNrX3Rlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFzayBmcm9tICcuLi9UYXNrJztcbmltcG9ydCBtdXN0IGZyb20gJ211c3QnO1xuXG5jbGFzcyBTb21lVGFzayBleHRlbmRzIFRhc2sge1xuXG4gICAgcnVuVGFzayhyZXBvcnQsIGNiKXtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICB9XG5cbn1cblxuZGVzY3JpYmUoJ1Rhc2snLCBmdW5jdGlvbigpIHtcblxuICAgIGl0KCdzaG91bGQgd29yayAnLCBmdW5jdGlvbihkb25lKSB7XG5cbiAgICAgICAgdmFyIHRhc2sgPSBuZXcgU29tZVRhc2soKTtcbiAgICAgICAgdmFyIHJlcG9ydCA9IHtcbiAgICAgICAgICAgIHRhc2tTdGFydGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFza0NvbXBsZXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRhc2sucnVuKHJlcG9ydCwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIG11c3QocmVwb3J0LmNhbGxlZCkuYmUudHJ1ZSgpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTsiXX0=