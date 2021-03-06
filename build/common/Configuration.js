'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

/**
 * Configuration
 */

var Configuration = (function () {
    function Configuration(config, path) {
        _classCallCheck(this, Configuration);

        this.config = config;
        this.path = path;
    }

    _createClass(Configuration, [{
        key: 'read',
        value: function read(key) {
            return _propertySeek2['default'].get(this.config, key);
        }
    }, {
        key: 'readWithDefaults',
        value: function readWithDefaults(key, defaults) {
            var ret = _propertySeek2['default'].get(this.config, key);
            if (ret) return ret;
            return defaults;
        }
    }, {
        key: 'readAndMerge',
        value: function readAndMerge(key, target, defaults) {
            var ret = this.readWithDefaults(key, defaults);
            return (0, _deepmerge2['default'])(target, ret);
        }
    }]);

    return Configuration;
})();

exports['default'] = Configuration;
module.exports = exports['default'];
//# sourceMappingURL=Configuration.js.map