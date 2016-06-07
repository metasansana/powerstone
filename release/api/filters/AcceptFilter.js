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
 * AcceptParser 
 * @implements {Filter}
 */

var AcceptParser = (function () {
    function AcceptParser() {
        _classCallCheck(this, AcceptParser);
    }

    _createClass(AcceptParser, [{
        key: 'filter',
        value: function filter(app, config) {
            app.use(_restify2['default'].acceptParser(app.acceptable));
        }
    }]);

    return AcceptParser;
})();

exports['default'] = new AcceptParser();
module.exports = exports['default'];
//# sourceMappingURL=AcceptFilter.js.map