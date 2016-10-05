module.exports = function (grunt) {

	var project = require("./project"),
		sources = project.settings.getFiles();


	/**
	 * coverageSetting
	 * @param {string} runner
	 * @param {Array} specs
	 * @return {Object}
	 */
	function specSettings(runner, specs) {
		return {
			src: project.getAllSrc(),
			options: {
				keepRunner: true,
				outfile: runner,
				specs: specs,
				vendor: project.getHelpers(),
				styles: project.getCssStyles()
			}
		};
	}

	grunt.initConfig({
		jasmine: {
			test: specSettings(project.spec.runnerDefault, project.spec.default)
		},
		uglify: {
			main: {
				src: project.resource + project.settings.name,
				dest: project.resource + project.settings.min
			}
		},
		concat: {
			options: {
				stripBanners: true
			},
			build: {
				src: sources,
				dest: project.resource + project.settings.name
			}
		},
		less: {
			options: {
				compress: true
			},
			files: {
				src: project.settings.less,
				dest: project.resource + project.settings.css
			}
		},
		copy: {
			main: {
				src: project.settings.less,
				dest: project.resource
			}
		},
		maven_deploy: { options: { groupId: project.groupId, artifactId: project.artifactId}, snapshot: { options: { url: project.artifactory + "/artifactory/libs-snapshot-local/", repositoryId: "central", goal: "deploy", snapshot: true}, files: [{ expand: true, cwd: project.resource, src: ["**/*"], dest: ""}]}, release: { options: { url: project.artifactory + "/artifactory/libs-release-local", repositoryId: "central", goal: "deploy", snapshot: false}, files: [{ expand: true, cwd: project.resource, src: ["**/*"], dest: ""}]}}
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jasmine");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-maven-deploy");
	grunt.loadNpmTasks("grunt-contrib-less");

	grunt.registerTask("debug", ["concat", "less"]);
	grunt.registerTask("default", ["concat", "uglify", "less", "jasmine"]);
	grunt.registerTask("snapshot", ["concat", "uglify", "less", "jasmine", "maven_deploy:snapshot"]);
	grunt.registerTask("release", ["concat", "uglify", "less", "jasmine", "maven_deploy:release"]);
};