import restify from 'restify';
/**
 * BodyParser 
 * @implements {Filter}
 */
class BodyParser {

    filter(app, config) {

        app.use(restify.bodyParser({
            mapParams: false
        }));
    }

}
export default new BodyParser()
