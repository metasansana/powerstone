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
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SchemeResource = (function () {
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
})();

exports['default'] = SchemeResource;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVzb3VyY2UvU2NoZW1lUmVzb3VyY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVNLGNBQWM7QUFFTCxhQUZULGNBQWMsQ0FFSixRQUFRLEVBQUU7OEJBRnBCLGNBQWM7O0FBSVosWUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFDekIsWUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7S0FFeEI7Ozs7Ozs7O2lCQVBDLGNBQWM7O2VBY2IsYUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFOztBQUVoQixnQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7QUFDakMsbUJBQU8sSUFBSSxDQUFDO1NBRWY7OztlQUVHLGNBQUMsSUFBSSxFQUFFOztBQUVQLGdCQUFJLE9BQU8sSUFBSSxLQUFNLFFBQVEsRUFDekIsTUFBTSxJQUFJLFNBQVMsQ0FBQyx5REFBeUQsQ0FBQyxDQUFDOztBQUVuRixnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM5QixnQkFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLGdCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7O0FBRXBCLGdCQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3BCLHdCQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUN6QixvQkFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuQixNQUFNO0FBQ0gsd0JBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLG9CQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25COztBQUVELG1CQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FFOUI7OztXQXhDQyxjQUFjOzs7cUJBNENMLGNBQWMiLCJmaWxlIjoiU2NoZW1lUmVzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFNjaGVtZVJlc291cmNlIHByb3ZpZGVzIGFuIGFwaSB0aGF0IGxldHMgY2xpZW50IGNvZGUgZGV0ZXJtaW5lIHdoaWNoXG4gKiBSZXNvdXJjZURlbGVnYXRlIHRvIGludm9rZSB0byBsb2NhdGUgYSBwaWVjZSBvZiBjb2RlIHdlIHdhbnQgdG8gdXRpbGl6ZS5cbiAqXG4gKiBJdCB3b3JrcyBieSB1dGlsaXppbmcgYSBVUkwgbGlrZSBzdHJpbmcgd2hlcmUgdGhlIHNjaGVtZSB0ZWxscyB1cyB3aGF0IFxuICogZGVsZWdhdGUgdG8gdXNlLlxuICogRXhhbXBsZTpcbiAqIGBgYGphdmFzY3JpcHRcbiAqICBcbiAqICAgJ3JlcXVpcmU6Ly9wYXRoLXRvLWZpbGUtdG8tcmVxdWlyZSdcbiAqXG4gKiBgYGBcbiAqIEBwYXJhbSB7UmVzb3VyY2V9IGRlbGVnYXRlIFRoZSBkZWZhdWx0IFJlc291cmNlRGVsZWdhdGUgdG8gdXNlIGlmIG5vdGhpbmcgZWxzZSBtYXRjaGVzLlxuICogQGltcGxlbWVudHMge1Jlc291cmNlfVxuICovXG5jbGFzcyBTY2hlbWVSZXNvdXJjZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSkge1xuXG4gICAgICAgIHRoaXMuX2RlZmF1bHQgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5fZGVsZWdhdGVzID0ge307XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGQgYSBkZWxlZ2F0ZSB0byB0aGUgaW50ZXJuYWwgbGlzdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VEZWxlZ2F0ZX0gZGVsZWdhdGVcbiAgICAgKi9cbiAgICBhZGQobmFtZSwgZGVsZWdhdGUpIHtcblxuICAgICAgICB0aGlzLl9kZWxlZ2F0ZXNbbmFtZV0gPSBkZWxlZ2F0ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBmaW5kKHBhdGgpIHtcblxuICAgICAgICBpZiAodHlwZW9mIHBhdGggIT09ICAnc3RyaW5nJylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZhbHVlIHN1cHBsaWVkIGZvciByZXNvdXJjZSBzdHJpbmcgaXMgaW52YWxpZCBvciBlbXB0eSEnKTtcblxuICAgICAgICB2YXIgcGFydHMgPSBwYXRoLnNwbGl0KCc6Ly8nKTtcbiAgICAgICAgdmFyIHNjaGVtZSA9IHBhcnRzWzBdO1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGRlbGVnYXRlID0gdGhpcy5fZGVmYXVsdDtcbiAgICAgICAgICAgIHBhdGggPSBwYXJ0c1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGVnYXRlID0gdGhpcy5fZGVsZWdhdGVzW3NjaGVtZV07XG4gICAgICAgICAgICBwYXRoID0gcGFydHNbMV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVsZWdhdGUuZmluZChwYXRoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTY2hlbWVSZXNvdXJjZVxuIl19