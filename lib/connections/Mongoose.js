var Connection = require('./Connection');
var mongoose = require('mongoose');

function Mongoose() {

    Connection.apply(this, arguments);
    this.options.url = this.options.url ||
        process.env.MONGO_URI ||
        process.env.MONGO_URI;


}

Mongoose.prototype = Object.create(Connection.prototype);
Mongoose.prototype.constructor = Mongoose;
Mongoose.parent = Connection;

Mongoose.prototype.__open__ = function (resolve, reject) {

    this.connection = mongoose.createConnection(this.options.url, this.options);
    this.Schema = mongoose.Schema;

    this.connection.on('open', function (err) {
        if (err) return reject(err);
        resolve(this.connection);
    });

    this.connection.on('error', function (err) {
        throw err
    });


};

Mongoose.prototype.__close__ = function (resolve, reject) {

    this.connection.close(resolve);

};


module.exports = Mongoose;