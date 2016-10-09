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
})();

exports["default"] = Results;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vUmVzdWx0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWFNLE9BQU87QUFFRSxhQUZULE9BQU8sQ0FFRyxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7OEJBRnpDLE9BQU87O0FBR0wsWUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsWUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFDekIsWUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixZQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUN0Qjs7aUJBUEMsT0FBTzs7ZUFTRixtQkFBRzs7QUFFTixnQkFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUVsQjs7O2VBRU8sb0JBQUc7O0FBRVAsZ0JBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FFbEI7OztlQUVRLHFCQUFHOztBQUVSLGdCQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBRWxCOzs7ZUFFTSxpQkFBQyxJQUFJLEVBQUU7O0FBRVYsZ0JBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBRXhCOzs7ZUFFUyxvQkFBQyxJQUFJLEVBQUU7O0FBRWIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBRXhCOzs7ZUFFUSxtQkFBQyxJQUFJLEVBQUU7O0FBRVosZ0JBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBRXhCOzs7ZUFFTyxrQkFBQyxJQUFJLEVBQUU7O0FBRVgsZ0JBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBRXhCOzs7ZUFFTyxrQkFBQyxJQUFJLEVBQUU7O0FBRVgsZ0JBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBRXhCOzs7ZUFFWSx1QkFBQyxHQUFHLEVBQUU7O0FBRWYsZ0JBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FFbEI7OztXQTdEQyxPQUFPOzs7cUJBZ0VFLE9BQU8iLCJmaWxlIjoiUmVzdWx0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVzdWx0cyBwcm92aWRlcyBoZWxwZXIgbWV0aG9kcyBmb3IgaHR0cCByZXNwb25zZXMuIFxuICogQHBhcmFtIHtSZXF1ZXN0fSByZXF1ZXN0XG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZVxuICogQHBhcmFtIHtBcHBsaWNhdGlvbn0gYXBwIFxuICogQHBhcmFtIHtvYmplY3R9IHJvdXRlXG4gKlxuICogQHByb3BlcnR5IHtSZXF1ZXN0fSByZXF1ZXN0IC0gVGhlIFJlcXVlc3Qgb2JqZWN0XG4gKiBAcHJvcGVydHkge1Jlc3BvbnNlfSByZXNwb25zZSAtIFRoZSBSZXNwb25zZSBvYmplY3RcbiAqIEBwcm9wZXJ0eSB7QXBwbGljYXRpb259IGFwcCAtIFRoZSBBcHBsaWNhdGlvbiBiZWluZyBydW5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSByb3V0ZSAtIFRoZSByb3V0ZSBkZWZpbml0aW9uIHRoYXQgYWN0aXZhdGUgdGhpcyBjb2RlXG4gKlxuICovXG5jbGFzcyBSZXN1bHRzIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3QsIHJlc3BvbnNlLCBhcHAsIHJvdXRlKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgICAgIHRoaXMucm91dGUgPSByb3V0ZTtcbiAgICB9XG5cbiAgICBzdWNjZXNzKCkge1xuXG4gICAgICAgIHRoaXMuc2VuZCgyMDApO1xuXG4gICAgfVxuXG4gICAgYWNjZXB0ZWQoKSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDIwMik7XG5cbiAgICB9XG5cbiAgICBub0NvbnRlbnQoKSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDIwNCk7XG5cbiAgICB9XG5cbiAgICBjcmVhdGVkKGJvZHkpIHtcblxuICAgICAgICB0aGlzLnNlbmQoMjAxLCBib2R5KTtcblxuICAgIH1cblxuICAgIGJhZFJlcXVlc3QoYm9keSkge1xuXG4gICAgICAgIHRoaXMuc2VuZCg0MDAsIGJvZHkpO1xuXG4gICAgfVxuXG4gICAgZm9yYmlkZGVuKGJvZHkpIHtcblxuICAgICAgICB0aGlzLnNlbmQoNDAzLCBib2R5KTtcblxuICAgIH1cblxuICAgIG5vdEZvdW5kKGJvZHkpIHtcblxuICAgICAgICB0aGlzLnNlbmQoNDA0LCBib2R5KTtcblxuICAgIH1cblxuICAgIGNvbmZsaWN0KGJvZHkpIHtcblxuICAgICAgICB0aGlzLnNlbmQoNDA5LCBib2R5KTtcblxuICAgIH1cblxuICAgIGludGVybmFsRXJyb3IoZXJyKSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDUwMCk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlc3VsdHM7XG4iXX0=