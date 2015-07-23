'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YXNrcy90ZXN0L1NjaGVkdWxlZFRhc2tfdGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OEJBQTBCLGtCQUFrQjs7OztvQkFDM0IsTUFBTTs7OztBQUV2QixJQUFJLE1BQU0sQ0FBQztBQUNYLElBQUksSUFBSSxDQUFDOztJQUVILFFBQVE7Y0FBUixRQUFROzthQUFSLFFBQVE7OEJBQVIsUUFBUTs7bUNBQVIsUUFBUTs7O2lCQUFSLFFBQVE7O2VBRUgsaUJBQUMsTUFBTSxFQUFFLEVBQUUsRUFBQzs7QUFFZixzQkFBVSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUV4Qjs7O1dBTkMsUUFBUTs7O0lBVVIsU0FBUztjQUFULFNBQVM7O2FBQVQsU0FBUzs4QkFBVCxTQUFTOzttQ0FBVCxTQUFTOzs7aUJBQVQsU0FBUzs7ZUFFSixpQkFBQyxNQUFNLEVBQUUsRUFBRSxFQUFDOztBQUVmLHNCQUFVLENBQUMsWUFBVztBQUNsQixrQkFBRSxDQUFDLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7YUFDL0IsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUVaOzs7V0FSQyxTQUFTOzs7QUFZZixRQUFRLENBQUMsZUFBZSxFQUFFLFVBQVMsSUFBSSxFQUFFOztBQUVyQyxjQUFVLENBQUMsWUFBVzs7QUFFbEIsY0FBTSxHQUFHO0FBQ0wsa0JBQU0sRUFBRSxLQUFLO0FBQ2IscUJBQVMsRUFBRSxLQUFLO0FBQ2hCLHVCQUFXLEVBQUUsdUJBQVc7QUFDcEIsb0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO0FBQ0Qsa0NBQXNCLEVBQUEsZ0NBQUMsR0FBRyxFQUFDO0FBQzNCLG9CQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7YUFDaEM7QUFDRyx5QkFBYSxFQUFFLHlCQUFVO0FBQ3JCLG9CQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUN6QjtTQUNKLENBQUM7S0FFTCxDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLG9DQUFvQyxFQUFFLFVBQVUsSUFBSSxFQUFFOztBQUVyRCxZQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O0FBRS9DLGtCQUFVLENBQUMsWUFBVztBQUNqQixtQ0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFNLEVBQUUsQ0FBQztTQUN0QyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVULGtCQUFVLENBQUMsWUFBVztBQUNsQixtQ0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hDLGdCQUFJLEVBQUUsQ0FBQztTQUNWLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRVQsWUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBVTtBQUN2QixnQkFBSSxFQUFFLENBQUM7U0FDVixDQUFDLENBQUM7S0FFTixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLHNEQUFzRCxFQUFFLFVBQVUsSUFBSSxFQUFFOztBQUV2RSxZQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O0FBRWhELGtCQUFVLENBQUMsWUFBVztBQUNsQixtQ0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFNLEVBQUUsQ0FBQztTQUNyQyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVULGtCQUFVLENBQUMsWUFBVztBQUNsQixtQ0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFLLEVBQUUsQ0FBQztBQUNqQyxnQkFBSSxFQUFFLENBQUM7U0FDVixFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVULFlBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFlBQVU7QUFDdkIsZ0JBQUksRUFBRSxDQUFDO1NBQ1YsQ0FBQyxDQUFDO0tBRU4sQ0FBQyxDQUFDO0NBRU4sQ0FBQyxDQUFDIiwiZmlsZSI6IlNjaGVkdWxlZFRhc2tfdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY2hlZHVsZWRUYXNrIGZyb20gJy4uL1NjaGVkdWxlZFRhc2snO1xuaW1wb3J0IG11c3QgZnJvbSAnbXVzdCc7XG5cbnZhciByZXBvcnQ7XG52YXIgdGFzaztcblxuY2xhc3MgU29tZVRhc2sgZXh0ZW5kcyBTY2hlZHVsZWRUYXNrIHtcblxuICAgIHJ1blRhc2socmVwb3J0LCBjYil7XG5cbiAgICAgICAgc2V0VGltZW91dChjYiwgMTAwMCk7XG5cbiAgICB9XG5cbn1cblxuY2xhc3MgRXJyb3JUYXNrIGV4dGVuZHMgU2NoZWR1bGVkVGFzayB7XG5cbiAgICBydW5UYXNrKHJlcG9ydCwgY2Ipe1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYihuZXcgRXJyb3IoJ1NvbWUgZXJyb3InKSk7XG4gICAgICAgIH0sIDEwMDApO1xuXG4gICAgfVxuXG59XG5cbmRlc2NyaWJlKCdTY2hlZHVsZWRUYXNrJywgZnVuY3Rpb24oZG9uZSkge1xuXG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICByZXBvcnQgPSB7XG4gICAgICAgICAgICBjYWxsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHRhc2tTdGFydGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFza0NvbXBsZXRlZFdpdGhFcnJvcihlcnIpe1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBlcnIubWVzc2FnZTtcbiAgICAgICAgfSxcbiAgICAgICAgICAgIHRhc2tDb21wbGV0ZWQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJ1biB0YXNrIGF0IHNwZWNpZmllZCB0aW1lICcsIGZ1bmN0aW9uIChkb25lKSB7XG5cbiAgICAgICAgdGFzayA9IG5ldyBTb21lVGFzayhuZXcgRGF0ZShEYXRlLm5vdygpKzYwMDApKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgIG11c3QocmVwb3J0LmNvbXBsZXRlZCkuYmUuZmFsc2UoKTtcbiAgICAgICAgfSwgNTAwMCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG11c3QocmVwb3J0LmNvbXBsZXRlZCkuYmUoJ1NvbWUgRXJyb3InKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgNzAwMCk7XG5cbiAgICAgICAgdGFzay5ydW4ocmVwb3J0LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBydW4gdGFzayBhdCBzcGVjaWZpZWQgdGltZSBhbmQgcmVwb3J0IGVycm9ycyAnLCBmdW5jdGlvbiAoZG9uZSkge1xuXG4gICAgICAgIHRhc2sgPSBuZXcgRXJyb3JUYXNrKG5ldyBEYXRlKERhdGUubm93KCkrNjAwMCkpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtdXN0KHJlcG9ydC5jb21wbGV0ZWQpLmJlLmZhbHNlKCk7XG4gICAgICAgIH0sIDUwMDApO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtdXN0KHJlcG9ydC5jb21wbGV0ZWQpLmJlLnRydWUoKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgNzAwMCk7XG5cbiAgICAgICAgdGFzay5ydW4ocmVwb3J0LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTsiXX0=