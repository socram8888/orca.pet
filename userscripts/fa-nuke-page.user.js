// ==UserScript==
// @name        FA nuke page
// @namespace   https://orca.pet
// @version     1.0.2
// @author      Marcos Del Sol Vives <marcos@orca.pet>
// @description Adds a button to nuke a single page of submissions.
// @homepage    https://github.com/socram8888/FA-Scripts
// @updateURL   https://orca.pet/userscripts/fa-nuke-page.meta.js
// @downloadURL https://orca.pet/userscripts/fa-nuke-page.user.js
// @supportURL  https://github.com/socram8888/FA-Scripts/issues
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

var submissionsSection = document.getElementById("messagecenter-submissions");

for (var actions of submissionsSection.getElementsByClassName("actions")) {
	var btt = document.createElement("button");
	btt.innerHTML = "Nuke page";
	btt.className = "button nuke-page-button";
	btt.type = "submit";
	btt.name = "messagecenter-action";
	btt.value = "remove_checked";
	btt.addEventListener("click", function(e) {
		var subs = submissionsSection.querySelectorAll("input[name='submissions[]'][type='checkbox']");
		for (var sub of subs) {
			sub.checked = true;
		}
		return true;
	});
	actions.prepend(btt);
}
