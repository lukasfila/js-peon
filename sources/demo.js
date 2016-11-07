(function () {
	"use strict";

	/**
	 * Main function
	 */
	demoProject.mainFunction = function () {
		var element = document.querySelector("#content"),
			value = "value",
			valueInt = 1;

		if (element) {
			element.innerHTML = "Hello " + lib0001.doSomething("w", "o", "r", "l", "d");
			element.innerHTML += "<br />String: " + doStringMagic(value) + "<br />Number: " +  doNumberMagic(valueInt);
		} else {
			throw "Element was not found!";
		}
	};

	/**
	 * Do string magic
	 * @param {string} value
	 * @returns {string}
	 */
	function doStringMagic(value) {
		return value + "_expanded";
	}

	/**
	 * Do number magic
	 * @param {number} value
	 * @returns {number}
	 */
	function doNumberMagic(value) {
		return value * 5;
	}
}());