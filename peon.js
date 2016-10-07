/* globals require, process, console, __dirname, process*/
var peon = require("./node_modules/peon/peon/index"),
	path = __dirname,
	port;


//noinspection JSUnresolvedVariable,Eslint
port = process.env.PORT || 3333;
peon.start(path, port);