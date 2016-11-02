describe("test app", function () {
	"use strict";
	it("main throw", function () {
		//check throw
		expect(function() {demoProject.mainFunction()}).toThrow("Element was not found!");
	});
	it("main works", function () {
		var div = document.createElement("div");

		//set id
		div.id = "content";
		//prepare
		document.body.appendChild(div);
		//do something
		demoProject.mainFunction();
		//check
		expect(document.querySelector("#content").innerHTML).toBe("Hello world<br>String: value_expanded<br>Number: 5");
		document.body.removeChild(div);
	});
});