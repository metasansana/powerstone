'use strict';

require('source-map-support/register');

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

var _Web2 = require('powerstone/web/Web');

var _Web3 = _interopRequireDefault(_Web2);

var _Pool = require('powerstone/net/Pool');

var _Pool2 = _interopRequireDefault(_Pool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var app;
var error;

var App = function (_Web) {
    _inherits(App, _Web);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    return App;
}(_Web3.default);

before(function () {

    app = new _Web3.default(__dirname + '/assets/projects/voicemail');

    app.setOnRouteErrorListener({
        onRouteError: function onRouteError(err, req, res) {

            error = err;
            res.error(err);
        }
    });

    error = null;
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

            (0, _must2.default)(_Pool2.default.q).equal('fake');
        });

        it('GET /users/:user/messages', function () {
            return (0, _supertestAsPromised2.default)(app.server.server).get('/users/kav/messages').expect(200).then(function (res) {
                (0, _must2.default)(global.requests).equal(25);
            });
        });

        it('POST /users/:user/messages', function () {

            return (0, _supertestAsPromised2.default)(app.server.server).post('/users/kyle/messages').send({
                id: 2,
                message: 'xit takes that many.'
            }).expect(201).then(function (res) {
                return (0, _must2.default)(global.messages.kyle).eql(['id:2 xit takes that many.']);
            });
        });

        it('GET /users/count', function () {

            return (0, _supertestAsPromised2.default)(app.server.server).get('/users/count').expect(200).then(function (res) {
                return (0, _must2.default)(res.body.count).eql(Object.keys(global.messages).length);
            });
        });

        it('GET /users/messages', function () {

            global.requests = 20;

            return (0, _supertestAsPromised2.default)(app.server.server).get('/users/messages').expect(200).then(function (res) {

                (0, _must2.default)(res.body).eql({

                    messages: 'Not enabled',
                    status: 'ok',
                    poweredBy: 'powerstone'

                });

                (0, _must2.default)(global.requests).equal(21);
            });
        });
    });

    it('GET /admin/controls', function () {

        return (0, _supertestAsPromised2.default)(app.server.server).get('/admin/controls').expect(200);
    });

    it('GET /admin/panel', function () {

        return (0, _supertestAsPromised2.default)(app.server.server).get('/admin/panel').expect(403).then(function (res) {

            (0, _must2.default)(global.flag).eql('set');
        });
    });

    xit('GET /admin_demo/me', function () {

        return (0, _supertestAsPromised2.default)(app.server.server).get('/admin/admin_demo/me.css').expect(200);
    });

    it('GET /disabled/home', function () {

        return (0, _supertestAsPromised2.default)(app.server.server).get('/disabled/home').expect(200).then(function () {

            app.main.find('/disabled').redirect('http://example.org');

            return (0, _supertestAsPromised2.default)(app.server.server).get('/disabled/home').expect(302);
        }).then(function (res) {
            console.log(res.header);
            (0, _must2.default)(res.header.location).be('http://example.org');
        });
    });

    it('GET /admin/demo/names.txt', function () {

        return (0, _supertestAsPromised2.default)(app.server.server).get('/admin/demo/names.txt').expect(200);
    });

    it('GET /error', function () {

        return (0, _supertestAsPromised2.default)(app.server.server).get('/error').expect(500).then(function () {
            return (0, _must2.default)(error).be.instanceOf(Error);
        });
    });
});