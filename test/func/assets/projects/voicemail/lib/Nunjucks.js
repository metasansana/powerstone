import nunjucks from 'nunjucks';

/**
 * Nunjucks
 * @implements ViewEngine
 */
class Nunjucks {

    constructor(path) {

        this._env = nunjucks.configure(path, {});

    }

    render(view, context) {

        return this._env.render(view, context);

    }

    static create(module) {

        return new Nunjucks(module.configuration.read(module.configuration.paths.WEB_VIEWS_PATH,
            module.configuration.paths.views));

    }

}

export default Nunjucks
