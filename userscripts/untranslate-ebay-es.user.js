// ==UserScript==
// @name        Untranslate eBay.es
// @namespace   https://orca.pet
// @version     1.0.1
// @author      Marcos Del Sol Vives <marcos@orca.pet>
// @description Removes the shitty autotranslation from eBay.es ad titles
// @homepage    https://orca.pet/userscripts/
// @updateURL   https://orca.pet/userscripts/untranslate-ebay-es.meta.js
// @downloadURL https://orca.pet/userscripts/untranslate-ebay-es.user.js
// @supportURL  https://github.com/socram8888/orca.pet/issues
// @match       https://www.ebay.es/sch/*
// @match       https://www.ebay.es/itm/*
// @run-at      document-end
// @grant       none
// ==/UserScript==

if (window.location.pathname.startsWith("/sch/") || window.location.pathname.startsWith("/b/")) {
	for (let item of document.body.querySelectorAll(".s-item")) {
		let title = item.querySelector('.s-item__title');
		let image = item.querySelector('.s-item__image-img');
		if (title && image && image.alt) {
			title.textContent = image.alt;
		}
	}
} else if (window.location.pathname.startsWith("/itm/")) {
	var title = document.getElementById("itemTitle");
	if (title) {
		var origTitle = title.querySelector(".it-sttl");
		if (origTitle && origTitle.dataset.mtdes) {
			title.innerHTML = origTitle.dataset.mtdes;
		}
	}
}
