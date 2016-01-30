export default function(req, res, next, route) {

    global.ADMIN_DEMO = true;
    next();

}
