'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ScheduledTask3 = require('../ScheduledTask');

var _ScheduledTask4 = _interopRequireDefault(_ScheduledTask3);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var report;
var task;

var SomeTask = (function (_ScheduledTask) {
    function SomeTask() {
        _classCallCheck(this, SomeTask);

        if (_ScheduledTask != null) {
            _ScheduledTask.apply(this, arguments);
        }
    }

    _inherits(SomeTask, _ScheduledTask);

    _createClass(SomeTask, [{
        key: 'runTask',
        value: function runTask(report, cb) {

            setTimeout(cb, 1000);
        }
    }]);

    return SomeTask;
})(_ScheduledTask4['default']);

var ErrorTask = (function (_ScheduledTask2) {
    function ErrorTask() {
        _classCallCheck(this, ErrorTask);

        if (_ScheduledTask2 != null) {
            _ScheduledTask2.apply(this, arguments);
        }
    }

    _inherits(ErrorTask, _ScheduledTask2);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YXNrcy90ZXN0L1NjaGVkdWxlZFRhc2tfdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzhCQUEwQixrQkFBa0I7Ozs7b0JBQzNCLE1BQU07Ozs7QUFFdkIsSUFBSSxNQUFNLENBQUM7QUFDWCxJQUFJLElBQUksQ0FBQzs7SUFFSCxRQUFRO2FBQVIsUUFBUTs4QkFBUixRQUFROzs7Ozs7O2NBQVIsUUFBUTs7aUJBQVIsUUFBUTs7ZUFFSCxpQkFBQyxNQUFNLEVBQUUsRUFBRSxFQUFDOztBQUVmLHNCQUFVLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBRXhCOzs7V0FOQyxRQUFROzs7SUFVUixTQUFTO2FBQVQsU0FBUzs4QkFBVCxTQUFTOzs7Ozs7O2NBQVQsU0FBUzs7aUJBQVQsU0FBUzs7ZUFFSixpQkFBQyxNQUFNLEVBQUUsRUFBRSxFQUFDOztBQUVmLHNCQUFVLENBQUMsWUFBVztBQUNsQixrQkFBRSxDQUFDLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7YUFDL0IsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUVaOzs7V0FSQyxTQUFTOzs7QUFZZixRQUFRLENBQUMsZUFBZSxFQUFFLFVBQVMsSUFBSSxFQUFFOztBQUVyQyxjQUFVLENBQUMsWUFBVzs7QUFFbEIsY0FBTSxHQUFHO0FBQ0wsa0JBQU0sRUFBRSxLQUFLO0FBQ2IscUJBQVMsRUFBRSxLQUFLO0FBQ2hCLHVCQUFXLEVBQUUsdUJBQVc7QUFDcEIsb0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO0FBQ0Qsa0NBQXNCLEVBQUEsZ0NBQUMsR0FBRyxFQUFDO0FBQzNCLG9CQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7YUFDaEM7QUFDRyx5QkFBYSxFQUFFLHlCQUFVO0FBQ3JCLG9CQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUN6QjtTQUNKLENBQUM7S0FFTCxDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLG9DQUFvQyxFQUFFLFVBQVUsSUFBSSxFQUFFOztBQUVyRCxZQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O0FBRS9DLGtCQUFVLENBQUMsWUFBVztBQUNqQixtQ0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFNLEVBQUUsQ0FBQztTQUN0QyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVULGtCQUFVLENBQUMsWUFBVztBQUNsQixtQ0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hDLGdCQUFJLEVBQUUsQ0FBQztTQUNWLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRVQsWUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBVTtBQUN2QixnQkFBSSxFQUFFLENBQUM7U0FDVixDQUFDLENBQUM7S0FFTixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLHNEQUFzRCxFQUFFLFVBQVUsSUFBSSxFQUFFOztBQUV2RSxZQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O0FBRWhELGtCQUFVLENBQUMsWUFBVztBQUNsQixtQ0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFNLEVBQUUsQ0FBQztTQUNyQyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVULGtCQUFVLENBQUMsWUFBVztBQUNsQixtQ0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFLLEVBQUUsQ0FBQztBQUNqQyxnQkFBSSxFQUFFLENBQUM7U0FDVixFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVULFlBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFlBQVU7QUFDdkIsZ0JBQUksRUFBRSxDQUFDO1NBQ1YsQ0FBQyxDQUFDO0tBRU4sQ0FBQyxDQUFDO0NBRU4sQ0FBQyxDQUFDIiwiZmlsZSI6IlNjaGVkdWxlZFRhc2tfdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY2hlZHVsZWRUYXNrIGZyb20gJy4uL1NjaGVkdWxlZFRhc2snO1xuaW1wb3J0IG11c3QgZnJvbSAnbXVzdCc7XG5cbnZhciByZXBvcnQ7XG52YXIgdGFzaztcblxuY2xhc3MgU29tZVRhc2sgZXh0ZW5kcyBTY2hlZHVsZWRUYXNrIHtcblxuICAgIHJ1blRhc2socmVwb3J0LCBjYil7XG5cbiAgICAgICAgc2V0VGltZW91dChjYiwgMTAwMCk7XG5cbiAgICB9XG5cbn1cblxuY2xhc3MgRXJyb3JUYXNrIGV4dGVuZHMgU2NoZWR1bGVkVGFzayB7XG5cbiAgICBydW5UYXNrKHJlcG9ydCwgY2Ipe1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYihuZXcgRXJyb3IoJ1NvbWUgZXJyb3InKSk7XG4gICAgICAgIH0sIDEwMDApO1xuXG4gICAgfVxuXG59XG5cbmRlc2NyaWJlKCdTY2hlZHVsZWRUYXNrJywgZnVuY3Rpb24oZG9uZSkge1xuXG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICByZXBvcnQgPSB7XG4gICAgICAgICAgICBjYWxsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHRhc2tTdGFydGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFza0NvbXBsZXRlZFdpdGhFcnJvcihlcnIpe1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBlcnIubWVzc2FnZTtcbiAgICAgICAgfSxcbiAgICAgICAgICAgIHRhc2tDb21wbGV0ZWQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJ1biB0YXNrIGF0IHNwZWNpZmllZCB0aW1lICcsIGZ1bmN0aW9uIChkb25lKSB7XG5cbiAgICAgICAgdGFzayA9IG5ldyBTb21lVGFzayhuZXcgRGF0ZShEYXRlLm5vdygpKzYwMDApKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgIG11c3QocmVwb3J0LmNvbXBsZXRlZCkuYmUuZmFsc2UoKTtcbiAgICAgICAgfSwgNTAwMCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG11c3QocmVwb3J0LmNvbXBsZXRlZCkuYmUoJ1NvbWUgRXJyb3InKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgNzAwMCk7XG5cbiAgICAgICAgdGFzay5ydW4ocmVwb3J0LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBydW4gdGFzayBhdCBzcGVjaWZpZWQgdGltZSBhbmQgcmVwb3J0IGVycm9ycyAnLCBmdW5jdGlvbiAoZG9uZSkge1xuXG4gICAgICAgIHRhc2sgPSBuZXcgRXJyb3JUYXNrKG5ldyBEYXRlKERhdGUubm93KCkrNjAwMCkpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtdXN0KHJlcG9ydC5jb21wbGV0ZWQpLmJlLmZhbHNlKCk7XG4gICAgICAgIH0sIDUwMDApO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtdXN0KHJlcG9ydC5jb21wbGV0ZWQpLmJlLnRydWUoKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgNzAwMCk7XG5cbiAgICAgICAgdGFzay5ydW4ocmVwb3J0LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTsiXX0=