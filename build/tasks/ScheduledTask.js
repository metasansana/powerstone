'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _Task2 = require('./Task');

var _Task3 = _interopRequireDefault(_Task2);

var _cron = require('cron');

/**
 * ScheduledTask runs a task at a specific time period.
 *
 * Uses node-cron behind the scenes to support a crontab like syntax.
 */

var ScheduledTask = (function (_Task) {
    function ScheduledTask(schedule) {
        _classCallCheck(this, ScheduledTask);

        _get(Object.getPrototypeOf(ScheduledTask.prototype), 'constructor', this).call(this);
        this.schedule = schedule;
    }

    _inherits(ScheduledTask, _Task);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9TY2hlZHVsZWRUYXNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQWlCLFFBQVE7Ozs7b0JBQ0gsTUFBTTs7Ozs7Ozs7SUFPdEIsYUFBYTtBQUVKLGFBRlQsYUFBYSxDQUVILFFBQVEsRUFBQzs4QkFGbkIsYUFBYTs7QUFHWCxtQ0FIRixhQUFhLDZDQUdIO0FBQ1IsWUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7S0FDNUI7O2NBTEMsYUFBYTs7aUJBQWIsYUFBYTs7ZUFPWixhQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUM7O0FBRVgsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixzQkFqQkEsT0FBTyxDQWlCSyxJQUFJLENBQUMsUUFBUSxFQUFFLFlBQVc7QUFDbEMsc0JBQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pELG9CQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUM7QUFDdkMsQUFBQyx1QkFBRyxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUM3RSxDQUFDLENBQUM7YUFDTixFQUFFLFlBQVU7QUFBQyx1QkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRXpDLGNBQUUsRUFBRSxDQUFDO1NBQ1I7OztXQWxCQyxhQUFhOzs7cUJBcUJKLGFBQWEiLCJmaWxlIjoiU2NoZWR1bGVkVGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQge0Nyb25Kb2J9IGZyb20gJ2Nyb24nO1xuXG4vKipcbiAqIFNjaGVkdWxlZFRhc2sgcnVucyBhIHRhc2sgYXQgYSBzcGVjaWZpYyB0aW1lIHBlcmlvZC5cbiAqXG4gKiBVc2VzIG5vZGUtY3JvbiBiZWhpbmQgdGhlIHNjZW5lcyB0byBzdXBwb3J0IGEgY3JvbnRhYiBsaWtlIHN5bnRheC5cbiAqL1xuY2xhc3MgU2NoZWR1bGVkVGFzayBleHRlbmRzIFRhc2sge1xuXG4gICAgY29uc3RydWN0b3Ioc2NoZWR1bGUpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlID0gc2NoZWR1bGU7XG4gICAgfVxuXG4gICAgcnVuKHJlcG9ydCwgY2Ipe1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgbmV3IENyb25Kb2IodGhpcy5zY2hlZHVsZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXBvcnQudGFza1N0YXJ0ZWQoc2VsZi50YXNrSUQgfHwgc2VsZi5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgICAgIHNlbGYucnVuVGFzayhyZXBvcnQsIGZ1bmN0aW9uKGVyciwgbWVzc2FnZSl7XG4gICAgICAgICAgICAgICAgKGVycik/IHJlcG9ydC50YXNrQ29tcGxldGVkV2l0aEVycm9yKGVycikgOiByZXBvcnQudGFza0NvbXBsZXRlZChtZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbigpe2NvbnNvbGUubG9nKCdtZScpO30sIHRydWUpO1xuXG4gICAgICAgIGNiKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTY2hlZHVsZWRUYXNrXG4iXX0=