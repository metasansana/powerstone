'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ScheduledTask3 = require('../ScheduledTask');

var _ScheduledTask4 = _interopRequireDefault(_ScheduledTask3);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var report;
var task;

var SomeTask = function (_ScheduledTask) {
    _inherits(SomeTask, _ScheduledTask);

    function SomeTask() {
        _classCallCheck(this, SomeTask);

        return _possibleConstructorReturn(this, (SomeTask.__proto__ || Object.getPrototypeOf(SomeTask)).apply(this, arguments));
    }

    _createClass(SomeTask, [{
        key: 'runTask',
        value: function runTask(report, cb) {

            setTimeout(cb, 1000);
        }
    }]);

    return SomeTask;
}(_ScheduledTask4.default);

var ErrorTask = function (_ScheduledTask2) {
    _inherits(ErrorTask, _ScheduledTask2);

    function ErrorTask() {
        _classCallCheck(this, ErrorTask);

        return _possibleConstructorReturn(this, (ErrorTask.__proto__ || Object.getPrototypeOf(ErrorTask)).apply(this, arguments));
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
}(_ScheduledTask4.default);

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
            (0, _must2.default)(report.completed).be.false();
        }, 5000);

        setTimeout(function () {
            (0, _must2.default)(report.completed).be('Some Error');
            done();
        }, 7000);

        task.run(report, function () {
            done();
        });
    });

    it('should run task at specified time and report errors ', function (done) {

        task = new ErrorTask(new Date(Date.now() + 6000));

        setTimeout(function () {
            (0, _must2.default)(report.completed).be.false();
        }, 5000);

        setTimeout(function () {
            (0, _must2.default)(report.completed).be.true();
            done();
        }, 7000);

        task.run(report, function () {
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YXNrcy90ZXN0L1NjaGVkdWxlZFRhc2tfdGVzdC5qcyJdLCJuYW1lcyI6WyJyZXBvcnQiLCJ0YXNrIiwiU29tZVRhc2siLCJjYiIsInNldFRpbWVvdXQiLCJFcnJvclRhc2siLCJFcnJvciIsImRlc2NyaWJlIiwiZG9uZSIsImJlZm9yZUVhY2giLCJjYWxsZWQiLCJjb21wbGV0ZWQiLCJ0YXNrU3RhcnRlZCIsInRhc2tDb21wbGV0ZWRXaXRoRXJyb3IiLCJlcnIiLCJtZXNzYWdlIiwidGFza0NvbXBsZXRlZCIsIml0IiwiRGF0ZSIsIm5vdyIsImJlIiwiZmFsc2UiLCJydW4iLCJ0cnVlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsTUFBSjtBQUNBLElBQUlDLElBQUo7O0lBRU1DLFE7Ozs7Ozs7Ozs7O2dDQUVNRixNLEVBQVFHLEUsRUFBRzs7QUFFZkMsdUJBQVdELEVBQVgsRUFBZSxJQUFmO0FBRUg7Ozs7OztJQUlDRSxTOzs7Ozs7Ozs7OztnQ0FFTUwsTSxFQUFRRyxFLEVBQUc7O0FBRWZDLHVCQUFXLFlBQVc7QUFDbEJELG1CQUFHLElBQUlHLEtBQUosQ0FBVSxZQUFWLENBQUg7QUFDSCxhQUZELEVBRUcsSUFGSDtBQUlIOzs7Ozs7QUFJTEMsU0FBUyxlQUFULEVBQTBCLFVBQVNDLElBQVQsRUFBZTs7QUFFckNDLGVBQVcsWUFBVzs7QUFFbEJULGlCQUFTO0FBQ0xVLG9CQUFRLEtBREg7QUFFTEMsdUJBQVcsS0FGTjtBQUdMQyx5QkFBYSx1QkFBVztBQUNwQixxQkFBS0YsTUFBTCxHQUFjLElBQWQ7QUFDSCxhQUxJO0FBTUxHLGtDQU5LLGtDQU1rQkMsR0FObEIsRUFNc0I7QUFDM0IscUJBQUtILFNBQUwsR0FBaUJHLElBQUlDLE9BQXJCO0FBQ0gsYUFSUTs7QUFTTEMsMkJBQWUseUJBQVU7QUFDckIscUJBQUtMLFNBQUwsR0FBaUIsSUFBakI7QUFDSDtBQVhJLFNBQVQ7QUFjSCxLQWhCRDs7QUFrQkFNLE9BQUcsb0NBQUgsRUFBeUMsVUFBVVQsSUFBVixFQUFnQjs7QUFFckRQLGVBQU8sSUFBSUMsUUFBSixDQUFhLElBQUlnQixJQUFKLENBQVNBLEtBQUtDLEdBQUwsS0FBVyxJQUFwQixDQUFiLENBQVA7O0FBRUFmLG1CQUFXLFlBQVc7QUFDakIsZ0NBQUtKLE9BQU9XLFNBQVosRUFBdUJTLEVBQXZCLENBQTBCQyxLQUExQjtBQUNKLFNBRkQsRUFFRyxJQUZIOztBQUlBakIsbUJBQVcsWUFBVztBQUNsQixnQ0FBS0osT0FBT1csU0FBWixFQUF1QlMsRUFBdkIsQ0FBMEIsWUFBMUI7QUFDQVo7QUFDSCxTQUhELEVBR0csSUFISDs7QUFLQVAsYUFBS3FCLEdBQUwsQ0FBU3RCLE1BQVQsRUFBaUIsWUFBVTtBQUN2QlE7QUFDSCxTQUZEO0FBSUgsS0FqQkQ7O0FBbUJBUyxPQUFHLHNEQUFILEVBQTJELFVBQVVULElBQVYsRUFBZ0I7O0FBRXZFUCxlQUFPLElBQUlJLFNBQUosQ0FBYyxJQUFJYSxJQUFKLENBQVNBLEtBQUtDLEdBQUwsS0FBVyxJQUFwQixDQUFkLENBQVA7O0FBRUFmLG1CQUFXLFlBQVc7QUFDbEIsZ0NBQUtKLE9BQU9XLFNBQVosRUFBdUJTLEVBQXZCLENBQTBCQyxLQUExQjtBQUNILFNBRkQsRUFFRyxJQUZIOztBQUlBakIsbUJBQVcsWUFBVztBQUNsQixnQ0FBS0osT0FBT1csU0FBWixFQUF1QlMsRUFBdkIsQ0FBMEJHLElBQTFCO0FBQ0FmO0FBQ0gsU0FIRCxFQUdHLElBSEg7O0FBS0FQLGFBQUtxQixHQUFMLENBQVN0QixNQUFULEVBQWlCLFlBQVU7QUFDdkJRO0FBQ0gsU0FGRDtBQUlILEtBakJEO0FBbUJILENBMUREIiwiZmlsZSI6IlNjaGVkdWxlZFRhc2tfdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY2hlZHVsZWRUYXNrIGZyb20gJy4uL1NjaGVkdWxlZFRhc2snO1xuaW1wb3J0IG11c3QgZnJvbSAnbXVzdCc7XG5cbnZhciByZXBvcnQ7XG52YXIgdGFzaztcblxuY2xhc3MgU29tZVRhc2sgZXh0ZW5kcyBTY2hlZHVsZWRUYXNrIHtcblxuICAgIHJ1blRhc2socmVwb3J0LCBjYil7XG5cbiAgICAgICAgc2V0VGltZW91dChjYiwgMTAwMCk7XG5cbiAgICB9XG5cbn1cblxuY2xhc3MgRXJyb3JUYXNrIGV4dGVuZHMgU2NoZWR1bGVkVGFzayB7XG5cbiAgICBydW5UYXNrKHJlcG9ydCwgY2Ipe1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjYihuZXcgRXJyb3IoJ1NvbWUgZXJyb3InKSk7XG4gICAgICAgIH0sIDEwMDApO1xuXG4gICAgfVxuXG59XG5cbmRlc2NyaWJlKCdTY2hlZHVsZWRUYXNrJywgZnVuY3Rpb24oZG9uZSkge1xuXG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICByZXBvcnQgPSB7XG4gICAgICAgICAgICBjYWxsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHRhc2tTdGFydGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFza0NvbXBsZXRlZFdpdGhFcnJvcihlcnIpe1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBlcnIubWVzc2FnZTtcbiAgICAgICAgfSxcbiAgICAgICAgICAgIHRhc2tDb21wbGV0ZWQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJ1biB0YXNrIGF0IHNwZWNpZmllZCB0aW1lICcsIGZ1bmN0aW9uIChkb25lKSB7XG5cbiAgICAgICAgdGFzayA9IG5ldyBTb21lVGFzayhuZXcgRGF0ZShEYXRlLm5vdygpKzYwMDApKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgIG11c3QocmVwb3J0LmNvbXBsZXRlZCkuYmUuZmFsc2UoKTtcbiAgICAgICAgfSwgNTAwMCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG11c3QocmVwb3J0LmNvbXBsZXRlZCkuYmUoJ1NvbWUgRXJyb3InKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgNzAwMCk7XG5cbiAgICAgICAgdGFzay5ydW4ocmVwb3J0LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBydW4gdGFzayBhdCBzcGVjaWZpZWQgdGltZSBhbmQgcmVwb3J0IGVycm9ycyAnLCBmdW5jdGlvbiAoZG9uZSkge1xuXG4gICAgICAgIHRhc2sgPSBuZXcgRXJyb3JUYXNrKG5ldyBEYXRlKERhdGUubm93KCkrNjAwMCkpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtdXN0KHJlcG9ydC5jb21wbGV0ZWQpLmJlLmZhbHNlKCk7XG4gICAgICAgIH0sIDUwMDApO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtdXN0KHJlcG9ydC5jb21wbGV0ZWQpLmJlLnRydWUoKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgNzAwMCk7XG5cbiAgICAgICAgdGFzay5ydW4ocmVwb3J0LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTsiXX0=