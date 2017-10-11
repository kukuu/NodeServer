var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model. Required in server.js. See "Secure Backend API" application with extended validation and encryption
module.exports = mongoose.model('User', new Schema({ 
	name: String, 
	password:  String, 
	admin: Boolean 
}));
