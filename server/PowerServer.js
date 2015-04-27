/* Based on https://github.com/TryGhost/Ghost/blob/master/core/server/ghost-PowerServer.js 
 * Original copyright: 2013-2015 Ghost Foundation
 */
var Bluebird = require('bluebird');

/**
 * @typedef {Object} Address
 * @property {String} host
 * @property {Number} port
 */

/**
 * PowerServer
 * @param {express.Application} app
 * @param {Address} address
 * @param {HttpServerReactor} reactor
 */
function PowerServer(app, address, reactor) {
	this.app = app;
	this.address = address;
	this.connections = {};
	this.connectionId = 0;
	this.reactor = reactor;
	
}

PowerServer.prototype.connection = function (socket) {

	var self = this;

	self.connectionId += 1;
	socket._serverId = self.connectionId;

	socket.on('close', function () {
		delete self.connections[this._serverId];
	});

	self.connections[socket._serverId] = socket;
	
};

// Most browsers keep a persistent connection open to the server
// which prevents the close callback of httpServer from returning
// We need to destroy all connections manually
PowerServer.prototype.flush = function () {

	var self = this;
	
	Object.keys(self.connections).forEach(function (socketId) {
		var socket = self.connections[socketId];

		if (socket) socket.destroy();
			
	});
};

/**
 * Starts the server listening on the configured port.
 * @return {Promise}
 */
PowerServer.prototype.start = function () {

	var self = this;
	return new Bluebird(function (resolve) {
		
		self.httpServer = self.app.listen(self.address.port, self.address.host);
		self.reactor.httpServerCreated(self.httpServer, self.address);
		self.httpServer.on('connection', self.connection.bind(self));
		self.httpServer.on('listening', function() {
			resolve(self);
		});
		
		
	});
};

/** Returns a promise that will be fulfilled when the server stops.
 * If the server has not been started, the promise will be fulfilled
 * immediately
 * @return {Promise}
 */
PowerServer.prototype.shutdown = function () {

	var self = this;
	
	return new Bluebird(function (resolve, reject) {
		
		if (self.httpServer === null) {
			
			resolve(self);
			
		} else {
			
			//Close the server
			self.httpServer.close(function () {
				
				self.httpServer = null;
				self.reactor.httpServerClosed(self.httpServer);
				resolve(self);
				
			});

			//Start kill existing clients
			self.flush();

			
		}
		
	});
};

PowerServer.prototype.restart = function () {
	return this.shutdown().then(this.start.bind(this));
};

module.exports = PowerServer;





