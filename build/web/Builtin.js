'use strict';

module.exports = {
  showWelcomePage: function showWelcomePage(req, res) {
    res.send('It works!');
  },
  sendCSRFToken: function sendCSRFToken(req, res, next) {

    res.set('x-csrf-token', req.csrfToken());
    res.cookie('x-csrf-token', req.csrfToken());
    res.locals._csrf = req.csrfToken();
    next();
  },
  send404Page: function send404Page(req, res, next) {
    res.status(404).send('404');
  }
};
//# sourceMappingURL=Builtin.js.map