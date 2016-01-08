'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

/**
 * Plugins is a store for plugins that you can use with restify.
 *
 */

var Plugins = (function () {
  function Plugins() {
    _classCallCheck(this, Plugins);

    this.plugins = {};
  }

  /**
   * @callback provider
   * @param {restify.Server} server
   * @param {Configuration} config
   * @param {Loader} loader
   * @param {Project} project
   *
   * set a provider
   * @param {string} name
   * @param {function} provider
   */

  _createClass(Plugins, [{
    key: 'set',
    value: function set(name, provider) {
      this.plugins[name] = provider;
      return this;
    }

    /**
     * get returns a previously stored provider
     * @param  {string} name
     */
  }, {
    key: 'get',
    value: function get(name) {
      if (!this.plugins.hasOwnProperty(name)) throw new Error('Unknown restify plugin "' + name + '"!');
      return this.plugins[name];
    }
  }]);

  return Plugins;
})();

exports['default'] = new Plugins();
module.exports = exports['default'];
//# sourceMappingURL=Plugins.js.map