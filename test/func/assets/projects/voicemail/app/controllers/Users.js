import Promise from 'bluebird';
import Controller from 'powerstone/app/Controller';

/**
 * Users
 */
class Users extends Controller {

    constructor(action, module, app) {

        super(action, module, app);

        this.filters = {

            'sendUser': {

                apply(req, res, next) {

                    global.sendUserFilter = true;
                    next();

                }

            }

        };

    }

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

    error(req, res) {

        return Promise.reject(new Error('Some error'));

    }

}
export default Users
