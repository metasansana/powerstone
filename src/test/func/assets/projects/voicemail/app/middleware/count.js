
export default function count(req, res, next) {
    global.requests = global.requests + 1;
    next();
}
