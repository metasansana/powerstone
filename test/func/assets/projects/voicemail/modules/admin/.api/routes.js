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
            middleware: ['admin.flag'],
            handler: function(req, res) {
                res.send(403);
            }
        }
    }
};
