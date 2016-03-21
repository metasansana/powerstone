'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.query_parser = query_parser;
exports.accept_parser = accept_parser;
exports.body_parser = body_parser;
exports.authorization = authorization;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

function query_parser(server, app, module) {
    server.use(_restify2['default'].queryParser());
}

function accept_parser(server, app, module) {
    server.use(_restify2['default'].acceptParser(server.acceptable));
}

function body_parser(server, app, module) {
    server.use(_restify2['default'].bodyParser({
        mapParams: false
    }));
}

function authorization(server, app, module) {
    server.use(_restify2['default'].authorizationParser());
}
//# sourceMappingURL=restify.js.map