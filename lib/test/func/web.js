'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('source-map-support/register');

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var _libpowerstoneWebWeb = require('libpowerstone/web/Web');

var _libpowerstoneWebWeb2 = _interopRequireDefault(_libpowerstoneWebWeb);

var _libpowerstoneNetPool = require('libpowerstone/net/Pool');

var _libpowerstoneNetPool2 = _interopRequireDefault(_libpowerstoneNetPool);

var app;

var App = (function (_Web) {
    _inherits(App, _Web);

    function App() {
        _classCallCheck(this, App);

        _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
    }

    return App;
})(_libpowerstoneWebWeb2['default']);

before(function () {

    app = new _libpowerstoneWebWeb2['default'](__dirname + '/assets/projects/voicemail');
    global.connected = false;
    return app.start();
});

beforeEach(function () {
    global.count = 0;
});

after(function () {

    global.flag = null;
});

describe('Application', function () {
    describe('.run()', function () {

        global.requests = 24;

        it('should be connected', function () {

            (0, _must2['default'])(_libpowerstoneNetPool2['default'].q).equal('fake');
        });

        it('GET /users/:user/messages', function () {
            return (0, _supertestAsPromised2['default'])(app.server.toFramework()).get('/users/kav/messages').expect(200).then(function (res) {
                (0, _must2['default'])(global.requests).equal(25);
            });
        });

        it('POST /users/:user/messages', function () {

            return (0, _supertestAsPromised2['default'])(app.server.toFramework()).post('/users/kyle/messages').send({
                id: 2,
                message: 'xit takes that many.'
            }).expect(201).then(function (res) {
                return (0, _must2['default'])(global.messages.kyle).eql(['id:2 xit takes that many.']);
            });
        });

        it('GET /users/count', function () {

            return (0, _supertestAsPromised2['default'])(app.server.toFramework()).get('/users/count').expect(200).then(function (res) {
                return (0, _must2['default'])(res.body.count).eql(Object.keys(global.messages).length);
            });
        });

        it('GET /users/messages', function () {

            global.requests = 20;

            return (0, _supertestAsPromised2['default'])(app.server.toFramework()).get('/users/messages').expect(200).then(function (res) {
                (0, _must2['default'])(global.requests).equal(21);
            });
        });
    });

    it('GET /admin/controls', function () {

        return (0, _supertestAsPromised2['default'])(app.server.toFramework()).get('/admin/controls').expect(200);
    });

    it('GET /admin/panel', function () {

        return (0, _supertestAsPromised2['default'])(app.server.toFramework()).get('/admin/panel').expect(403).then(function (res) {

            (0, _must2['default'])(global.flag).eql('set');
        });
    });

    xit('GET /admin_demo/me', function () {

        return (0, _supertestAsPromised2['default'])(app.server.toFramework()).get('/admin/admin_demo/me.css').expect(200);
    });

    it('GET /admin/demo/names.txt', function () {

        return (0, _supertestAsPromised2['default'])(app.server.toFramework()).get('/admin/demo/names.txt').expect(200);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L2Z1bmMvd2ViLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7UUFBTyw2QkFBNkI7O21DQUNoQix1QkFBdUI7Ozs7b0JBQzFCLE1BQU07Ozs7bUNBQ1AsdUJBQXVCOzs7O29DQUN0Qix3QkFBd0I7Ozs7QUFFekMsSUFBSSxHQUFHLENBQUM7O0lBRUYsR0FBRztjQUFILEdBQUc7O2FBQUgsR0FBRzs4QkFBSCxHQUFHOzttQ0FBSCxHQUFHOzs7V0FBSCxHQUFHOzs7QUFFVCxNQUFNLENBQUMsWUFBVzs7QUFFZCxPQUFHLEdBQUcscUNBQVcsU0FBUyxnQ0FBNkIsQ0FBQztBQUN4RCxVQUFNLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN6QixXQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUV0QixDQUFDLENBQUM7O0FBRUgsVUFBVSxDQUFDLFlBQVc7QUFDbEIsVUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Q0FDcEIsQ0FBQyxDQUFDOztBQUVILEtBQUssQ0FBQyxZQUFXOztBQUViLFVBQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBRXRCLENBQUMsQ0FBQzs7QUFFSCxRQUFRLENBQUMsYUFBYSxFQUFFLFlBQVc7QUFDL0IsWUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFXOztBQUUxQixjQUFNLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFckIsVUFBRSxDQUFDLHFCQUFxQixFQUFFLFlBQVc7O0FBRWpDLG1DQUFLLGtDQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUU5QixDQUFDLENBQUM7O0FBRUgsVUFBRSxDQUFDLDJCQUEyQixFQUFFLFlBQVc7QUFDdkMsbUJBQU8sc0NBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUN4QyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxD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LEdBQUcsQ0FBQyxDQUFDO0tBRWYsQ0FBQyxDQUFDO0NBRU4sQ0FBQyxDQUFDIiwiZmlsZSI6IndlYi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3N1cGVydGVzdC1hcy1wcm9taXNlZCc7XG5pbXBvcnQgbXVzdCBmcm9tICdtdXN0JztcbmltcG9ydCBXZWIgZnJvbSAnbGlicG93ZXJzdG9uZS93ZWIvV2ViJztcbmltcG9ydCBQb29sIGZyb20gJ2xpYnBvd2Vyc3RvbmUvbmV0L1Bvb2wnO1xuXG52YXIgYXBwO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBXZWIge31cblxuYmVmb3JlKGZ1bmN0aW9uKCkge1xuXG4gICAgYXBwID0gbmV3IFdlYihgJHtfX2Rpcm5hbWV9L2Fzc2V0cy9wcm9qZWN0cy92b2ljZW1haWxgKTtcbiAgICBnbG9iYWwuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIGFwcC5zdGFydCgpO1xuXG59KTtcblxuYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICBnbG9iYWwuY291bnQgPSAwO1xufSk7XG5cbmFmdGVyKGZ1bmN0aW9uKCkge1xuXG4gICAgZ2xvYmFsLmZsYWcgPSBudWxsO1xuXG59KTtcblxuZGVzY3JpYmUoJ0FwcGxpY2F0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgZGVzY3JpYmUoJy5ydW4oKScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGdsb2JhbC5yZXF1ZXN0cyA9IDI0O1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgY29ubmVjdGVkJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIG11c3QoUG9vbC5xKS5lcXVhbCgnZmFrZScpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdHRVQgL3VzZXJzLzp1c2VyL21lc3NhZ2VzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdChhcHAuc2VydmVyLnRvRnJhbWV3b3JrKCkpLlxuICAgICAgICAgICAgZ2V0KCcvdXNlcnMva2F2L21lc3NhZ2VzJykuXG4gICAgICAgICAgICBleHBlY3QoMjAwKS5cbiAgICAgICAgICAgIHRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBtdXN0KGdsb2JhbC5yZXF1ZXN0cykuZXF1YWwoMjUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdQT1NUIC91c2Vycy86dXNlci9tZXNzYWdlcycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdChhcHAuc2VydmVyLnRvRnJhbWV3b3JrKCkpLlxuICAgICAgICAgICAgcG9zdCgnL3VzZXJzL2t5bGUvbWVzc2FnZXMnKS5cbiAgICAgICAgICAgIHNlbmQoe1xuICAgICAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICd4aXQgdGFrZXMgdGhhdCBtYW55LidcbiAgICAgICAgICAgIH0pLlxuICAgICAgICAgICAgZXhwZWN0KDIwMSkuXG4gICAgICAgICAgICB0aGVuKHJlcyA9PlxuICAgICAgICAgICAgICAgIG11c3QoZ2xvYmFsLm1lc3NhZ2VzLmt5bGUpLmVxbChbJ2lkOjIgeGl0IHRha2VzIHRoYXQgbWFueS4nXSkpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdHRVQgL3VzZXJzL2NvdW50JywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0KGFwcC5zZXJ2ZXIudG9GcmFtZXdvcmsoKSkuXG4gICAgICAgICAgICBnZXQoJy91c2Vycy9jb3VudCcpLlxuICAgICAgICAgICAgZXhwZWN0KDIwMCkuXG4gICAgICAgICAgICB0aGVuKHJlcyA9PiBtdXN0KHJlcy5ib2R5LmNvdW50KS5lcWwoT2JqZWN0LmtleXMoZ2xvYmFsLm1lc3NhZ2VzKS5sZW5ndGgpKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnR0VUIC91c2Vycy9tZXNzYWdlcycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBnbG9iYWwucmVxdWVzdHMgPSAyMDtcblxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QoYXBwLnNlcnZlci50b0ZyYW1ld29yaygpKS5cbiAgICAgICAgICAgIGdldCgnL3VzZXJzL21lc3NhZ2VzJykuXG4gICAgICAgICAgICBleHBlY3QoMjAwKS5cbiAgICAgICAgICAgIHRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBtdXN0KGdsb2JhbC5yZXF1ZXN0cykuZXF1YWwoMjEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnR0VUIC9hZG1pbi9jb250cm9scycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiByZXF1ZXN0KGFwcC5zZXJ2ZXIudG9GcmFtZXdvcmsoKSkuXG4gICAgICAgIGdldCgnL2FkbWluL2NvbnRyb2xzJykuXG4gICAgICAgIGV4cGVjdCgyMDApO1xuXG4gICAgfSk7XG5cbiAgICBpdCgnR0VUIC9hZG1pbi9wYW5lbCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiByZXF1ZXN0KGFwcC5zZXJ2ZXIudG9GcmFtZXdvcmsoKSkuXG4gICAgICAgIGdldCgnL2FkbWluL3BhbmVsJykuXG4gICAgICAgIGV4cGVjdCg0MDMpLlxuICAgICAgICB0aGVuKHJlcyA9PiB7XG5cbiAgICAgICAgICAgIG11c3QoZ2xvYmFsLmZsYWcpLmVxbCgnc2V0Jyk7XG5cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ0dFVCAvYWRtaW5fZGVtby9tZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiByZXF1ZXN0KGFwcC5zZXJ2ZXIudG9GcmFtZXdvcmsoKSkuXG4gICAgICAgIGdldCgnL2FkbWluL2FkbWluX2RlbW8vbWUuY3NzJykuXG4gICAgICAgIGV4cGVjdCgyMDApO1xuXG4gICAgfSk7XG5cblxuICAgIGl0KCdHRVQgL2FkbWluL2RlbW8vbmFtZXMudHh0JywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgcmV0dXJuIHJlcXVlc3QoYXBwLnNlcnZlci50b0ZyYW1ld29yaygpKS5cbiAgICAgICAgZ2V0KCcvYWRtaW4vZGVtby9uYW1lcy50eHQnKS5cbiAgICAgICAgZXhwZWN0KDIwMCk7XG5cbiAgICB9KTtcblxufSk7XG4iXX0=