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
//# sourceMappingURL=ScheduledTask_test.js.map