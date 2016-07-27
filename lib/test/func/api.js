'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var _libpowerstoneApiApi = require('libpowerstone/api/Api');

var _libpowerstoneApiApi2 = _interopRequireDefault(_libpowerstoneApiApi);

var _libpowerstoneNetPool = require('libpowerstone/net/Pool');

var _libpowerstoneNetPool2 = _interopRequireDefault(_libpowerstoneNetPool);

var app;

var App = (function (_Api) {
    _inherits(App, _Api);

    function App() {
        _classCallCheck(this, App);

        _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
    }

    return App;
})(_libpowerstoneApiApi2['default']);

before(function () {

    app = new App(__dirname + '/assets/projects/voicemail');
    global.connected = false;
    return app.start();
});

beforeEach(function () {
    global.count = 0;
});

describe('Api', function () {
    describe('.run()', function () {

        global.requests = 24;

        it('should be connected', function () {
            (0, _must2['default'])(_libpowerstoneNetPool2['default'].main).equal('fake');
        });

        it('GET /users/:user/messages', function () {
            return (0, _supertestAsPromised2['default'])(app.server.toFramework()).get('/users/kav/messages').expect(200).then(function (res) {
                (0, _must2['default'])(res.body).eql(global.messages.kav);
                (0, _must2['default'])(global.requests).equal(25);
            });
        });

        it('POST /users/:user/messages', function () {

            return (0, _supertestAsPromised2['default'])(app.server.toFramework()).post('/users/kyle/messages').send({
                id: 16,
                message: 'it takes that many.'
            }).expect(201).then(function (res) {
                return (0, _must2['default'])(global.messages.kyle).eql(['id:16 it takes that many.']);
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
                (0, _must2['default'])(res.body.messages).eql('Not enabled');
            });
        });
    });

    it('GET /admin/controls', function () {

        return (0, _supertestAsPromised2['default'])(app.server.toFramework()).get('/admin/controls').expect(200);
    });

    it('GET /admin/panel', function () {

        return (0, _supertestAsPromised2['default'])(app.server.toFramework()).get('/admin/panel').expect(403).then(function (res) {
            return (0, _must2['default'])(global.flag).eql('set');
        });
    });

    it('GET /admin_demo', function () {

        return (0, _supertestAsPromised2['default'])(app.server.toFramework()).get('/admin_demo').expect(200);
    });

    xit('GET /demo/names.txt', function () {

        return (0, _supertestAsPromised2['default'])(app.server.toFramework()).get('/demo/names.txt').expect(200);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L2Z1bmMvYXBpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7bUNBQW9CLHVCQUF1Qjs7OztvQkFDMUIsTUFBTTs7OzttQ0FDUCx1QkFBdUI7Ozs7b0NBQ3RCLHdCQUF3Qjs7OztBQUV6QyxJQUFJLEdBQUcsQ0FBQzs7SUFFRixHQUFHO2NBQUgsR0FBRzs7YUFBSCxHQUFHOzhCQUFILEdBQUc7O21DQUFILEdBQUc7OztXQUFILEdBQUc7OztBQUtULE1BQU0sQ0FBQyxZQUFXOztBQUVkLE9BQUcsR0FBRyxJQUFJLEdBQUcsQ0FBSSxTQUFTLGdDQUE2QixDQUFDO0FBQ3hELFVBQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLFdBQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0NBRXRCLENBQUMsQ0FBQzs7QUFFSCxVQUFVLENBQUMsWUFBVztBQUNsQixVQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztDQUNwQixDQUFDLENBQUM7O0FBRUgsUUFBUSxDQUFDLEtBQUssRUFBRSxZQUFXO0FBQ3ZCLFlBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBVzs7QUFFMUIsY0FBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRXJCLFVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxZQUFXO0FBQ2pDLG1DQUFLLGtDQUFLLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUVqQyxDQUFDLENBQUM7O0FBRUgsVUFBRSxDQUFDLDJCQUEyQixFQUFFLFlBQVc7QUFDdkMsbUJBQU8sc0NBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUN4QyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNYLElBQUksQ0FBQyxVQUFBLEdBQUcsRUFBSTtBQUNSLHVDQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFB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LENBQUMsV0FBVyxFQUFFLENBQUMsQ0FDeEMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUVmLENBQUMsQ0FBQztDQUVOLENBQUMsQ0FBQyIsImZpbGUiOiJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcnRlc3QtYXMtcHJvbWlzZWQnO1xuaW1wb3J0IG11c3QgZnJvbSAnbXVzdCc7XG5pbXBvcnQgQXBpIGZyb20gJ2xpYnBvd2Vyc3RvbmUvYXBpL0FwaSc7XG5pbXBvcnQgUG9vbCBmcm9tICdsaWJwb3dlcnN0b25lL25ldC9Qb29sJztcblxudmFyIGFwcDtcblxuY2xhc3MgQXBwIGV4dGVuZHMgQXBpIHtcblxuXG59XG5cbmJlZm9yZShmdW5jdGlvbigpIHtcblxuICAgIGFwcCA9IG5ldyBBcHAoYCR7X19kaXJuYW1lfS9hc3NldHMvcHJvamVjdHMvdm9pY2VtYWlsYCk7XG4gICAgZ2xvYmFsLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgIHJldHVybiBhcHAuc3RhcnQoKTtcblxufSk7XG5cbmJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgZ2xvYmFsLmNvdW50ID0gMDtcbn0pO1xuXG5kZXNjcmliZSgnQXBpJywgZnVuY3Rpb24oKSB7XG4gICAgZGVzY3JpYmUoJy5ydW4oKScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGdsb2JhbC5yZXF1ZXN0cyA9IDI0O1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgY29ubmVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtdXN0KFBvb2wubWFpbikuZXF1YWwoJ2Zha2UnKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnR0VUIC91c2Vycy86dXNlci9tZXNzYWdlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QoYXBwLnNlcnZlci50b0ZyYW1ld29yaygpKS5cbiAgICAgICAgICAgIGdldCgnL3VzZXJzL2thdi9tZXNzYWdlcycpLlxuICAgICAgICAgICAgZXhwZWN0KDIwMCkuXG4gICAgICAgICAgICB0aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgbXVzdChyZXMuYm9keSkuZXFsKGdsb2JhbC5tZXNzYWdlcy5rYXYpO1xuICAgICAgICAgICAgICAgIG11c3QoZ2xvYmFsLnJlcXVlc3RzKS5lcXVhbCgyNSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ1BPU1QgL3VzZXJzLzp1c2VyL21lc3NhZ2VzJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0KGFwcC5zZXJ2ZXIudG9GcmFtZXdvcmsoKSkuXG4gICAgICAgICAgICBwb3N0KCcvdXNlcnMva3lsZS9tZXNzYWdlcycpLlxuICAgICAgICAgICAgc2VuZCh7XG4gICAgICAgICAgICAgICAgaWQ6IDE2LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpdCB0YWtlcyB0aGF0IG1hbnkuJ1xuICAgICAgICAgICAgfSkuXG4gICAgICAgICAgICBleHBlY3QoMjAxKS5cbiAgICAgICAgICAgIHRoZW4ocmVzID0+XG4gICAgICAgICAgICAgICAgbXVzdChnbG9iYWwubWVzc2FnZXMua3lsZSkuZXFsKFsnaWQ6MTYgaXQgdGFrZXMgdGhhdCBtYW55LiddKSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ0dFVCAvdXNlcnMvY291bnQnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QoYXBwLnNlcnZlci50b0ZyYW1ld29yaygpKS5cbiAgICAgICAgICAgIGdldCgnL3VzZXJzL2NvdW50JykuXG4gICAgICAgICAgICBleHBlY3QoMjAwKS5cbiAgICAgICAgICAgIHRoZW4ocmVzID0+IG11c3QocmVzLmJvZHkuY291bnQpLmVxbChPYmplY3Qua2V5cyhnbG9iYWwubWVzc2FnZXMpLmxlbmd0aCkpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdHRVQgL3VzZXJzL21lc3NhZ2VzJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGdsb2JhbC5yZXF1ZXN0cyA9IDIwO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdChhcHAuc2VydmVyLnRvRnJhbWV3b3JrKCkpLlxuICAgICAgICAgICAgZ2V0KCcvdXNlcnMvbWVzc2FnZXMnKS5cbiAgICAgICAgICAgIGV4cGVjdCgyMDApLlxuICAgICAgICAgICAgdGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIG11c3QoZ2xvYmFsLnJlcXVlc3RzKS5lcXVhbCgyMSk7XG4gICAgICAgICAgICAgICAgbXVzdChyZXMuYm9keS5tZXNzYWdlcykuZXFsKCdOb3QgZW5hYmxlZCcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnR0VUIC9hZG1pbi9jb250cm9scycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiByZXF1ZXN0KGFwcC5zZXJ2ZXIudG9GcmFtZXdvcmsoKSkuXG4gICAgICAgIGdldCgnL2FkbWluL2NvbnRyb2xzJykuXG4gICAgICAgIGV4cGVjdCgyMDApO1xuXG4gICAgfSk7XG5cbiAgICBpdCgnR0VUIC9hZG1pbi9wYW5lbCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiByZXF1ZXN0KGFwcC5zZXJ2ZXIudG9GcmFtZXdvcmsoKSkuXG4gICAgICAgIGdldCgnL2FkbWluL3BhbmVsJykuXG4gICAgICAgIGV4cGVjdCg0MDMpLlxuICAgICAgICB0aGVuKHJlcyA9PiBtdXN0KGdsb2JhbC5mbGFnKS5lcWwoJ3NldCcpKTtcblxuICAgIH0pO1xuXG4gICAgaXQoJ0dFVCAvYWRtaW5fZGVtbycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiByZXF1ZXN0KGFwcC5zZXJ2ZXIudG9GcmFtZXdvcmsoKSkuXG4gICAgICAgIGdldCgnL2FkbWluX2RlbW8nKS5cbiAgICAgICAgZXhwZWN0KDIwMCk7XG5cbiAgICB9KTtcblxuICAgIHhpdCgnR0VUIC9kZW1vL25hbWVzLnR4dCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiByZXF1ZXN0KGFwcC5zZXJ2ZXIudG9GcmFtZXdvcmsoKSkuXG4gICAgICAgIGdldCgnL2RlbW8vbmFtZXMudHh0JykuXG4gICAgICAgIGV4cGVjdCgyMDApO1xuXG4gICAgfSk7XG5cbn0pO1xuIl19