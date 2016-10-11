import express from 'express';

/**
 * PowerstoneServer wraps around the frameworks server to provide
 * a simplified api.
 * @implements Server
 */
class PowerstoneServer {

    /**
     * @param {http.Server|https.Server} server
     */
    constructor(server) {
        this.server = server;
    }

    on(event, fn) {
        this.server.on(event, fn);
        return this;
    }

    listen(port, host, cb) {
        return this.server.listen(port, host, cb);
    }

    close(cb) {
        this.server.close(cb);
    }

    toFramework() {
        return this.server;
    }

}

export default PowerstoneServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vUG93ZXJzdG9uZVNlcnZlci5qcyJdLCJuYW1lcyI6WyJleHByZXNzIiwiUG93ZXJzdG9uZVNlcnZlciIsImNvbnN0cnVjdG9yIiwic2VydmVyIiwib24iLCJldmVudCIsImZuIiwibGlzdGVuIiwicG9ydCIsImhvc3QiLCJjYiIsImNsb3NlIiwidG9GcmFtZXdvcmsiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLE9BQVAsTUFBb0IsU0FBcEI7O0FBRUE7Ozs7O0FBS0EsTUFBTUMsZ0JBQU4sQ0FBdUI7O0FBRW5COzs7QUFHQUMsZ0JBQVlDLE1BQVosRUFBb0I7QUFDaEIsYUFBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7O0FBRURDLE9BQUdDLEtBQUgsRUFBVUMsRUFBVixFQUFjO0FBQ1YsYUFBS0gsTUFBTCxDQUFZQyxFQUFaLENBQWVDLEtBQWYsRUFBc0JDLEVBQXRCO0FBQ0EsZUFBTyxJQUFQO0FBQ0g7O0FBRURDLFdBQU9DLElBQVAsRUFBYUMsSUFBYixFQUFtQkMsRUFBbkIsRUFBdUI7QUFDbkIsZUFBTyxLQUFLUCxNQUFMLENBQVlJLE1BQVosQ0FBbUJDLElBQW5CLEVBQXlCQyxJQUF6QixFQUErQkMsRUFBL0IsQ0FBUDtBQUNIOztBQUVEQyxVQUFNRCxFQUFOLEVBQVM7QUFDTCxhQUFLUCxNQUFMLENBQVlRLEtBQVosQ0FBa0JELEVBQWxCO0FBQ0g7O0FBRURFLGtCQUFhO0FBQ1QsZUFBTyxLQUFLVCxNQUFaO0FBQ0g7O0FBeEJrQjs7QUE0QnZCLGVBQWVGLGdCQUFmIiwiZmlsZSI6IlBvd2Vyc3RvbmVTZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcblxuLyoqXG4gKiBQb3dlcnN0b25lU2VydmVyIHdyYXBzIGFyb3VuZCB0aGUgZnJhbWV3b3JrcyBzZXJ2ZXIgdG8gcHJvdmlkZVxuICogYSBzaW1wbGlmaWVkIGFwaS5cbiAqIEBpbXBsZW1lbnRzIFNlcnZlclxuICovXG5jbGFzcyBQb3dlcnN0b25lU2VydmVyIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aHR0cC5TZXJ2ZXJ8aHR0cHMuU2VydmVyfSBzZXJ2ZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gICAgfVxuXG4gICAgb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIHRoaXMuc2VydmVyLm9uKGV2ZW50LCBmbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxpc3Rlbihwb3J0LCBob3N0LCBjYikge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIubGlzdGVuKHBvcnQsIGhvc3QsIGNiKTtcbiAgICB9XG5cbiAgICBjbG9zZShjYil7XG4gICAgICAgIHRoaXMuc2VydmVyLmNsb3NlKGNiKTtcbiAgICB9XG5cbiAgICB0b0ZyYW1ld29yaygpe1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXI7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvd2Vyc3RvbmVTZXJ2ZXJcbiJdfQ==