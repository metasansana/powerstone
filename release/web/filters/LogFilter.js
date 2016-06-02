'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

/**
 * LogFilter 
 * @implements {Filter}
 */

var LogFilter = (function () {
    function LogFilter() {
        _classCallCheck(this, LogFilter);
    }

    _createClass(LogFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            if (config.read(config.keys.FILTERS_LOG_ENABLED, true)) app.use((0, _morgan2['default'])(config.read(config.keys.FILTERS_LOG_FORMAT, 'dev'), config.read(config.keys.FILTERS_LOG_OPTIONS, {})));
        }
    }]);

    return LogFilter;
})();

exports['default'] = new LogFilter();
module.exports = exports['default'];
//# sourceMappingURL=LogFilter.js.map