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