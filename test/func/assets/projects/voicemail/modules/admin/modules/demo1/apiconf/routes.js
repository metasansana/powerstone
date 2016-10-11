export default {

    '/': {

        get: {
            middleware: 'flag',
            action: 'Users.ok()'
        }

    }

}
