import nunjucks from 'nunjucks';

export default function(app, config) {

    nunjucks.configure(config.read(config.paths.WEB_VIEWS_PATH, config.paths.views), {
        express: app
    });

}
