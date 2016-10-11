
/**
 * Count
 */
class Count {

    apply(req, res, next) {

global.requests = global.requests + 1;
    next();

    }

}

export default Count
