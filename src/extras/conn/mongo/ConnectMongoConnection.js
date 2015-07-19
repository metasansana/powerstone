import AbstractConnection from '../../../connectionsConnection';
import session from 'express-session';
import cmongo from  'connect-mongo';

class ConnectMongoConnection extends AbstractConnection {

    constructor(name, options) {
        super(name, options);
        this.options.url = this.options.url ||
            process.env.MONGO_URI ||
            process.env.MONGO_URI;
    }

    __open__(resolve, reject) {
        var MongoStore = cmongo(session);
        this.store = new MongoStore(this.options);
        resolve(this.store);
    }

    __close__(resolve, reject) {

        resolve(this.store);

    }
}

export default ConnectMongoConnection