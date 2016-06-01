'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _QueryParser = require('./QueryParser');

var _QueryParser2 = _interopRequireDefault(_QueryParser);

var _BodyParser = require('./BodyParser');

var _BodyParser2 = _interopRequireDefault(_BodyParser);

var _AcceptParser = require('./AcceptParser');

var _AcceptParser2 = _interopRequireDefault(_AcceptParser);

/**
 * DefaultFilters installs the default filters we
 * use for restify. It can be used as a shortcut in composing filter rules.
 */

var DefaultFilters = (function () {
    function DefaultFilters() {
        _classCallCheck(this, DefaultFilters);
    }

    _createClass(DefaultFilters, [{
        key: 'filter',
        value: function filter(app, config) {

            _QueryParser2['default'].filter(app, config);
            _BodyParser2['default'].filter(app, config);
            _AcceptParser2['default'].filter(app, config);
        }
    }]);

    return DefaultFilters;
})();

exports['default'] = new DefaultFilters();
module.exports = exports['default'];
//# sourceMappingURL=DefaultFilters.js.map