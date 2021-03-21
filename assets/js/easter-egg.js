---
---
'use strict';

(function() {
	let totalScrollPast = 0;
	let bellElem = null;

	const KEYS_TO_FILE = {
		'4O82D653EFS0E3GTVSXPEJXNGUJJYM34': "{{ '/assets/images/msg.jpg.enc' | cachebuster }}",
		'TLWLY1NVZIUNWXHTXSFMGVWRR00LPQ3K': "{{ '/assets/images/249.jpg.enc' | cachebuster }}",
		'1PWRHTO0TIQQ2YINOHD2HR7LIVIN2M61': "{{ '/assets/images/dnk.png.enc' | cachebuster }}",
	};

	function isAtBottom() {
		return document.body.clientHeight - window.scrollY - window.innerHeight < 10;
	}

	function hasScrolledEnough() {
		return totalScrollPast >= 3.5 * window.innerHeight;
	}

	if ('ontouchstart' in window) {
		let touchStartY = null;

		function touchStartHandler(e) {
			if (isAtBottom() && e.touches.length == 1) {
				touchStartY = e.touches[0].screenY;
			} else {
				touchStartY = null;
			}
		}

		function touchEndHandler(e) {
			if (isAtBottom() && touchStartY !== null) {
				let scrollDelta = touchStartY - e.changedTouches[0].screenY;
				if (scrollDelta > 0) {
					totalScrollPast += scrollDelta;
					if (hasScrolledEnough()) {
						window.removeEventListener('touchstart', touchStartHandler);
						window.removeEventListener('touchend', touchEndHandler);
						unlockCodeInput();
					}
					return;
				}
			}

			touchStartY = null;
			totalScrollPast = 0;
		}

		window.addEventListener('touchstart', touchStartHandler);
		window.addEventListener('touchend', touchEndHandler);
	} else if ('onwheel' in window) {
		function wheelHandler(e) {
			if (isAtBottom() && e.deltaY > 0) {
				switch (e.deltaMode) {
					case WheelEvent.DOM_DELTA_PIXEL:
						totalScrollPast += e.deltaY;
						break;

					case WheelEvent.DOM_DELTA_LINE:
						totalScrollPast += e.deltaY * 16;
						break;

					case WheelEvent.DOM_DELTA_PAGE:
						totalScrollPast += e.deltaY * window.innerHeight;
						break;
				}
						
				totalScrollPast += e.deltaY;
				if (hasScrolledEnough()) {
					window.removeEventListener('wheel', wheelHandler);
					unlockCodeInput();
				}
			} else {
				totalScrollPast = 0;
			}
		}

		window.addEventListener('wheel', wheelHandler);
	}

	function obfuscate(plain) {
		let validLetters = "SD3K9JCUGA5QLIPOYN6MXHB8EFW0TZV4R172";
		let obfuscated = '';
		let mwc = 1878595402;

		let obfIdx = 13;
		for (let i = 0; i < plain.length; i++) {
			let idx = validLetters.indexOf(plain.charAt(i));
			if (idx < 0) {
				return null;
			}

			obfIdx = (mwc ^ idx ^ obfIdx) % 36;
			obfuscated += validLetters[obfIdx];

			mwc ^= mwc << 13;
			mwc ^= mwc >> 17;
			mwc ^= mwc << 5;
			mwc &= 0x7FFFFFFF;
		}

		return obfuscated;
	}

	async function updateHeader(blob, cryptoKey) {
		cryptoKey = new TextEncoder().encode(cryptoKey);
		const encrypted = await blob.arrayBuffer();

		const key = await crypto.subtle.importKey(
				'raw', // Key format
				cryptoKey.subarray(0, 16), // Key material,
				'AES-CTR', // Algorithm
				false, // Extractable
				[ 'decrypt' ] // Usages
		);
		const keyConfig = {
			'name': 'AES-CTR',
			'counter': cryptoKey.subarray(16, 32),
			'length': 12 * 8
		}

		let decrypted = await crypto.subtle.decrypt(keyConfig, key, encrypted);
		decrypted = new Blob([decrypted], {type: 'image/jpeg'});
		decrypted = window.URL.createObjectURL(decrypted);

		let header = document.querySelector('.page-header');
		header.style.height = '100vh';

		for (let bg of header.querySelectorAll('.bg-img')) {
			bg.parentNode.removeChild(bg);
		}

		let clearBg = document.createElement("div");
		clearBg.className = "bg-img";
		clearBg.style.backgroundImage = 'url("' + decrypted + '")';
		clearBg.style.backgroundSize = 'contain';
		header.insertBefore(clearBg, header.childNodes[0]);

		let blurBg = document.createElement("div");
		blurBg.className = "bg-img";
		blurBg.style.backgroundImage = clearBg.style.backgroundImage;
		blurBg.style.filter = "blur(1em)";
		header.insertBefore(blurBg, header.childNodes[0]);

		try {
			bellElem.play();
		} catch {};

		window.scrollTo(0, 0);
	}

	function unlockCodeInput() {
		let fade = document.createElement("div");
		fade.style.height = "300vh";
		fade.style.width = "100%";
		fade.style.background = "linear-gradient(180deg, #fff 0%, #000 100%)";
		document.body.appendChild(fade);

		let blackcontainer = document.createElement("div");
		blackcontainer.style.height = "100vh";
		blackcontainer.style.width = "100%";
		blackcontainer.style.backgroundColor = "#000";
		blackcontainer.style.display = "flex";
		blackcontainer.style.flexDirection = "column";
		blackcontainer.style.justifyContent = "center";
		document.body.appendChild(blackcontainer);

		let codecontainer = document.createElement("div");
		codecontainer.style.textAlign = "center";
		blackcontainer.appendChild(codecontainer);

		let codeInput = document.createElement("input");
		codeInput.maxLength = "10";
		codeInput.style.width = "8em";
		codeInput.style.color = "#fff";
		codeInput.style.fontFamily = "VCR OSD Mono";
		codeInput.style.fontSize = "2em";
		codeInput.style.backgroundColor = "#000";
		codeInput.style.border = "0";
		codeInput.style.borderBottom = "0.1em white dashed";
		codeInput.style.outline = "none";
		codeInput.style.textTransform = "uppercase";

		codeInput.addEventListener('keydown', function (e) {
			if (e.key.length == 1 && e.key.match(/[^a-zA-Z0-9]/)) {
				e.preventDefault();
			} else if (e.keyCode == 13) {
				let password = codeInput.value;
				if (password == '') {
					return;
				}

				password = password.toUpperCase();
				while (password.length < 32) {
					password += password;
				}
				password = password.substr(0, 32)

				let cryptoKey = obfuscate(password);
				let testKey = obfuscate(cryptoKey);
				let cryptoFile = KEYS_TO_FILE[testKey];
				console.log(cryptoKey, testKey, cryptoFile);

				if (cryptoFile) {
					const xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function(e) {
						if (xhr.readyState == 4) {
							updateHeader(xhr.response, cryptoKey);
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
		});

		codecontainer.appendChild(codeInput);

		let scrollToCodeHandler = function(e) {
			if (window.scrollY + window.innerHeight * 3 / 4 >= codeInput.offsetTop) {
				codeInput.focus();
				window.removeEventListener("scroll", scrollToCodeHandler);
			}
		}

		window.addEventListener("scroll", scrollToCodeHandler);
	}
})();
