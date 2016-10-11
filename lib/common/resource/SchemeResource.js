/**
 * SchemeResource provides an api that lets client code determine which
 * ResourceDelegate to invoke to locate a piece of code we want to utilize.
 *
 * It works by utilizing a URL like string where the scheme tells us what 
 * delegate to use.
 * Example:
 * ```javascript
 *  
 *   'require://path-to-file-to-require'
 *
 * ```
 * @param {Resource} delegate The default ResourceDelegate to use if nothing else matches.
 * @implements {Resource}
 */
class SchemeResource {

    constructor(delegate) {

        this._default = delegate;
        this._delegates = {};
    }

    /**
     * add a delegate to the internal list
     * @param {string} name 
     * @param {ResourceDelegate} delegate
     */
    add(name, delegate) {

        this._delegates[name] = delegate;
        return this;
    }

    find(path) {

        if (typeof path !== 'string') throw new TypeError('Value supplied for resource string is invalid or empty!');

        var parts = path.split('://');
        var scheme = parts[0];
        var delegate = null;

        if (parts.length === 1) {
            delegate = this._default;
            path = parts[0];
        } else {
            delegate = this._delegates[scheme];
            path = parts[1];
        }

        return delegate.find(path);
    }

}

export default SchemeResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVzb3VyY2UvU2NoZW1lUmVzb3VyY2UuanMiXSwibmFtZXMiOlsiU2NoZW1lUmVzb3VyY2UiLCJjb25zdHJ1Y3RvciIsImRlbGVnYXRlIiwiX2RlZmF1bHQiLCJfZGVsZWdhdGVzIiwiYWRkIiwibmFtZSIsImZpbmQiLCJwYXRoIiwiVHlwZUVycm9yIiwicGFydHMiLCJzcGxpdCIsInNjaGVtZSIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztBQWVBLE1BQU1BLGNBQU4sQ0FBcUI7O0FBRWpCQyxnQkFBWUMsUUFBWixFQUFzQjs7QUFFbEIsYUFBS0MsUUFBTCxHQUFnQkQsUUFBaEI7QUFDQSxhQUFLRSxVQUFMLEdBQWtCLEVBQWxCO0FBRUg7O0FBRUQ7Ozs7O0FBS0FDLFFBQUlDLElBQUosRUFBVUosUUFBVixFQUFvQjs7QUFFaEIsYUFBS0UsVUFBTCxDQUFnQkUsSUFBaEIsSUFBd0JKLFFBQXhCO0FBQ0EsZUFBTyxJQUFQO0FBRUg7O0FBRURLLFNBQUtDLElBQUwsRUFBVzs7QUFFUCxZQUFJLE9BQU9BLElBQVAsS0FBaUIsUUFBckIsRUFDSSxNQUFNLElBQUlDLFNBQUosQ0FBYyx5REFBZCxDQUFOOztBQUVKLFlBQUlDLFFBQVFGLEtBQUtHLEtBQUwsQ0FBVyxLQUFYLENBQVo7QUFDQSxZQUFJQyxTQUFTRixNQUFNLENBQU4sQ0FBYjtBQUNBLFlBQUlSLFdBQVcsSUFBZjs7QUFFQSxZQUFJUSxNQUFNRyxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3BCWCx1QkFBVyxLQUFLQyxRQUFoQjtBQUNBSyxtQkFBT0UsTUFBTSxDQUFOLENBQVA7QUFDSCxTQUhELE1BR087QUFDSFIsdUJBQVcsS0FBS0UsVUFBTCxDQUFnQlEsTUFBaEIsQ0FBWDtBQUNBSixtQkFBT0UsTUFBTSxDQUFOLENBQVA7QUFDSDs7QUFFRCxlQUFPUixTQUFTSyxJQUFULENBQWNDLElBQWQsQ0FBUDtBQUVIOztBQXhDZ0I7O0FBNENyQixlQUFlUixjQUFmIiwiZmlsZSI6IlNjaGVtZVJlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTY2hlbWVSZXNvdXJjZSBwcm92aWRlcyBhbiBhcGkgdGhhdCBsZXRzIGNsaWVudCBjb2RlIGRldGVybWluZSB3aGljaFxuICogUmVzb3VyY2VEZWxlZ2F0ZSB0byBpbnZva2UgdG8gbG9jYXRlIGEgcGllY2Ugb2YgY29kZSB3ZSB3YW50IHRvIHV0aWxpemUuXG4gKlxuICogSXQgd29ya3MgYnkgdXRpbGl6aW5nIGEgVVJMIGxpa2Ugc3RyaW5nIHdoZXJlIHRoZSBzY2hlbWUgdGVsbHMgdXMgd2hhdCBcbiAqIGRlbGVnYXRlIHRvIHVzZS5cbiAqIEV4YW1wbGU6XG4gKiBgYGBqYXZhc2NyaXB0XG4gKiAgXG4gKiAgICdyZXF1aXJlOi8vcGF0aC10by1maWxlLXRvLXJlcXVpcmUnXG4gKlxuICogYGBgXG4gKiBAcGFyYW0ge1Jlc291cmNlfSBkZWxlZ2F0ZSBUaGUgZGVmYXVsdCBSZXNvdXJjZURlbGVnYXRlIHRvIHVzZSBpZiBub3RoaW5nIGVsc2UgbWF0Y2hlcy5cbiAqIEBpbXBsZW1lbnRzIHtSZXNvdXJjZX1cbiAqL1xuY2xhc3MgU2NoZW1lUmVzb3VyY2Uge1xuXG4gICAgY29uc3RydWN0b3IoZGVsZWdhdGUpIHtcblxuICAgICAgICB0aGlzLl9kZWZhdWx0ID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMuX2RlbGVnYXRlcyA9IHt9O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIGEgZGVsZWdhdGUgdG8gdGhlIGludGVybmFsIGxpc3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlRGVsZWdhdGV9IGRlbGVnYXRlXG4gICAgICovXG4gICAgYWRkKG5hbWUsIGRlbGVnYXRlKSB7XG5cbiAgICAgICAgdGhpcy5fZGVsZWdhdGVzW25hbWVdID0gZGVsZWdhdGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgZmluZChwYXRoKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBwYXRoICE9PSAgJ3N0cmluZycpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBzdXBwbGllZCBmb3IgcmVzb3VyY2Ugc3RyaW5nIGlzIGludmFsaWQgb3IgZW1wdHkhJyk7XG5cbiAgICAgICAgdmFyIHBhcnRzID0gcGF0aC5zcGxpdCgnOi8vJyk7XG4gICAgICAgIHZhciBzY2hlbWUgPSBwYXJ0c1swXTtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBkZWxlZ2F0ZSA9IHRoaXMuX2RlZmF1bHQ7XG4gICAgICAgICAgICBwYXRoID0gcGFydHNbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxlZ2F0ZSA9IHRoaXMuX2RlbGVnYXRlc1tzY2hlbWVdO1xuICAgICAgICAgICAgcGF0aCA9IHBhcnRzWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlbGVnYXRlLmZpbmQocGF0aCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2NoZW1lUmVzb3VyY2VcbiJdfQ==