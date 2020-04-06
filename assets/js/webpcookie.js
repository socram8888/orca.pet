"use strict";

(function() {
	var htmlElement = document.getElementsByTagName("html")[0];

	var status2class = {
		"0": "no-webp",
		"1": "webp"
	}

	var cookieClass = status2class[Cookies.get("webp")];
	if (cookieClass) {
		htmlElement.classList.add(cookieClass);
	}

	var image = document.createElement("img");
	image.onload = image.onerror = function(event) {
		var testStatus = event && event.type === "load" && image.width === 1 ? "1" : "0";
		var testClass = status2class[testStatus];

		if (testClass !== cookieClass) {
			if (cookieClass) {
				htmlElement.classList.replace(cookieClass, testClass);
			} else {
				htmlElement.classList.add(testClass);
			}
		}

		Cookies.set("webp", testStatus, {expires: 31});
	}

	// Blatantly copied from Modernizr
	image.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
})();
