'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

/**
 * MethodOverrideFilter 
 * @implements {Filter}
 */

var MethodOverrideFilter = (function () {
  function MethodOverrideFilter() {
    _classCallCheck(this, MethodOverrideFilter);
  }

  _createClass(MethodOverrideFilter, [{
    key: 'apply',
    value: function apply(app, config) {

      app.use((0, _methodOverride2['default'])());
    }
  }]);

  return MethodOverrideFilter;
})();

exports['default'] = new MethodOverrideFilter();
module.exports = exports['default'];
//# sourceMappingURL=MethodOverrideFilter.js.map