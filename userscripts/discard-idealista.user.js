// ==UserScript==
// @name        Discard Idealista
// @namespace   https://orca.pet
// @version     1.0.0
// @author      Marcos Del Sol Vives <marcos@orca.pet>
// @description Re-adds the discard button to Idealista searches
// @homepage    https://orca.pet/userscripts/
// @updateURL   https://orca.pet/userscripts/discard-idealista.meta.js
// @downloadURL https://orca.pet/userscripts/discard-idealista.user.js
// @supportURL  https://github.com/socram8888/orca.pet/issues
// @match       *://www.idealista.com/*
// @run-at      document-end
// ==/UserScript==

'use strict';

for (let toolbar of document.querySelectorAll('article .item-toolbar')) {
	let discardButton = document.createElement('button');
	discardButton.innerHTML = '<span>Descartar</span>';
	discardButton.className = 'icon-delete trash-btn action-del fake-anchor';

	discardButton.addEventListener('click', function(e) {
		const article = e.target.closest('article');
		if (!article) {
			return;
		}

		const adid = article.dataset['adid'];
		if (!adid) {
			return;
		}

		const req = new XMLHttpRequest();
		req.open('POST', 'https://www.idealista.com/add-ruled-out-detail.htm', false);
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		req.send(`adIdSavedAd=${adid}&subscribeToIdealistaMailings=false`);

		article.parentNode.removeChild(article);
	});

	toolbar.appendChild(discardButton);
}
