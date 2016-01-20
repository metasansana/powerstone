import nunjucks from 'nunjucks';

export default function(app, module) {

    nunjucks.configure(module.loader.path + '/views', {
        express: app
    });

}
