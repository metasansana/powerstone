'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _UnknownResourceLookupError = require('./UnknownResourceLookupError');

var _UnknownResourceLookupError2 = _interopRequireDefault(_UnknownResourceLookupError);

/**
 * BulkLookup provides an api that lets client code determine which
 * lookup to invoke to locate a piece of code we want to utilize.
 *
 * It works by utilizing a URL like string where the scheme tells us what 
 * lookup to use.
 * Example:
 * ```javascript
 *  
 *   'require://path-to-file-to-require'
 *
 * ```
 * @param {ResourceLookup} lookup The default lookup to use if nothing else matches.
 * @implements {ResourceLookup}
 */

var BulkLookup = (function () {
    function BulkLookup(lookup) {
        _classCallCheck(this, BulkLookup);

        this._default = lookup;
        this._lookups = {};
    }

    /**
     * add a lookup to the internal list
     * @param {string} name 
     * @param {ResourceLookup} lookup
     */

    _createClass(BulkLookup, [{
        key: 'add',
        value: function add(name, lookup) {

            this._lookups[name] = lookup;
            return this;
        }
    }, {
        key: 'lookup',
        value: function lookup(path) {

            var parts = path.split('://');
            var scheme = parts[0];
            var lookup = null;

            if (parts.length === 1) lookup = this._default;

            lookup = this._lookups[scheme];

            if (!lookup) throw new _UnknownResourceLookupError2['default'](scheme, parts[1]);

            return lookup.lookup(parts[1]);
        }
    }]);

    return BulkLookup;
})();

exports['default'] = BulkLookup;
module.exports = exports['default'];
//# sourceMappingURL=BulkLookup.js.map