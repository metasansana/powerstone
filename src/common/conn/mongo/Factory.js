import ConnectMongoConnection from './ConnectMongoConnection';
import MongooseConnection from './MongooseConnection';

/**
 * Factory
 */
class Factory {

    create(name, type, options) {

        if(type === Factory.CONNECT_MONGO)
        return new ConnectMongoConnection(name, options);

        if(type === Factory.MONGOOSE)
        return new MongooseConnection(name, options);

        throw new Error('Attention: The mongo Factory only supports connect-mongo and mongoose! Not type "'+type+'"!');

    }

}

Factory.CONNECT_MONGO = 'connect-mongo';
Factory.MONGOOSE = 'mongoose';
export default new Factory()