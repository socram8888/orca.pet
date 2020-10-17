// ==UserScript==
// @name        FA easy nav
// @namespace   https://orca.pet
// @version     1.0.0
// @author      Marcos Del Sol Vives <marcos@orca.pet>
// @description Automatically resizes images to full size, and allows navigation by clicking on the borders of the images.
// @homepage    https://github.com/socram8888/FA-Scripts
// @updateURL   https://orca.pet/userscripts/fa-easy-nav.meta.js
// @downloadURL https://orca.pet/userscripts/fa-easy-nav.user.js
// @supportURL  https://github.com/socram8888/FA-Scripts/issues
// @match       *://furaffinity.net/view/*
// @match       *://www.furaffinity.net/view/*
// @grant       none
// ==/UserScript==

var origImg = document.getElementById("submissionImg");
if (origImg && origImg.tagName == "IMG") {
	var img = document.createElement("img");
	img.id = "submissionImg";
	img.src = origImg.dataset.fullviewSrc || origImg.src;
	img.className = origImg.className;
	img.alt = origImg.alt;
	img.style.maxWidth = "100%";
	img.style.cursor = "pointer";

	img.addEventListener("click", function(e) {
		var rect = e.target.getBoundingClientRect();
		var clickX = e.clientX - rect.left;
		var clickedOnLeft = clickX < rect.width / 2;

		// Find all image links
		var gallery = document.querySelectorAll(".minigallery-container a");

		// Find "gallery" button
		var galleryButtonPos = 0;
		for (var link of gallery) {
			if (link.href.indexOf("/view/") < 0) {
				break;
			}
			galleryButtonPos++;
		}

		var redirLink = gallery[galleryButtonPos + (clickedOnLeft ? -1 : 1)];
		if (redirLink) {
			location = redirLink.href;
		}
	}, false);

	origImg.parentNode.insertBefore(img, origImg);
	origImg.remove();
}
