import ConnectMongoConnection from './ConnectMongoConnection';
import MongooseConnection from './MongooseConnection';

/**
 * Factory
 */
class Factory {

    create(type, name, options) {

        if(type === Factory.CONNECT_MONGO)
        return new ConnectMongoConnection(name, options);

        if(type === Factory.MONGOOSE)
        return new MongooseConnection(name, options);

    }

}

Factory.CONNECT_MONGO = 'connect-mongo';
Factory.MONGOOSE = 'mongoose';
export default new Factory()