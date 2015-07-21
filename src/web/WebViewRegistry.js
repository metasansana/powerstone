import nunjucks from 'nunjucks';

/**
 * ViewRegistry
 */
var WebViewRegistry  = {

    engines: {},

    set(name, provider) {
        this.engines[name] = provider;
    },

    get(name) {
        if(!this.engines.hasOwnProperty(name))
        throw new Error('Unknown view engine "'+name+'"! Did you register it with WebViewRegistry?');
        return this.engines[name];
    }

};

WebViewRegistry.set('nunjucks', function (app, config, project) {

    nunjucks.configure(project.getLoader().getPath() + '/'+
        config.readWithDefaults('views', 'views'),
        config.readAndMerge('view_options', {
        autoescape: true,
        express: app
    }));

});

export default WebViewRegistry