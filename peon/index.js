/* globals require, process, console, __dirname, process*/
/**
 * Start
 * @param {string} projectPath
 * @param {number} port
 */
exports.start = function (projectPath, port) {
	var express = require("express"),
		Debugger = require("./debugger.js"),
		path = require("path"),
		fs = require("fs"),
		app = express();

	//run debug
	Debugger.runBuild();
	Debugger.runDebug();

	/**
	 * Create response
	 * @param {*} res
	 * @param {String} content
	 */
	function createResponse(res, content) {
		"use strict";
		if (res.finished) {
			return;
		}
		//noinspection JSUnresolvedFunction
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		res.write(content);
		res.end();
	}
	//wait for build files
	app.get("/bin/*.js", function (req, res) {
		"use strict";
		Debugger.sendResponseAfterBuild(req, res, 0);
	});
	//root
	app.get("/", function (req, res) {
		"use strict";

		//noinspection HtmlUnknownTarget
		createResponse(res, "<html><body><a href='/example/'>Example</a><br/><a href='/tests/'>Tests</a></body></html>");
	});
	//static
	app.use(express.static(projectPath + "/"));

	port = port || 3002;
	app.listen(port);
	console.log("Debug server listening on " + port);
};