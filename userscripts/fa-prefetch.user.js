// ==UserScript==
// @name        FA prefetch
// @namespace   https://orca.pet
// @version     1.0.0
// @author      Marcos Del Sol Vives <marcos@orca.pet>
// @description Improves navigation by prefetching images based on navigation direction.
// @homepage    https://github.com/socram8888/FA-Scripts
// @updateURL   https://orca.pet/userscripts/fa-prefetch.meta.js
// @downloadURL https://orca.pet/userscripts/fa-prefetch.user.js
// @supportURL  https://github.com/socram8888/FA-Scripts/issues
// @match       *://furaffinity.net/view/*
// @match       *://www.furaffinity.net/view/*
// @grant       none
// ==/UserScript==

function searchParse(str) {
	if (str[0] == '?') {
		str = str.substr(1);
	}

	var obj = {};
	if (str) {
		for (var part of str.split("&")) {
			var equal = part.indexOf("=");
			if (equal < 0) {
				obj[decodeURIComponent(part)] = '';
			} else {
				var name = decodeURIComponent(part.substr(0, equal));
				var value = decodeURIComponent(part.substr(equal + 1));
				obj[name] = value;
			}
		}
	}

	return obj;
}

function searchBuild(obj) {
	var str = "";

	for (var name in obj) {
		str += "&" + encodeURIComponent(name) + "=" + encodeURIComponent(obj[name]);
	}

	if (str) {
		str = "?" + str.substr(1);
	}

	return str;
}

var gallery = document.querySelectorAll(".minigallery-container a");
var nextCount;
for (nextCount = 0; nextCount < gallery.length; nextCount++) {
	if (gallery[nextCount].href.indexOf("/view/") < 0) {
		break;
	}
}

var pageSearch = searchParse(location.search);
if (pageSearch.prefetch) {
	var prefetchPos = nextCount - pageSearch.prefetch;
	if (prefetchPos < gallery.length) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var prefetchImg = this.responseXML.getElementById("submissionImg");
			if (prefetchImg && prefetchImg.dataset.fullviewSrc) {
				var prefetchCurImg = document.createElement("img");
				prefetchCurImg.src = prefetchImg.dataset.fullviewSrc;
				prefetchCurImg.style.display = "hidden";
				document.body(prefetchCurImg);
			}
		}
		xhr.open("GET", gallery[prefetchPos].href);
		xhr.responseType = "document";
		xhr.send();
	}
}

for (var i = 0; i < gallery.length; i++) {
	var relPos = nextCount - i;

	// The gallery button
	if (relPos == 0) {
		continue;
	}

	var url = new URL(gallery[i].href, location.href);
	var search = searchParse(url.search);
	search.prefetch = relPos;
	url.search = searchBuild(search);
	gallery[i].href = url;
}
