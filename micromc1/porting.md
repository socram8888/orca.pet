---
---

μMC1 - Porting
==============

[← Back to μMC1 general](index.html)

This section documents some tips for porting from common mappers to the μMC1.

MMC1
----

MMC1 is the closest official mapper, and thus it is an obvious source for porting games from.

### Differences with a MMC1

First, it is probably useful to briefly discuss the differences between a MMC1 and the μMC1.

While the μMC1 is based on the MMC1, some features had to be dropped to fit a useable mapper into the GreenPAK:

| MMC1                                                                              | μMC1                                                                                   |
|-----------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| Supports [multiple banking modes][mmc1modes]                                      | Supports only UxROM-like mode                                                          |
| 4-bit PRG-ROM bank register (up to 256 KiB addressable)                           | 5-bit PRG-ROM bank register (up to 512 KiB addressable)                                |
| Supports CHR-ROM banking                                                          | No CHR-ROM banking supported                                                           |
| Built-in support for PRG-RAM                                                      | PRG-RAM is not supported without external logic                                        |
| Register writes are buffered, and changes apply only when all 5 bits are written  | Registers are implemented by shift registers, and changes are effective immediately    |
| Ignores all writes but first during an opcode execution                           | Processes all CPU writes to its registers                                              |

Therefore, a game that you want to port has to:

 - Use CHR-RAM, which roughly 30% of the official NES/Famicom licensed titles do.
 - Have no PRG-RAM.
 - Use banking mode of the game needs to be 3 (which all games I have tested do).

These limitations yield that only 78 entries of commercial games [bootgod's database][nesdb] are suitable.

[nesdb]: http://bootgod.dyndns.org:7777/
