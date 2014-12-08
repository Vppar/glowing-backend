//=============================================================================
// START THE SERVER
//=============================================================================
var prop = require('app-config');
var i18n = require('i18n');

if(!prop.config) {
 	console.log('You must define NODE_ENV variable with (dev, qa or prd) before start the server.');
} else {
	var port = process.env.NODE_PORT || prop.config.port;
	var server = require('./server/app')();
	server.listen(port);
	console.log(prop.config.message.server.listening, port, '...');
}