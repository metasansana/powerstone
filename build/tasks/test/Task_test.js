'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Task2 = require('../Task');

var _Task3 = _interopRequireDefault(_Task2);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var SomeTask = (function (_Task) {
    _inherits(SomeTask, _Task);

    function SomeTask() {
        _classCallCheck(this, SomeTask);

        _get(Object.getPrototypeOf(SomeTask.prototype), 'constructor', this).apply(this, arguments);
    }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YXNrcy90ZXN0L1Rhc2tfdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7cUJBQWlCLFNBQVM7Ozs7b0JBQ1QsTUFBTTs7OztJQUVqQixRQUFRO2NBQVIsUUFBUTs7YUFBUixRQUFROzhCQUFSLFFBQVE7O21DQUFSLFFBQVE7OztpQkFBUixRQUFROztlQUVILGlCQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUM7O0FBRWYsc0JBQVUsQ0FBQyxZQUFXO0FBQ2xCLGtCQUFFLEVBQUUsQ0FBQzthQUNSLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FFWjs7O1dBUkMsUUFBUTs7O0FBWWQsUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFXOztBQUV4QixNQUFFLENBQUMsY0FBYyxFQUFFLFVBQVMsSUFBSSxFQUFFOztBQUU5QixZQUFJLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBQzFCLFlBQUksTUFBTSxHQUFHO0FBQ1QsdUJBQVcsRUFBRSx1QkFBVztBQUNwQixvQkFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDdEI7QUFDRCx5QkFBYSxFQUFFLHlCQUFXLEVBQ3pCOztTQUVKLENBQUE7O0FBRUQsWUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBVTtBQUN2QixtQ0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFLLEVBQUUsQ0FBQztBQUM5QixnQkFBSSxFQUFFLENBQUM7U0FDVixDQUFDLENBQUM7S0FFTixDQUFDLENBQUM7Q0FFTixDQUFDLENBQUMiLCJmaWxlIjoiVGFza190ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRhc2sgZnJvbSAnLi4vVGFzayc7XG5pbXBvcnQgbXVzdCBmcm9tICdtdXN0JztcblxuY2xhc3MgU29tZVRhc2sgZXh0ZW5kcyBUYXNrIHtcblxuICAgIHJ1blRhc2socmVwb3J0LCBjYil7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH0sIDEwMDApO1xuXG4gICAgfVxuXG59XG5cbmRlc2NyaWJlKCdUYXNrJywgZnVuY3Rpb24oKSB7XG5cbiAgICBpdCgnc2hvdWxkIHdvcmsgJywgZnVuY3Rpb24oZG9uZSkge1xuXG4gICAgICAgIHZhciB0YXNrID0gbmV3IFNvbWVUYXNrKCk7XG4gICAgICAgIHZhciByZXBvcnQgPSB7XG4gICAgICAgICAgICB0YXNrU3RhcnRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhc2tDb21wbGV0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB0YXNrLnJ1bihyZXBvcnQsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBtdXN0KHJlcG9ydC5jYWxsZWQpLmJlLnRydWUoKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSk7Il19