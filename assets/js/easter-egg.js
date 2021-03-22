---
---
'use strict';

(function() {
	let totalScrollPast;
	let bellElem = null;

	const KEYS_TO_FILE = {
		'4O82D653EFS0E3GTVSXPEJXNGUJJYM34': {
			ext: 'jpg',
			y: 80
		},
		'TLWLY1NVZIUNWXHTXSFMGVWRR00LPQ3K': {
			ext: 'jpg',
			y: 60
		},
		'1PWRHTO0TIQQ2YINOHD2HR7LIVIN2M61': {
			ext: 'png',
			y: 25
		},
	};

	function isAtBottom() {
		return document.body.clientHeight - window.scrollY - window.innerHeight < 10;
	}

	function hasScrolledEnough() {
		return totalScrollPast >= 3.5 * window.innerHeight;
	}

	function registerScrollListeners() {
		totalScrollPast = 0;

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

	function testPassword(password, playBell) {
		if (password == '') {
			return false;
		}

		password = password.toUpperCase();
		while (password.length < 32) {
			password += password;
		}
		password = password.substr(0, 32)

		let secretKey = obfuscate(password);
		let testKey = obfuscate(secretKey);
		let cryptoFile = KEYS_TO_FILE[testKey];
		console.log(secretKey, testKey, cryptoFile);

		if (!cryptoFile) {
			return false;
		}

		let header = document.querySelector('.page-header');
		header.style.height = '32vw';
		header.style.maxHeight = '100vh';
		header.style.backgroundPositionY = cryptoFile.y + '%';
		header.style.backgroundImage = 'url("/assets/images/secretbg/' + secretKey + '.' + cryptoFile.ext + '")';

		let disableContainer = document.createElement("div");
		disableContainer.style.textAlign = "right";
		header.appendChild(disableContainer);

		let disableButton = document.createElement("button");
		disableButton.innerHTML = "Disable";
		disableButton.addEventListener("click", function(e) {
			e.preventDefault();
			Cookies.remove("secretCode");
			disableContainer.parentNode.removeChild(disableContainer);
			header.style.height = null;
			header.style.maxHeight = null;
			header.style.backgroundPositionY = null;
			header.style.backgroundImage = null;
			registerScrollListeners();
		});
		disableContainer.appendChild(disableButton);

		return true;
	}

	function unlockCodeInput() {
		let codeRoot = document.createElement("div");
		document.body.appendChild(codeRoot);

		let fade = document.createElement("div");
		fade.style.height = "300vh";
		fade.style.width = "100%";
		fade.style.background = "linear-gradient(180deg, #fff 0%, #000 100%)";
		codeRoot.appendChild(fade);

		let codeBg = document.createElement("div");
		codeBg.style.height = "100vh";
		codeBg.style.width = "100%";
		codeBg.style.backgroundColor = "#000";
		codeBg.style.display = "flex";
		codeBg.style.flexDirection = "column";
		codeBg.style.justifyContent = "center";
		codeRoot.appendChild(codeBg);

		let codeContainer = document.createElement("div");
		codeContainer.style.textAlign = "center";
		codeBg.appendChild(codeContainer);

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
				if (testPassword(password)) {
					codeRoot.parentNode.removeChild(codeRoot);

					window.scrollTo(0, 0);

					if (bellElem == null) {
						bellElem = document.createElement('audio');
						bellElem.src = "{{ '/assets/sfx/bell.wav' | cachebuster }}";
						document.body.appendChild(bellElem);
					}

					try {
						bellElem.play();
					} catch {};

					Cookies.set("secretCode", password);
				}
			}
		});

		codeContainer.appendChild(codeInput);

		let scrollToCodeHandler = function(e) {
			if (window.scrollY + window.innerHeight * 3 / 4 >= codeInput.offsetTop) {
				codeInput.focus();
				window.removeEventListener("scroll", scrollToCodeHandler);
			}
		}

		window.addEventListener("scroll", scrollToCodeHandler);
	}

	let savedCode = Cookies.get("secretCode");
	if (!savedCode || !testPassword(savedCode)) {
		window.addEventListener("load", function() {
			registerScrollListeners();
		});
	}
})();
