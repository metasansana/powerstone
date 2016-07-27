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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL1J1bm5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7d0JBQW9CLFVBQVU7Ozs7c0JBQ1gsVUFBVTs7Ozs7Ozs7O0lBTXZCLE1BQU07QUFFRyxhQUZULE1BQU0sQ0FFSSxLQUFLLEVBQUUsUUFBUSxFQUFDOzhCQUYxQixNQUFNOztBQUdKLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFlBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFlBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0tBQzVCOztpQkFOQyxNQUFNOztlQVFDLG1CQUFDLEVBQUUsRUFBRTs7QUFFVixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzVCLGdCQUFJLE1BQU0sR0FBRyx3QkFBVyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRXZDLGdCQUFJLEtBQUssR0FBRyxTQUFSLEtBQUssQ0FBWSxHQUFHLEVBQUM7QUFDckIsb0JBQUksR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLG9CQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3RCLENBQUM7O0FBRUYsZ0JBQUksS0FBSyxHQUFHLFNBQVIsS0FBSyxHQUFjO0FBQ25CLG9CQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQzthQUMzQixDQUFDOztBQUVGLGdCQUFJLElBQUksR0FBRyxTQUFQLElBQUksR0FBYztBQUNsQixvQkFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN0QixDQUFDOztBQUVGLGdCQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUM7O0FBRXRCLGdCQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FFekM7Ozs7Ozs7Ozs7ZUFRVSxxQkFBQyxLQUFLLEVBQUU7O0FBRWYsaUJBQUssR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztBQUM1QixnQkFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRTNCLG1CQUFPLDBCQUFZLENBQUEsVUFBUyxPQUFPLEVBQUUsTUFBTSxFQUFFOztBQUV6QyxvQkFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFTLEdBQUcsRUFBRTs7QUFFekIsd0JBQUcsR0FBRyxFQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUUzQiwyQkFBTyxFQUFFLENBQUM7aUJBRWIsQ0FBQyxDQUFBO2FBRUwsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2pCOzs7V0F2REMsTUFBTTs7O3FCQTJERyxNQUFNIiwiZmlsZSI6IlJ1bm5lci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBSZXBvcnQgZnJvbSAnLi9SZXBvcnQnO1xuXG4vKipcbiAqIFJ1bm5lciBpcyByZXNwb25zaWJsZSBmb3IgcnVubmluZyB0YXNrcyBiZWZvcmUgdGhlIGFwcGxpY2F0aW9uXG4gKiBzdGFydHMgYWNjZXB0aW5nIGNsaWVudCByZXF1ZXN0cy5cbiAqL1xuY2xhc3MgUnVubmVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHRhc2tzLCByZWNvcmRlcil7XG4gICAgICAgIHRoaXMudGFza3MgPSB0YXNrcztcbiAgICAgICAgdGhpcy5xdWV1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMucmVjb3JkZXIgPSByZWNvcmRlcjtcbiAgICB9XG5cbiAgICBfbmV4dFRhc2soY2IpIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBuZXh0ID0gc2VsZi5xdWV1ZS5wb3AoKTtcbiAgICAgICAgdmFyIHJlcG9ydCA9IG5ldyBSZXBvcnQoc2VsZi5yZWNvcmRlcik7XG5cbiAgICAgICAgdmFyIGlmRXJyID0gZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuICAgICAgICAgICAgc2VsZi5fbmV4dFRhc2soY2IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvblllcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbmV4dC5ydW4ocmVwb3J0LCBpZkVycik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG9uTm8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuX25leHRUYXNrKGNiKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZighbmV4dCkgcmV0dXJuIGNiKCk7XG5cbiAgICAgICAgbmV4dC50YXNrV2lsbFJ1bihvblllcywgb25ObywgcmVwb3J0KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJ1bkFsbFRhc2tzIHdpbGwgcnVuIGFsbCB0aGUgdGFza3MgaW4gc2VxdWVuY2UuXG4gICAgICogQHBhcmFtIHtBcnJheX0gW3Rhc2tzXSBPcHRpb25hbCBsaXN0IG9mIHRhc2tzIGluc3RlYWQgb2YgdGhlXG4gICAgICogb25lcyB0aGlzIG9iamVjdCB3YXMgY3JlYXRlZCB3aXRoLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICovXG4gICAgcnVuQWxsVGFza3ModGFza3MpIHtcblxuICAgICAgICB0YXNrcyA9IHRhc2tzIHx8IHRoaXMudGFza3M7XG4gICAgICAgIHRoaXMucXVldWUgPSB0YXNrcy5zbGljZSgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgdGhpcy5fbmV4dFRhc2soZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgICAgICAgICAgICBpZihlcnIpIHJldHVybiByZWplY3QoZXJyKTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBSdW5uZXIiXX0=