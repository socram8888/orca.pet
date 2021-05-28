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

Since tonyhax v1.4, you have three options:
 * [Launch using a game exploit](game-exploit.html)
 * [Launch using FreePSXBoot](freepsxboot.html)
 * [Launch using the boot CD](boot-cd.html)

| Method                                 | Game exploit          | FreePSXBoot           | Boot CD               |
|----------------------------------------|-----------------------|-----------------------|-----------------------|
| Needs an original game?                | Yes                   | No                    | No                    |
| Needs an chipped console?              | No                    | No                    | Yes                   |
| Needs a memory card?                   | Yes                   | Yes                   | No                    |
| Can the memory card store other saves? | Yes                   | No                    | N/A                   |
| Time from off to playing a backup      | ~1m30s                | ~1m                   | ~1m                   |

Regarding compatibility:

| Method                                 | Game exploit          | FreePSXBoot           | Boot CD               |
|----------------------------------------|-----------------------|-----------------------|-----------------------|
| Compatible with European PS1?          | Yes                   | Yes                   | Yes                   |
| Compatible with American PS1?          | Yes                   | Yes                   | Yes                   |
| Compatible with Japanese PS1?          | No                    | No                    | No                    |
| Compatible with European PS2?          | ≤ SCPH-39000 only     | No                    | ≤ SCPH-39000 only     |
| Compatible with American PS2?          | ≤ SCPH-39000 only     | No                    | ≤ SCPH-39000 only     |
| Compatible with Japanese PS2?          | No                    | No                    | No                    |

Both behave identically the same feature-wise, so use whichever suits you more.

Game compatibility
------------------

First and foremost, the console **can only read CD-R media, not CD-RW discs**.

Regarding disc protection, a game may use a mix of the following three mechanisms:
 * Using EDC, which hides some data in the CD-ROM subchannel.
 * Using libcrypt, which also relies on subchannel data.
 * Using an anti-modchip module, which detects abnormalities in the CD's wobble.

The first two ones just rely on the disc being properly copied. Hence, if the game is protected by either of the two protections (which can be checked in [redump.org](http://redump.org/discs/system/psx/)), make sure you use an image that contains the subchannel data (generally on a separate `.sub` file). If you don't, the game might behave funny or lock up entirely.

The later is a smarter check and it:
 * Checks for the presence of the [SCEx wobble](https://www.youtube.com/watch?v=XUwSOfQ1D3c) in the disc's TOC, which for a burned copy it will not be present.
 * Checks for the absence of the wobble in the outer part of the disc, which is not present on a retail disc and a non-stealth modchip will produce.

If the module kicks in, you'd get the classic screen of death:
![Screen displaying the "SOFTWARE TERMINATED" message](terminated.jpg)

Since v1.4, tonyhax can automagically patch these games, and _should_ work with every game that has such a protection in place. If such a game freezes or you get that screen, [please file a report on GitHub](https://github.com/socram8888/tonyhax/issues/new?assignees=&labels=antipiracy&template=antipiracy-issue.md&title=).

Development
-----------

First we'll have to install the build dependencies for [mkpsxiso](https://github.com/Lameguy64/mkpsxiso) and tonyhax itself. For Debian/Ubuntu (which also works under Windows' WSL, which I use for development), this would be:

```sh
sudo apt install build-essential gcc-10-mips-linux-gnu cmake libtinyxml2-dev git
```

Now download, compile and install mkpsxiso:

```sh
git clone https://github.com/Lameguy64/mkpsxiso/
cd mkpsxiso
mkdir build
cd build
cmake ..
cmake --build .
sudo cp bin_nix/mkpsxiso /usr/bin/local
```

Now you'll need to clone the repository and initialize all the Git submodules:

```sh
git clone https://github.com/socram8888/tonyhax/
cd tonyhax
git submodule init
git submodule update --recursive
```

Finally, to compile, all you need to execute is a single `make` command, which (hopefully) will result in a .zip file with all the required files created at the root.

Acknowledgements
----------------

In alphabetical order:

 * [Alex Free](https://github.com/alex-free) for adding the boot CD image.
 * [ChampionLeake](https://twitter.com/ChampionLeake79) for documenting the Brunswick exploits at [PlayStation dev wiki](https://playstationdev.wiki/ps1devwiki/index.php?title=Vulnerabilities).
 * [Gerardo Rodriguez](https://www.youtube.com/channel/UCxus_GF6-Lu9qD62nhLYxtA) for suggesting Cool Boarders 4 on a YouTube comment.
 * [@FMecha](https://twitter.com/FMecha_EXE/status/1372921230676783107) for suggesting Castrol Honda VTR on Twitter.
 * [John Wilbert Villamor (aka Lameguy64)](https://github.com/Lameguy64) for creating mkpsxiso.
 * [Jose Silva](https://github.com/krystalgamer) for adding support for Sports Superbike II and XS Moto.
 * Martin Korth for his [super awesome technical documentation page](https://problemkaputt.de/psx-spx.htm) that was vital for the development of this project, as well as for developing the [no$psx emulator](https://problemkaputt.de/psx.htm) that was also essential for debugging.
 * [Patrick Vogt](https://patrickvogt.net/) for testing on multiple development PS1 consoles.

Also thanks to everyone that's reported the issues on GitHub and helped me make it better!

On the media
------------

Sorted from older to newer.

 * [GBAtemp - Tonyhax is a new softmod backup loader for the PlayStation 1](https://gbatemp.net/threads/tonyhax-is-a-new-softmod-backup-loader-for-the-playstation-1.584717/)
 * [psx-place - PS1 tonyhax - A Software backup loader exploit for the PS1 (leverages save game exploit)](https://www.psx-place.com/threads/tonyhax-a-software-backup-loader-exploit-for-the-ps1-leverages-save-game-exploit.33236/)
 * [MrMario2011 - PS4 7.50 Jailbreak Released & tonyhax PS1 Softmod Backup Loader - ModChat 075](https://www.youtube.com/watch?v=caBo0YARS0c)
 * [ModzvilleUSA - TONYHAX Setup Guide! - New Softmod for every Ps1 console!](https://www.youtube.com/watch?v=gtba3GtmC1I)
 * [Hackaday - PlayStation Unlocked With New Software Hack](https://hackaday.com/2021/03/15/playstation-unlocked-with-new-software-hack/)
 * [MrMario2011 - How to Softmod Your PS1 - tonyhax Install Tutorial](https://www.youtube.com/watch?v=01gVgTQLP9U)
