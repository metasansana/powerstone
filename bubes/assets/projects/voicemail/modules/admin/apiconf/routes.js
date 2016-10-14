'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    '/controls': {
        get: {
            action: 'Users.ok()'
        }
    },
    '/panel': {
        get: {
            middleware: 'flag,demo_register',
            action: 'Users.nok()'
        }
    }

};