/**
 * Server provides a normalized interface for interacting with
 * a framework's server implementation (express, restify).
 * @interface
 */
class Server {

  /**
   * on binds a handler to a specific server event.
   * @param {String} event
   * @param {Function} handler
   */
  on(event, handler) {}

  /***
   * open starts listening for connections
   * @param {Number} port
   * @param {String} [host]
   * @param {Function} [cb]
   */
  listen(port, host, cb) {}

  /**
   * close calls the close method on the server
   * @param {Function} cb
   */
  close(cb) {}

  /**
   * toFrameworkServer returns the framework's server implementation.
   * @return {Object}
   */
  toFrameworkServer() {}

}

export default Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vU2VydmVyLmpzIl0sIm5hbWVzIjpbIlNlcnZlciIsIm9uIiwiZXZlbnQiLCJoYW5kbGVyIiwibGlzdGVuIiwicG9ydCIsImhvc3QiLCJjYiIsImNsb3NlIiwidG9GcmFtZXdvcmtTZXJ2ZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQUtBLE1BQU1BLE1BQU4sQ0FBYTs7QUFFVDs7Ozs7QUFLQUMsS0FBR0MsS0FBSCxFQUFVQyxPQUFWLEVBQWtCLENBQUU7O0FBRXBCOzs7Ozs7QUFNQUMsU0FBT0MsSUFBUCxFQUFhQyxJQUFiLEVBQW1CQyxFQUFuQixFQUFzQixDQUFFOztBQUV4Qjs7OztBQUlBQyxRQUFNRCxFQUFOLEVBQVMsQ0FBRTs7QUFFWDs7OztBQUlBRSxzQkFBbUIsQ0FBRTs7QUEzQlo7O0FBK0JiLGVBQWVULE1BQWYiLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTZXJ2ZXIgcHJvdmlkZXMgYSBub3JtYWxpemVkIGludGVyZmFjZSBmb3IgaW50ZXJhY3Rpbmcgd2l0aFxuICogYSBmcmFtZXdvcmsncyBzZXJ2ZXIgaW1wbGVtZW50YXRpb24gKGV4cHJlc3MsIHJlc3RpZnkpLlxuICogQGludGVyZmFjZVxuICovXG5jbGFzcyBTZXJ2ZXIge1xuXG4gICAgLyoqXG4gICAgICogb24gYmluZHMgYSBoYW5kbGVyIHRvIGEgc3BlY2lmaWMgc2VydmVyIGV2ZW50LlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKi9cbiAgICBvbihldmVudCwgaGFuZGxlcil7fVxuXG4gICAgLyoqKlxuICAgICAqIG9wZW4gc3RhcnRzIGxpc3RlbmluZyBmb3IgY29ubmVjdGlvbnNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcG9ydFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbaG9zdF1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdXG4gICAgICovXG4gICAgbGlzdGVuKHBvcnQsIGhvc3QsIGNiKXt9XG5cbiAgICAvKipcbiAgICAgKiBjbG9zZSBjYWxscyB0aGUgY2xvc2UgbWV0aG9kIG9uIHRoZSBzZXJ2ZXJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgICAqL1xuICAgIGNsb3NlKGNiKXt9XG5cbiAgICAvKipcbiAgICAgKiB0b0ZyYW1ld29ya1NlcnZlciByZXR1cm5zIHRoZSBmcmFtZXdvcmsncyBzZXJ2ZXIgaW1wbGVtZW50YXRpb24uXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRvRnJhbWV3b3JrU2VydmVyKCl7fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZlclxuIl19