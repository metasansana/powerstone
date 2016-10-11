
/**
 * Flag
 */
class Flag {

apply(req, res, next) {
    global.flag = 'set';
    next();
}
}

export default Flag
