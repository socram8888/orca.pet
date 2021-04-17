---
---

tonyhax using FreePSXBoot
=========================

tonyhax supports being launched on compatible consoles using the [FreePSXBoot](https://github.com/brad-lin/FreePSXBoot) exploit developed by brad-lin.

This method requires an entire memory card for itself, and thus:
 * The memory card *must be removed after launching the exploit, or games will crash*.
 * The memory card cannot be used to save any game's progress.
 * The memory card depends on a specific version of the BIOS. If plugged on another console, chances are the exploit will get nuked and you'll have to reprogram the memory card.
 * The exploit cannot be copied to another memory card using the console - you'll need a PC with DexDrive or a PS2.
 * The exploit cannot be uninstalled using the console alone either.

If you want to go this route, you'll need to flash the memory card using one of the images available at `freepsxboot/`, depending on your console's BIOS version:

| Model     | BIOS version       |
|-----------|--------------------|
| SCPH-1001 | v2.2               |
| SCPH-1002 | v2.0, v2.1 or v2.2 |
| SCPH-3500 | v2.1               |
| SCPH-5001 | v3.0               |
| SCPH-5501 | v3.0               |
| SCPH-5502 | v3.0               |
| SCPH-5503 | v3.0               |
| SCPH-5903 | v2.2               |
| SCPH-7001 | v4.1               |
| SCPH-7002 | v4.1               |
| SCPH-7501 | v4.1               |
| SCPH-7502 | v4.1               |
| SCPH-9001 | v4.1               |
| SCPH-9002 | v4.1               |
| SCPH-101  | v4.4 or v4.5       |
| SCPH-102  | v4.4 or v4.5       |

Installation
------------

To be written.

Usage
-----

1. Turn on the console with the **memory card** with FreePSXBoot installed on the **first slot** and the **disc tray open**.ç
2. Once you reach the console's BIOS, select the memory card manager.

The screen should turn orange, and after a while tonyhax should boot.
