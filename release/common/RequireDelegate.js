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
 * RequireDelegate locates a resource relative to the path it is
 * created with.
 * @param {string} [path='']
 * @implements {ResourceDelegate}
 */

var RequireDelegate = (function () {
    function RequireDelegate(path) {
        _classCallCheck(this, RequireDelegate);

        this._path = '';

        if (path) this._path = path + '/';
    }

    _createClass(RequireDelegate, [{
        key: 'resolve',
        value: function resolve(path) {

            path = '' + this._path + path;

            return {
                basename: _path2['default'].basename(path, '.js'),
                dirname: _path2['default'].dirname(path),
                path: path,
                module: null
            };
        }
    }, {
        key: 'lookup',
        value: function lookup(path) {

            path = '' + this._path + path;
            return {
                basename: _path2['default'].basename(path, '.js'),
                dirname: _path2['default'].dirname(path),
                path: path,
                module: require(path)
            };
        }
    }]);

    return RequireDelegate;
})();

exports['default'] = RequireDelegate;
module.exports = exports['default'];
//# sourceMappingURL=RequireDelegate.js.map