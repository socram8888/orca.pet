// ==UserScript==
// @name        FA nuke page
// @namespace   https://orca.pet
// @version     1.1.1
// @author      Marcos Del Sol Vives <marcos@orca.pet>
// @description Adds a button to nuke a single page of submissions.
// @homepage    https://orca.pet/userscripts/
// @updateURL   https://orca.pet/userscripts/fa-nuke-page.meta.js
// @downloadURL https://orca.pet/userscripts/fa-nuke-page.user.js
// @supportURL  https://github.com/socram8888/orca.pet/issues
// @match       *://furaffinity.net/msg/submissions/*
// @match       *://www.furaffinity.net/msg/submissions/*
// @grant       none
// ==/UserScript==

var style = document.createElement("style");
style.innerHTML = `
	.nuke-page-button {
		font-weight: 700;
		background-color: #adadff;
		cursor: pointer;
	}
`;
document.body.appendChild(style);

let holders = document.querySelectorAll("#messagecenter-submissions .actions, .section-options.actions");
for (let actions of holders) {
	var btt = document.createElement("button");
	btt.innerHTML = "Nuke page";
	btt.className = "button nuke-page-button";
	btt.type = "submit";
	btt.name = "messagecenter-action";
	btt.value = "remove_checked";
	btt.addEventListener("click", function(e) {
		var subs = document.body.querySelectorAll("input[name='submissions[]'][type='checkbox']");
		for (var sub of subs) {
			sub.checked = true;
		}
		return true;
	});
	actions.prepend(btt);
}
