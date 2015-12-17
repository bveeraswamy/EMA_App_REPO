'use strict';
/*var config = require('./config'),
	mongoose =  require('mongoose');

module.exports = function(){
	var db = mongoose.connect(config.db);
	require('../app/models/user.server.model');
	require('../app/models/transaction.server.model');
	require('../app/models/transaction-balance.server.model');
	return db;
	};*/
	// Invoke 'strict' JavaScript mode


// Load the module dependencies
var	config = require('./config'),
	mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	//var dbName = "/samtest";
	//var connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + dbName;
    //var db = mongojs(connection_string, ['scores']);
	var db = mongoose.connect(config.db);
	//var db = mongoose.connect(connection_string);

	// Load the 'User' model 
	require('../app/models/user.server.model');
	
	require('../app/models/transaction.server.model');
	require('../app/models/transaction-balance.server.model');

	// Return the Mongoose connection instance
	return db;
};