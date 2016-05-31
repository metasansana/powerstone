'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _UnknownResourceError = require('./UnknownResourceError');

var _UnknownResourceError2 = _interopRequireDefault(_UnknownResourceError);

/**
 * SmartResourceDelegate provides an api that lets client code determine which
 * ResourceDelegate to invoke to locate a piece of code we want to utilize.
 *
 * It works by utilizing a URL like string where the scheme tells us what 
 * delegate to use.
 * Example:
 * ```javascript
 *  
 *   'require://path-to-file-to-require'
 *
 * ```
 * @param {ResourceDelegate} delegate The default ResourceDelegate to use if nothing else matches.
 * @implements {ResourceDelegate}
 */

var SmartResourceDelegate = (function () {
    function SmartResourceDelegate(delegate) {
        _classCallCheck(this, SmartResourceDelegate);

        this._default = delegate;
        this._delegates = {};
    }

    /**
     * add a delegate to the internal list
     * @param {string} name 
     * @param {ResourceDelegate} delegate
     */

    _createClass(SmartResourceDelegate, [{
        key: 'add',
        value: function add(name, delegate) {

            this._delegates[name] = delegate;
            return this;
        }
    }, {
        key: 'resolve',
        value: function resolve(path) {

            if (!path) throw new TypeError('Value supplied for resource string is invalid!');

            var parts = path.split('://');
            var scheme = parts[0];
            var delegate = null;

            if (parts.length === 1) {
                delegate = this._default;
                path = parts[0];
            } else {
                delegate = this._delegates[scheme];
                parth = parts[1];
            }

            if (!delegate) throw new _UnknownResourceError2['default'](scheme, path);

            return delegate.resolve(path);
        }
    }, {
        key: 'lookup',
        value: function lookup(path) {

            if (!path) throw new TypeError('Value supplied for resource string is invalid or empty!');

            var parts = path.split('://');
            var scheme = parts[0];
            var delegate = null;

            if (parts.length === 1) {
                delegate = this._default;
                path = parts[0];
            } else {
                delegate = this._delegates[scheme];
                parth = parts[1];
            }

            if (!delegate) throw new _UnknownResourceError2['default'](scheme, path);

            return delegate.lookup(path);
        }
    }]);

    return SmartResourceDelegate;
})();

exports['default'] = SmartResourceDelegate;
module.exports = exports['default'];
//# sourceMappingURL=SmartResourceDelegate.js.map