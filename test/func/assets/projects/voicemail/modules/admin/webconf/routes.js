export default {

    '/controls': {
        view: 'controls.html'
    },
    '/panel': {
        get: {
middleware: ['admin.flag', 'admin_demo.register'],
            handler: function(req, res) {
                res.status(403);
                res.send();
            }
        }
    }
};
