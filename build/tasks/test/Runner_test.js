'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Runner = require('../Runner');

var _Runner2 = _interopRequireDefault(_Runner);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var runner;
var tasks;
var recorder;

function makeRunnableTask() {
    return {
        count: 0,
        taskWillRun: function taskWillRun(yes, no) {
            yes();
        },
        run: function run(_, done) {
            this.count++;
            done();
        }
    };
}

function makeUnRunnableTask() {
    return {
        count: 0,
        taskWillRun: function taskWillRun(yes, no) {
            no();
        },
        run: function run(done) {
            this.count++;
            done();
        }
    };
}

describe('Runner', function () {

    beforeEach(function () {});

    it('will run tasks that should be run', function () {
        var repeatTask = makeRunnableTask();
        var repeatTask2 = makeUnRunnableTask();
        tasks = [makeRunnableTask(), repeatTask2, repeatTask2, makeUnRunnableTask(), repeatTask, repeatTask, makeRunnableTask()];

        runner = new _Runner2['default'](tasks, { taskCompleted: function taskCompleted() {} });
        return runner.runAllTasks().then(function () {
            (0, _must2['default'])(tasks[0].count).be(1);
            (0, _must2['default'])(tasks[1].count).be(0);
            (0, _must2['default'])(tasks[2].count).be(0);
            (0, _must2['default'])(tasks[3].count).be(0);
            (0, _must2['default'])(tasks[4].count).be(2);
            (0, _must2['default'])(tasks[5].count).be(2);
            (0, _must2['default'])(tasks[6].count).be(1);
        });
    });
});
//# sourceMappingURL=Runner_test.js.map