// ==UserScript==
// @name        FA MD5
// @namespace   https://orca.pet
// @version     1.1
// @author      Marcos Del Sol Vives <marcos@orca.pet>
// @description Calculates MD5 for FA images.
// @homepage    https://github.com/socram8888/FA-Scripts
// @updateURL   https://orca.pet/userscripts/fa-prefetch.meta.js
// @downloadURL https://orca.pet/userscripts/fa-prefetch.user.js
// @supportURL  https://github.com/socram8888/FA-Scripts/issues
// @match       *://furaffinity.net/view/*
// @match       *://www.furaffinity.net/view/*
// @require     https://orca.pet/userscripts/md5.js
// @run-at      document-end
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// From: https://stackoverflow.com/a/4793630/4454028
function insertAfter(newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

let CHUNK_SIZE = 8 * 1024 * 1024;

let imageUrl = document.querySelector(
  '.actions a[href*="//d.facdn.net/"],' + // Old FA
  '.submission-content .button[href*="//d.facdn.net/"]' // New FA
);
if (!imageUrl) {
	console.log('Image not found');
	return;
}
imageUrl = imageUrl.href;

let md5Instance = md5.create();
let currentPos = 0;
let hashNode;

function handleChunk(xhr) {
	if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 206)) {
		let chunk = xhr.response;
		md5Instance.update(chunk);

		if (chunk.byteLength < CHUNK_SIZE) {
			let hash = md5Instance.hex();
			hashNode.innerHTML = hash;

			let txt = document.createTextNode(" (");
			insertAfter(txt, hashNode);

			let link = document.createElement("a");
			link.href = "https://e621.net/post/index/1/md5:" + hash;
			link.innerHTML = "e621";
			link.target = "_blank";
			insertAfter(link, txt);

			txt = document.createTextNode(")");
			insertAfter(txt, link);

			let range = document.createRange();
			range.selectNode(hashNode);

			let sel = document.getSelection();
			sel.empty();
			sel.addRange(range);
		} else {
			currentPos += CHUNK_SIZE;
			fetchChunk();
		}
	}
}

function fetchChunk() {
	console.log(currentPos);
	GM_xmlhttpRequest({
		url: imageUrl,
		method: "GET",
		headers: {
			"Range": "bytes=" + currentPos + "-" + (currentPos + CHUNK_SIZE - 1)
		},
		responseType: "arraybuffer",
		onload: handleChunk
	});
}

function createCalcBtt(maxWidth) {
  let calcBtt = document.createElement("a");
  calcBtt.href = "#";
  calcBtt.innerHTML = "Calculate";
  calcBtt.onclick = function() {
    hashNode = document.createElement("tt");
    calcBtt.parentNode.insertBefore(hashNode, calcBtt);
    hashNode.innerHTML = "...";
    hashNode.style.maxWidth = maxWidth;
    hashNode.style.display = "inline-flex";
    hashNode.style.overflow = "hidden";

    calcBtt.parentNode.removeChild(calcBtt);
    fetchChunk();
    return false;
  }
  return calcBtt;
}

function insertOldFa() {
  let ratingsNode = document.querySelector('.stats-container div img[src*=labels]');
  if (!ratingsNode) {
    console.log('Old FA not detected');
    return false;
  }

  let header = document.createElement("b");
  header.innerHTML = "MD5: ";
  ratingsNode.parentNode.insertBefore(header, ratingsNode);

  let calcBtt = createCalcBtt("12em");
  ratingsNode.parentNode.insertBefore(calcBtt, ratingsNode);

  let br = document.createElement("br");
  ratingsNode.parentNode.insertBefore(br, ratingsNode);

  br = document.createElement("br");
  ratingsNode.parentNode.insertBefore(br, ratingsNode);

  return true;
}

function insertNewFa() {
  let postInfo = document.querySelector('.section-body.info');
  if (!postInfo) {
    console.log('New FA not detected');
    return false;
  }

  let div = document.createElement("div");

  let label = document.createElement("strong");
  label.className = "highlight";
  label.innerHTML = "Hash";
  div.appendChild(label);

  let buttonSpan = document.createElement("span");
  let calcBtt = createCalcBtt(null);
  buttonSpan.appendChild(calcBtt);
  div.appendChild(buttonSpan);

  postInfo.appendChild(div);

  return true;
}

insertOldFa() || insertNewFa();
