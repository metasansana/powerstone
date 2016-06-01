import restify from 'restify';

/**
 * AcceptParser 
 * @implements {Filter}
 */
class AcceptParser {

    filter(app, config) {
        app.use(restify.acceptParser(app.acceptable));
    }

}

export default new AcceptParser()
