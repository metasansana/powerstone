module.exports = {
	showWelcomePage: function (req, res) {
		res.send('It works!');
	},
	sendCSRFToken: function (req, res, next) {

        res.set('x-csrf-token', req.csrfToken());
        res.cookie('x-csrf-token', req.csrfToken());
        res.locals._csrf = req.csrfToken();
        next();
    },
    send404Page: function (req, res, next) {
        res.status(404).send('404');
    }
}
