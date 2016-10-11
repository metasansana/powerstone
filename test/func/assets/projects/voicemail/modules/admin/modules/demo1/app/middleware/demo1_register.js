
/**
 * Demo1Register
 */
class Demo1Register {

    apply(req, res, next) {

    global.ADMIN_DEMO = true;
    next();

    }

}

export default Demo1Register
