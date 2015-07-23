'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _tasks = require('./tasks');

var _tasks2 = _interopRequireDefault(_tasks);

/**
 * TaskRecorderRegistryFactory
 */

var TaskRecorders = (function () {
    function TaskRecorders() {
        _classCallCheck(this, TaskRecorders);

        this.recorders = {};
    }

    _createClass(TaskRecorders, [{
        key: 'register',
        value: function register(name, recorder) {
            this.recorders[name] = recorder;
            return this;
        }
    }, {
        key: 'create',
        value: function create(name) {
            if (this.recorders.hasOwnProperty(name)) return this.recorders[name];
            return new _tasks2['default'].ConsoleRecorder();
        }
    }]);

    return TaskRecorders;
})();

exports['default'] = new TaskRecorders();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UYXNrUmVjb3JkZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztxQkFBa0IsU0FBUzs7Ozs7Ozs7SUFLckIsYUFBYTtBQUVKLGFBRlQsYUFBYSxHQUVEOzhCQUZaLGFBQWE7O0FBR1gsWUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7S0FDdkI7O2lCQUpDLGFBQWE7O2VBTVAsa0JBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQztBQUNwQixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7QUFDaEMsbUJBQU8sSUFBSSxDQUFDO1NBQ2Y7OztlQUVLLGdCQUFDLElBQUksRUFBRTtBQUNULGdCQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUN0QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUIsbUJBQU8sSUFBSSxtQkFBTSxlQUFlLEVBQUUsQ0FBQztTQUN0Qzs7O1dBZkMsYUFBYTs7O3FCQWtCSixJQUFJLGFBQWEsRUFBRSIsImZpbGUiOiJUYXNrUmVjb3JkZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRhc2tzIGZyb20gJy4vdGFza3MnO1xuXG4vKipcbiAqIFRhc2tSZWNvcmRlclJlZ2lzdHJ5RmFjdG9yeVxuICovXG5jbGFzcyBUYXNrUmVjb3JkZXJzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlY29yZGVycyA9IHt9O1xuICAgIH1cblxuICAgIHJlZ2lzdGVyKG5hbWUsIHJlY29yZGVyKXtcbiAgICAgICAgdGhpcy5yZWNvcmRlcnNbbmFtZV0gPSByZWNvcmRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY3JlYXRlKG5hbWUpIHtcbiAgICAgICAgaWYodGhpcy5yZWNvcmRlcnMuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgIHJldHVybiB0aGlzLnJlY29yZGVyc1tuYW1lXTtcbiAgICAgICAgcmV0dXJuIG5ldyB0YXNrcy5Db25zb2xlUmVjb3JkZXIoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBUYXNrUmVjb3JkZXJzKCk7Il19