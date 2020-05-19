'use strict';

(function(window) {
	let partsList = document.getElementById('parts');
	let memSizeField = document.getElementById('memsize');
	let iterField = document.getElementById('iterations');

	let addBtt = document.getElementById('addbtt');
	let deleteBtt = document.getElementById('deletebtt');
	let calcBtt = document.getElementById('calcbtt');

	let hexField = document.getElementById('hexoutput');
	let b64Field = document.getElementById('b64output');

	addBtt.onclick = function() {
		let li = document.createElement('li');
		li.innerHTML = '<input>';
		partsList.appendChild(li);
		deleteBtt.disabled = false;
	}

	deleteBtt.onclick = function() {
		if (partsList.children.length > 0) {
			let last = partsList.children[partsList.children.length - 1];
			partsList.removeChild(last);
		}

		if (partsList.children.length == 0) {
			deleteBtt.disabled = true;
		}
	}

	calcBtt.onclick = function() {
		let memSize = memSizeField.value - 0;
		if (isNaN(memSize) || memSize < 1) {
			alert("Invalid memory size");
			return;
		}

		let iterations = iterField.value - 0;
		if (isNaN(iterations) || iterations < 1) {
			alert("Invalid memory size");
			return;
		}

		let parts = [];
		for (let item of partsList.children) {
			parts.push(item.children[0].value);
		}

		let instance = new saph.Saph(memSize, iterations);
		calculateAndUpdate(instance, parts);
	}

	async function calculateAndUpdate(instance, parts) {
		let hash = await instance.hash.apply(instance, parts);
		hexField.innerHTML = hash.toHex();
		b64Field.innerHTML = hash.toBase64();
	}
})(window);
