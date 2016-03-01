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

var _Feature2 = require('./Feature');

var _Feature3 = _interopRequireDefault(_Feature2);

var _usrEvents = require('../usr/events');

var _usrEvents2 = _interopRequireDefault(_usrEvents);

/**
 * PipesFeature installs middleware for the pipes framework
 * on a route.
 */

var PipesFeature = (function (_Feature) {
    _inherits(PipesFeature, _Feature);

    function PipesFeature() {
        _classCallCheck(this, PipesFeature);

        _get(Object.getPrototypeOf(PipesFeature.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(PipesFeature, [{
        key: 'install',
        value: function install(method, path, definition, q) {
            var _this = this;

            var p;
            var spec;
            var pipe;
            var selection;

            if (typeof definition.pipes !== 'object') return;

            Object.keys(definition.pipes).forEach(function (request_property) {

                selection = definition.pipes[request_property];

                spec = typeof selection === 'object' ? selection : _this.application.framework.pipes.defines[selection];

                if (!spec) throw new Error('Unknown pipe selection \'' + selection + '\' ' + ('decleared for property \'' + request_property + '\'!'));

                p = new _pipeTransformPipe2['default'](spec, _this.application.framework.pipes.filters);

                q.enque(method, function (req, res, next) {

                    p.run(req[request_property], function (err, o) {

                        if (err) return _usrEvents2['default'].emit('pipe-error', err, req, res, next);

                        req[request_property] = o;
                        next();
                    }, {
                        request: req,
                        response: res
                    });
                });
            });
        }
    }]);

    return PipesFeature;
})(_Feature3['default']);

exports['default'] = PipesFeature;
module.exports = exports['default'];
//# sourceMappingURL=PipesFeature.js.map