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
        key: "accepted",
        value: function accepted() {
            this.response.status(204).send();
        }
    }, {
        key: "created",
        value: function created(body) {
            this.response.status(201).send(body);
        }
    }, {
        key: "badRequest",
        value: function badRequest(body) {
            this.response.status(400).send(body);
        }
    }, {
        key: "forbidden",
        value: function forbidden(body) {
            this.response.status(403).send(body);
        }
    }, {
        key: "notFound",
        value: function notFound(body) {
            this.response.status(404).send(body);
        }
    }, {
        key: "conflict",
        value: function conflict(body) {
            this.response.status(409).send(body);
        }
    }, {
        key: "internalError",
        value: function internalError() {
            this.response.status(500).send();
        }
    }]);

    return Results;
})();

exports["default"] = Results;
module.exports = exports["default"];
//# sourceMappingURL=Results.js.map