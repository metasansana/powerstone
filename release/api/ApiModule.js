'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _CompositeModule = require('./CompositeModule');

var _CompositeModule2 = _interopRequireDefault(_CompositeModule);

var _Configuration = require('./Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

/**
 * Module
 * @param {string} fqn The name of the module prefixed with its parent modules 
 * @param {string} path 
 * @param {Configuration} config 
 * @param {Loader} loader 
 * @param {Application} app 
 */

var Module = (function () {
    function Module() {
        _classCallCheck(this, Module);
    }

    _createClass(Module, [{
        key: '__submodule',
        value: function __submodule(resource, framework, app) {

            var config = new _Configuration2['default']('apiconf.js', resource.path);
            return new WebModule(name, config, express(), app);
        }
    }, {
        key: '__framework',
        value: function __framework() {}
    }]);

    return Module;
})();

exports['default'] = Module;
module.exports = exports['default'];
//# sourceMappingURL=ApiModule.js.map