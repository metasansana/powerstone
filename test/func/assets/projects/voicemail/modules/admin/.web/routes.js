export default {

    '/controls': {
        view: 'controls.html'
    },
    '/panel': {
        get: {
            middleware: ['admin.flag'],
            handler: function(req, res) {
                res.status(403);
                res.send();
            }
        }
    }
};
