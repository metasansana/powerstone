'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ServerFactory = require('../ServerFactory');

var _ServerFactory2 = _interopRequireDefault(_ServerFactory);

/**
 * WebServerFactory
 */

var WebServerFactory = (function () {
    function WebServerFactory() {
        _classCallCheck(this, WebServerFactory);
    }

    _createClass(WebServerFactory, [{
        key: 'create',
        value: function create(app, options) {

            if (options) return _ServerFactory2['default'].createSecureNativeWebServer(options, app);

            return _ServerFactory2['default'].createNativeWebServer(app);
        }
    }]);

    return WebServerFactory;
})();

exports['default'] = new WebServerFactory();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWIvV2ViU2VydmVyRmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7NkJBQTBCLGtCQUFrQjs7Ozs7Ozs7SUFLdEMsZ0JBQWdCO2FBQWhCLGdCQUFnQjs4QkFBaEIsZ0JBQWdCOzs7aUJBQWhCLGdCQUFnQjs7ZUFFWixnQkFBQyxHQUFHLEVBQUUsT0FBTyxFQUFDOztBQUVoQixnQkFBRyxPQUFPLEVBQ1YsT0FBTywyQkFBYywyQkFBMkIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7O0FBRS9ELG1CQUFPLDJCQUFjLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25EOzs7V0FSQyxnQkFBZ0I7OztxQkFZUCxJQUFJLGdCQUFnQixFQUFFIiwiZmlsZSI6IldlYlNlcnZlckZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmVyRmFjdG9yeSBmcm9tICcuLi9TZXJ2ZXJGYWN0b3J5JztcblxuLyoqXG4gKiBXZWJTZXJ2ZXJGYWN0b3J5XG4gKi9cbmNsYXNzIFdlYlNlcnZlckZhY3Rvcnkge1xuXG4gICAgY3JlYXRlKGFwcCwgb3B0aW9ucyl7XG5cbiAgICAgICAgaWYob3B0aW9ucylcbiAgICAgICAgcmV0dXJuIFNlcnZlckZhY3RvcnkuY3JlYXRlU2VjdXJlTmF0aXZlV2ViU2VydmVyKG9wdGlvbnMsIGFwcCk7XG5cbiAgICAgICAgcmV0dXJuIFNlcnZlckZhY3RvcnkuY3JlYXRlTmF0aXZlV2ViU2VydmVyKGFwcCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBXZWJTZXJ2ZXJGYWN0b3J5KCkiXX0=