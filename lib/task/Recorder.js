/**
 * Recorder provides an interface for recording the result of a task.
 * @interface
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recorder = (function () {
  function Recorder() {
    _classCallCheck(this, Recorder);
  }

  _createClass(Recorder, [{
    key: "taskCompleted",

    /**
     * taskCompleted is called by the Report when the task is completed.
     * @param {Object} report
     */
    value: function taskCompleted(report) {}
  }]);

  return Recorder;
})();

exports["default"] = Recorder;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL1JlY29yZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBSU0sUUFBUTtXQUFSLFFBQVE7MEJBQVIsUUFBUTs7O2VBQVIsUUFBUTs7Ozs7OztXQU1HLHVCQUFDLE1BQU0sRUFBQyxFQUFFOzs7U0FOckIsUUFBUTs7O3FCQVVDLFFBQVEiLCJmaWxlIjoiUmVjb3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJlY29yZGVyIHByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgcmVjb3JkaW5nIHRoZSByZXN1bHQgb2YgYSB0YXNrLlxuICogQGludGVyZmFjZVxuICovXG5jbGFzcyBSZWNvcmRlciB7XG5cbiAgICAvKipcbiAgICAgKiB0YXNrQ29tcGxldGVkIGlzIGNhbGxlZCBieSB0aGUgUmVwb3J0IHdoZW4gdGhlIHRhc2sgaXMgY29tcGxldGVkLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXBvcnRcbiAgICAgKi9cbiAgICB0YXNrQ29tcGxldGVkKHJlcG9ydCl7fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlY29yZGVyXG4iXX0=