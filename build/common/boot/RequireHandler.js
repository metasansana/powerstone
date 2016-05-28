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
 * RequireLookup locates a resource relative to the path it is
 * created with.
 * @param {string} [path='']
 * @implements {ResourceHandler}
 */

var RequireLookup = (function () {
    function RequireLookup(path) {
        _classCallCheck(this, RequireLookup);

        this._path = '';

        if (path) this._path = path + '/';
    }

    _createClass(RequireLookup, [{
        key: 'handle',
        value: function handle(path) {

            return require('' + this._path + path);
        }
    }]);

    return RequireLookup;
})();

exports['default'] = RequireLookup;
module.exports = exports['default'];
//# sourceMappingURL=RequireHandler.js.map