import restify from 'restify';

/**
 * ParserFilter 
 * @implements {Filter}
 */
class ParserFilter {

    apply(app, config) {

        app.use(restify.bodyParser(config.read('power.filters.parser.body', {mapParams:false})));
        app.use(restify.queryParser({mapParams:false}));
 
    }

}

export default new ParserFilter()
