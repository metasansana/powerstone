import Property from 'property-seek';
import PowerstoneServer from '../common/PowerstoneServer';
import ManagedServer from '../common/ManagedServer';

/**
 * Application is the main class of the framework.
 * @param {string} path The path to intialize this Application to. 
 *
 * @property {Module} main - The main Module for this Application.
 * @property {ManagedServer} server - The managed http server.  
 * @property {object} controllers - Controllers loaded into memory.
 * @property {object} models - Models loaded into memory.
 * @property {object} connectors - Various connectors defined for establishing remote connections
 * @property {object} middleware - Middleware loaded into memory.
 * @property {ManagedServer|null} server - The internal managed server that serves clients.
 */
class Application {

    constructor(path) {

        this.path = path;
        this.name = 'main';
        this.server = null;
        this.controllers = {};
        this.models = {};
        this.middleware = {};
        this.connectors = {};
    }

    /**
     * onConnected is called when connections have been established.
     * @return {Promise|null}
     */
    onConnected() {

        return null;
    }

    /**
     * onError is called when some seemingly unrecoverable error
     * occurs, override it to handle errors on your own.
     * @param {Error} err 
     * @returns {null|Promise}
     */
    onError(err) {

        console.error(err.stack);
        process.exit(-1);
        return null;
    }

    /**
     * on 
     */
    on() {
        this._events.on.apply(this._events, arguments);
    }

    emit() {
        return this._events.emit.apply(this._events, arguments);
    }

    /**
     * start the server for this Application
     * @return {Promise}
     */
    start() {

        if (this.server !== null) return this.server.start();

        return this.main.load(this.frameworkApp).then(() => {

            this.server = new ManagedServer(this.main.configuration.read(this.configuration.keys.PORT, process.env.PORT || 3000), this.main.configuration.read(this.configuration.keys.PORT, process.env.HOST || '0.0.0.0'), new PowerstoneServer(this.__createServer()));

            return this.server.start();
        }).then(port => console.log(port)).catch(e => this.onError(e));
    }
}

export default Application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiUHJvcGVydHkiLCJQb3dlcnN0b25lU2VydmVyIiwiTWFuYWdlZFNlcnZlciIsIkFwcGxpY2F0aW9uIiwiY29uc3RydWN0b3IiLCJwYXRoIiwibmFtZSIsInNlcnZlciIsImNvbnRyb2xsZXJzIiwibW9kZWxzIiwibWlkZGxld2FyZSIsImNvbm5lY3RvcnMiLCJvbkNvbm5lY3RlZCIsIm9uRXJyb3IiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGFjayIsInByb2Nlc3MiLCJleGl0Iiwib24iLCJfZXZlbnRzIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJlbWl0Iiwic3RhcnQiLCJtYWluIiwibG9hZCIsImZyYW1ld29ya0FwcCIsInRoZW4iLCJjb25maWd1cmF0aW9uIiwicmVhZCIsImtleXMiLCJQT1JUIiwiZW52IiwiSE9TVCIsIl9fY3JlYXRlU2VydmVyIiwicG9ydCIsImxvZyIsImNhdGNoIiwiZSJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsUUFBUCxNQUFxQixlQUFyQjtBQUNBLE9BQU9DLGdCQUFQLE1BQTZCLDRCQUE3QjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIseUJBQTFCOztBQUVBOzs7Ozs7Ozs7Ozs7QUFZQSxNQUFNQyxXQUFOLENBQWtCOztBQUVkQyxnQkFBWUMsSUFBWixFQUFrQjs7QUFFZCxhQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxhQUFLQyxJQUFMLEdBQVksTUFBWjtBQUNBLGFBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLGFBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsYUFBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLGFBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFFSDs7QUFFRDs7OztBQUlBQyxrQkFBYzs7QUFFVixlQUFPLElBQVA7QUFFSDs7QUFFRDs7Ozs7O0FBTUFDLFlBQVFDLEdBQVIsRUFBYTs7QUFFVEMsZ0JBQVFDLEtBQVIsQ0FBY0YsSUFBSUcsS0FBbEI7QUFDQUMsZ0JBQVFDLElBQVIsQ0FBYSxDQUFDLENBQWQ7QUFDQSxlQUFPLElBQVA7QUFFSDs7QUFFRDs7O0FBR0FDLFNBQUs7QUFDRCxhQUFLQyxPQUFMLENBQWFELEVBQWIsQ0FBZ0JFLEtBQWhCLENBQXNCLEtBQUtELE9BQTNCLEVBQW9DRSxTQUFwQztBQUNIOztBQUVEQyxXQUFPO0FBQ0gsZUFBTyxLQUFLSCxPQUFMLENBQWFHLElBQWIsQ0FBa0JGLEtBQWxCLENBQXdCLEtBQUtELE9BQTdCLEVBQXNDRSxTQUF0QyxDQUFQO0FBQ0g7O0FBRUQ7Ozs7QUFJQUUsWUFBUTs7QUFFSixZQUFJLEtBQUtsQixNQUFMLEtBQWdCLElBQXBCLEVBQ0ksT0FBTyxLQUFLQSxNQUFMLENBQVlrQixLQUFaLEVBQVA7O0FBRUosZUFBTyxLQUFLQyxJQUFMLENBQVVDLElBQVYsQ0FBZSxLQUFLQyxZQUFwQixFQUNQQyxJQURPLENBQ0YsTUFBTTs7QUFHUCxpQkFBS3RCLE1BQUwsR0FBYyxJQUFJTCxhQUFKLENBRVYsS0FBS3dCLElBQUwsQ0FBVUksYUFBVixDQUF3QkMsSUFBeEIsQ0FBNkIsS0FBS0QsYUFBTCxDQUFtQkUsSUFBbkIsQ0FBd0JDLElBQXJELEVBQ0lmLFFBQVFnQixHQUFSLENBQVlELElBQVosSUFBb0IsSUFEeEIsQ0FGVSxFQUtWLEtBQUtQLElBQUwsQ0FBVUksYUFBVixDQUF3QkMsSUFBeEIsQ0FBNkIsS0FBS0QsYUFBTCxDQUFtQkUsSUFBbkIsQ0FBd0JDLElBQXJELEVBQ0lmLFFBQVFnQixHQUFSLENBQVlDLElBQVosSUFBb0IsU0FEeEIsQ0FMVSxFQVFWLElBQUlsQyxnQkFBSixDQUFxQixLQUFLbUMsY0FBTCxFQUFyQixDQVJVLENBQWQ7O0FBVUEsbUJBQU8sS0FBSzdCLE1BQUwsQ0FBWWtCLEtBQVosRUFBUDtBQUVILFNBaEJNLEVBaUJQSSxJQWpCTyxDQWlCRlEsUUFBUXRCLFFBQVF1QixHQUFSLENBQVlELElBQVosQ0FqQk4sRUFrQlBFLEtBbEJPLENBa0JEQyxLQUFLLEtBQUszQixPQUFMLENBQWEyQixDQUFiLENBbEJKLENBQVA7QUFxQkg7QUEvRWE7O0FBa0ZsQixlQUFlckMsV0FBZiIsImZpbGUiOiJBcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wZXJ0eSBmcm9tICdwcm9wZXJ0eS1zZWVrJztcbmltcG9ydCBQb3dlcnN0b25lU2VydmVyIGZyb20gJy4uL2NvbW1vbi9Qb3dlcnN0b25lU2VydmVyJztcbmltcG9ydCBNYW5hZ2VkU2VydmVyIGZyb20gJy4uL2NvbW1vbi9NYW5hZ2VkU2VydmVyJztcblxuLyoqXG4gKiBBcHBsaWNhdGlvbiBpcyB0aGUgbWFpbiBjbGFzcyBvZiB0aGUgZnJhbWV3b3JrLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gaW50aWFsaXplIHRoaXMgQXBwbGljYXRpb24gdG8uIFxuICpcbiAqIEBwcm9wZXJ0eSB7TW9kdWxlfSBtYWluIC0gVGhlIG1haW4gTW9kdWxlIGZvciB0aGlzIEFwcGxpY2F0aW9uLlxuICogQHByb3BlcnR5IHtNYW5hZ2VkU2VydmVyfSBzZXJ2ZXIgLSBUaGUgbWFuYWdlZCBodHRwIHNlcnZlci4gIFxuICogQHByb3BlcnR5IHtvYmplY3R9IGNvbnRyb2xsZXJzIC0gQ29udHJvbGxlcnMgbG9hZGVkIGludG8gbWVtb3J5LlxuICogQHByb3BlcnR5IHtvYmplY3R9IG1vZGVscyAtIE1vZGVscyBsb2FkZWQgaW50byBtZW1vcnkuXG4gKiBAcHJvcGVydHkge29iamVjdH0gY29ubmVjdG9ycyAtIFZhcmlvdXMgY29ubmVjdG9ycyBkZWZpbmVkIGZvciBlc3RhYmxpc2hpbmcgcmVtb3RlIGNvbm5lY3Rpb25zXG4gKiBAcHJvcGVydHkge29iamVjdH0gbWlkZGxld2FyZSAtIE1pZGRsZXdhcmUgbG9hZGVkIGludG8gbWVtb3J5LlxuICogQHByb3BlcnR5IHtNYW5hZ2VkU2VydmVyfG51bGx9IHNlcnZlciAtIFRoZSBpbnRlcm5hbCBtYW5hZ2VkIHNlcnZlciB0aGF0IHNlcnZlcyBjbGllbnRzLlxuICovXG5jbGFzcyBBcHBsaWNhdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXRoKSB7XG5cbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgICAgdGhpcy5uYW1lID0gJ21haW4nO1xuICAgICAgICB0aGlzLnNlcnZlciA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udHJvbGxlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5tb2RlbHMgPSB7fTtcbiAgICAgICAgdGhpcy5taWRkbGV3YXJlID0ge307XG4gICAgICAgIHRoaXMuY29ubmVjdG9ycyA9IHt9O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogb25Db25uZWN0ZWQgaXMgY2FsbGVkIHdoZW4gY29ubmVjdGlvbnMgaGF2ZSBiZWVuIGVzdGFibGlzaGVkLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V8bnVsbH1cbiAgICAgKi9cbiAgICBvbkNvbm5lY3RlZCgpIHtcblxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG9uRXJyb3IgaXMgY2FsbGVkIHdoZW4gc29tZSBzZWVtaW5nbHkgdW5yZWNvdmVyYWJsZSBlcnJvclxuICAgICAqIG9jY3Vycywgb3ZlcnJpZGUgaXQgdG8gaGFuZGxlIGVycm9ycyBvbiB5b3VyIG93bi5cbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBlcnIgXG4gICAgICogQHJldHVybnMge251bGx8UHJvbWlzZX1cbiAgICAgKi9cbiAgICBvbkVycm9yKGVycikge1xuXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KC0xKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvbiBcbiAgICAgKi9cbiAgICBvbigpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzLm9uLmFwcGx5KHRoaXMuX2V2ZW50cywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBlbWl0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzLmVtaXQuYXBwbHkodGhpcy5fZXZlbnRzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHN0YXJ0IHRoZSBzZXJ2ZXIgZm9yIHRoaXMgQXBwbGljYXRpb25cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLnNlcnZlciAhPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZlci5zdGFydCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1haW4ubG9hZCh0aGlzLmZyYW1ld29ya0FwcCkuXG4gICAgICAgIHRoZW4oKCkgPT4ge1xuXG5cbiAgICAgICAgICAgIHRoaXMuc2VydmVyID0gbmV3IE1hbmFnZWRTZXJ2ZXIoXG5cbiAgICAgICAgICAgICAgICB0aGlzLm1haW4uY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLlBPUlQsXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCksXG5cbiAgICAgICAgICAgICAgICB0aGlzLm1haW4uY29uZmlndXJhdGlvbi5yZWFkKHRoaXMuY29uZmlndXJhdGlvbi5rZXlzLlBPUlQsXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52LkhPU1QgfHwgJzAuMC4wLjAnKSxcblxuICAgICAgICAgICAgICAgIG5ldyBQb3dlcnN0b25lU2VydmVyKHRoaXMuX19jcmVhdGVTZXJ2ZXIoKSkpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuc3RhcnQoKTtcblxuICAgICAgICB9KS5cbiAgICAgICAgdGhlbihwb3J0ID0+IGNvbnNvbGUubG9nKHBvcnQpKS5cbiAgICAgICAgY2F0Y2goZSA9PiB0aGlzLm9uRXJyb3IoZSkpO1xuXG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uO1xuIl19