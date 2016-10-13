import 'source-map-support/register';
import request from 'supertest-as-promised';
import must from 'must';
import Web from 'powerstone/web/Web';
import Pool from 'powerstone/net/Pool';

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

            must(Pool.q).equal('fake');

        });

        it('GET /users/:user/messages', function() {
            return request(app.server.server).
            get('/users/kav/messages').
            expect(200).
            then(res => {
                must(global.requests).equal(25);
            });
        });

        it('POST /users/:user/messages', function() {

            return request(app.server.server).
            post('/users/kyle/messages').
            send({
                id: 2,
                message: 'xit takes that many.'
            }).
            expect(201).
            then(res =>
                must(global.messages.kyle).eql(['id:2 xit takes that many.']));

        });

        it('GET /users/count', function() {

            return request(app.server.server).
            get('/users/count').
            expect(200).
            then(res => must(res.body.count).eql(Object.keys(global.messages).length));

        });

        it('GET /users/messages', function() {

            global.requests = 20;

            return request(app.server.server).
            get('/users/messages').
            expect(200).
            then(res => {

                must(res.body).eql({

                    messages: 'Not enabled',
                    status: 'ok',
                    poweredBy: 'powerstone'

                });

                must(global.requests).equal(21);
            });

        });
    });

    it('GET /admin/controls', function() {

        return request(app.server.server).
        get('/admin/controls').
        expect(200);

    });

    it('GET /admin/panel', function() {

        return request(app.server.server).
        get('/admin/panel').
        expect(403).
        then(res => {

            must(global.flag).eql('set');

        });
    });

    xit('GET /admin_demo/me', function() {

        return request(app.server.server).
        get('/admin/admin_demo/me.css').
        expect(200);

    });

    it('GET /disabled/home', function() {

        return request(app.server.server).get('/disabled/home').expect(200).
        then(() => {

            app.main.find('/disabled').redirect('http://example.org');

            return request(app.server.server).get('/disabled/home').expect(302);
        }).
        then(res => {
            console.log(res.header);
            must(res.header.location).be('http://example.org');

        });

    });

    it('GET /admin/demo/names.txt', function() {

        return request(app.server.server).
        get('/admin/demo/names.txt').
        expect(200);

    });

});
