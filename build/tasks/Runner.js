'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Report = require('./Report');

var _Report2 = _interopRequireDefault(_Report);

/**
 * Runner is responsible for running tasks before the application
 * starts accepting client requests.
 */

var Runner = (function () {
    function Runner(tasks, recorder) {
        _classCallCheck(this, Runner);

        this.tasks = tasks;
        this.queue = null;
        this.recorder = recorder;
    }

    _createClass(Runner, [{
        key: '_nextTask',
        value: function _nextTask(cb) {

            var self = this;
            var next = self.queue.pop();
            var report = new _Report2['default'](self.recorder);

            var ifErr = function ifErr(err) {
                if (err) return cb(err);
                self._nextTask(cb);
            };

            var onYes = function onYes() {
                next.run(report, ifErr);
            };

            var onNo = function onNo() {
                self._nextTask(cb);
            };

            if (!next) return cb();

            next.taskWillRun(onYes, onNo, report);
        }
    }, {
        key: 'runAllTasks',

        /**
         * runAllTasks will run all the tasks in sequence.
         * @param {Array} [tasks] Optional list of tasks instead of the
         * ones this object was created with.
         * @return {Promise}
         */
        value: function runAllTasks(tasks) {

            tasks = tasks || this.tasks;
            this.queue = tasks.slice();

            return new _bluebird2['default']((function (resolve, reject) {

                this._nextTask(function (err) {

                    if (err) return reject(err);

                    resolve();
                });
            }).bind(this));
        }
    }]);

    return Runner;
})();

exports['default'] = Runner;
module.exports = exports['default'];