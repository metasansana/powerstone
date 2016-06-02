import restify from 'restify';

/**
 * GzipFilter 
 * @implements {Filter}
 */
class GzipFilter {

  apply(app, config) {

    app.use(restify.gzipResponse());

  }

}

export default new GzipFilter()

