export default {
    '/controls': {
        get: {
            handler: function(req, res) {
                res.send(200);
            }
        }
    },
    '/panel': {
        get: {
            middleware: ['flag', 'admin_demo.register'],
            handler: function(req, res) {
                res.send(403);
            }
        }
    }
};
