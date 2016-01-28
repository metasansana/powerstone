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
            middleware: ['admin.flag', 'admin_demo.register'],
            handler: function(req, res) {
                res.send(403);
            }
        }
    }
};
