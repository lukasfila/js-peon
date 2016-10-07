(function () {
	"use strict";

	var baseDir = process.cwd(),
		path = require("path"),
		setupPath = path.dirname(require.main.filename),
		packageJson = /**@type {PackageJson}*/require(baseDir + "/package.json"),
		fs = require("fs");

	//copy project file
	if (!checkProjectFile()) {
		fs.createReadStream(setupPath + '/../project.js').pipe(fs.createWriteStream(baseDir + '/project.js'));
		console.log("Project file created.");
	}
	//copy grunt file
	if (!checkGruntFile()) {
		fs.createReadStream(setupPath + '/../gruntfile.js').pipe(fs.createWriteStream(baseDir + '/gruntfile.js'));
		console.log("Grunt file created.");
	}
	//check package json
	checkPackageJson();
	//check runtime files
	checkRuntimeFiles();

	/**
	 * Check package json
	 */
	function checkPackageJson() {
		var setupPackage = /**@type {PackageJson}*/require(setupPath + "/../package.json"),
			dependencies = setupPackage.dependencies,
			modified = false,
			dependency;

		for (dependency in dependencies) {
			if (dependencies.hasOwnProperty(dependency)) {
				if (packageJson.dependencies[dependency] !== dependencies[dependency]) {
					packageJson.dependencies[dependency] = dependencies[dependency];
					modified = true;
				}
			}
		}
		if (modified) {
			fs.writeFile(baseDir + "/package.json", JSON.stringify(packageJson, "", "\t"), function () {
				console.log("Package.json updated.");
				updateProjectFiles();
			});
		}
	}

	/**
	 * Update project files
	 */
	function updateProjectFiles() {
		var exec = require('child_process').exec;

		exec('npm update');
		console.log("Running npm update.");
	}

	/**
	 * Check runtime files
	 */
	function checkRuntimeFiles() {
		if (!fs.existsSync(baseDir + "/peon.js")) {
			fs.createReadStream(setupPath + '/../peon.js').pipe(fs.createWriteStream(baseDir + '/peon.js'));
		}
		if (!fs.existsSync(baseDir + "/peon.bat")) {
			fs.createReadStream(setupPath + '/../peon.bat').pipe(fs.createWriteStream(baseDir + '/peon.bat'));
		}
	}

	/**
	 * Check project file
	 * @returns {boolean}
	 */
	function checkProjectFile() {
		return fs.existsSync(baseDir + "/project.js");
	}

	/**
	 * Check grunt file
	 * @returns {boolean}
	 */
	function checkGruntFile() {
		return fs.existsSync(baseDir + "/gruntfile.js");
	}

	/**
	 * @typedef {object} PackageJson
	 * @property {Array.<string>} dependencies
	 */
}());