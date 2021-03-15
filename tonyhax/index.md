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

Download
--------

Releases are available at the [GitHub releases page](https://github.com/socram8888/tonyhax/releases).

Source code is also fully available under the [WTFPL license](https://github.com/socram8888/tonyhax/blob/master/LICENSE) at [GitHub](https://github.com/socram8888/tonyhax/).

Installation
------------

To install this exploit, you'd need a means of copying the save file to a PS1 memory card. Personally, I've used a PS2 with [Free McBoot](https://www.ps2-home.com/forum/viewtopic.php?t=1248) and uLaunchELF.

All you have to do is copy the game's crafted save file and the `BESLES-99999TONYHAX` file into the card. That's it.

Once installed, you can freely copy it to other cards using the PS1 and the memory card management menu, and distribute it freely amongst friends.

**Please note the save games expect the `BESLES-99999TONYHAX` file to be in the first memory card slot. It will not work if the memory card is inserted in the second card slot.**

Video from [MrMario2011](https://www.youtube.com/channel/UC-YlkP3c1zKUPfyMMurARAQ) installing it using uLaunchELF on a memory card:

<iframe width="560" height="315" src="https://www.youtube.com/embed/caBo0YARS0c?start=1083" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="yt-video"></iframe>

### Save games

| Game                            | Region | Code       | MCS file          | Raw file            |
|---------------------------------|--------|------------|-------------------|---------------------|
| tonyhax SPL **required**        | -      | -          | tonyhax.mcs       | BESLES-99999TONYHAX |
| Brunswick Circuit Pro Bowling   | NTSC-U | SLUS-00571 | brunswick1-us.mcs | BASLUS-00571        |
| Brunswick Circuit Pro Bowling   | PAL-E  | SLES-01376 | brunswick1-eu.mcs | BESLES-01376        |
| Brunswick Circuit Pro Bowling 2 | NTSC-U | SLUS-00856 | brunswick2-us.mcs | BASLUS-00856        |
| Brunswick Circuit Pro Bowling 2 | PAL-E  | SLES-02618 | brunswick2-eu.mcs | BESLES-02618        |
| Tony Hawk's Pro Skater 2        | NTSC-U | SLUS-01066 | thps2-us.mcs      | BASLUS-01066TNHXG01 |
| Tony Hawk's Pro Skater 2        | PAL-E  | SLES-02908 | thps2-eu.mcs      | BESLES-02908TNHXG01 |
| Tony Hawk's Pro Skater 2        | PAL-DE | SLES-02910 | thps2-de.mcs      | BESLES-02910TNHXG01 |
| Tony Hawk's Pro Skater 2        | PAL-FR | SLES-02909 | thps2-fr.mcs      | BESLES-02909TNHXG01 |
| Tony Hawk's Pro Skater 3        | NTSC-U | SLUS-01419 | thps3-us.mcs      | BASLUS-01419TNHXG01 |
| Tony Hawk's Pro Skater 3        | PAL-E  | SLES-03645 | thps3-eu.mcs      | BESLES-03645TNHXG01 |
| Tony Hawk's Pro Skater 3        | PAL-DE | SLES-03647 | thps3-de.mcs      | BESLES-03647TNHXG01 |
| Tony Hawk's Pro Skater 3        | PAL-FR | SLES-03646 | thps3-fr.mcs      | BESLES-03646TNHXG01 |
| Tony Hawk's Pro Skater 4        | NTSC-U | SLUS-01485 | thps4-us.mcs      | BASLUS-01485TNHXG01 |
| Tony Hawk's Pro Skater 4        | PAL-E  | SLES-03954 | thps4-eu.mcs      | BESLES-03954TNHXG01 |
| Tony Hawk's Pro Skater 4        | PAL-DE | SLES-03955 | thps4-de.mcs      | BESLES-03955TNHXG01 |
| Tony Hawk's Pro Skater 4        | PAL-FR | SLES-03956 | thps4-fr.mcs      | BESLES-03956TNHXG01 |

Usage
-----

### For Tonyhawk's games

Once installed, all you have to do is boot the game like you'd normally do.

Once you get to the main menu, it'll load the save game (it should say "Loading TONYHAX NTSC/PAL", depending on your region). After it's done, go to the "CREATE SKATER" function and press X. After a couple seconds, tonyhax should boot.

### For Brunswick games

Boot the game as you'd normally do. Then, on the main menu, select "LOAD GAME", then "MEMORY CARD 1". After about three seconds tonyhax should be running.

Compatibility
-------------

### Consoles

I've personally only attempted this with a PAL SCPH-102 PSone, but according to Martin Korth's documentation this should work with:

 * Every PAL console.
 * Every NTSC-U console **except** the very early SCPH-1000.
 * NetYaroze consoles.

However, this will **not** work with:

 * Japanese NTSC-J consoles (stubbed/bugged CD unlock).
 * NTSC-U SCPH-1000 consoles (BIOS predates the introduction of the CD unlock command).
 * ~~PlayStation 2 consoles~~ Information at the moment is contradictory. no$psx documentation states it is not compatible, and [one Redditor tried it and it failed](https://www.reddit.com/r/psx/comments/m33b00/tonyhax_softmod_backup_loader_thing_using_thps23/gqoo4jk). However there's [another video on Twitter](https://twitter.com/xecut1onr/status/1370984402809946114) that tested it on video and it worked. Further research is needed.

### Incompatible games

This is a short, non-exhaustive list of games that have been report not to work:

 * No games have been reported to fail on v1.1.

How does this works?
--------------------

In layman terms, this exploit uses an oversight from the programmers: the game does not check that text in the save file hasn't been tampered and fits in the space the program allocated for it. If we externally change that text to something longer, we can overwrite other vital parts of the system's memory and run our own code.

### For Tonyhawk's games

THPSx save games have been modified to have the following two separate parts:

 - The highscores have been replaced with a small first-stage payload of a couple hundred bytes.
 - The first custom character name has an abnormally long name, which contains at an specific position the memory address of the first-stage payload.

![Skater name](stackra.png)

When entering the skater customization menu, the menu is dinamically generated to include the saved skater names in a way like:

```c
void trim_string(char * buffer, int len) {
	char trimmed[x];

	// Copy to our local buffer
	strcpy(trimmed, buffer);

	// Trim it
	trimmed[len - 4] = '.';
	trimmed[len - 3] = '.';
	trimmed[len - 2] = '.';
	trimmed[len - 1] = 0;

	// Copy back to the original buffer
	strcpy(buffer, trimmed);
}

void create_skater_entry(int id) {
	char menutext[x];
	int textlen;

	sprintf(menutext, "Skater %c: %s", 'A' + id, custom_skater_data[id].name);
	while ((textlen = strlen(menutext)) > MAX_LEN) {
		trim_string(menutext, textlen);
	}

	// ...
}
```

Essentially, if a string that's too long to overflow the buffer is specified, the buffer overflows and overwrites part of the stack as we want to, but then it gets hammered with periods.

**However**, as `trim_string` is a a subcall and has a local buffer, if we specify a character name with the right length (165 characters, exactly), the null terminator in the `trimmed` buffer overlaps the first character of `menutext`, resulting in a menu entry with length of 0, thus sparing the rest of the stack contents.

After some more menu-related stuff, the return address is finally pulled from the stack and the code jumps to it. This return address points to the beginning of the high scores menu, whose contents are also loaded with no checks from the memory card, and where we have the first-stage payload.

![High scores with first-stage payload](highscores.png)

### For Brunswick games

This is a super simple exploit. The program loads the entire save file contents at an static memory location, then blindly `sprintf`s into a stack buffer. Using a string long enough with the address of first stage loader at the correct position gets us executing our own code.

![Brunswick save game modified](brunswick.png)

Above, the <span style="color: red;">long username</span>, with the <span style="color: green;">memory location</span> (`0x80110AA4`) of the <span style="color: blue;">first stage bootloader</span>.

### Common to all

The first stage payload's sole purpose is to load the secondary program loader (or SPL for short) from an additional save file in the memory card using the PS1 BIOS calls. Once loaded, it jumps straight to it. If for some reason it fails to load the SPL, a red screen is displayed, indicating that the exploit was successfully triggered but the it couldn't continue.

As the console is left in an inconsistent state, the SPL then first reinitializes the system kernel (RAM, devices...), by using the very same calls the ROM executes during the booting of the console.

After that, the GPU is reset. Once the GPU is ready again, the sets up the video to a resolution of 320x240, unpacks the 1bpp font from the BIOS ROM into VRAM, and draws the basic border and program name to know everything is working fine until this point.

With a fully working screen, it then proceeds to unlocks the CD drive to accept discs missing the SCEx signature, leveraging the [CD BIOS unlock commands](https://problemkaputt.de/psx-spx.htm#cdromsecretunlockcommands) found by Martin Korth. These unlock commands are a sort of backdoor, and the drive, probably in order to keep them secret, returns an error instead of a success message. The SPL is coded to expect a particular error to be returned, and will actually abort if the drive returns that it succeeded or if it returns another unexpected error code.

After unlocking it, it waits for the lid to be opened and closed, allowing the user to insert a new CD.

After that, the CD filesystem is reinitialized. It proceeds to read the SYSTEM.CNF configuration file, reinitializes the kernel with the parameters the game needs, and finally loads and runs the game's main executable.

Unexploitable games
-------------------

This is just a short list of games I've glanced over and determined they are unlikely to be exploitable:

 * Breath of Fire III: every text field is fixed length.
 * International Socer Pro '98: text is packed and the payload would have to use only the lowest 7 bits of a byte. Aside from this, everything seems to be copied using strncpy. Interestingly, using an ASCII control character seems to cause the game to go nuts and it starts self-destructing the RAM endlessly.
 * Mat Hoffmans Pro BMX: uses the same engine as THPS, but there is no place where user can introduce text.
 * Micro Machines V3: the game uses the save text as the user's name, extracting it from between the parentheses. Removing these parentheses or spacing them beyond what the game expects causes a good part of RAM to be overwritten with '?', which isn't really useful.

Acknowledgements
----------------

 * Martin Korth for his [super awesome technical documentation page](https://problemkaputt.de/psx-spx.htm) that was vital for the development of this project, as well as for developing the [no$psx emulator](https://problemkaputt.de/psx.htm) that was also essential for debugging.
 * [ChampionLeake](https://twitter.com/ChampionLeake79) for documenting the Brunswick exploits at [PlayStation dev wiki](https://playstationdev.wiki/ps1devwiki/index.php?title=Vulnerabilities).
