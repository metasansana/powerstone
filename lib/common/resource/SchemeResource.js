'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var SchemeResource = function () {
    function SchemeResource(delegate) {
        _classCallCheck(this, SchemeResource);

        this._default = delegate;
        this._delegates = {};
    }

    /**
     * add a delegate to the internal list
     * @param {string} name 
     * @param {ResourceDelegate} delegate
     */


    _createClass(SchemeResource, [{
        key: 'add',
        value: function add(name, delegate) {

            this._delegates[name] = delegate;
            return this;
        }
    }, {
        key: 'find',
        value: function find(path) {

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
    }]);

    return SchemeResource;
}();

exports.default = SchemeResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVzb3VyY2UvU2NoZW1lUmVzb3VyY2UuanMiXSwibmFtZXMiOlsiU2NoZW1lUmVzb3VyY2UiLCJkZWxlZ2F0ZSIsIl9kZWZhdWx0IiwiX2RlbGVnYXRlcyIsIm5hbWUiLCJwYXRoIiwiVHlwZUVycm9yIiwicGFydHMiLCJzcGxpdCIsInNjaGVtZSIsImxlbmd0aCIsImZpbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0lBZU1BLGM7QUFFRiw0QkFBWUMsUUFBWixFQUFzQjtBQUFBOztBQUVsQixhQUFLQyxRQUFMLEdBQWdCRCxRQUFoQjtBQUNBLGFBQUtFLFVBQUwsR0FBa0IsRUFBbEI7QUFFSDs7QUFFRDs7Ozs7Ozs7OzRCQUtJQyxJLEVBQU1ILFEsRUFBVTs7QUFFaEIsaUJBQUtFLFVBQUwsQ0FBZ0JDLElBQWhCLElBQXdCSCxRQUF4QjtBQUNBLG1CQUFPLElBQVA7QUFFSDs7OzZCQUVJSSxJLEVBQU07O0FBRVAsZ0JBQUksT0FBT0EsSUFBUCxLQUFpQixRQUFyQixFQUNJLE1BQU0sSUFBSUMsU0FBSixDQUFjLHlEQUFkLENBQU47O0FBRUosZ0JBQUlDLFFBQVFGLEtBQUtHLEtBQUwsQ0FBVyxLQUFYLENBQVo7QUFDQSxnQkFBSUMsU0FBU0YsTUFBTSxDQUFOLENBQWI7QUFDQSxnQkFBSU4sV0FBVyxJQUFmOztBQUVBLGdCQUFJTSxNQUFNRyxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3BCVCwyQkFBVyxLQUFLQyxRQUFoQjtBQUNBRyx1QkFBT0UsTUFBTSxDQUFOLENBQVA7QUFDSCxhQUhELE1BR087QUFDSE4sMkJBQVcsS0FBS0UsVUFBTCxDQUFnQk0sTUFBaEIsQ0FBWDtBQUNBSix1QkFBT0UsTUFBTSxDQUFOLENBQVA7QUFDSDs7QUFFRCxtQkFBT04sU0FBU1UsSUFBVCxDQUFjTixJQUFkLENBQVA7QUFFSDs7Ozs7O2tCQUlVTCxjIiwiZmlsZSI6IlNjaGVtZVJlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTY2hlbWVSZXNvdXJjZSBwcm92aWRlcyBhbiBhcGkgdGhhdCBsZXRzIGNsaWVudCBjb2RlIGRldGVybWluZSB3aGljaFxuICogUmVzb3VyY2VEZWxlZ2F0ZSB0byBpbnZva2UgdG8gbG9jYXRlIGEgcGllY2Ugb2YgY29kZSB3ZSB3YW50IHRvIHV0aWxpemUuXG4gKlxuICogSXQgd29ya3MgYnkgdXRpbGl6aW5nIGEgVVJMIGxpa2Ugc3RyaW5nIHdoZXJlIHRoZSBzY2hlbWUgdGVsbHMgdXMgd2hhdCBcbiAqIGRlbGVnYXRlIHRvIHVzZS5cbiAqIEV4YW1wbGU6XG4gKiBgYGBqYXZhc2NyaXB0XG4gKiAgXG4gKiAgICdyZXF1aXJlOi8vcGF0aC10by1maWxlLXRvLXJlcXVpcmUnXG4gKlxuICogYGBgXG4gKiBAcGFyYW0ge1Jlc291cmNlfSBkZWxlZ2F0ZSBUaGUgZGVmYXVsdCBSZXNvdXJjZURlbGVnYXRlIHRvIHVzZSBpZiBub3RoaW5nIGVsc2UgbWF0Y2hlcy5cbiAqIEBpbXBsZW1lbnRzIHtSZXNvdXJjZX1cbiAqL1xuY2xhc3MgU2NoZW1lUmVzb3VyY2Uge1xuXG4gICAgY29uc3RydWN0b3IoZGVsZWdhdGUpIHtcblxuICAgICAgICB0aGlzLl9kZWZhdWx0ID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMuX2RlbGVnYXRlcyA9IHt9O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIGEgZGVsZWdhdGUgdG8gdGhlIGludGVybmFsIGxpc3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlRGVsZWdhdGV9IGRlbGVnYXRlXG4gICAgICovXG4gICAgYWRkKG5hbWUsIGRlbGVnYXRlKSB7XG5cbiAgICAgICAgdGhpcy5fZGVsZWdhdGVzW25hbWVdID0gZGVsZWdhdGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgZmluZChwYXRoKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBwYXRoICE9PSAgJ3N0cmluZycpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBzdXBwbGllZCBmb3IgcmVzb3VyY2Ugc3RyaW5nIGlzIGludmFsaWQgb3IgZW1wdHkhJyk7XG5cbiAgICAgICAgdmFyIHBhcnRzID0gcGF0aC5zcGxpdCgnOi8vJyk7XG4gICAgICAgIHZhciBzY2hlbWUgPSBwYXJ0c1swXTtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBkZWxlZ2F0ZSA9IHRoaXMuX2RlZmF1bHQ7XG4gICAgICAgICAgICBwYXRoID0gcGFydHNbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxlZ2F0ZSA9IHRoaXMuX2RlbGVnYXRlc1tzY2hlbWVdO1xuICAgICAgICAgICAgcGF0aCA9IHBhcnRzWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlbGVnYXRlLmZpbmQocGF0aCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2NoZW1lUmVzb3VyY2VcbiJdfQ==