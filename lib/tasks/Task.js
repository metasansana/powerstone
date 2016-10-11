'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeCron = require('node-cron');

var _nodeCron2 = _interopRequireDefault(_nodeCron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * Task provides a primitive we can use to schedule a Task for execution independant of 
 * http request.
 * @param {string} time - The time to run this task in cron format.
 * @param {function} cb - A function that will be run by this Task
 *
 */
var Task = function () {
    function Task(time, cb) {
        _classCallCheck(this, Task);

        this._time = time;
        this._cb = cb;
        this._task = null;
    }

    /**
     * convertTime normalizes a string to cron time.
     * @param {string} time 
     * @returns {string}
     */


    _createClass(Task, [{
        key: 'convertTime',
        value: function convertTime(time) {

            return time;
        }

        /**
         * run
         */

    }, {
        key: 'run',
        value: function run() {

            return this._cb();
        }

        /**
         * start this Task
         * @param {string} time 
         */

    }, {
        key: 'start',
        value: function start() {

            this._task = _nodeCron2.default.schedule(this.convertTime(time), this._cb);
            this._task.start();
        }

        /**
         * cancel this Task
         * @return {Task}
         */

    }, {
        key: 'cancel',
        value: function cancel() {

            if (!this._task) throw new TypeError('This task has not been scheduled yet!');

            this._task.destroy();
            this._task = null;
        }
    }]);

    return Task;
}();

exports.default = Task;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9UYXNrLmpzIl0sIm5hbWVzIjpbIlRhc2siLCJ0aW1lIiwiY2IiLCJfdGltZSIsIl9jYiIsIl90YXNrIiwic2NoZWR1bGUiLCJjb252ZXJ0VGltZSIsInN0YXJ0IiwiVHlwZUVycm9yIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFRTUEsSTtBQUVGLGtCQUFZQyxJQUFaLEVBQWtCQyxFQUFsQixFQUFzQjtBQUFBOztBQUVsQixhQUFLQyxLQUFMLEdBQWFGLElBQWI7QUFDQSxhQUFLRyxHQUFMLEdBQVdGLEVBQVg7QUFDQSxhQUFLRyxLQUFMLEdBQWEsSUFBYjtBQUVIOztBQUVEOzs7Ozs7Ozs7b0NBS1lKLEksRUFBTTs7QUFFZCxtQkFBT0EsSUFBUDtBQUVIOztBQUVEOzs7Ozs7OEJBR007O0FBRUYsbUJBQU8sS0FBS0csR0FBTCxFQUFQO0FBRUg7O0FBRUQ7Ozs7Ozs7Z0NBSVE7O0FBRUosaUJBQUtDLEtBQUwsR0FBYSxtQkFBS0MsUUFBTCxDQUFjLEtBQUtDLFdBQUwsQ0FBaUJOLElBQWpCLENBQWQsRUFBc0MsS0FBS0csR0FBM0MsQ0FBYjtBQUNBLGlCQUFLQyxLQUFMLENBQVdHLEtBQVg7QUFFSDs7QUFFRDs7Ozs7OztpQ0FJUzs7QUFFTCxnQkFBSSxDQUFDLEtBQUtILEtBQVYsRUFDSSxNQUFNLElBQUlJLFNBQUosQ0FBYyx1Q0FBZCxDQUFOOztBQUVKLGlCQUFLSixLQUFMLENBQVdLLE9BQVg7QUFDQSxpQkFBS0wsS0FBTCxHQUFhLElBQWI7QUFFSDs7Ozs7O2tCQUtVTCxJIiwiZmlsZSI6IlRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JvbiBmcm9tICdub2RlLWNyb24nO1xuXG4vKipcbiAqXG4gKiBUYXNrIHByb3ZpZGVzIGEgcHJpbWl0aXZlIHdlIGNhbiB1c2UgdG8gc2NoZWR1bGUgYSBUYXNrIGZvciBleGVjdXRpb24gaW5kZXBlbmRhbnQgb2YgXG4gKiBodHRwIHJlcXVlc3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGltZSAtIFRoZSB0aW1lIHRvIHJ1biB0aGlzIHRhc2sgaW4gY3JvbiBmb3JtYXQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiAtIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIHJ1biBieSB0aGlzIFRhc2tcbiAqXG4gKi9cbmNsYXNzIFRhc2sge1xuXG4gICAgY29uc3RydWN0b3IodGltZSwgY2IpIHtcblxuICAgICAgICB0aGlzLl90aW1lID0gdGltZTtcbiAgICAgICAgdGhpcy5fY2IgPSBjYjtcbiAgICAgICAgdGhpcy5fdGFzayA9IG51bGw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb252ZXJ0VGltZSBub3JtYWxpemVzIGEgc3RyaW5nIHRvIGNyb24gdGltZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGltZSBcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGNvbnZlcnRUaW1lKHRpbWUpIHtcblxuICAgICAgICByZXR1cm4gdGltZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJ1blxuICAgICAqL1xuICAgIHJ1bigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fY2IoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHN0YXJ0IHRoaXMgVGFza1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lIFxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIHRoaXMuX3Rhc2sgPSBjcm9uLnNjaGVkdWxlKHRoaXMuY29udmVydFRpbWUodGltZSksIHRoaXMuX2NiKTtcbiAgICAgICAgdGhpcy5fdGFzay5zdGFydCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2FuY2VsIHRoaXMgVGFza1xuICAgICAqIEByZXR1cm4ge1Rhc2t9XG4gICAgICovXG4gICAgY2FuY2VsKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5fdGFzaylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoaXMgdGFzayBoYXMgbm90IGJlZW4gc2NoZWR1bGVkIHlldCEnKTtcblxuICAgICAgICB0aGlzLl90YXNrLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fdGFzayA9IG51bGw7XG5cbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUYXNrO1xuIl19