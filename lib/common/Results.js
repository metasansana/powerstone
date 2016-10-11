"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var Results = function () {
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

            this.send(202);
        }
    }, {
        key: "noContent",
        value: function noContent() {

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
}();

exports.default = Results;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vUmVzdWx0cy5qcyJdLCJuYW1lcyI6WyJSZXN1bHRzIiwicmVxdWVzdCIsInJlc3BvbnNlIiwiYXBwIiwicm91dGUiLCJzZW5kIiwiYm9keSIsImVyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7O0lBYU1BLE87QUFFRixxQkFBWUMsT0FBWixFQUFxQkMsUUFBckIsRUFBK0JDLEdBQS9CLEVBQW9DQyxLQUFwQyxFQUEyQztBQUFBOztBQUN2QyxhQUFLSCxPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGFBQUtDLEdBQUwsR0FBV0EsR0FBWDtBQUNBLGFBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNIOzs7O2tDQUVTOztBQUVOLGlCQUFLQyxJQUFMLENBQVUsR0FBVjtBQUVIOzs7bUNBRVU7O0FBRVAsaUJBQUtBLElBQUwsQ0FBVSxHQUFWO0FBRUg7OztvQ0FFVzs7QUFFUixpQkFBS0EsSUFBTCxDQUFVLEdBQVY7QUFFSDs7O2dDQUVPQyxJLEVBQU07O0FBRVYsaUJBQUtELElBQUwsQ0FBVSxHQUFWLEVBQWVDLElBQWY7QUFFSDs7O21DQUVVQSxJLEVBQU07O0FBRWIsaUJBQUtELElBQUwsQ0FBVSxHQUFWLEVBQWVDLElBQWY7QUFFSDs7O2tDQUVTQSxJLEVBQU07O0FBRVosaUJBQUtELElBQUwsQ0FBVSxHQUFWLEVBQWVDLElBQWY7QUFFSDs7O2lDQUVRQSxJLEVBQU07O0FBRVgsaUJBQUtELElBQUwsQ0FBVSxHQUFWLEVBQWVDLElBQWY7QUFFSDs7O2lDQUVRQSxJLEVBQU07O0FBRVgsaUJBQUtELElBQUwsQ0FBVSxHQUFWLEVBQWVDLElBQWY7QUFFSDs7O3NDQUVhQyxHLEVBQUs7O0FBRWYsaUJBQUtGLElBQUwsQ0FBVSxHQUFWO0FBRUg7Ozs7OztrQkFHVUwsTyIsImZpbGUiOiJSZXN1bHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXN1bHRzIHByb3ZpZGVzIGhlbHBlciBtZXRob2RzIGZvciBodHRwIHJlc3BvbnNlcy4gXG4gKiBAcGFyYW0ge1JlcXVlc3R9IHJlcXVlc3RcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHAgXG4gKiBAcGFyYW0ge29iamVjdH0gcm91dGVcbiAqXG4gKiBAcHJvcGVydHkge1JlcXVlc3R9IHJlcXVlc3QgLSBUaGUgUmVxdWVzdCBvYmplY3RcbiAqIEBwcm9wZXJ0eSB7UmVzcG9uc2V9IHJlc3BvbnNlIC0gVGhlIFJlc3BvbnNlIG9iamVjdFxuICogQHByb3BlcnR5IHtBcHBsaWNhdGlvbn0gYXBwIC0gVGhlIEFwcGxpY2F0aW9uIGJlaW5nIHJ1blxuICogQHByb3BlcnR5IHtvYmplY3R9IHJvdXRlIC0gVGhlIHJvdXRlIGRlZmluaXRpb24gdGhhdCBhY3RpdmF0ZSB0aGlzIGNvZGVcbiAqXG4gKi9cbmNsYXNzIFJlc3VsdHMge1xuXG4gICAgY29uc3RydWN0b3IocmVxdWVzdCwgcmVzcG9uc2UsIGFwcCwgcm91dGUpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICAgICAgdGhpcy5yb3V0ZSA9IHJvdXRlO1xuICAgIH1cblxuICAgIHN1Y2Nlc3MoKSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDIwMCk7XG5cbiAgICB9XG5cbiAgICBhY2NlcHRlZCgpIHtcblxuICAgICAgICB0aGlzLnNlbmQoMjAyKTtcblxuICAgIH1cblxuICAgIG5vQ29udGVudCgpIHtcblxuICAgICAgICB0aGlzLnNlbmQoMjA0KTtcblxuICAgIH1cblxuICAgIGNyZWF0ZWQoYm9keSkge1xuXG4gICAgICAgIHRoaXMuc2VuZCgyMDEsIGJvZHkpO1xuXG4gICAgfVxuXG4gICAgYmFkUmVxdWVzdChib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDQwMCwgYm9keSk7XG5cbiAgICB9XG5cbiAgICBmb3JiaWRkZW4oYm9keSkge1xuXG4gICAgICAgIHRoaXMuc2VuZCg0MDMsIGJvZHkpO1xuXG4gICAgfVxuXG4gICAgbm90Rm91bmQoYm9keSkge1xuXG4gICAgICAgIHRoaXMuc2VuZCg0MDQsIGJvZHkpO1xuXG4gICAgfVxuXG4gICAgY29uZmxpY3QoYm9keSkge1xuXG4gICAgICAgIHRoaXMuc2VuZCg0MDksIGJvZHkpO1xuXG4gICAgfVxuXG4gICAgaW50ZXJuYWxFcnJvcihlcnIpIHtcblxuICAgICAgICB0aGlzLnNlbmQoNTAwKTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVzdWx0cztcbiJdfQ==