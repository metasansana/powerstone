import pathModule from 'path';

/**
 * RequireResource locates a resource relative to the path it is
 * created with.
 * @param {string} [path='']
 * @implements {Resource}
 */
class RequireResource {

    constructor(path) {

        this._path = path ? '' + `${ path }/` : '';

        if (typeof this._path !== 'string') throw new TypeError(`The argument 'path' must be a string, got '${ typeof path }'!`);
    }

    find(path) {

        return require(`${ this._path }${ path }`);
    }

}

export default RequireResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVzb3VyY2UvUmVxdWlyZVJlc291cmNlLmpzIl0sIm5hbWVzIjpbInBhdGhNb2R1bGUiLCJSZXF1aXJlUmVzb3VyY2UiLCJjb25zdHJ1Y3RvciIsInBhdGgiLCJfcGF0aCIsIlR5cGVFcnJvciIsImZpbmQiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxVQUFQLE1BQXVCLE1BQXZCOztBQUVBOzs7Ozs7QUFNQSxNQUFNQyxlQUFOLENBQXNCOztBQUVsQkMsZ0JBQVlDLElBQVosRUFBa0I7O0FBRWQsYUFBS0MsS0FBTCxHQUFjRCxJQUFELEdBQVMsS0FBTSxJQUFFQSxJQUFLLElBQXRCLEdBQTJCLEVBQXhDOztBQUVBLFlBQUksT0FBTyxLQUFLQyxLQUFaLEtBQXNCLFFBQTFCLEVBQ0ksTUFBTSxJQUFJQyxTQUFKLENBQWUsK0NBQTZDLE9BQVFGLElBQUssS0FBekUsQ0FBTjtBQUVQOztBQUVERyxTQUFLSCxJQUFMLEVBQVc7O0FBRVAsZUFBT0ksUUFBUyxJQUFFLEtBQUtILEtBQU0sS0FBRUQsSUFBSyxHQUE3QixDQUFQO0FBRUg7O0FBZmlCOztBQW1CdEIsZUFBZUYsZUFBZiIsImZpbGUiOiJSZXF1aXJlUmVzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aE1vZHVsZSBmcm9tICdwYXRoJztcblxuLyoqXG4gKiBSZXF1aXJlUmVzb3VyY2UgbG9jYXRlcyBhIHJlc291cmNlIHJlbGF0aXZlIHRvIHRoZSBwYXRoIGl0IGlzXG4gKiBjcmVhdGVkIHdpdGguXG4gKiBAcGFyYW0ge3N0cmluZ30gW3BhdGg9JyddXG4gKiBAaW1wbGVtZW50cyB7UmVzb3VyY2V9XG4gKi9cbmNsYXNzIFJlcXVpcmVSZXNvdXJjZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXRoKSB7XG5cbiAgICAgICAgdGhpcy5fcGF0aCA9IChwYXRoKSA/ICcnICsgYCR7cGF0aH0vYCA6ICcnO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fcGF0aCAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgYXJndW1lbnQgJ3BhdGgnIG11c3QgYmUgYSBzdHJpbmcsIGdvdCAnJHt0eXBlb2YgIHBhdGh9JyFgKTtcblxuICAgIH1cblxuICAgIGZpbmQocGF0aCkge1xuXG4gICAgICAgIHJldHVybiByZXF1aXJlKGAke3RoaXMuX3BhdGh9JHtwYXRofWApO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVpcmVSZXNvdXJjZVxuIl19