var Service = require('./Service');
var mongoose = require('mongoose');

function Mongoose() {

    Service.apply(this, arguments);

}

Mongoose.prototype = Object.create(Service.prototype);
Mongoose.prototype.constructor = Mongoose;
Mongoose.parent = Service;

Mongoose.prototype.__open__ = function (resolve, reject) {

    this.connection = mongoose.createConnection(this.options.url, this.options);
    this.Schema = mongoose.Schema;

    this.connection.on('open', function(err){
        console.log('open -> ', arguments);
        if(err) return reject(err);
        resolve(this.connection);
    });

    this.connection.on('error', function(err) { throw err});


};

Mongoose.prototype.__close__ = function (resolve, reject) {

    this.connection.close(resolve);

};


module.exports = Mongoose;