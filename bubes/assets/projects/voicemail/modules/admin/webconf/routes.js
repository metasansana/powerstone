'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    '/controls': {
        get: {
            view: 'controls.html'
        }
    },
    '/panel': {
        get: {
            middleware: 'flag,demo_register',
            action: 'Users.nok()'
        }
    }
};