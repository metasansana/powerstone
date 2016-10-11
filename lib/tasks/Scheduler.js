'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Scheduler is responsible for running tasks before the application
 * starts accepting client requests.
 */
var Scheduler = function () {
    function Scheduler() {
        _classCallCheck(this, Scheduler);

        this._tasks = {};
    }

    _createClass(Scheduler, [{
        key: 'onStateChange',
        value: function onStateChange(app) {

            if (app.getState() === 'connected') this.schedule();
        }

        /**
         * add a Task to the Scheduler
         * @param {string} id 
         * @param {Task} task 
         * @returns {Scheduler}
         */

    }, {
        key: 'add',
        value: function add(id, task) {

            if (this._tasks.hasOwnProperty(id)) throw new Error('The task ' + id + ' has been registered already');

            this._tasks[id] = task;

            return this;
        }

        /**
         * getTaskById returns a task specified by id
         * @param {string} id 
         * @returns {Task|null}
         */

    }, {
        key: 'getTaskByName',
        value: function getTaskByName(id) {

            if (this._tasks[id]) return this._tasks[id];

            return null;
        }

        /**
         * schedule all the tasks
         * @returns {Scheduler}
         */

    }, {
        key: 'schedule',
        value: function schedule() {
            var _this = this;

            Object.keys(this._tasks).forEach(function (k) {
                return _this._tasks[k].start();
            });
            return this;
        }
    }]);

    return Scheduler;
}();

exports.default = new Scheduler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9TY2hlZHVsZXIuanMiXSwibmFtZXMiOlsiU2NoZWR1bGVyIiwiX3Rhc2tzIiwiYXBwIiwiZ2V0U3RhdGUiLCJzY2hlZHVsZSIsImlkIiwidGFzayIsImhhc093blByb3BlcnR5IiwiRXJyb3IiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImsiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSU1BLFM7QUFFRix5QkFBYztBQUFBOztBQUVWLGFBQUtDLE1BQUwsR0FBYyxFQUFkO0FBRUg7Ozs7c0NBRWFDLEcsRUFBSzs7QUFFZixnQkFBSUEsSUFBSUMsUUFBSixPQUFtQixXQUF2QixFQUNJLEtBQUtDLFFBQUw7QUFFUDs7QUFFRDs7Ozs7Ozs7OzRCQU1JQyxFLEVBQUlDLEksRUFBTTs7QUFFVixnQkFBSSxLQUFLTCxNQUFMLENBQVlNLGNBQVosQ0FBMkJGLEVBQTNCLENBQUosRUFDSSxNQUFNLElBQUlHLEtBQUosZUFBc0JILEVBQXRCLGtDQUFOOztBQUVKLGlCQUFLSixNQUFMLENBQVlJLEVBQVosSUFBa0JDLElBQWxCOztBQUVBLG1CQUFPLElBQVA7QUFFSDs7QUFFRDs7Ozs7Ozs7c0NBS2NELEUsRUFBSTs7QUFFZCxnQkFBSSxLQUFLSixNQUFMLENBQVlJLEVBQVosQ0FBSixFQUNJLE9BQU8sS0FBS0osTUFBTCxDQUFZSSxFQUFaLENBQVA7O0FBRUosbUJBQU8sSUFBUDtBQUVIOztBQUVEOzs7Ozs7O21DQUlXO0FBQUE7O0FBRVBJLG1CQUFPQyxJQUFQLENBQVksS0FBS1QsTUFBakIsRUFBeUJVLE9BQXpCLENBQWlDO0FBQUEsdUJBQUssTUFBS1YsTUFBTCxDQUFZVyxDQUFaLEVBQWVDLEtBQWYsRUFBTDtBQUFBLGFBQWpDO0FBQ0EsbUJBQU8sSUFBUDtBQUVIOzs7Ozs7a0JBSVUsSUFBSWIsU0FBSixFIiwiZmlsZSI6IlNjaGVkdWxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU2NoZWR1bGVyIGlzIHJlc3BvbnNpYmxlIGZvciBydW5uaW5nIHRhc2tzIGJlZm9yZSB0aGUgYXBwbGljYXRpb25cbiAqIHN0YXJ0cyBhY2NlcHRpbmcgY2xpZW50IHJlcXVlc3RzLlxuICovXG5jbGFzcyBTY2hlZHVsZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5fdGFza3MgPSB7fTtcblxuICAgIH1cblxuICAgIG9uU3RhdGVDaGFuZ2UoYXBwKSB7XG5cbiAgICAgICAgaWYgKGFwcC5nZXRTdGF0ZSgpID09PSAnY29ubmVjdGVkJylcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCBhIFRhc2sgdG8gdGhlIFNjaGVkdWxlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBcbiAgICAgKiBAcGFyYW0ge1Rhc2t9IHRhc2sgXG4gICAgICogQHJldHVybnMge1NjaGVkdWxlcn1cbiAgICAgKi9cbiAgICBhZGQoaWQsIHRhc2spIHtcblxuICAgICAgICBpZiAodGhpcy5fdGFza3MuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgdGFzayAke2lkfSBoYXMgYmVlbiByZWdpc3RlcmVkIGFscmVhZHlgKTtcblxuICAgICAgICB0aGlzLl90YXNrc1tpZF0gPSB0YXNrO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0VGFza0J5SWQgcmV0dXJucyBhIHRhc2sgc3BlY2lmaWVkIGJ5IGlkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFxuICAgICAqIEByZXR1cm5zIHtUYXNrfG51bGx9XG4gICAgICovXG4gICAgZ2V0VGFza0J5TmFtZShpZCkge1xuXG4gICAgICAgIGlmICh0aGlzLl90YXNrc1tpZF0pXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFza3NbaWRdO1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2NoZWR1bGUgYWxsIHRoZSB0YXNrc1xuICAgICAqIEByZXR1cm5zIHtTY2hlZHVsZXJ9XG4gICAgICovXG4gICAgc2NoZWR1bGUoKSB7XG5cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fdGFza3MpLmZvckVhY2goayA9PiB0aGlzLl90YXNrc1trXS5zdGFydCgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFNjaGVkdWxlcigpXG4iXX0=