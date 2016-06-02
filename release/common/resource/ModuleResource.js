'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Configuration = require('../Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

/**
 * ModuleResource looks up a resource by querying an object.
 * @implements {Resource}
 * @param {Module} parent 
 */

var ModuleResource = (function () {
    function ModuleResource(parent) {
        _classCallCheck(this, ModuleResource);

        this._parent = parent;
    }

    _createClass(ModuleResource, [{
        key: 'find',
        value: function find(path) {

            return new this._parent.constructor(path, new _Configuration2['default'](this._parent.configDirectory, this._parent.configuration.paths.modules + '/' + path), this._parent.context, this._parent.application);
        }
    }]);

    return ModuleResource;
})();

exports['default'] = ModuleResource;
module.exports = exports['default'];
//# sourceMappingURL=ModuleResource.js.map