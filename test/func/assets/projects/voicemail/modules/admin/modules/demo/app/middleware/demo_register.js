
/**
 * DemoRegister
 */
class DemoRegister {

    apply(req, res, next) {

    global.ADMIN_DEMO = true;
    next();

    }

}

export default DemoRegister
