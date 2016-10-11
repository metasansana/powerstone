'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Resource2 = require('./Resource');

var _Resource3 = _interopRequireDefault(_Resource2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var SchemeResource = function (_Resource) {
    _inherits(SchemeResource, _Resource);

    function SchemeResource(delegate) {
        _classCallCheck(this, SchemeResource);

        var _this = _possibleConstructorReturn(this, (SchemeResource.__proto__ || Object.getPrototypeOf(SchemeResource)).call(this));

        _this._default = delegate;
        _this._delegates = {};

        return _this;
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
            if (!delegate) console.log(this._delegates, scheme);
            return delegate.find(path);
        }
    }]);

    return SchemeResource;
}(_Resource3.default);

exports.default = SchemeResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcmVzb3VyY2UvU2NoZW1lUmVzb3VyY2UuanMiXSwibmFtZXMiOlsiU2NoZW1lUmVzb3VyY2UiLCJkZWxlZ2F0ZSIsIl9kZWZhdWx0IiwiX2RlbGVnYXRlcyIsIm5hbWUiLCJwYXRoIiwiVHlwZUVycm9yIiwicGFydHMiLCJzcGxpdCIsInNjaGVtZSIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJmaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0lBZU1BLGM7OztBQUVGLDRCQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQUE7O0FBR2xCLGNBQUtDLFFBQUwsR0FBZ0JELFFBQWhCO0FBQ0EsY0FBS0UsVUFBTCxHQUFrQixFQUFsQjs7QUFKa0I7QUFNckI7O0FBRUQ7Ozs7Ozs7Ozs0QkFLSUMsSSxFQUFNSCxRLEVBQVU7O0FBRWhCLGlCQUFLRSxVQUFMLENBQWdCQyxJQUFoQixJQUF3QkgsUUFBeEI7QUFDQSxtQkFBTyxJQUFQO0FBRUg7Ozs2QkFFSUksSSxFQUFNOztBQUVQLGdCQUFJLE9BQU9BLElBQVAsS0FBZ0IsUUFBcEIsRUFDSSxNQUFNLElBQUlDLFNBQUosQ0FBYyx5REFBZCxDQUFOOztBQUVKLGdCQUFJQyxRQUFRRixLQUFLRyxLQUFMLENBQVcsS0FBWCxDQUFaO0FBQ0EsZ0JBQUlDLFNBQVNGLE1BQU0sQ0FBTixDQUFiO0FBQ0EsZ0JBQUlOLFdBQVcsSUFBZjs7QUFFQSxnQkFBSU0sTUFBTUcsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUNwQlQsMkJBQVcsS0FBS0MsUUFBaEI7QUFDQUcsdUJBQU9FLE1BQU0sQ0FBTixDQUFQO0FBQ0gsYUFIRCxNQUdPO0FBQ0hOLDJCQUFXLEtBQUtFLFVBQUwsQ0FBZ0JNLE1BQWhCLENBQVg7QUFDQUosdUJBQU9FLE1BQU0sQ0FBTixDQUFQO0FBQ0g7QUFDVCxnQkFBRyxDQUFDTixRQUFKLEVBQWNVLFFBQVFDLEdBQVIsQ0FBWSxLQUFLVCxVQUFqQixFQUE2Qk0sTUFBN0I7QUFDTixtQkFBT1IsU0FBU1ksSUFBVCxDQUFjUixJQUFkLENBQVA7QUFFSDs7Ozs7O2tCQUlVTCxjIiwiZmlsZSI6IlNjaGVtZVJlc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlc291cmNlIGZyb20gJy4vUmVzb3VyY2UnO1xuXG4vKipcbiAqIFNjaGVtZVJlc291cmNlIHByb3ZpZGVzIGFuIGFwaSB0aGF0IGxldHMgY2xpZW50IGNvZGUgZGV0ZXJtaW5lIHdoaWNoXG4gKiBSZXNvdXJjZURlbGVnYXRlIHRvIGludm9rZSB0byBsb2NhdGUgYSBwaWVjZSBvZiBjb2RlIHdlIHdhbnQgdG8gdXRpbGl6ZS5cbiAqXG4gKiBJdCB3b3JrcyBieSB1dGlsaXppbmcgYSBVUkwgbGlrZSBzdHJpbmcgd2hlcmUgdGhlIHNjaGVtZSB0ZWxscyB1cyB3aGF0XG4gKiBkZWxlZ2F0ZSB0byB1c2UuXG4gKiBFeGFtcGxlOlxuICogYGBgamF2YXNjcmlwdFxuICpcbiAqICAgJ3JlcXVpcmU6Ly9wYXRoLXRvLWZpbGUtdG8tcmVxdWlyZSdcbiAqXG4gKiBgYGBcbiAqIEBwYXJhbSB7UmVzb3VyY2V9IGRlbGVnYXRlIFRoZSBkZWZhdWx0IFJlc291cmNlRGVsZWdhdGUgdG8gdXNlIGlmIG5vdGhpbmcgZWxzZSBtYXRjaGVzLlxuICogQGltcGxlbWVudHMge1Jlc291cmNlfVxuICovXG5jbGFzcyBTY2hlbWVSZXNvdXJjZSBleHRlbmRzIFJlc291cmNlIHtcblxuICAgIGNvbnN0cnVjdG9yKGRlbGVnYXRlKSB7XG5cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZGVmYXVsdCA9IGRlbGVnYXRlO1xuICAgICAgICB0aGlzLl9kZWxlZ2F0ZXMgPSB7fTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCBhIGRlbGVnYXRlIHRvIHRoZSBpbnRlcm5hbCBsaXN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlRGVsZWdhdGV9IGRlbGVnYXRlXG4gICAgICovXG4gICAgYWRkKG5hbWUsIGRlbGVnYXRlKSB7XG5cbiAgICAgICAgdGhpcy5fZGVsZWdhdGVzW25hbWVdID0gZGVsZWdhdGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgZmluZChwYXRoKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZhbHVlIHN1cHBsaWVkIGZvciByZXNvdXJjZSBzdHJpbmcgaXMgaW52YWxpZCBvciBlbXB0eSEnKTtcblxuICAgICAgICB2YXIgcGFydHMgPSBwYXRoLnNwbGl0KCc6Ly8nKTtcbiAgICAgICAgdmFyIHNjaGVtZSA9IHBhcnRzWzBdO1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGRlbGVnYXRlID0gdGhpcy5fZGVmYXVsdDtcbiAgICAgICAgICAgIHBhdGggPSBwYXJ0c1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGVnYXRlID0gdGhpcy5fZGVsZWdhdGVzW3NjaGVtZV07XG4gICAgICAgICAgICBwYXRoID0gcGFydHNbMV07XG4gICAgICAgIH1cbmlmKCFkZWxlZ2F0ZSkgY29uc29sZS5sb2codGhpcy5fZGVsZWdhdGVzLCBzY2hlbWUpO1xuICAgICAgICByZXR1cm4gZGVsZWdhdGUuZmluZChwYXRoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTY2hlbWVSZXNvdXJjZVxuIl19