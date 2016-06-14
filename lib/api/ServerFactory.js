'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var ServerFactory = (function () {
    function ServerFactory() {
        _classCallCheck(this, ServerFactory);
    }

    _createClass(ServerFactory, [{
        key: 'create',
        value: function create(main) {

            var s = _restify2['default'].createServer(main.configuration.readOrDefault('api.options', null));

            s.on('uncaughtException', function (req, res, route, err) {
                res.status(500);
                res.send();
                events.emit('error', err);
            });

            return s;
        }
    }]);

    return ServerFactory;
})();

exports['default'] = new ServerFactory();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvU2VydmVyRmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7dUJBQW9CLFNBQVM7Ozs7SUFFdkIsYUFBYTthQUFiLGFBQWE7OEJBQWIsYUFBYTs7O2lCQUFiLGFBQWE7O2VBRVYsZ0JBQUMsSUFBSSxFQUFFOztBQUVSLGdCQUFJLENBQUMsR0FBRyxxQkFBUSxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7O0FBRXBGLGFBQUMsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUs7QUFDaEQsbUJBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEIsbUJBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNYLHNCQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQzthQUM3QixDQUFDLENBQUM7O0FBRUgsbUJBQU8sQ0FBQyxDQUFDO1NBQ1o7OztXQWJDLGFBQWE7OztxQkFpQkosSUFBSSxhQUFhLEVBQUUiLCJmaWxlIjoiU2VydmVyRmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXN0aWZ5IGZyb20gJ3Jlc3RpZnknO1xuXG5jbGFzcyBTZXJ2ZXJGYWN0b3J5IHtcblxuICAgY3JlYXRlKG1haW4pIHtcblxuICAgICAgICB2YXIgcyA9IHJlc3RpZnkuY3JlYXRlU2VydmVyKG1haW4uY29uZmlndXJhdGlvbi5yZWFkT3JEZWZhdWx0KCdhcGkub3B0aW9ucycsIG51bGwpKTtcblxuICAgICAgICBzLm9uKCd1bmNhdWdodEV4Y2VwdGlvbicsIChyZXEsIHJlcywgcm91dGUsIGVycikgPT4ge1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApO1xuICAgICAgICAgICAgcmVzLnNlbmQoKTtcbiAgICAgICAgICAgIGV2ZW50cy5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgU2VydmVyRmFjdG9yeSgpO1xuIl19