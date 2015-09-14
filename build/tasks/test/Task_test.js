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
//# sourceMappingURL=Task_test.js.map