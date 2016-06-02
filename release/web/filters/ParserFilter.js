'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

/**
 * ParserFilter 
 * @implements {Filter}
 * TODO multipart/form-data support
 */

var ParserFilter = (function () {
    function ParserFilter() {
        _classCallCheck(this, ParserFilter);
    }

    _createClass(ParserFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            if (config.read(config.keys.FILTERS_PARSER_JSON_ENABLED, true)) app.use(_bodyParser2['default'].json(config.keys.FILTERS_PARSER_JSON_OPTIONS, null));

            if (config.read(config.keys.FILTERS_PARSER_URLENCODED_ENABLED, true)) app.use(_bodyParser2['default'].urlencoded(config.read(config.keys.FILTERS_PARSER_URLENCODED_OPTIONS, {
                extended: true
            })));

            if (config.read(config.keys.FILTERS_PARSER_RAW_ENABLED, false)) app.use(_bodyParser2['default'].raw(config.keys.FILTERS_PARSER_RAW_OPTIONS, null));

            if (config.read(config.keys.FILTERS_PARSER_TEXT_ENABLED, false)) app.use(_bodyParser2['default'].text(config.keys.FILTERS_PARSER_TEXT_OPTIONS, null));
        }
    }]);

    return ParserFilter;
})();

exports['default'] = new ParserFilter();
module.exports = exports['default'];
//# sourceMappingURL=ParserFilter.js.map