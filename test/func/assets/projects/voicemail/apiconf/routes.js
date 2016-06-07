global.messages = {
    kav: ['Your subscription has expired']
};

export const routes =  {

    '/users/:user/messages': {
        get: {
            middleware: ['count'],
            action: function(req, res) {
                res.send(global.messages[req.params.user]);
            }
        },
        post: {
            action: function(req, res) {
                global.messages[req.params.user] = global.messages[req.params.user] || [];
                global.messages[req.params.user].push(`id:${req.body.id} ${req.body.message}`);
                res.send(201);
            }

        }
    },
    '/users/count': {
        get: {
            action: 'Users.count()'
        }
    },
    '/users/messages': {
        get: {
            middleware: ['count'],
            action: 'Users.messages()'
        }
    }

};
