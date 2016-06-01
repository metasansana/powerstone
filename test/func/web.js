import request from 'supertest-as-promised';
import must from 'must';
import Web from '../../src/web/Web';

var app;

class App extends Web {}

before(function() {

    app = new Web(`${__dirname}/assets/projects/voicemail`);
    global.connected = false;
    return app.start();

});

beforeEach(function() {
    global.count = 0;
});

after(function() {

    global.flag = null;

});

describe('Application', function() {
    describe('.run()', function() {

        global.requests = 24;

        it('should be connected', function() {

            must(global.connected).equal(true);

        });

        xit('GET /users/:user/messages', function() {
            return request(app.server.toFramework()).
            get('/users/kav/messages').
            expect(200).
            then(res => {
                must(global.requests).equal(25);
            });
        });

        xit('POST /users/:user/messages', function() {

            return request(app.server.toFramework()).
            post('/users/kyle/messages').
            send({
                id: 2,
                message: 'xit takes that many.'
            }).
            expect(201).
            then(res =>
                must(global.messages.kyle).eql(['id:16 xit takes that many.']));

        });

        xit('GET /users/count', function() {

            return request(app.server.toFramework()).
            get('/users/count').
            expect(200).
            then(res => must(res.body.count).eql(Object.keys(global.messages).length));

        });

        xit('GET /users/messages', function() {

            global.requests = 20;

            return request(app.server.toFramework()).
            get('/users/messages').
            expect(200).
            then(res => {
                must(global.requests).equal(21);
            });

        });
    });

    xit('GET /admin/controls', function() {

        return request(app.server.toFramework()).
        get('/admin/controls').
        expect(200);

    });

    xit('GET /admin/panel', function() {

        return request(app.server.toFramework()).
        get('/admin/panel').
        expect(403).
        then(res => {

            must(global.flag).eql('set');

        });
    });

    xit('GET /admin/admin_demo', function() {

        return request(app.server.toFramework()).
        get('/admin/admin_demo').
        expect(200);

    });

});
