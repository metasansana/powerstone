export const routes = {

    '/controls': {
        get: {
            view: 'controls.html'
        }
    },
    '/panel': {
        get: {
            middleware: ['flag', 'demo_register'],
            action: function(req, res) {
                res.status(403);
                res.send();
            }
        }
    }
};
