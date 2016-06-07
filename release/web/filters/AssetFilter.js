'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveIndex = require('serve-index');

var _serveIndex2 = _interopRequireDefault(_serveIndex);

/**
 * AssetFilter 
 * @implements {Filter}
 */

var AssetFilter = (function () {
    function AssetFilter() {
        _classCallCheck(this, AssetFilter);
    }

    _createClass(AssetFilter, [{
        key: 'apply',
        value: function apply(app, config) {

            config.read(config.keys.FILTERS_ASSET_PATHS, [config.paths['public']]).forEach(function (path) {
                return app.use(_express2['default']['static'](path, config.read(config.keys.FILTERS_ASSET_PATH_OPTIONS, null)));
            });

            config.read(config.keys.FILTERS.ASSET_DIRECTORY, []).forEach(function (path) {
                return app.use((0, _serveIndex2['default'])(path, config.read(config.keys.FILTERS_ASSET_DIRECTORY_OPTIONS, null)));
            });
        }
    }]);

    return AssetFilter;
})();

exports['default'] = new AssetFilter();
module.exports = exports['default'];
//# sourceMappingURL=AssetFilter.js.map