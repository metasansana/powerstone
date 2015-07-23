'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _dotAccess = require('dot-access');

var _dotAccess2 = _interopRequireDefault(_dotAccess);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

/**
 * Configuration
 */

var Configuration = (function () {
    function Configuration(config) {
        _classCallCheck(this, Configuration);

        this.config = config;
    }

    _createClass(Configuration, [{
        key: 'read',
        value: function read(key, defaults) {
            return _dotAccess2['default'].get(this.config, key);
        }
    }, {
        key: 'readWithDefaults',
        value: function readWithDefaults(key, defaults) {
            var ret = _dotAccess2['default'].get(this.config, key);
            if (ret) return ret;
            return defaults;
        }
    }, {
        key: 'readAndMerge',
        value: function readAndMerge(key, target, defaults) {
            var ret = this.readWithDefaults(key, defaults);
            return (0, _merge2['default'])(target, ret);
        }
    }]);

    return Configuration;
})();

exports['default'] = Configuration;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25maWd1cmF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt5QkFBc0IsWUFBWTs7OztxQkFDaEIsT0FBTzs7Ozs7Ozs7SUFLbkIsYUFBYTtBQUVKLGFBRlQsYUFBYSxDQUVILE1BQU0sRUFBRTs4QkFGbEIsYUFBYTs7QUFHWCxZQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN4Qjs7aUJBSkMsYUFBYTs7ZUFNWCxjQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUM7QUFDZixtQkFBTyx1QkFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMxQzs7O2VBRWUsMEJBQUMsR0FBRyxFQUFFLFFBQVEsRUFBQztBQUMxQixnQkFBSSxHQUFHLEdBQUcsdUJBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDM0MsZ0JBQUcsR0FBRyxFQUFFLE9BQU8sR0FBRyxDQUFDO0FBQ25CLG1CQUFPLFFBQVEsQ0FBQztTQUNuQjs7O2VBRVcsc0JBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7QUFDaEMsZ0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0MsbUJBQU8sd0JBQU0sTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzdCOzs7V0FuQkMsYUFBYTs7O3FCQXlCSixhQUFhIiwiZmlsZSI6IkNvbmZpZ3VyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRG90QWNjZXNzIGZyb20gJ2RvdC1hY2Nlc3MnO1xuaW1wb3J0IG1lcmdlIGZyb20gJ21lcmdlJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uXG4gKi9cbmNsYXNzIENvbmZpZ3VyYXRpb24ge1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIHJlYWQoa2V5LCBkZWZhdWx0cyl7XG4gICAgICAgIHJldHVybiBEb3RBY2Nlc3MuZ2V0KHRoaXMuY29uZmlnLCBrZXkpO1xuICAgIH1cblxuICAgIHJlYWRXaXRoRGVmYXVsdHMoa2V5LCBkZWZhdWx0cyl7XG4gICAgICAgICB2YXIgcmV0ID0gRG90QWNjZXNzLmdldCh0aGlzLmNvbmZpZywga2V5KTtcbiAgICAgICAgaWYocmV0KSByZXR1cm4gcmV0O1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgcmVhZEFuZE1lcmdlKGtleSwgdGFyZ2V0LCBkZWZhdWx0cykge1xuICAgICAgICB2YXIgcmV0ID0gdGhpcy5yZWFkV2l0aERlZmF1bHRzKGtleSwgZGVmYXVsdHMpO1xuICAgICAgICByZXR1cm4gbWVyZ2UodGFyZ2V0LCByZXQpO1xuICAgIH1cblxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdGlvbiJdfQ==