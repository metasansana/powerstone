import restify from 'restify';

/**
 * QueryParser 
 * @implements {Filter}
 */
class QueryParser {

    filter(app, conifg) {
        app.use(restify.queryParser());
    }

}

export default new QueryParser()
