export const routes = {
    '/controls': {
        get: {
            action: function(req, res) {
                res.send(200);
            }
        }
    },
    '/panel': {
        get: {
            middleware: ['flag', 'demo_register'],
            action: function(req, res) {
                res.send(403);
            }
        }
    }
};
