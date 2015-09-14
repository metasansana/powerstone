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
//# sourceMappingURL=Recorder.js.map