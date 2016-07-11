export default function(req, res, next) {
    global.ADMIN_DEMO = true;
    next();

}
