//TODO Someday we will parse the action string with arguments and all, until then,
//bare with me.
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function resolveAction(action, controllers) {

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

    return Controller;
}
/**
 * ControllerAction configures handlers for controllers.
 */

var ControllerAction = (function () {
    function ControllerAction(controllers) {
        _classCallCheck(this, ControllerAction);

        this._controllers = controllers;
    }

    _createClass(ControllerAction, [{
        key: 'create',
        value: function create(method, path, route) {

            if (typeof route.action === 'string') return resolveAction(route.action, this._controllers);

            if (typeof route.action === 'function') return route.action;
        }
    }]);

    return ControllerAction;
})();

exports['default'] = ControllerAction;
module.exports = exports['default'];
//# sourceMappingURL=ControllerAction.js.map