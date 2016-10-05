/* globals require, process, console, __dirname, process*/
var peon = require("./peon"),
	path = __dirname,
	port;


//noinspection JSUnresolvedVariable,Eslint
port = process.env.PORT || 3000;
peon.start(path, port);