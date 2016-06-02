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
 * ParserFilter 
 * @implements {Filter}
 */

var ParserFilter = (function () {
    function ParserFilter() {
        _classCallCheck(this, ParserFilter);
    }

    _createClass(ParserFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            app.use(_restify2['default'].bodyParser(config.read('power.filters.parser.body', { mapParams: false })));
            app.use(_restify2['default'].queryParser({ mapParams: false }));
        }
    }]);

    return ParserFilter;
})();

exports['default'] = new ParserFilter();
module.exports = exports['default'];
//# sourceMappingURL=ParserFilter.js.map