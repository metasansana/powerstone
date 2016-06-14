'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _pipeTransformPipeFeature = require('./pipe-transform/PipeFeature');

var _pipeTransformPipeFeature2 = _interopRequireDefault(_pipeTransformPipeFeature);

var _MiddlewareFeature = require('./MiddlewareFeature');

var _MiddlewareFeature2 = _interopRequireDefault(_MiddlewareFeature);

var _ActionFeature = require('./ActionFeature');

var _ActionFeature2 = _interopRequireDefault(_ActionFeature);

var _ActionDefinitionFeature = require('./ActionDefinitionFeature');

var _ActionDefinitionFeature2 = _interopRequireDefault(_ActionDefinitionFeature);

var _HandlerFeature = require('./HandlerFeature');

var _HandlerFeature2 = _interopRequireDefault(_HandlerFeature);

var _ViewFeature = require('./ViewFeature');

var _ViewFeature2 = _interopRequireDefault(_ViewFeature);

var _Decorator = require('./Decorator');

var _Decorator2 = _interopRequireDefault(_Decorator);

/**
 * FeatureFactory 
 */

var FeatureFactory = (function () {
    function FeatureFactory() {
        _classCallCheck(this, FeatureFactory);
    }

    _createClass(FeatureFactory, [{
        key: 'api',
        value: function api(app) {

            return new _Decorator2['default'](new _pipeTransformPipeFeature2['default'](app), new _Decorator2['default'](new _MiddlewareFeature2['default'](app), new _Decorator2['default'](new _HandlerFeature2['default'](app), new _Decorator2['default'](new _ActionFeature2['default'](app), new _ActionDefinitionFeature2['default'](app)))));
        }
    }, {
        key: 'web',
        value: function web(app) {

            return new _Decorator2['default'](new _pipeTransformPipeFeature2['default'](app), new _Decorator2['default'](new _MiddlewareFeature2['default'](app), new _Decorator2['default'](new _HandlerFeature2['default'](app), new _Decorator2['default'](new _ActionFeature2['default'](app), new _Decorator2['default'](new _ActionDefinitionFeature2['default'](app), new _ViewFeature2['default'](app))))));
        }
    }]);

    return FeatureFactory;
})();

exports['default'] = new FeatureFactory();
module.exports = exports['default'];
//# sourceMappingURL=FeatureFactory.js.map