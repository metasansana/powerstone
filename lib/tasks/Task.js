'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _nodeCron = require('node-cron');

var _nodeCron2 = _interopRequireDefault(_nodeCron);

/**
 *
 * Task provides a primitive we can use to schedule a Task for execution independant of 
 * http request.
 * @param {string} time - The time to run this task in cron format.
 * @param {function} cb - A function that will be run by this Task
 *
 */

var Task = (function () {
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

            this._task = _nodeCron2['default'].schedule(this.convertTime(time), this._cb);
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
})();

exports['default'] = Task;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9UYXNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt3QkFBaUIsV0FBVzs7Ozs7Ozs7Ozs7OztJQVV0QixJQUFJO0FBRUssYUFGVCxJQUFJLENBRU0sSUFBSSxFQUFFLEVBQUUsRUFBRTs4QkFGcEIsSUFBSTs7QUFJRixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNsQixZQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNkLFlBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBRXJCOzs7Ozs7OztpQkFSQyxJQUFJOztlQWVLLHFCQUFDLElBQUksRUFBRTs7QUFFZCxtQkFBTyxJQUFJLENBQUM7U0FFZjs7Ozs7OztlQUtFLGVBQUc7O0FBRUYsbUJBQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBRXJCOzs7Ozs7OztlQU1JLGlCQUFHOztBQUVKLGdCQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3RCxnQkFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUV0Qjs7Ozs7Ozs7ZUFNSyxrQkFBRzs7QUFFTCxnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQ1gsTUFBTSxJQUFJLFNBQVMsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDOztBQUVqRSxnQkFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNyQixnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FFckI7OztXQXJEQyxJQUFJOzs7cUJBMERLLElBQUkiLCJmaWxlIjoiVGFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcm9uIGZyb20gJ25vZGUtY3Jvbic7XG5cbi8qKlxuICpcbiAqIFRhc2sgcHJvdmlkZXMgYSBwcmltaXRpdmUgd2UgY2FuIHVzZSB0byBzY2hlZHVsZSBhIFRhc2sgZm9yIGV4ZWN1dGlvbiBpbmRlcGVuZGFudCBvZiBcbiAqIGh0dHAgcmVxdWVzdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lIC0gVGhlIHRpbWUgdG8gcnVuIHRoaXMgdGFzayBpbiBjcm9uIGZvcm1hdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIC0gQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgcnVuIGJ5IHRoaXMgVGFza1xuICpcbiAqL1xuY2xhc3MgVGFzayB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0aW1lLCBjYikge1xuXG4gICAgICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xuICAgICAgICB0aGlzLl9jYiA9IGNiO1xuICAgICAgICB0aGlzLl90YXNrID0gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbnZlcnRUaW1lIG5vcm1hbGl6ZXMgYSBzdHJpbmcgdG8gY3JvbiB0aW1lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lIFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgY29udmVydFRpbWUodGltZSkge1xuXG4gICAgICAgIHJldHVybiB0aW1lO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcnVuXG4gICAgICovXG4gICAgcnVuKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9jYigpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc3RhcnQgdGhpcyBUYXNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRpbWUgXG4gICAgICovXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgdGhpcy5fdGFzayA9IGNyb24uc2NoZWR1bGUodGhpcy5jb252ZXJ0VGltZSh0aW1lKSwgdGhpcy5fY2IpO1xuICAgICAgICB0aGlzLl90YXNrLnN0YXJ0KCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYW5jZWwgdGhpcyBUYXNrXG4gICAgICogQHJldHVybiB7VGFza31cbiAgICAgKi9cbiAgICBjYW5jZWwoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl90YXNrKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhpcyB0YXNrIGhhcyBub3QgYmVlbiBzY2hlZHVsZWQgeWV0IScpO1xuXG4gICAgICAgIHRoaXMuX3Rhc2suZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl90YXNrID0gbnVsbDtcblxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7XG4iXX0=