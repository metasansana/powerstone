import restify from 'restify';

/**
 * AuditFilter 
 * @implements {Filter}
 */
class AuditFilter {

    apply(app, config) {

        app.on('after', restify.auditLogger(config.read('power.filters.audit', {
            body: true,
            log: bunyan.createLogger({
                name: 'audit',
                stream: process.stdout
            })
        })));
    }
}

export default new AuditFilter();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvZmlsdGVycy9BdWRpdEZpbHRlci5qcyJdLCJuYW1lcyI6WyJyZXN0aWZ5IiwiQXVkaXRGaWx0ZXIiLCJhcHBseSIsImFwcCIsImNvbmZpZyIsIm9uIiwiYXVkaXRMb2dnZXIiLCJyZWFkIiwiYm9keSIsImxvZyIsImJ1bnlhbiIsImNyZWF0ZUxvZ2dlciIsIm5hbWUiLCJzdHJlYW0iLCJwcm9jZXNzIiwic3Rkb3V0Il0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxPQUFQLE1BQW9CLFNBQXBCOztBQUVBOzs7O0FBSUEsTUFBTUMsV0FBTixDQUFrQjs7QUFFZEMsVUFBTUMsR0FBTixFQUFXQyxNQUFYLEVBQW1COztBQUVmRCxZQUFJRSxFQUFKLENBQU8sT0FBUCxFQUFnQkwsUUFBUU0sV0FBUixDQUFvQkYsT0FBT0csSUFBUCxDQUFZLHFCQUFaLEVBQW1DO0FBQ25FQyxrQkFBTSxJQUQ2RDtBQUVuRUMsaUJBQUtDLE9BQU9DLFlBQVAsQ0FBb0I7QUFDckJDLHNCQUFNLE9BRGU7QUFFckJDLHdCQUFRQyxRQUFRQztBQUZLLGFBQXBCO0FBRjhELFNBQW5DLENBQXBCLENBQWhCO0FBUUg7QUFaYTs7QUFlbEIsZUFBZSxJQUFJZCxXQUFKLEVBQWYiLCJmaWxlIjoiQXVkaXRGaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVzdGlmeSBmcm9tICdyZXN0aWZ5JztcblxuLyoqXG4gKiBBdWRpdEZpbHRlciBcbiAqIEBpbXBsZW1lbnRzIHtGaWx0ZXJ9XG4gKi9cbmNsYXNzIEF1ZGl0RmlsdGVyIHtcblxuICAgIGFwcGx5KGFwcCwgY29uZmlnKSB7XG5cbiAgICAgICAgYXBwLm9uKCdhZnRlcicsIHJlc3RpZnkuYXVkaXRMb2dnZXIoY29uZmlnLnJlYWQoJ3Bvd2VyLmZpbHRlcnMuYXVkaXQnLCB7XG4gICAgICAgICAgICBib2R5OiB0cnVlLFxuICAgICAgICAgICAgbG9nOiBidW55YW4uY3JlYXRlTG9nZ2VyKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnYXVkaXQnLFxuICAgICAgICAgICAgICAgIHN0cmVhbTogcHJvY2Vzcy5zdGRvdXRcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pKSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBBdWRpdEZpbHRlcigpXG4iXX0=