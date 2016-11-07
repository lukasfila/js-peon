/* globals require, process, console, __dirname, process*/
var peon = require("./node_modules/peon/peon/index"),
	buildOnly = process.argv[2] === "b",
	testsEnabled = process.argv[2] === "t",
	path = __dirname,
	port;


if (buildOnly) {
	peon.build(path);
} else {
//noinspection JSUnresolvedVariable,Eslint
	port = process.env.PORT || 3333;
	peon.start(path, port, testsEnabled);
}