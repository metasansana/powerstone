'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _UnknownHandlerError = require('./UnknownHandlerError');

var _UnknownHandlerError2 = _interopRequireDefault(_UnknownHandlerError);

/**
 * Handler is an interface used to locate code resources.
 * @interface
 *
 */

var ResourceHandler = (function () {
    function ResourceHandler() {
        _classCallCheck(this, ResourceHandler);
    }

    /**
     * Lookup provides an api that lets client code determine which
     * handler to invoke to locate a piece of code we want to utilize.
     *
     * It works by utilizing a URL like string where the scheme tells us what 
     * handler to use.
     * Example:
     * ```javascript
     *  
     *   'require://path-to-file-to-require'
     *
     * ```
     * @param {string} scheme The scheme for the default handler
     * @param {ResourceHandler} handler The default handler to use if nothing else matches.
     * @implements {ResourceHandler}
     */

    _createClass(ResourceHandler, [{
        key: 'handle',

        /**
         * handle looking up of a particular resource
         * @param {string} path A string that tells us how to find the resource
         * @returns {*}
         */
        value: function handle(path) {}
    }]);

    return ResourceHandler;
})();

var Lookup = (function () {
    function Lookup(scheme, handler) {
        _classCallCheck(this, Lookup);

        this._defaultScheme = scheme;
        this._handlers = {};
        this._handlers[scheme] = handler;
    }

    /**
     * add a handler to the internal list
     * @param {string} name 
     * @param {ResourceHandler} handler
     */

    _createClass(Lookup, [{
        key: 'add',
        value: function add(name, handler) {

            this._handlers[name] = handler;
            return this;
        }
    }, {
        key: 'handle',
        value: function handle(path) {

            var parts = path.split('://');
            var handler = parts[0];

            if (parts.length === 1) handler = this._defaultScheme;

            if (!this._handlers.hasOwnProperty(handler)) throw new _UnknownHandlerError2['default'](handler, parts[1]);

            return this._handlers[handler].handle(parts[1]);
        }
    }]);

    return Lookup;
})();

exports['default'] = Lookup;
module.exports = exports['default'];
//# sourceMappingURL=Lookup.js.map