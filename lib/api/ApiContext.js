import DefaultFilters from './filters/DefaultFilters';

/**
 * ApiContext is a class that stores a shared context between
 * modules and their submodules.
 */
class ApiContext {

    constructor() {

        this.middleware = {};
        this.connectors = {};
        this.controllers = {};
        this.filters = {
            default: DefaultFilters,
            public: {
                apply() {}
            }
        };
    }

}
export default ApiContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvQXBpQ29udGV4dC5qcyJdLCJuYW1lcyI6WyJEZWZhdWx0RmlsdGVycyIsIkFwaUNvbnRleHQiLCJjb25zdHJ1Y3RvciIsIm1pZGRsZXdhcmUiLCJjb25uZWN0b3JzIiwiY29udHJvbGxlcnMiLCJmaWx0ZXJzIiwiZGVmYXVsdCIsInB1YmxpYyIsImFwcGx5Il0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxjQUFQLE1BQTJCLDBCQUEzQjs7QUFFQTs7OztBQUlBLE1BQU1DLFVBQU4sQ0FBaUI7O0FBRWJDLGtCQUFjOztBQUVWLGFBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxhQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLGFBQUtDLE9BQUwsR0FBZTtBQUNYQyxxQkFBU1AsY0FERTtBQUVYUSxvQkFBUTtBQUNKQyx3QkFBUSxDQUFFO0FBRE47QUFGRyxTQUFmO0FBT0g7O0FBZFk7QUFpQmpCLGVBQWVSLFVBQWYiLCJmaWxlIjoiQXBpQ29udGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWZhdWx0RmlsdGVycyBmcm9tICcuL2ZpbHRlcnMvRGVmYXVsdEZpbHRlcnMnO1xuXG4vKipcbiAqIEFwaUNvbnRleHQgaXMgYSBjbGFzcyB0aGF0IHN0b3JlcyBhIHNoYXJlZCBjb250ZXh0IGJldHdlZW5cbiAqIG1vZHVsZXMgYW5kIHRoZWlyIHN1Ym1vZHVsZXMuXG4gKi9cbmNsYXNzIEFwaUNvbnRleHQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5taWRkbGV3YXJlID0ge307XG4gICAgICAgIHRoaXMuY29ubmVjdG9ycyA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJzID0ge307XG4gICAgICAgIHRoaXMuZmlsdGVycyA9IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IERlZmF1bHRGaWx0ZXJzLFxuICAgICAgICAgICAgcHVibGljOiB7XG4gICAgICAgICAgICAgICAgYXBwbHkoKSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBBcGlDb250ZXh0XG4iXX0=