import request from 'supertest-as-promised';
import must from 'must';
import Api from 'libpowerstone/api/Api';

var app;

class App extends Api {


}

before(function() {

    app = new App(`${__dirname}/assets/projects/voicemail`);
    global.connected = false;
    return app.run();

});

beforeEach(function() {
    global.count = 0;
});

describe('Api', function() {
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
                must(res.body).eql(global.messages.kav);
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
                must(res.body.messages).eql('Not enabled');
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
        then(res => must(global.flag).eql('set'));

    });

    xit('GET /admin_demo', function() {

        return request(app.server.toFramework()).
        get('/admin_demo').
        expect(200);

    });

});
