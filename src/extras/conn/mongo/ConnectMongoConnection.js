import AbstractConnection from '../../../conn/AbstractConnection';
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
        var MongoConnection = cmongo(session);
        this.connection = new MongoConnection(this.options);
        resolve(this.connection);
    }

    __close__(resolve, reject) {

        resolve(this.connection);

    }
}

export default ConnectMongoConnection