// ==UserScript==
// @name        Untranslate eBay.es
// @namespace   https://orca.pet
// @version     1.0
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

if (window.location.pathname.startsWith("/sch/")) {
	for (let item of document.body.querySelectorAll(".s-item")) {
		let title = item.querySelector('.s-item__title');
		let followLink = item.querySelector('.s-item__watch > a');
		if (title && followLink) {
			let original = followLink.attributes.getNamedItem('aria-label');
			title = title.childNodes[title.childNodes.length - 1];
			if (title && original && original.textContent.startsWith('seguir ')) {
				title.textContent = original.textContent.substr('seguir '.length);
			}
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
