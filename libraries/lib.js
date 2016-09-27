//external library example
var lib0001 = function (){};
//static
lib0001.doSomething = function () {
	var result = "",
		property;

	for (property in arguments) {
		if (arguments.hasOwnProperty(property)) {
			result += arguments[property];
		}
	}
	return result;
}
