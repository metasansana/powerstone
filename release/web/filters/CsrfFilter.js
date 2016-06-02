'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _csurf = require('csurf');

var _csurf2 = _interopRequireDefault(_csurf);

/**
 * CsrfFilter 
 * @implements {Filter}
 */

var CsrfFilter = (function () {
    function CsrfFilter() {
        _classCallCheck(this, CsrfFilter);
    }

    _createClass(CsrfFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            if (config.read(config.keys.FILTERS_CSRF_ENABLED, false)) {

                app.use((0, _csurf2['default'])(config.read(config.keys.FILTERS_CSRF_OPTIONS, {
                    cookie: true
                })));

                app.use(function send_csrf_token(req, res, next) {

                    res.set('x-csrf-token', req.csrfToken());
                    res.cookie('x-csrf-token', req.csrfToken());
                    res.locals._csrf = req.csrfToken();
                    next();
                });

                //TODO allow client code to hook into this instead of this lame handler
                app.use(function if_csrf_error(err, req, res, next) {

                    if (err.code !== 'EBADCSRFTOKEN') return next(err);
                    res.status(403);
                    res.send('INVALID TOKEN');
                });
            }
        }
    }]);

    return CsrfFilter;
})();

exports['default'] = new CsrfFilter();
module.exports = exports['default'];
//# sourceMappingURL=CsrfFilter.js.map