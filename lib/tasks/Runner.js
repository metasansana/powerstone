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

        /**
         * runAllTasks will run all the tasks in sequence.
         * @param {Array} [tasks] Optional list of tasks instead of the
         * ones this object was created with.
         * @return {Promise}
         */
    }, {
        key: 'runAllTasks',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9SdW5uZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3dCQUFvQixVQUFVOzs7O3NCQUNYLFVBQVU7Ozs7Ozs7OztJQU12QixNQUFNO0FBRUcsYUFGVCxNQUFNLENBRUksS0FBSyxFQUFFLFFBQVEsRUFBQzs4QkFGMUIsTUFBTTs7QUFHSixZQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNsQixZQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztLQUM1Qjs7aUJBTkMsTUFBTTs7ZUFRQyxtQkFBQyxFQUFFLEVBQUU7O0FBRVYsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM1QixnQkFBSSxNQUFNLEdBQUcsd0JBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUV2QyxnQkFBSSxLQUFLLEdBQUcsU0FBUixLQUFLLENBQVksR0FBRyxFQUFDO0FBQ3JCLG9CQUFJLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QixvQkFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN0QixDQUFDOztBQUVGLGdCQUFJLEtBQUssR0FBRyxTQUFSLEtBQUssR0FBYztBQUNuQixvQkFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDM0IsQ0FBQzs7QUFFRixnQkFBSSxJQUFJLEdBQUcsU0FBUCxJQUFJLEdBQWM7QUFDbEIsb0JBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdEIsQ0FBQzs7QUFFRixnQkFBRyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDOztBQUV0QixnQkFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBRXpDOzs7Ozs7Ozs7O2VBUVUscUJBQUMsS0FBSyxFQUFFOztBQUVmLGlCQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDNUIsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUUzQixtQkFBTywwQkFBWSxDQUFBLFVBQVMsT0FBTyxFQUFFLE1BQU0sRUFBRTs7QUFFekMsb0JBQUksQ0FBQyxTQUFTLENBQUMsVUFBUyxHQUFHLEVBQUU7O0FBRXpCLHdCQUFHLEdBQUcsRUFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFM0IsMkJBQU8sRUFBRSxDQUFDO2lCQUViLENBQUMsQ0FBQTthQUVMLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNqQjs7O1dBdkRDLE1BQU07OztxQkEyREcsTUFBTSIsImZpbGUiOiJSdW5uZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgUmVwb3J0IGZyb20gJy4vUmVwb3J0JztcblxuLyoqXG4gKiBSdW5uZXIgaXMgcmVzcG9uc2libGUgZm9yIHJ1bm5pbmcgdGFza3MgYmVmb3JlIHRoZSBhcHBsaWNhdGlvblxuICogc3RhcnRzIGFjY2VwdGluZyBjbGllbnQgcmVxdWVzdHMuXG4gKi9cbmNsYXNzIFJ1bm5lciB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0YXNrcywgcmVjb3JkZXIpe1xuICAgICAgICB0aGlzLnRhc2tzID0gdGFza3M7XG4gICAgICAgIHRoaXMucXVldWUgPSBudWxsO1xuICAgICAgICB0aGlzLnJlY29yZGVyID0gcmVjb3JkZXI7XG4gICAgfVxuXG4gICAgX25leHRUYXNrKGNiKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbmV4dCA9IHNlbGYucXVldWUucG9wKCk7XG4gICAgICAgIHZhciByZXBvcnQgPSBuZXcgUmVwb3J0KHNlbGYucmVjb3JkZXIpO1xuXG4gICAgICAgIHZhciBpZkVyciA9IGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcbiAgICAgICAgICAgIHNlbGYuX25leHRUYXNrKGNiKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb25ZZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5leHQucnVuKHJlcG9ydCwgaWZFcnIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvbk5vID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLl9uZXh0VGFzayhjYik7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYoIW5leHQpIHJldHVybiBjYigpO1xuXG4gICAgICAgIG5leHQudGFza1dpbGxSdW4ob25ZZXMsIG9uTm8sIHJlcG9ydCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBydW5BbGxUYXNrcyB3aWxsIHJ1biBhbGwgdGhlIHRhc2tzIGluIHNlcXVlbmNlLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFt0YXNrc10gT3B0aW9uYWwgbGlzdCBvZiB0YXNrcyBpbnN0ZWFkIG9mIHRoZVxuICAgICAqIG9uZXMgdGhpcyBvYmplY3Qgd2FzIGNyZWF0ZWQgd2l0aC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHJ1bkFsbFRhc2tzKHRhc2tzKSB7XG5cbiAgICAgICAgdGFza3MgPSB0YXNrcyB8fCB0aGlzLnRhc2tzO1xuICAgICAgICB0aGlzLnF1ZXVlID0gdGFza3Muc2xpY2UoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIHRoaXMuX25leHRUYXNrKGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAgICAgICAgICAgaWYoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUnVubmVyIl19