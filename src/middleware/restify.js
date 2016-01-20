import restify from 'restify';

export function query_parser(server, app, module) {
    server.use(restify.queryParser());
}

export function accept_parser(server, app, module) {
    server.use(restify.acceptParser(server.acceptable));
}

export function body_parser(server, app, module) {
    server.use(restify.bodyParser({mapParams:false}));
}
