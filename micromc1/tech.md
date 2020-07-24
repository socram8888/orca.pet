---
---

μMC1 - Tech docs
================

[← Back to μMC1 general](index.html)

This section contains technical information for developers and hardware enthusiasts.

Components
----------

The cartridge is composed of three basic components:

 - A [SST39SF040][flash] 512 KiB PLCC NOR FLASH IC, acting as PRG-ROM.
 - A [IS61C256][sram] 32 KiB SRAM IC, acting as CHR-RAM for the PPU.
 - A [SLG46824 Dialog GreenPAK][gpak], acting as a mapper IC.

Although the SRAM for CHR-RAM has 32 KiB space, **only 8 KiB of the SRAM are exposed**. The reason why 4-screen was not implemented is because this mode is not commonly supported in Famiclones, and was never commercially used in MMC1 or UNROM games.

The PRG-ROM supports a socket, but it only makes sense for development cartridges. As such, the FLASH can be optionally soldered straight to the PCB.

Banks
-----

For CPU reads, the mapper divides the memory in two banks, just like [UxROM][uxrom] and [MMC1 in mode 3][mmc1modes]:

 - CPU `$8000`-`$BFFF`: 16 KiB read+write switchable bank
 - CPU `$C000`-`$FFFF`: 16 KiB read-only bank, fixed to last in ROM
 - PPU `$0000`-`$1FFF`: 8 KiB fixed CHR-RAM

The lower bank **is writable**, and thus this allows self-writability to store the current progress, or to update the current running program during development.

<!-- TODO: write documentation on how to write to Flash once tested in real hardware -->

Registers
---------

Just like the MMC1, and unlike all other mappers, **the registers are written bit by bit, LSB-first on D0** of the CPU. They are implemented by two shift registers **with no buffering** (ie changes apply immediately, not only when all bits have been written), and writes go to one or the other depending on the CPU address:

 - CPU `$C000`-`$DFFF`: 2-bit mirroring control
 - CPU `$E000`-`$FFFF`: 5-bit PRG bank selection

### Mirroring (`$C000`-`$DFFF`)

The mirroring is controlled by a 2-bit shift register, which shifts the D0 bit of the CPU on any write from `$C000` to `$DFFF`:

![Mirroring control](mirr-ctl.svg)

The 2-bit mirroring control value to mode mapping is:

| Bits | Mode            |
|------|-----------------|
| `00` | Horizontal      |
| `01` | Single screen A |
| `10` | Single screen B |
| `11` | Vertical        |

While it might look silly and arbitrary, it is not. These values have been carefully chosen to allow both easy [porting of MMC1 games](porting.html), and glitch-less swaping mid-render of single screen modes, without requiring the double buffering the MMC1 had.

#### Sample code

```s6502
; Sets vertical mirroring
setvmirr:
	LDA #$01
	STA $C000
	STA $C000
	RTS

; Sets horizontal mirroring
sethmirr:
	LDA #$00
	STA $C000
	STA $C000
	RTS

; Sets mirroring to single screen A
setmirrscra:
	LDA #$01
	STA $C000
	; LSR to make it zero
	LSR A
	STA $C000
	RTS

; Swap single screen A with single screen B
swapscratob:
	LDA #$01
	STA $C000
	RTS
```

The reason why single screen A is `01` and B is `10` should be evident by the code above: swapping one for the other requires feeding the shift register *a single bit*.

Any other 2-bit combination would've required to feed two bits for swapping single screen, and thus it would've caused visible glitches after feeding the first bit but before feeding the second.

### PRG bank (`$E000`-`$FFFF`)

The PRG bank register is implemented by a 5-bit register, and as such it allows addressing up to 512 KiB of FLASH memory.

![PRG bank register](prg-bank.svg)

#### Sample code

For changing the bank, the code is pretty similar to that of the MMC1:

```s6502
; Sets the current switchable bank
; Parameters:
;  - A: desired bank
setbank:
	STA $E000
	LSR A
	STA $E000
	LSR A
	STA $E000
	LSR A
	STA $E000
	LSR A
	STA $E000
	RTS
```

[flash]: https://www.microchip.com/wwwproducts/en/SST39SF040
[gpak]: https://www.dialog-semiconductor.com/products/slg46824
[mmc1]: https://wiki.nesdev.com/w/index.php/MMC1
[mmc1modes]: https://wiki.nesdev.com/w/index.php/MMC1#Control_.28internal.2C_.248000-.249FFF.29
[sram]: http://www.issi.com/WW/pdf/61C256AL.pdf
[uxrom]: https://wiki.nesdev.com/w/index.php/UxROM
