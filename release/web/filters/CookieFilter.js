'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

/**
 * CookieFilter 
 * @implements {Filter}
 */

var CookieFilter = (function () {
  function CookieFilter() {
    _classCallCheck(this, CookieFilter);
  }

  _createClass(CookieFilter, [{
    key: 'apply',
    value: function apply(app, config) {

      app.use((0, _cookieParser2['default'])(config.read(config.keys.SECRET, config.defaults.SECRET)));
    }
  }]);

  return CookieFilter;
})();

exports['default'] = new CookieFilter();
module.exports = exports['default'];
//# sourceMappingURL=CookieFilter.js.map