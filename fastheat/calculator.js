"use strict";

// WTFPL
// This is just pure old shitty JavaScript, I'm intentionally sticking to it so old browsers can use it without having to go through a fucking transpiler for ES5.

(function(window) {
	// Maybe make this generic sometime for multi-extruder setups?
	var elements = [
		{
			name: "nozzle",
			time: document.getElementById("nozzletime"),
			initial: document.getElementById("nozzleinitial"),
			target: document.getElementById("nozzletarget"),
			setcode: "M104 S",
			waitcode: "M109 S"
		},
		{
			name: "bed",
			time: document.getElementById("bedtime"),
			initial: document.getElementById("bedinitial"),
			target: document.getElementById("bedtarget"),
			setcode: "M140 S",
			waitcode: "M190 S"
		}
	];

	var generatedBox = document.getElementById("generatedcode");

	function calculate() {
		var gcode = "";

		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];

			if (isNaN(element.time.valueAsNumber)) {
				gcode += "; Invalid " + element.name + " time\n";
			}

			if (isNaN(element.initial.valueAsNumber)) {
				gcode += "; Invalid initial " + element.name + " temperature\n";
			}

			if (isNaN(element.target.valueAsNumber)) {
				gcode += "; Invalid target " + element.name + " temperature\n";
			}
		}

		// If no errors, proceed
		if (gcode == "") {
			var sortedElements = elements.slice(0);

			// Sort from slowest (which need to start earlier) to fastest
			sortedElements.sort(function(a, b) {
				return b.time.valueAsNumber - a.time.valueAsNumber;
			});

			for (var stop = 0; stop < sortedElements.length; stop++) {
				gcode += "; Stop " + stop + "\n";

				var sets = "";
				var waits = "";
				var nextTime = stop < sortedElements.length - 1 ? sortedElements[stop + 1].time.valueAsNumber : null;

				for (var i = 0; i <= stop; i++) {
					var element = sortedElements[i];
					var initial = element.initial.valueAsNumber;
					var target = element.target.valueAsNumber;

					// Interpolate temperature at next stop, if any
					if (nextTime && target > initial) {
						var ratio = 1 - nextTime / element.time.valueAsNumber;
						target = ratio * (target - initial) + initial;
					}

					sets += element.setcode + target.toFixed(2) + " ; Set " + element.name + "\n";
					waits += element.waitcode + target.toFixed(2) + " ; Wait for " + element.name + "\n";
				}

				gcode +=
					sets +
					"M105\n" +
					waits;

				if (nextTime) {
					gcode += "\n";
				}
			}
		}

		generatedBox.innerHTML = gcode;
	}

	for (var i = 0; i < elements.length; i++) {
		elements[i].time.addEventListener("change", calculate);
		elements[i].initial.addEventListener("change", calculate);
		elements[i].target.addEventListener("change", calculate);
		elements[i].time.addEventListener("keyup", calculate);
		elements[i].initial.addEventListener("keyup", calculate);
		elements[i].target.addEventListener("keyup", calculate);
	}

	calculate();
})(window);

