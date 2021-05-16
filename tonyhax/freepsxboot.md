---
---

tonyhax using FreePSXBoot
=========================

tonyhax supports being launched on compatible consoles using the [FreePSXBoot](https://github.com/brad-lin/FreePSXBoot) exploit developed by brad-lin.

Installation
------------

This method requires an entire memory card for itself, and thus:
 * The memory card cannot be used to save any game's progress.
 * The memory card depends on a specific version of the BIOS. If plugged on another console, chances are the exploit will get nuked and you'll have to reprogram the memory card.
 * The exploit cannot be copied to another memory card using the console - you'll need a PC with DexDrive or a PS2.
 * The exploit cannot be uninstalled using the console alone either.

Since v1.3.3, a memory card left connected will not crash the console or cause any significant issues. However, as it needs to be plugged in on the first slot, you'll probably still need to remove it before launching the game so it loads and saves properly.

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

This video from [MrMario2011](https://www.youtube.com/channel/UC-YlkP3c1zKUPfyMMurARAQ) explains pretty well how to install it using uLaunchELF and [Memory Card Annihilator](https://www.ps2-home.com/forum/viewtopic.php?t=116) on a memory card:

<iframe width="560" height="315" src="https://www.youtube.com/embed/ggpm-thuaTY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="yt-video"></iframe>

Usage
-----

1. Turn on the console with the **memory card** with FreePSXBoot installed on the **first slot** and the **disc tray open**.
2. Once you reach the console's BIOS, select the memory card manager and click on it.

After about five seconds, tonyhax should boot.
