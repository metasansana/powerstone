'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _commonResults = require('../common/Results');

var _commonResults2 = _interopRequireDefault(_commonResults);

var Controller = (function (_Results) {
    _inherits(Controller, _Results);

    function Controller() {
        _classCallCheck(this, Controller);

        _get(Object.getPrototypeOf(Controller.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Controller, [{
        key: 'send',
        value: function send(status, body) {

            this.response.send(status, body);
        }
    }]);

    return Controller;
})(_commonResults2['default']);

exports['default'] = Controller;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzZCQUFvQixtQkFBbUI7Ozs7SUFFakMsVUFBVTtjQUFWLFVBQVU7O2FBQVYsVUFBVTs4QkFBVixVQUFVOzttQ0FBVixVQUFVOzs7aUJBQVYsVUFBVTs7ZUFFUixjQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7O0FBRWYsZ0JBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUVwQzs7O1dBTkMsVUFBVTs7O3FCQVVELFVBQVUiLCJmaWxlIjoiQ29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXN1bHRzIGZyb20gJy4uL2NvbW1vbi9SZXN1bHRzJztcblxuY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIFJlc3VsdHMge1xuXG4gICAgc2VuZChzdGF0dXMsIGJvZHkpIHtcblxuICAgICAgICB0aGlzLnJlc3BvbnNlLnNlbmQoc3RhdHVzLCBib2R5KTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyXG4iXX0=