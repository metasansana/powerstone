/**
 * Scheduler is responsible for running tasks before the application
 * starts accepting client requests.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Scheduler = (function () {
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
})();

exports['default'] = new Scheduler();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9TY2hlZHVsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFJTSxTQUFTO0FBRUEsYUFGVCxTQUFTLEdBRUc7OEJBRlosU0FBUzs7QUFJUCxZQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztLQUVwQjs7aUJBTkMsU0FBUzs7ZUFRRSx1QkFBQyxHQUFHLEVBQUU7O0FBRWYsZ0JBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLFdBQVcsRUFDOUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBRXZCOzs7Ozs7Ozs7O2VBUUUsYUFBQyxFQUFFLEVBQUUsSUFBSSxFQUFFOztBQUVWLGdCQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUM5QixNQUFNLElBQUksS0FBSyxlQUFhLEVBQUUsa0NBQStCLENBQUM7O0FBRWxFLGdCQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQzs7QUFFdkIsbUJBQU8sSUFBSSxDQUFDO1NBRWY7Ozs7Ozs7OztlQU9ZLHVCQUFDLEVBQUUsRUFBRTs7QUFFZCxnQkFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUNmLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFM0IsbUJBQU8sSUFBSSxDQUFDO1NBRWY7Ozs7Ozs7O2VBTU8sb0JBQUc7OztBQUVQLGtCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO3VCQUFJLE1BQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTthQUFBLENBQUMsQ0FBQztBQUM5RCxtQkFBTyxJQUFJLENBQUM7U0FFZjs7O1dBdkRDLFNBQVM7OztxQkEyREEsSUFBSSxTQUFTLEVBQUUiLCJmaWxlIjoiU2NoZWR1bGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTY2hlZHVsZXIgaXMgcmVzcG9uc2libGUgZm9yIHJ1bm5pbmcgdGFza3MgYmVmb3JlIHRoZSBhcHBsaWNhdGlvblxuICogc3RhcnRzIGFjY2VwdGluZyBjbGllbnQgcmVxdWVzdHMuXG4gKi9cbmNsYXNzIFNjaGVkdWxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLl90YXNrcyA9IHt9O1xuXG4gICAgfVxuXG4gICAgb25TdGF0ZUNoYW5nZShhcHApIHtcblxuICAgICAgICBpZiAoYXBwLmdldFN0YXRlKCkgPT09ICdjb25uZWN0ZWQnKVxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIGEgVGFzayB0byB0aGUgU2NoZWR1bGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFxuICAgICAqIEBwYXJhbSB7VGFza30gdGFzayBcbiAgICAgKiBAcmV0dXJucyB7U2NoZWR1bGVyfVxuICAgICAqL1xuICAgIGFkZChpZCwgdGFzaykge1xuXG4gICAgICAgIGlmICh0aGlzLl90YXNrcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSB0YXNrICR7aWR9IGhhcyBiZWVuIHJlZ2lzdGVyZWQgYWxyZWFkeWApO1xuXG4gICAgICAgIHRoaXMuX3Rhc2tzW2lkXSA9IHRhc2s7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXRUYXNrQnlJZCByZXR1cm5zIGEgdGFzayBzcGVjaWZpZWQgYnkgaWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgXG4gICAgICogQHJldHVybnMge1Rhc2t8bnVsbH1cbiAgICAgKi9cbiAgICBnZXRUYXNrQnlOYW1lKGlkKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Rhc2tzW2lkXSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXNrc1tpZF07XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzY2hlZHVsZSBhbGwgdGhlIHRhc2tzXG4gICAgICogQHJldHVybnMge1NjaGVkdWxlcn1cbiAgICAgKi9cbiAgICBzY2hlZHVsZSgpIHtcblxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl90YXNrcykuZm9yRWFjaChrID0+IHRoaXMuX3Rhc2tzW2tdLnN0YXJ0KCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgU2NoZWR1bGVyKClcbiJdfQ==