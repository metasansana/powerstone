export default function count(req, res, next, route) {
    global.requests = global.requests + 1;
    next();
}
