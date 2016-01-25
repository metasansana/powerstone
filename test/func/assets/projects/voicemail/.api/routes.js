global.messages = {
    kav: ['Your subscription has expired']
};

export default  {

    '/users/:user/messages': {
        get: {
            middleware: ['count'],
            action: function(req, res) {
                res.send(global.messages[req.params.user]);
            }
        },
        post: {
            pipes: {
                body: {
                    id: ['double', 'double', 'double'],
                    message: ['string']
                }
            },
            action: function(req, res) {
                global.messages[req.params.user] = global.messages[req.params.user] || [];
                global.messages[req.params.user].push(`id:${req.body.id} ${req.body.message}`);
                res.send(201);
            }

        }
    },
    '/users/count': {
        get: 'Users.count'
    },
    '/users/messages': {
        get: {
            action: 'Users.messages',
            middleware: ['count']
        }
    }

};
