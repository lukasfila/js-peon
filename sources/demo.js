(function () {
	"use strict";

	//@flow
	/**
	 * Main function
	 */
	demoProject.mainFunction = function () {
		var element = document.querySelector("#content"),
			value: string = "value",
			valueInt: number = 1;

		if (element) {
			element.innerHTML = "Hello " + lib0001.doSomething("w", "o", "r", "l", "d");
			element.innerHTML += "<br />String: " + doStringMagic(value) + "<br />Number: " +  doNumberMagic(valueInt);
		} else {
			throw "Element was not found!";
		}
	};

	/**
	 * Do string magic
	 */
	function doStringMagic(value: string): string {
		return value + "_expanded";
	}

	/**
	 * Do number magic
	 */
	function doNumberMagic(value: number): number {
		return value * 5;
	}
}());