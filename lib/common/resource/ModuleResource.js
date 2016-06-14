'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Configuration = require('../Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

/**
 * ModuleResource looks up a resource by querying an object.
 * @implements {Resource}
 * @param {Module} parent 
 */

var ModuleResource = (function () {
    function ModuleResource(parent) {
        _classCallCheck(this, ModuleResource);

        this._parent = parent;
    }

    _createClass(ModuleResource, [{
        key: 'find',
        value: function find(path) {

            return new this._parent.constructor(path, new _Configuration2['default'](this._parent.configDirectory, this._parent.configuration.paths.modules + '/' + path), this._parent.context, this._parent.application);
        }
    }]);

    return ModuleResource;
})();

exports['default'] = ModuleResource;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVzb3VyY2UvTW9kdWxlUmVzb3VyY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzZCQUEwQixrQkFBa0I7Ozs7Ozs7Ozs7SUFNdEMsY0FBYztBQUVMLGFBRlQsY0FBYyxDQUVKLE1BQU0sRUFBRTs4QkFGbEIsY0FBYzs7QUFJWixZQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztLQUV6Qjs7aUJBTkMsY0FBYzs7ZUFRWixjQUFDLElBQUksRUFBRTs7QUFFUCxtQkFBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFDcEMsK0JBQWtCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxTQUFJLElBQUksQ0FBRyxFQUMxRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBRXZEOzs7V0FmQyxjQUFjOzs7cUJBbUJMLGNBQWMiLCJmaWxlIjoiTW9kdWxlUmVzb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29uZmlndXJhdGlvbiBmcm9tICcuLi9Db25maWd1cmF0aW9uJztcbi8qKlxuICogTW9kdWxlUmVzb3VyY2UgbG9va3MgdXAgYSByZXNvdXJjZSBieSBxdWVyeWluZyBhbiBvYmplY3QuXG4gKiBAaW1wbGVtZW50cyB7UmVzb3VyY2V9XG4gKiBAcGFyYW0ge01vZHVsZX0gcGFyZW50IFxuICovXG5jbGFzcyBNb2R1bGVSZXNvdXJjZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQpIHtcblxuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgICB9XG5cbiAgICBmaW5kKHBhdGgpIHtcblxuICAgICAgICByZXR1cm4gbmV3IHRoaXMuX3BhcmVudC5jb25zdHJ1Y3RvcihwYXRoLFxuICAgICAgICAgICAgbmV3IENvbmZpZ3VyYXRpb24odGhpcy5fcGFyZW50LmNvbmZpZ0RpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICBgJHt0aGlzLl9wYXJlbnQuY29uZmlndXJhdGlvbi5wYXRocy5tb2R1bGVzfS8ke3BhdGh9YCksXG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuY29udGV4dCwgdGhpcy5fcGFyZW50LmFwcGxpY2F0aW9uKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2R1bGVSZXNvdXJjZVxuIl19