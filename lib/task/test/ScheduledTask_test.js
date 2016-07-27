'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ScheduledTask3 = require('../ScheduledTask');

var _ScheduledTask4 = _interopRequireDefault(_ScheduledTask3);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var report;
var task;

var SomeTask = (function (_ScheduledTask) {
    _inherits(SomeTask, _ScheduledTask);

    function SomeTask() {
        _classCallCheck(this, SomeTask);

        _get(Object.getPrototypeOf(SomeTask.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(SomeTask, [{
        key: 'runTask',
        value: function runTask(report, cb) {

            setTimeout(cb, 1000);
        }
    }]);

    return SomeTask;
})(_ScheduledTask4['default']);

var ErrorTask = (function (_ScheduledTask2) {
    _inherits(ErrorTask, _ScheduledTask2);

    function ErrorTask() {
        _classCallCheck(this, ErrorTask);

        _get(Object.getPrototypeOf(ErrorTask.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ErrorTask, [{
        key: 'runTask',
        value: function runTask(report, cb) {

            setTimeout(function () {
                cb(new Error('Some error'));
            }, 1000);
        }
    }]);

    return ErrorTask;
})(_ScheduledTask4['default']);

describe('ScheduledTask', function (done) {

    beforeEach(function () {

        report = {
            called: false,
            completed: false,
            taskStarted: function taskStarted() {
                this.called = true;
            },
            taskCompletedWithError: function taskCompletedWithError(err) {
                this.completed = err.message;
            },
            taskCompleted: function taskCompleted() {
                this.completed = true;
            }
        };
    });

    it('should run task at specified time ', function (done) {

        task = new SomeTask(new Date(Date.now() + 6000));

        setTimeout(function () {
            (0, _must2['default'])(report.completed).be['false']();
        }, 5000);

        setTimeout(function () {
            (0, _must2['default'])(report.completed).be('Some Error');
            done();
        }, 7000);

        task.run(report, function () {
            done();
        });
    });

    it('should run task at specified time and report errors ', function (done) {

        task = new ErrorTask(new Date(Date.now() + 6000));

        setTimeout(function () {
            (0, _must2['default'])(report.completed).be['false']();
        }, 5000);

        setTimeout(function () {
            (0, _must2['default'])(report.completed).be['true']();
            done();
        }, 7000);

        task.run(report, function () {
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YXNrL3Rlc3QvU2NoZWR1bGVkVGFza190ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs4QkFBMEIsa0JBQWtCOzs7O29CQUMzQixNQUFNOzs7O0FBRXZCLElBQUksTUFBTSxDQUFDO0FBQ1gsSUFBSSxJQUFJLENBQUM7O0lBRUgsUUFBUTtjQUFSLFFBQVE7O2FBQVIsUUFBUTs4QkFBUixRQUFROzttQ0FBUixRQUFROzs7aUJBQVIsUUFBUTs7ZUFFSCxpQkFBQyxNQUFNLEVBQUUsRUFBRSxFQUFDOztBQUVmLHNCQUFVLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBRXhCOzs7V0FOQyxRQUFROzs7SUFVUixTQUFTO2NBQVQsU0FBUzs7YUFBVCxTQUFTOzhCQUFULFNBQVM7O21DQUFULFNBQVM7OztpQkFBVCxTQUFTOztlQUVKLGlCQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUM7O0FBRWYsc0JBQVUsQ0FBQyxZQUFXO0FBQ2xCLGtCQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzthQUMvQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBRVo7OztXQVJDLFNBQVM7OztBQVlmLFFBQVEsQ0FBQyxlQUFlLEVBQUUsVUFBUyxJQUFJLEVBQUU7O0FBRXJDLGNBQVUsQ0FBQyxZQUFXOztBQUVsQixjQUFNLEdBQUc7QUFDTCxrQkFBTSxFQUFFLEtBQUs7QUFDYixxQkFBUyxFQUFFLEtBQUs7QUFDaEIsdUJBQVcsRUFBRSx1QkFBVztBQUNwQixvQkFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDdEI7QUFDRCxrQ0FBc0IsRUFBQSxnQ0FBQyxHQUFHLEVBQUM7QUFDM0Isb0JBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQzthQUNoQztBQUNHLHlCQUFhLEVBQUUseUJBQVU7QUFDckIsb0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3pCO1NBQ0osQ0FBQztLQUVMLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsb0NBQW9DLEVBQUUsVUFBVSxJQUFJLEVBQUU7O0FBRXJELFlBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFL0Msa0JBQVUsQ0FBQyxZQUFXO0FBQ2pCLG1DQUFLLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQU0sRUFBRSxDQUFDO1NBQ3RDLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRVQsa0JBQVUsQ0FBQyxZQUFXO0FBQ2xCLG1DQUFLLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDeEMsZ0JBQUksRUFBRSxDQUFDO1NBQ1YsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFVCxZQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxZQUFVO0FBQ3ZCLGdCQUFJLEVBQUUsQ0FBQztTQUNWLENBQUMsQ0FBQztLQUVOLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsc0RBQXNELEVBQUUsVUFBVSxJQUFJLEVBQUU7O0FBRXZFLFlBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFaEQsa0JBQVUsQ0FBQyxZQUFXO0FBQ2xCLG1DQUFLLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQU0sRUFBRSxDQUFDO1NBQ3JDLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRVQsa0JBQVUsQ0FBQyxZQUFXO0FBQ2xCLG1DQUFLLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQUssRUFBRSxDQUFDO0FBQ2pDLGdCQUFJLEVBQUUsQ0FBQztTQUNWLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRVQsWUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBVTtBQUN2QixnQkFBSSxFQUFFLENBQUM7U0FDVixDQUFDLENBQUM7S0FFTixDQUFDLENBQUM7Q0FFTixDQUFDLENBQUMiLCJmaWxlIjoiU2NoZWR1bGVkVGFza190ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNjaGVkdWxlZFRhc2sgZnJvbSAnLi4vU2NoZWR1bGVkVGFzayc7XG5pbXBvcnQgbXVzdCBmcm9tICdtdXN0JztcblxudmFyIHJlcG9ydDtcbnZhciB0YXNrO1xuXG5jbGFzcyBTb21lVGFzayBleHRlbmRzIFNjaGVkdWxlZFRhc2sge1xuXG4gICAgcnVuVGFzayhyZXBvcnQsIGNiKXtcblxuICAgICAgICBzZXRUaW1lb3V0KGNiLCAxMDAwKTtcblxuICAgIH1cblxufVxuXG5jbGFzcyBFcnJvclRhc2sgZXh0ZW5kcyBTY2hlZHVsZWRUYXNrIHtcblxuICAgIHJ1blRhc2socmVwb3J0LCBjYil7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNiKG5ldyBFcnJvcignU29tZSBlcnJvcicpKTtcbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICB9XG5cbn1cblxuZGVzY3JpYmUoJ1NjaGVkdWxlZFRhc2snLCBmdW5jdGlvbihkb25lKSB7XG5cbiAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJlcG9ydCA9IHtcbiAgICAgICAgICAgIGNhbGxlZDogZmFsc2UsXG4gICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgdGFza1N0YXJ0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YXNrQ29tcGxldGVkV2l0aEVycm9yKGVycil7XG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IGVyci5tZXNzYWdlO1xuICAgICAgICB9LFxuICAgICAgICAgICAgdGFza0NvbXBsZXRlZDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcnVuIHRhc2sgYXQgc3BlY2lmaWVkIHRpbWUgJywgZnVuY3Rpb24gKGRvbmUpIHtcblxuICAgICAgICB0YXNrID0gbmV3IFNvbWVUYXNrKG5ldyBEYXRlKERhdGUubm93KCkrNjAwMCkpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgbXVzdChyZXBvcnQuY29tcGxldGVkKS5iZS5mYWxzZSgpO1xuICAgICAgICB9LCA1MDAwKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbXVzdChyZXBvcnQuY29tcGxldGVkKS5iZSgnU29tZSBFcnJvcicpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCA3MDAwKTtcblxuICAgICAgICB0YXNrLnJ1bihyZXBvcnQsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJ1biB0YXNrIGF0IHNwZWNpZmllZCB0aW1lIGFuZCByZXBvcnQgZXJyb3JzICcsIGZ1bmN0aW9uIChkb25lKSB7XG5cbiAgICAgICAgdGFzayA9IG5ldyBFcnJvclRhc2sobmV3IERhdGUoRGF0ZS5ub3coKSs2MDAwKSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG11c3QocmVwb3J0LmNvbXBsZXRlZCkuYmUuZmFsc2UoKTtcbiAgICAgICAgfSwgNTAwMCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG11c3QocmVwb3J0LmNvbXBsZXRlZCkuYmUudHJ1ZSgpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCA3MDAwKTtcblxuICAgICAgICB0YXNrLnJ1bihyZXBvcnQsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pOyJdfQ==