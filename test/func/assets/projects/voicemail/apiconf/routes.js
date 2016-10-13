global.messages = {
    kav: ['Your subscription has expired']
};

export default {

    '/users/:user/messages': {
        get: {
            middleware: 'count',
            action: 'Users.sendUser()'
        },
        post: {
            action: 'Users.createMessage()'
        }
    },
    '/users/count': {
        get: {
            action: 'Users.count()'
        }
    },
    '/users/messages': {
        get: {
            middleware: 'count',
            action: 'Users.messages()',
            output: ['module://lib/Status', 'module://lib/PoweredBy']
        }
    },
    '/error': {

        get: { action: 'Users.error()' }

    }



};
