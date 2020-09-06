// ==UserScript==
// @name        Wallapop Taller Search
// @namespace   https://orca.pet
// @version     1.0.0
// @author      Marcos Del Sol Vives <marcos@orca.pet>
// @description Moves the sorting field to the main filter bar to make search view box taller
// @homepage    https://orca.pet/userscripts/
// @updateURL   https://orca.pet/userscripts/wallapop-taller.meta.js
// @downloadURL https://orca.pet/userscripts/wallapop-taller.user.js
// @supportURL  https://github.com/socram8888/orca.pet/issues
// @match       https://es.wallapop.com/search
// @run-at      document-end
// @grant       none
// ==/UserScript==

let timerHandle;

function patchDom() {
	let filters = document.querySelector('.QuickFiltersBar__filters');
	let sorting = document.querySelector('.QuickFilter__sort');
	let pubDates = document.querySelector('.QuickFilter__publish_dates');

	if (!filters || !sorting || !pubDates) {
		return;
	}
	clearInterval(timerHandle);

	sorting.parentNode.removeChild(sorting);
	filters.appendChild(sorting);

	let bubble = sorting.querySelector('.QuickFilter__bubble');
	bubble.style.webkitBoxShadow = bubble.style.boxShadow = '0 1px 4px 0 rgba(37, 50, 56, 0.1)';
	bubble.style.padding = '0 12px';

	let label = sorting.querySelector('.QuickFilter__label');
	label.style.color = 'inherit';
	label.style.fontSize = 'inherit';
	label.style.margin = 'inherit';

	let secondaryBar = document.querySelector('.QuickFiltersBar__filters--secondary');
	secondaryBar.parentNode.removeChild(secondaryBar);
}

timerHandle = setInterval(patchDom, 10);
