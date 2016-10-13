import Controller from 'powerstone/app/Controller';

/**
 * Users
 */
class Users extends Controller {

    ok(req, res) {

        res.send(200);

    }

    nok(req, res) {

        res.send(403);

    }

    sendUser(req, res) {

        res.send(200, global.messages[req.params.user]);

    }

    createMessage(req, res) {

        global.messages[req.params.user] = global.messages[req.params.user] || [];
        global.messages[req.params.user].push(`id:${req.body.id} ${req.body.message}`);
        res.send(201);

    }

    count(req, res) {

        res.send(200, {
            count: Object.keys(global.messages).length
        });

    }

    messages(req, res) {
        res.send(200, {
            messages: 'Not enabled'
        });
    }

}
export default Users
