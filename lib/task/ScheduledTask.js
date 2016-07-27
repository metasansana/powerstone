'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Task2 = require('./Task');

var _Task3 = _interopRequireDefault(_Task2);

var _cron = require('cron');

/**
 * ScheduledTask runs a task at a specific time period.
 *
 * Uses node-cron behind the scenes to support a crontab like syntax.
 */

var ScheduledTask = (function (_Task) {
    _inherits(ScheduledTask, _Task);

    function ScheduledTask(schedule) {
        _classCallCheck(this, ScheduledTask);

        _get(Object.getPrototypeOf(ScheduledTask.prototype), 'constructor', this).call(this);
        this.schedule = schedule;
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
})(_Task3['default']);

exports['default'] = ScheduledTask;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL1NjaGVkdWxlZFRhc2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztxQkFBaUIsUUFBUTs7OztvQkFDSCxNQUFNOzs7Ozs7OztJQU90QixhQUFhO2NBQWIsYUFBYTs7QUFFSixhQUZULGFBQWEsQ0FFSCxRQUFRLEVBQUM7OEJBRm5CLGFBQWE7O0FBR1gsbUNBSEYsYUFBYSw2Q0FHSDtBQUNSLFlBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0tBQzVCOztpQkFMQyxhQUFhOztlQU9aLGFBQUMsTUFBTSxFQUFFLEVBQUUsRUFBQzs7QUFFWCxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLDhCQUFZLElBQUksQ0FBQyxRQUFRLEVBQUUsWUFBVztBQUNsQyxzQkFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekQsb0JBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVMsR0FBRyxFQUFFLE9BQU8sRUFBQztBQUN2QyxBQUFDLHVCQUFHLEdBQUcsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzdFLENBQUMsQ0FBQzthQUNOLEVBQUUsWUFBVTtBQUFDLHVCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFekMsY0FBRSxFQUFFLENBQUM7U0FDUjs7O1dBbEJDLGFBQWE7OztxQkFxQkosYUFBYSIsImZpbGUiOiJTY2hlZHVsZWRUYXNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrJztcbmltcG9ydCB7Q3JvbkpvYn0gZnJvbSAnY3Jvbic7XG5cbi8qKlxuICogU2NoZWR1bGVkVGFzayBydW5zIGEgdGFzayBhdCBhIHNwZWNpZmljIHRpbWUgcGVyaW9kLlxuICpcbiAqIFVzZXMgbm9kZS1jcm9uIGJlaGluZCB0aGUgc2NlbmVzIHRvIHN1cHBvcnQgYSBjcm9udGFiIGxpa2Ugc3ludGF4LlxuICovXG5jbGFzcyBTY2hlZHVsZWRUYXNrIGV4dGVuZHMgVGFzayB7XG5cbiAgICBjb25zdHJ1Y3RvcihzY2hlZHVsZSl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUgPSBzY2hlZHVsZTtcbiAgICB9XG5cbiAgICBydW4ocmVwb3J0LCBjYil7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBuZXcgQ3JvbkpvYih0aGlzLnNjaGVkdWxlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlcG9ydC50YXNrU3RhcnRlZChzZWxmLnRhc2tJRCB8fCBzZWxmLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICAgICAgc2VsZi5ydW5UYXNrKHJlcG9ydCwgZnVuY3Rpb24oZXJyLCBtZXNzYWdlKXtcbiAgICAgICAgICAgICAgICAoZXJyKT8gcmVwb3J0LnRhc2tDb21wbGV0ZWRXaXRoRXJyb3IoZXJyKSA6IHJlcG9ydC50YXNrQ29tcGxldGVkKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKCl7Y29uc29sZS5sb2coJ21lJyk7fSwgdHJ1ZSk7XG5cbiAgICAgICAgY2IoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjaGVkdWxlZFRhc2tcbiJdfQ==