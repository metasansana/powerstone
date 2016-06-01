'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Feature2 = require('./Feature');

var _Feature3 = _interopRequireDefault(_Feature2);

function resolveAction(action) {

    var split;
    var Controller;
    var path;
    var type;
    var is_call = function is_call(str) {

        str = str || '';

        if (str.indexOf('(') > -1) if (str.indexOf(')') > -1) return true;
    };

    if (is_call(action)) {
        split = action.slice(0, -2).split('.');
        method = split.pop();
    } else {
        split = action.split('.');
    }

    path = split.join('.');
    Controller = Property.get(controllers, path);
    type = typeof Controller;

    switch (type) {

        case 'function':
            break;

        case 'object':
            break;

        default:
            throw new Error('Controller \'' + path + '\' specified in route file ' + 'must be a constructor or an instance not' + (' \'' + type + '\'!'));

    }
}

/**
 * ActionFeature 
 */

var ActionFeature = (function (_Feature) {
    _inherits(ActionFeature, _Feature);

    function ActionFeature() {
        _classCallCheck(this, ActionFeature);

        _get(Object.getPrototypeOf(ActionFeature.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ActionFeature, [{
        key: 'install',
        value: function install(method, path, definition, q) {

            switch (typeof definition.action) {

                case 'string':
                    q.enque(method, this.application.resolveAction(definition.action, method, definition));
                    break;

                case 'function':
                    q.enque(method, definition.action);
                    break;

                case 'object':
                    q.enque(method, definition.action[method].bind(definition.action));
                    break;

                default:
                    break;
            }
        }
    }]);

    return ActionFeature;
})(_Feature3['default']);

exports['default'] = ActionFeature;
module.exports = exports['default'];
//# sourceMappingURL=ActionFeature.js.map