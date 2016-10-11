export default {
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
