'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _MethodOverrideFilter = require('./MethodOverrideFilter');

var _MethodOverrideFilter2 = _interopRequireDefault(_MethodOverrideFilter);

var _LogFilter = require('./LogFilter');

var _LogFilter2 = _interopRequireDefault(_LogFilter);

var _CookieFilter = require('./CookieFilter');

var _CookieFilter2 = _interopRequireDefault(_CookieFilter);

var _SessionFilter = require('./SessionFilter');

var _SessionFilter2 = _interopRequireDefault(_SessionFilter);

var _CsrfFilter = require('./CsrfFilter');

var _CsrfFilter2 = _interopRequireDefault(_CsrfFilter);

var _ParserFilter = require('./ParserFilter');

var _ParserFilter2 = _interopRequireDefault(_ParserFilter);

var _AssetFilter = require('./AssetFilter');

var _AssetFilter2 = _interopRequireDefault(_AssetFilter);

/**
 * DefaultFilters 
 */

var DefaultFilters = (function () {
    function DefaultFilters() {
        _classCallCheck(this, DefaultFilters);
    }

    _createClass(DefaultFilters, [{
        key: 'apply',
        value: function apply(app, config) {

            _MethodOverrideFilter2['default'].apply(app, config);
            _LogFilter2['default'].apply(app, config);
            _ParserFilter2['default'].apply(app, config);
            _CookieFilter2['default'].apply(app, config);
            _SessionFilter2['default'].apply(app, config);
            _CsrfFilter2['default'].apply(app, config);
            _AssetFilter2['default'].apply(app, config);
        }
    }]);

    return DefaultFilters;
})();

exports['default'] = new DefaultFilters();
module.exports = exports['default'];
//# sourceMappingURL=DefaultFilters.js.map