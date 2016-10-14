'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Nunjucks
 * @implements ViewEngine
 */
var Nunjucks = function () {
    function Nunjucks(path) {
        _classCallCheck(this, Nunjucks);

        this._env = _nunjucks2.default.configure(path, {});
    }

    _createClass(Nunjucks, [{
        key: 'render',
        value: function render(view, context) {

            return this._env.render(view, context);
        }
    }], [{
        key: 'create',
        value: function create(module) {

            return new Nunjucks(module.configuration.read(module.configuration.paths.WEB_VIEWS_PATH, module.configuration.paths.views));
        }
    }]);

    return Nunjucks;
}();

exports.default = Nunjucks;