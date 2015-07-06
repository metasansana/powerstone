var Connection = require('./Connection');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

function ConnectMongo() {

    Connection.apply(this, arguments);
    this.options.url = this.options.url ||
        process.env.MONGO_URI ||
        process.env.MONGO_URI;


}

ConnectMongo.prototype = Object.create(Connection.prototype);
ConnectMongo.prototype.constructor = ConnectMongo;
ConnectMongo.parent = Connection;

ConnectMongo.prototype.__open__ = function (resolve, reject) {
    this.store = new MongoStore(this.options);
    resolve(this.store);
};

ConnectMongo.prototype.__close__ = function (resolve, reject) {

    resolve(this.store);

};


module.exports = ConnectMongo;