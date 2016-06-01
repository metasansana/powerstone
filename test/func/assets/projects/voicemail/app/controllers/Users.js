import Controller from 'libpowerstone/api/Controller';

/**
 * Users 
 */
class Users extends Controller {

    count() {
        this.response.send({
            count: Object.keys(global.messages).length
        });
    }

    messages() {
        this.response.send({
            messages: 'Not enabled'
        });
    }

}
export default Users
