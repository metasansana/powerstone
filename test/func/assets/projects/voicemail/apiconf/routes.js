global.messages = {
    kav: ['Your subscription has expired']
};

export default {

    '/users/:user/messages': {
        get: {
            middleware: ['middleware/count'],
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
            action: {
                controller: 'Users',
                method: 'count'
            }
        }
    },
    '/users/messages': {
        get: {
            middleware: ['middleware/count'],
            action: {
                controller: 'controllers/User',
                method: 'messages'
            }
        }
    }

};
