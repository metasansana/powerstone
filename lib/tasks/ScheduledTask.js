'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Task2 = require('./Task');

var _Task3 = _interopRequireDefault(_Task2);

var _cron = require('cron');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ScheduledTask runs a task at a specific time period.
 *
 * Uses node-cron behind the scenes to support a crontab like syntax.
 */
var ScheduledTask = function (_Task) {
    _inherits(ScheduledTask, _Task);

    function ScheduledTask(schedule) {
        _classCallCheck(this, ScheduledTask);

        var _this = _possibleConstructorReturn(this, (ScheduledTask.__proto__ || Object.getPrototypeOf(ScheduledTask)).call(this));

        _this.schedule = schedule;
        return _this;
    }

    _createClass(ScheduledTask, [{
        key: 'run',
        value: function run(report, cb) {

            var self = this;
            new _cron.CronJob(this.schedule, function () {
                report.taskStarted(self.taskID || self.constructor.name);
                self.runTask(report, function (err, message) {
                    err ? report.taskCompletedWithError(err) : report.taskCompleted(message);
                });
            }, function () {
                console.log('me');
            }, true);

            cb();
        }
    }]);

    return ScheduledTask;
}(_Task3.default);

exports.default = ScheduledTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9TY2hlZHVsZWRUYXNrLmpzIl0sIm5hbWVzIjpbIlNjaGVkdWxlZFRhc2siLCJzY2hlZHVsZSIsInJlcG9ydCIsImNiIiwic2VsZiIsInRhc2tTdGFydGVkIiwidGFza0lEIiwiY29uc3RydWN0b3IiLCJuYW1lIiwicnVuVGFzayIsImVyciIsIm1lc3NhZ2UiLCJ0YXNrQ29tcGxldGVkV2l0aEVycm9yIiwidGFza0NvbXBsZXRlZCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBOzs7OztJQUtNQSxhOzs7QUFFRiwyQkFBWUMsUUFBWixFQUFxQjtBQUFBOztBQUFBOztBQUVqQixjQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUZpQjtBQUdwQjs7Ozs0QkFFR0MsTSxFQUFRQyxFLEVBQUc7O0FBRVgsZ0JBQUlDLE9BQU8sSUFBWDtBQUNBLDhCQUFZLEtBQUtILFFBQWpCLEVBQTJCLFlBQVc7QUFDbENDLHVCQUFPRyxXQUFQLENBQW1CRCxLQUFLRSxNQUFMLElBQWVGLEtBQUtHLFdBQUwsQ0FBaUJDLElBQW5EO0FBQ0FKLHFCQUFLSyxPQUFMLENBQWFQLE1BQWIsRUFBcUIsVUFBU1EsR0FBVCxFQUFjQyxPQUFkLEVBQXNCO0FBQ3RDRCx1QkFBRCxHQUFPUixPQUFPVSxzQkFBUCxDQUE4QkYsR0FBOUIsQ0FBUCxHQUE0Q1IsT0FBT1csYUFBUCxDQUFxQkYsT0FBckIsQ0FBNUM7QUFDSCxpQkFGRDtBQUdILGFBTEQsRUFLRyxZQUFVO0FBQUNHLHdCQUFRQyxHQUFSLENBQVksSUFBWjtBQUFtQixhQUxqQyxFQUttQyxJQUxuQzs7QUFPQVo7QUFDSDs7Ozs7O2tCQUdVSCxhIiwiZmlsZSI6IlNjaGVkdWxlZFRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFzayBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IHtDcm9uSm9ifSBmcm9tICdjcm9uJztcblxuLyoqXG4gKiBTY2hlZHVsZWRUYXNrIHJ1bnMgYSB0YXNrIGF0IGEgc3BlY2lmaWMgdGltZSBwZXJpb2QuXG4gKlxuICogVXNlcyBub2RlLWNyb24gYmVoaW5kIHRoZSBzY2VuZXMgdG8gc3VwcG9ydCBhIGNyb250YWIgbGlrZSBzeW50YXguXG4gKi9cbmNsYXNzIFNjaGVkdWxlZFRhc2sgZXh0ZW5kcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKHNjaGVkdWxlKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSA9IHNjaGVkdWxlO1xuICAgIH1cblxuICAgIHJ1bihyZXBvcnQsIGNiKXtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIG5ldyBDcm9uSm9iKHRoaXMuc2NoZWR1bGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVwb3J0LnRhc2tTdGFydGVkKHNlbGYudGFza0lEIHx8IHNlbGYuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgICAgICBzZWxmLnJ1blRhc2socmVwb3J0LCBmdW5jdGlvbihlcnIsIG1lc3NhZ2Upe1xuICAgICAgICAgICAgICAgIChlcnIpPyByZXBvcnQudGFza0NvbXBsZXRlZFdpdGhFcnJvcihlcnIpIDogcmVwb3J0LnRhc2tDb21wbGV0ZWQobWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oKXtjb25zb2xlLmxvZygnbWUnKTt9LCB0cnVlKTtcblxuICAgICAgICBjYigpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2NoZWR1bGVkVGFza1xuIl19