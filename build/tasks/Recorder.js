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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9SZWNvcmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUlNLFFBQVE7V0FBUixRQUFROzBCQUFSLFFBQVE7OztlQUFSLFFBQVE7Ozs7Ozs7V0FNRyx1QkFBQyxNQUFNLEVBQUMsRUFBRTs7O1NBTnJCLFFBQVE7OztxQkFVQyxRQUFRIiwiZmlsZSI6IlJlY29yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZWNvcmRlciBwcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIHJlY29yZGluZyB0aGUgcmVzdWx0IG9mIGEgdGFzay5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgUmVjb3JkZXIge1xuXG4gICAgLyoqXG4gICAgICogdGFza0NvbXBsZXRlZCBpcyBjYWxsZWQgYnkgdGhlIFJlcG9ydCB3aGVuIHRoZSB0YXNrIGlzIGNvbXBsZXRlZC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVwb3J0XG4gICAgICovXG4gICAgdGFza0NvbXBsZXRlZChyZXBvcnQpe31cblxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWNvcmRlclxuIl19