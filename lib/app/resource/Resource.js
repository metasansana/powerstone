'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AlternativeResource = require('./AlternativeResource');

var _AlternativeResource2 = _interopRequireDefault(_AlternativeResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Resource is an interface used to locate code resources dynamically.
 */
var Resource = function () {
  function Resource() {
    _classCallCheck(this, Resource);
  }

  _createClass(Resource, [{
    key: 'find',


    /**
     * find looking up of a particular resource
     * @param {string} path A string that tells us how to find the resource
     * @returns {Resource}
     */
    value: function find(path) {}

    /**
     * or triggers a search in a connected Resource if it is not found
     * on this one.
     * @param {Resource} r
     * @returns {Resource};
     */

  }, {
    key: 'or',
    value: function or(r) {

      return new _AlternativeResource2.default(this, r);
    }
  }]);

  return Resource;
}();

exports.default = Resource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvcmVzb3VyY2UvUmVzb3VyY2UuanMiXSwibmFtZXMiOlsiUmVzb3VyY2UiLCJwYXRoIiwiciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFDQTs7O0lBR01BLFE7Ozs7Ozs7OztBQUVGOzs7Ozt5QkFLS0MsSSxFQUFNLENBQUU7O0FBRWI7Ozs7Ozs7Ozt1QkFNR0MsQyxFQUFHOztBQUVGLGFBQU8sa0NBQXdCLElBQXhCLEVBQThCQSxDQUE5QixDQUFQO0FBRUg7Ozs7OztrQkFJVUYsUSIsImZpbGUiOiJSZXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBbHRlcm5hdGl2ZVJlc291cmNlIGZyb20gJy4vQWx0ZXJuYXRpdmVSZXNvdXJjZSc7XG4vKipcbiAqIFJlc291cmNlIGlzIGFuIGludGVyZmFjZSB1c2VkIHRvIGxvY2F0ZSBjb2RlIHJlc291cmNlcyBkeW5hbWljYWxseS5cbiAqL1xuY2xhc3MgUmVzb3VyY2Uge1xuXG4gICAgLyoqXG4gICAgICogZmluZCBsb29raW5nIHVwIG9mIGEgcGFydGljdWxhciByZXNvdXJjZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIEEgc3RyaW5nIHRoYXQgdGVsbHMgdXMgaG93IHRvIGZpbmQgdGhlIHJlc291cmNlXG4gICAgICogQHJldHVybnMge1Jlc291cmNlfVxuICAgICAqL1xuICAgIGZpbmQocGF0aCkge31cblxuICAgIC8qKlxuICAgICAqIG9yIHRyaWdnZXJzIGEgc2VhcmNoIGluIGEgY29ubmVjdGVkIFJlc291cmNlIGlmIGl0IGlzIG5vdCBmb3VuZFxuICAgICAqIG9uIHRoaXMgb25lLlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2V9IHJcbiAgICAgKiBAcmV0dXJucyB7UmVzb3VyY2V9O1xuICAgICAqL1xuICAgIG9yKHIpIHtcblxuICAgICAgICByZXR1cm4gbmV3IEFsdGVybmF0aXZlUmVzb3VyY2UodGhpcywgcik7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVzb3VyY2VcbiJdfQ==