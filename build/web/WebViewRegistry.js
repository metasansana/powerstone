'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

/**
 * ViewRegistry
 */
var WebViewRegistry = {

    engines: {},

    set: function set(name, provider) {
        this.engines[name] = provider;
    },

    get: function get(name) {
        if (!this.engines.hasOwnProperty(name)) throw new Error('Unknown view engine "' + name + '"! Did you register it with WebViewRegistry?');
        return this.engines[name];
    }

};

WebViewRegistry.set('nunjucks', function (app, config, loader, project) {

    _nunjucks2['default'].configure(loader.getPath() + '/' + config.readWithDefaults('views', 'views'), config.readAndMerge('view_options', {
        autoescape: true,
        express: app
    }));

    var opts = config.readWithDefaults('nunjucks', { filters: [], extensions: [], globals: [] });
});

WebViewRegistry.set('none', function (app, config, project) {});

exports['default'] = WebViewRegistry;
module.exports = exports['default'];
//# sourceMappingURL=WebViewRegistry.js.map