'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pipeTransformPipe = require('pipe-transform/Pipe');

var _pipeTransformPipe2 = _interopRequireDefault(_pipeTransformPipe);

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

var _usrEvents = require('../../usr/events');

var _usrEvents2 = _interopRequireDefault(_usrEvents);

var _mvcController = require('../../mvc/Controller');

var _mvcController2 = _interopRequireDefault(_mvcController);

var PipeController = (function (_Controller) {
    _inherits(PipeController, _Controller);

    function PipeController() {
        _classCallCheck(this, PipeController);

        _get(Object.getPrototypeOf(PipeController.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(PipeController, [{
        key: 'filter',

        /**
         * filter applies the filters of a pipe associated with this controller
         * @param {string} prop 
         * @param {object} definition 
         * @param {function} next Called only if the filter is successful
         */
        value: function filter(prop, definition, next) {
            var _this = this;

            var p;
            var spec;
            var pipe;
            var selection;

            selection = definition.pipes[prop];

            spec = typeof selection === 'object' ? selection : this.app.framework.pipes.defines[selection];

            if (!spec) throw new Error('Unknown pipe selection \'' + selection + '\' ' + ('decleared for property \'' + prop + '\'!'));

            p = new _pipeTransformPipe2['default'](spec, this.app.framework.pipes.filters);

            p.run(_propertySeek2['default'].get(this.request, prop), function (err, o) {

                if (err) return _usrEvents2['default'].emit('pipe-error', err, _this.request, _this.response, next);

                _propertySeek2['default'].set(_this.request, prop, o);
                next();
            }, this);
        }
    }]);

    return PipeController;
})(_mvcController2['default']);

exports['default'] = PipeController;
module.exports = exports['default'];
//# sourceMappingURL=PipeController.js.map