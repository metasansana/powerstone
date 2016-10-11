import request from 'supertest-as-promised';
import must from 'must';
import Api from 'pwr/api/Api';
import Pool from 'pwr/net/Pool';

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

        xit('should be connected', function() {

            must(Pool.main).equal('fake');

        });

        xit('GET /users/:user/messages', function() {
            return request(app.server.server).
            get('/users/kav/messages').
            expect(200).
            then(res => {
                must(res.body).eql(global.messages.kav);
                must(global.requests).equal(25);
            });
        });

        xit('POST /users/:user/messages', function() {

            return request(app.server.server).
            post('/users/kyle/messages').
            send({
                id: 16,
                message: 'it takes that many.'
            }).
            expect(201).
            then(res =>
                must(global.messages.kyle).eql(['id:16 it takes that many.']));

        });

        xit('GET /users/count', function() {

            return request(app.server.server).
            get('/users/count').
            expect(200).
            then(res => must(res.body.count).eql(Object.keys(global.messages).length));

        });

        xit('GET /users/messages', function() {

            global.requests = 20;

            return request(app.server.server).
            get('/users/messages').
            expect(200).
            then(res => {
                must(global.requests).equal(21);
                must(res.body.messages).eql('Not enabled');
            });

        });

        xit('GET /admin/controls', function() {

            return request(app.server.server).
            get('/admin/controls').
            expect(200);

        });

        xit('GET /admin/panel', function() {

            return request(app.server.server).
            get('/admin/panel').
            expect(403).
            then(res => must(global.flag).eql('set'));

        });

        xit('GET /admin_demo', function() {

            return request(app.server.server).
            get('/admin_demo').
            expect(200);

        });

        it('GET /disabled/home', function() {

            return request(app.server.server).get('/disabled/home').expect(200).
            then(() => {

                app.main.find('/disabled').redirect('http://example.org');

                return request(app.server.server).get('/disabled/home').expects(302);
            }).
            then(res => {
                must(res.header.location).be('http://example.org');
            });

        });

        xit('GET /demo/names.txt', function() {

            return request(app.server.server).
            get('/demo/names.txt').
            expect(200);

        });
    });
});
