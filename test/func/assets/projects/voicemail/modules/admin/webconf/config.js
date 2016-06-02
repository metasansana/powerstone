import nunjucks from 'nunjucks';

export default {
    'power.web.views.engine': function(app, config) {
        nunjucks.configure(config.read(config.paths.WEB_VIEWS_PATH, config.paths.views), {
            express: app
        });
    },
    'power.connections': {
        admin: {
            connector: 'fake',
            options: {}
        }
    },
    'power.modules': ['demo', 'demo1']
};
