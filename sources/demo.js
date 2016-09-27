(function () {
	"use strict";

	/**
	 * Main function
	 */
	demoProject.mainFunction = function () {
		var element = document.querySelector("#content");

		if (element) {
			element.innerHTML = "Hello " + lib0001.doSomething("w", "o", "r", "l", "d");
		} else {
			throw "Element was not found!";
		}
	};
}());