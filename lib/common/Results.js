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
class Results {

    constructor(request, response, app, route) {
        this.request = request;
        this.response = response;
        this.app = app;
        this.route = route;
    }

    success() {

        this.send(200);
    }

    accepted() {

        this.send(202);
    }

    noContent() {

        this.send(204);
    }

    created(body) {

        this.send(201, body);
    }

    badRequest(body) {

        this.send(400, body);
    }

    forbidden(body) {

        this.send(403, body);
    }

    notFound(body) {

        this.send(404, body);
    }

    conflict(body) {

        this.send(409, body);
    }

    internalError(err) {

        this.send(500);
    }
}

export default Results;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vUmVzdWx0cy5qcyJdLCJuYW1lcyI6WyJSZXN1bHRzIiwiY29uc3RydWN0b3IiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJhcHAiLCJyb3V0ZSIsInN1Y2Nlc3MiLCJzZW5kIiwiYWNjZXB0ZWQiLCJub0NvbnRlbnQiLCJjcmVhdGVkIiwiYm9keSIsImJhZFJlcXVlc3QiLCJmb3JiaWRkZW4iLCJub3RGb3VuZCIsImNvbmZsaWN0IiwiaW50ZXJuYWxFcnJvciIsImVyciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7QUFhQSxNQUFNQSxPQUFOLENBQWM7O0FBRVZDLGdCQUFZQyxPQUFaLEVBQXFCQyxRQUFyQixFQUErQkMsR0FBL0IsRUFBb0NDLEtBQXBDLEVBQTJDO0FBQ3ZDLGFBQUtILE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsYUFBS0MsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsYUFBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0g7O0FBRURDLGNBQVU7O0FBRU4sYUFBS0MsSUFBTCxDQUFVLEdBQVY7QUFFSDs7QUFFREMsZUFBVzs7QUFFUCxhQUFLRCxJQUFMLENBQVUsR0FBVjtBQUVIOztBQUVERSxnQkFBWTs7QUFFVixhQUFLRixJQUFMLENBQVUsR0FBVjtBQUVEOztBQUVERyxZQUFRQyxJQUFSLEVBQWM7O0FBRVYsYUFBS0osSUFBTCxDQUFVLEdBQVYsRUFBZUksSUFBZjtBQUVIOztBQUVEQyxlQUFXRCxJQUFYLEVBQWlCOztBQUViLGFBQUtKLElBQUwsQ0FBVSxHQUFWLEVBQWVJLElBQWY7QUFFSDs7QUFFREUsY0FBVUYsSUFBVixFQUFnQjs7QUFFWixhQUFLSixJQUFMLENBQVUsR0FBVixFQUFlSSxJQUFmO0FBRUg7O0FBRURHLGFBQVNILElBQVQsRUFBZTs7QUFFWCxhQUFLSixJQUFMLENBQVUsR0FBVixFQUFlSSxJQUFmO0FBRUg7O0FBRURJLGFBQVNKLElBQVQsRUFBZTs7QUFFWCxhQUFLSixJQUFMLENBQVUsR0FBVixFQUFlSSxJQUFmO0FBRUg7O0FBRURLLGtCQUFjQyxHQUFkLEVBQW1COztBQUVmLGFBQUtWLElBQUwsQ0FBVSxHQUFWO0FBRUg7QUE3RFM7O0FBZ0VkLGVBQWVQLE9BQWYiLCJmaWxlIjoiUmVzdWx0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVzdWx0cyBwcm92aWRlcyBoZWxwZXIgbWV0aG9kcyBmb3IgaHR0cCByZXNwb25zZXMuIFxuICogQHBhcmFtIHtSZXF1ZXN0fSByZXF1ZXN0XG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNwb25zZVxuICogQHBhcmFtIHtBcHBsaWNhdGlvbn0gYXBwIFxuICogQHBhcmFtIHtvYmplY3R9IHJvdXRlXG4gKlxuICogQHByb3BlcnR5IHtSZXF1ZXN0fSByZXF1ZXN0IC0gVGhlIFJlcXVlc3Qgb2JqZWN0XG4gKiBAcHJvcGVydHkge1Jlc3BvbnNlfSByZXNwb25zZSAtIFRoZSBSZXNwb25zZSBvYmplY3RcbiAqIEBwcm9wZXJ0eSB7QXBwbGljYXRpb259IGFwcCAtIFRoZSBBcHBsaWNhdGlvbiBiZWluZyBydW5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSByb3V0ZSAtIFRoZSByb3V0ZSBkZWZpbml0aW9uIHRoYXQgYWN0aXZhdGUgdGhpcyBjb2RlXG4gKlxuICovXG5jbGFzcyBSZXN1bHRzIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3QsIHJlc3BvbnNlLCBhcHAsIHJvdXRlKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgICAgIHRoaXMucm91dGUgPSByb3V0ZTtcbiAgICB9XG5cbiAgICBzdWNjZXNzKCkge1xuXG4gICAgICAgIHRoaXMuc2VuZCgyMDApO1xuXG4gICAgfVxuXG4gICAgYWNjZXB0ZWQoKSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDIwMik7XG5cbiAgICB9XG5cbiAgICBub0NvbnRlbnQoKSB7XG5cbiAgICAgIHRoaXMuc2VuZCgyMDQpO1xuXG4gICAgfVxuXG4gICAgY3JlYXRlZChib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDIwMSwgYm9keSk7XG5cbiAgICB9XG5cbiAgICBiYWRSZXF1ZXN0KGJvZHkpIHtcblxuICAgICAgICB0aGlzLnNlbmQoNDAwLCBib2R5KTtcblxuICAgIH1cblxuICAgIGZvcmJpZGRlbihib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDQwMywgYm9keSk7XG5cbiAgICB9XG5cbiAgICBub3RGb3VuZChib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDQwNCwgYm9keSk7XG5cbiAgICB9XG5cbiAgICBjb25mbGljdChib2R5KSB7XG5cbiAgICAgICAgdGhpcy5zZW5kKDQwOSwgYm9keSk7XG5cbiAgICB9XG5cbiAgICBpbnRlcm5hbEVycm9yKGVycikge1xuXG4gICAgICAgIHRoaXMuc2VuZCg1MDApO1xuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXN1bHRzO1xuIl19