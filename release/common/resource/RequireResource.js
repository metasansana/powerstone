'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

/**
 * RequireResource locates a resource relative to the path it is
 * created with.
 * @param {string} [path='']
 * @implements {Resource}
 */

var RequireResource = (function () {
    function RequireResource(path) {
        _classCallCheck(this, RequireResource);

        this._path = path ? path : '' + (path + '/');

        if (typeof this._path !== 'string') throw new TypeError('The argument \'path\' must be a string, got \'' + typeof path + '\'!');
    }

    _createClass(RequireResource, [{
        key: 'find',
        value: function find(path) {

            return require('' + this._path + path);
        }
    }]);

    return RequireResource;
})();

exports['default'] = RequireResource;
module.exports = exports['default'];
//# sourceMappingURL=RequireResource.js.map