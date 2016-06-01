import request from 'supertest-as-promised';
import must from 'must';
import Api from 'libpowerstone/api/Api';
import Pool from 'libpowerstone/net/Pool';

var app;

class App extends Api {


}

before(function() {

    app = new App(`${__dirname}/assets/projects/voicemail`);
    global.connected = false;
    return app.start();

});

beforeEach(function() {
    global.count = 0;
});

describe('Api', function() {
    describe('.run()', function() {

        global.requests = 24;

        it('should be connected', function() {
            must(Pool.main).equal(null);

        });

        it('GET /users/:user/messages', function() {
            return request(app.server.toFramework()).
            get('/users/kav/messages').
            expect(200).
            then(res => {
                must(res.body).eql(global.messages.kav);
                must(global.requests).equal(25);
            });
        });

        it('POST /users/:user/messages', function() {

            return request(app.server.toFramework()).
            post('/users/kyle/messages').
            send({
                id: 16,
                message: 'it takes that many.'
            }).
            expect(201).
            then(res =>
                must(global.messages.kyle).eql(['id:16 it takes that many.']));

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
                must(res.body.messages).eql('Not enabled');
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
        then(res => must(global.flag).eql('set'));

    });

    it('GET /admin_demo', function() {

        return request(app.server.toFramework()).
        get('/admin_demo').
        expect(200);

    });

});
