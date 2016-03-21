/**
 * Results provides helper methods for http responses. 
 * @param {Request} request
 * @param {Response} response
 * @param {Application} app 
 * @param {object} route
 *
 * @property {Request} request - The Request object
 * @property {Response} response - The Response object
 * @property {Application} app - The Application being run
 * @property {object} route - The route definition that activate this code
 *
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Results = (function () {
    function Results(request, response, app, route) {
        _classCallCheck(this, Results);

        this.request = request;
        this.response = response;
        this.app = app;
        this.route = route;
    }

    _createClass(Results, [{
        key: "success",
        value: function success() {

            this.send(200);
        }
    }, {
        key: "accepted",
        value: function accepted() {

            this.send(204);
        }
    }, {
        key: "created",
        value: function created(body) {

            this.send(201, body);
        }
    }, {
        key: "badRequest",
        value: function badRequest(body) {

            this.send(400, body);
        }
    }, {
        key: "forbidden",
        value: function forbidden(body) {

            this.send(403, body);
        }
    }, {
        key: "notFound",
        value: function notFound(body) {

            this.send(404, body);
        }
    }, {
        key: "conflict",
        value: function conflict(body) {

            this.send(409, body);
        }
    }, {
        key: "internalError",
        value: function internalError(err) {

            this.send(500);
        }
    }]);

    return Results;
})();

exports["default"] = Results;
module.exports = exports["default"];
//# sourceMappingURL=Results.js.map