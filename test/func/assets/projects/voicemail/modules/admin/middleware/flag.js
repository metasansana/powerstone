export default function flag(req, res, next) {
global.flag = 'set';
next();
}
