import request from 'supertest-as-promised';
import must from 'must';
import Application from '../../src/web/Application';

var app;

before(function() {

    app = new Application(`${__dirname}/assets/projects/voicemail`);
    global.connected = false;
    return app.run();

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

        it('GET /users/:user/messages', function() {
            return request(app.server.toFramework()).
            get('/users/kav/messages').
            expect(200).
            then(res => {
                must(global.requests).equal(25);
            });
        });

        it('POST /users/:user/messages', function() {

            return request(app.server.toFramework()).
            post('/users/kyle/messages').
            send({
                id: 2,
                message: 'It takes that many.'
            }).
            expect(201).
            then(res =>
                must(global.messages.kyle).eql(['id:16 It takes that many.']));

        });

        it('GET /users/count', function() {

            return request(app.server.toFramework()).
            get('/users/count').
            expect(200).
            then(res => must(res.body.count).eql(Object.keys(global.messages).length));

        });

        it('GET /users/messages', function() {

            global.requests = 20;

            return request(app.server.toFramework()).
            get('/users/messages').
            expect(200).
            then(res => {
                must(global.requests).equal(21);
            });

        });
    });

    it('GET /admin/controls', function() {

        return request(app.server.toFramework()).
        get('/admin/controls').
        expect(200);

    });

    it('GET /admin/panel', function() {

        return request(app.server.toFramework()).
        get('/admin/panel').
        expect(403).
        then(res => {

            must(global.flag).eql('set');

        });
    });

    it('GET /admin/admin_demo', function() {

        return request(app.server.toFramework()).
        get('/admin/admin_demo').
        expect(200);

    });

});
