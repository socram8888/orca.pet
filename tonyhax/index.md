---
---

tonyhax
=======

Software backup loader exploit thing for the Sony PlayStation 1.

<iframe width="560" height="315" src="https://www.youtube.com/embed/TO6msoWZa2I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="yt-video"></iframe>

Why?
----

The first question that might pop up on your mind regarding this project is "why the fuck didn't you just install a modchip?".

The answer is simple: I didn't want to mod my mint, boxed PSone, but I didn't want to leave it rotting on a shelf either.

Also, as an owner of a SCPH-102 console, these are a pain in the ass when it comes to chipping - in addition to the generic SCEx wobble check performed by the CD controller that is easily patchable, the boot menu on these also checks for the region string, which involve installing even more wires and a full sized Arduino Pro Mini or AtMega328 chip to patch the CPU BIOS to play out of region games. Not cool.

On top of that, and unlike Action Replay or swap discs, this does **allow CD-DA games and multi-disc games to work flawlessly**.

Download
--------

Releases are available at the [GitHub releases page](https://github.com/socram8888/tonyhax/releases).

Source code is also fully available under the [WTFPL license](https://github.com/socram8888/tonyhax/blob/master/LICENSE) at [GitHub](https://github.com/socram8888/tonyhax/).

Installation
------------

As of tonyhax v1.3, you have two options:
 * [Launch using a game exploit](game-exploit.html)
 * [Launch using FreePSXBoot](freepsxboot.html)

| Method                                 | Game exploit          | FreePSXBoot           |
|----------------------------------------|-----------------------|-----------------------|
| Needs an original game?                | Yes                   | No                    |
| Needs a memory card?                   | Yes                   | Yes                   |
| Can the memory card store other saves? | Yes                   | No                    |
| Time from off to playing a backup      | ~1m30s                | ~1m                   |

Regarding compatibility:

| Method                                 | Game exploit          | FreePSXBoot           |
|----------------------------------------|-----------------------|-----------------------|
| Compatible with European PS1?          | Yes                   | Yes                   |
| Compatible with American PS1?          | Yes                   | Yes                   |
| Compatible with Japanese PS1?          | No                    | No                    |
| Compatible with European PS2?          | ≤ SCPH-39000 only     | No                    |
| Compatible with American PS2?          | ≤ SCPH-39000 only     | No                    |
| Compatible with Japanese PS2?          | No                    | No                    |

Both behave identically the same feature-wise, so use whichever suits you more.

Game compatibility
------------------

First and foremost, the console **can only read CD-R media, not CD-RW discs**.

Despite the ability of tonyhax to patch games with antipiracy, only a very small subset of games are currently supported, since it's a pretty manual and laborious task. As a general rule, if the game can be copied in a manner that doesn't trigger antipiracy (for instance, by properly copying the subchannel data for games that are EDC- or libcrypt-protected), I will not look into patching them. If you want to do it yourself and make a PR, that's fine though.

![Screen displaying the "SOFTWARE TERMINATED" message](terminated.jpg)

If the game displays a message like the one above, this means the game has an explicit modchip check, and the only way to fix this would be to patch the game. In that case, [please file a report on GitHub](https://github.com/socram8888/tonyhax/issues/new?assignees=&labels=antipiracy&template=antipiracy-issue.md&title=).

Acknowledgements
----------------

In alphabetical order:

 * [ChampionLeake](https://twitter.com/ChampionLeake79) for documenting the Brunswick exploits at [PlayStation dev wiki](https://playstationdev.wiki/ps1devwiki/index.php?title=Vulnerabilities).
 * [Gerardo Rodriguez](https://www.youtube.com/channel/UCxus_GF6-Lu9qD62nhLYxtA) for suggesting Cool Boarders 4 on a YouTube comment.
 * [@FMecha](https://twitter.com/FMecha_EXE/status/1372921230676783107) for suggesting Castrol Honda VTR on Twitter.
 * [Jose Silva](https://github.com/krystalgamer) for adding support for Sports Superbike II and XS Moto.
 * Martin Korth for his [super awesome technical documentation page](https://problemkaputt.de/psx-spx.htm) that was vital for the development of this project, as well as for developing the [no$psx emulator](https://problemkaputt.de/psx.htm) that was also essential for debugging.
 * [Patrick Vogt](https://patrickvogt.net/) for testing on multiple development PS1 consoles.

On the media
------------

Sorted from older to newer.

 * [GBAtemp - Tonyhax is a new softmod backup loader for the PlayStation 1](https://gbatemp.net/threads/tonyhax-is-a-new-softmod-backup-loader-for-the-playstation-1.584717/)
 * [psx-place - PS1 tonyhax - A Software backup loader exploit for the PS1 (leverages save game exploit)](https://www.psx-place.com/threads/tonyhax-a-software-backup-loader-exploit-for-the-ps1-leverages-save-game-exploit.33236/)
 * [MrMario2011 - PS4 7.50 Jailbreak Released & tonyhax PS1 Softmod Backup Loader - ModChat 075](https://www.youtube.com/watch?v=caBo0YARS0c)
 * [ModzvilleUSA - TONYHAX Setup Guide! - New Softmod for every Ps1 console!](https://www.youtube.com/watch?v=gtba3GtmC1I)
 * [Hackaday - PlayStation Unlocked With New Software Hack](https://hackaday.com/2021/03/15/playstation-unlocked-with-new-software-hack/)
 * [MrMario2011 - How to Softmod Your PS1 - tonyhax Install Tutorial](https://www.youtube.com/watch?v=01gVgTQLP9U)
