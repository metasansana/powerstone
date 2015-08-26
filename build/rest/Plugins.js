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

  _createClass(Plugins, [{
    key: 'set',

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
    value: function set(name, provider) {
      this.plugins[name] = provider;
      return this;
    }
  }, {
    key: 'get',

    /**
     * get returns a previously stored provider
     * @param  {string} name
     */
    value: function get(name) {
      if (!this.plugins.hasOwnProperty(name)) throw new Error('Unknown restify plugin "' + name + '"!');
      return this.plugins[name];
    }
  }]);

  return Plugins;
})();

exports['default'] = new Plugins();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXN0L1BsdWdpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3VCQUFvQixTQUFTOzs7Ozs7Ozs7SUFNdEIsT0FBTztBQUVELFdBRk4sT0FBTyxHQUVFOzBCQUZULE9BQU87O0FBR1YsUUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7R0FDbkI7O2VBSkksT0FBTzs7Ozs7Ozs7Ozs7Ozs7V0FpQlIsYUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ25CLFVBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO0FBQzlCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7O1dBTUcsYUFBQyxJQUFJLEVBQUU7QUFDVCxVQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzVELGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjs7O1NBOUJJLE9BQU87OztxQkFpQ0MsSUFBSSxPQUFPLEVBQUUiLCJmaWxlIjoiUGx1Z2lucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXN0aWZ5IGZyb20gJ3Jlc3RpZnknO1xuXG4vKipcbiAqIFBsdWdpbnMgaXMgYSBzdG9yZSBmb3IgcGx1Z2lucyB0aGF0IHlvdSBjYW4gdXNlIHdpdGggcmVzdGlmeS5cbiAqXG4gKi9cbiBjbGFzcyBQbHVnaW5zIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBsdWdpbnMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAY2FsbGJhY2sgcHJvdmlkZXJcbiAgICogQHBhcmFtIHtyZXN0aWZ5LlNlcnZlcn0gc2VydmVyXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdGlvbn0gY29uZmlnXG4gICAqIEBwYXJhbSB7TG9hZGVyfSBsb2FkZXJcbiAgICogQHBhcmFtIHtQcm9qZWN0fSBwcm9qZWN0XG4gICAqXG4gICAqIHNldCBhIHByb3ZpZGVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb3ZpZGVyXG4gICAqL1xuICAgc2V0KG5hbWUsIHByb3ZpZGVyKSB7XG4gICAgdGhpcy5wbHVnaW5zW25hbWVdID0gcHJvdmlkZXI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHJldHVybnMgYSBwcmV2aW91c2x5IHN0b3JlZCBwcm92aWRlclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IG5hbWVcbiAgICovXG4gICBnZXQobmFtZSkge1xuICAgIGlmICghdGhpcy5wbHVnaW5zLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHJlc3RpZnkgcGx1Z2luIFwiJyArIG5hbWUgKyAnXCIhJyk7XG4gICAgcmV0dXJuIHRoaXMucGx1Z2luc1tuYW1lXTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUGx1Z2lucygpXG4iXX0=