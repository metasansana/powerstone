'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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
//# sourceMappingURL=ScheduledTask.js.map