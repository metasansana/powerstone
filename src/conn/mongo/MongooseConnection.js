import AbstractConnection from '../AbstractConnection';
import mongoose from 'mongoose';

class MongooseConnection extends AbstractConnection {

    constructor(name, options) {
        super(name, options);
        this.options.url = this.options.url ||
            process.env.MONGO_URI ||
            process.env.MONGO_URI;
    }

    __open__(resolve, reject) {

        this.connection = mongoose.createConnection(this.options.url, this.options);
        this.Schema = mongoose.Schema;

        this.connection.on('open', function (err) {
            if (err) return reject(err);
            resolve(this.connection);
        });

        this.connection.on('error', function (err) {
            throw err
        });


    }

    __close__(resolve, reject) {
        this.connection.close(resolve);
    }

}

export default MongooseConnection;