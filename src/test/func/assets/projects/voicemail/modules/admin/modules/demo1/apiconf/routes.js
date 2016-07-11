export default {

    '/': {

        get: {
            middleware: ['flag'],
            action: function(req, res) {
                res.send(200);
            }
        }

    }

}
