'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

/**
 * SessionFilter 
 * @implements {Filter}
 */

var SessionFilter = (function () {
    function SessionFilter() {
        _classCallCheck(this, SessionFilter);
    }

    _createClass(SessionFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            if (config.read('power.filters.session.enabled', false)) {

                app.use((0, _expressSession2['default'])(config.read('power.filters.session.options', {}, {
                    name: 'CRYINGZANGOLIE',
                    secret: config.read('power.secret', SECRET),
                    resave: false,
                    saveUninitialized: true,
                    store: config.read('power.filters.session.store', null)
                })));
            }
        }
    }]);

    return SessionFilter;
})();

exports['default'] = new SessionFilter();
module.exports = exports['default'];
//# sourceMappingURL=SessionFilter.js.map