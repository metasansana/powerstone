'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ConsoleRecorder logs the result of a completed tasks to console.
 * @implements Recorder
 */
var ConsoleRecorder = function () {
    function ConsoleRecorder() {
        _classCallCheck(this, ConsoleRecorder);
    }

    _createClass(ConsoleRecorder, [{
        key: 'taskCompleted',
        value: function taskCompleted(report) {
            console.log('\n\n', report, '\n\n');
        }
    }]);

    return ConsoleRecorder;
}();

exports.default = ConsoleRecorder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9Db25zb2xlUmVjb3JkZXIuanMiXSwibmFtZXMiOlsiQ29uc29sZVJlY29yZGVyIiwicmVwb3J0IiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSU1BLGU7Ozs7Ozs7c0NBRVlDLE0sRUFBUTtBQUNsQkMsb0JBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW1CRixNQUFuQixFQUEwQixNQUExQjtBQUNIOzs7Ozs7a0JBSVVELGUiLCJmaWxlIjoiQ29uc29sZVJlY29yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb25zb2xlUmVjb3JkZXIgbG9ncyB0aGUgcmVzdWx0IG9mIGEgY29tcGxldGVkIHRhc2tzIHRvIGNvbnNvbGUuXG4gKiBAaW1wbGVtZW50cyBSZWNvcmRlclxuICovXG5jbGFzcyBDb25zb2xlUmVjb3JkZXIge1xuXG4gICAgdGFza0NvbXBsZXRlZChyZXBvcnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1xcblxcbicscmVwb3J0LCdcXG5cXG4nKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29uc29sZVJlY29yZGVyXG4iXX0=