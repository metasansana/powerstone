global.messages = {
    kav: ['Your subscription has expired']
};

export default {

    '/users/:user/messages': {
        get: {
            middleware: ['count'],
            view: 'users/messages.html'
        },
        post: {
            pipes: {
                body: 'body'
            },
            action: function(req, res) {
                global.messages[req.params.user] = global.messages[req.params.user] || [];
                global.messages[req.params.user].push(`id:${req.body.id} ${req.body.message}`);
                res.status(201);
                res.send();
            }

        }
    },
    '/users/count': {
        get: 'Users.count()'
    },
    '/users/messages': {
        get: {
            action: 'Users.messages()',
            middleware: ['count']
        }
    }

}
