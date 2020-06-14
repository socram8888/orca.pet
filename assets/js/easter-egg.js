---
---
'use strict';

(function(window) {
	// Keep it fast and short, it's not really required to be ultrasafe
	const hasher = new saph.Saph(256, 2);

	// String with last pressed keys
	let lastPressedKeys = '';

	// Mapping of test key to file
	const KEYS_TO_FILE = {
		'yTV/e4gd2meh2RNuSjiKjWrvgGMTgZ/pH6so7PWilSw=': "{{ '/assets/images/msg.jpg.enc' | cachebuster }}"
	};

	let bellElem = null;

	async function updateHeader(blob, password) {
		const cryptoHash = await hasher.hash('orca.pet', 'easteregg', 'crypto', password);
		const encrypted = await blob.arrayBuffer();

		const key = await crypto.subtle.importKey(
				'raw', // Key format
				cryptoHash.bytes.subarray(0, 16), // Key material,
				'AES-CTR', // Algorithm
				false, // Extractable
				[ 'decrypt' ] // Usages
		);
		const keyConfig = {
			'name': 'AES-CTR',
			'counter': cryptoHash.bytes.subarray(16, 32),
			'length': 12 * 8
		}

		let decrypted = await crypto.subtle.decrypt(keyConfig, key, encrypted);
		decrypted = new Blob([decrypted], {type: 'image/jpeg'});
		decrypted = window.URL.createObjectURL(decrypted);

		let header = document.querySelector('.page-header');
		header.style.backgroundImage = 'url("' + decrypted + '")';
		header.style.height = '100vh';

		try {
			bellElem.play();
		} catch {};

		window.scrollTo(0, 0);
	}

	async function asyncKeypress(e) {
		if (e.keyCode == 13) {
			if (lastPressedKeys != '') {
				let password = lastPressedKeys;
				lastPressedKeys = '';

				const testHash = await hasher.hash('orca.pet', 'easteregg', 'test', password);
				let cryptoFile = KEYS_TO_FILE[testHash.toBase64()];

				if (cryptoFile) {
					const xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function(e) {
						if (xhr.readyState == 4) {
							updateHeader(xhr.response, password);
						}
					}
					xhr.responseType = 'blob';
					xhr.overrideMimeType('application/octet-stream');
					xhr.open('GET', cryptoFile, true);
					xhr.send(null);

					if (bellElem == null) {
						bellElem = document.createElement('audio');
						bellElem.src = "{{ '/assets/sfx/bell.wav' | cachebuster }}";
						document.body.appendChild(bellElem);
					}
				}
			}
		} else if (e.key.length == 1) {
			lastPressedKeys += e.key.toLowerCase();
		}
	}

	function keypress(e) {
		asyncKeypress(e);
		return true;
	}

	document.body.addEventListener('keypress', keypress);
})(window);
