---
---

μMC1
====

The project
-----------

μMC1 (read "micro memory controller one" or "micro em ce one") is a mapper and cartridge for NES and Famicom game development and production. It provides:

 - Up to **512 KiB PRG-ROM** backed by a modern 5V Flash IC.
 - **8 KiB CHR-RAM** for the PPU.
 - **Mapper-controlled mirroring**, allowing for vertical, horizontal and single-screen mirroring.
 - **Self-flashability**, allowing games to save progress to the Flash IC.
 - No bus collisions when writing to control registers.

The μMC1 is based heavily on both the popular official [MMC1][mmc1]. As such, it is extremely to develop games for it with basic MMC1 knowledgement, and easy to port games from a MMC1 or a [UxROM][uxrom].

This cartridge has been based around a modern but cheap Dialog GreenPAK, which acts as a mapper. This allows for more advanced features than most contemporary cartridges based on discrete logic such as the [UNROM 512][unrom512] or [GTROM][gtrom], while still keeping the budget low.

Subsections
-----------

 - [Technical information](tech.html)

[gtrom]: https://wiki.nesdev.com/w/index.php/GTROM
[mmc1]: https://wiki.nesdev.com/w/index.php/MMC1
[uxrom]: https://wiki.nesdev.com/w/index.php/UxROM
[unrom512]: https://wiki.nesdev.com/w/index.php/UNROM_512
