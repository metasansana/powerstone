import restify from 'restify';

class ServerFactory {

   create(main) {

        var s = restify.createServer(main.configuration.readOrDefault('api.options', null));

        s.on('uncaughtException', (req, res, route, err) => {
            res.status(500);
            res.send();
            events.emit('error', err);
        });

        return s;
    }

}

export default new ServerFactory();
