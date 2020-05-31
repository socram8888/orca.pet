ATECC608 USB dongle
===================

![Dongle photo]({{ 'dongle_photo.jpg' | cachebuster }})

This project is an USB dongle for connecting a Microchip Crypto Authentication chips to a PC.

What are these crypto ICs?
--------------------------

The Crypto Authentication chips is a series of cheap (less than a euro in single quantities) cryptographic chips from Microchip, designed to run as secure enclaves in equally inexpensive consumer electronics such as IoT devices.

This series include:

 * The [ATECC608A](https://www.microchip.com/wwwproducts/en/ATECC608A), a pretty capable device which has AES, SHA256, HMAC, EC, DRBG and TRNG.
 * The [ATECC508A](https://www.microchip.com/wwwproducts/en/ATECC508A), an older version of the ATECC608A.
 * The [ATSHA204](https://www.microchip.com/wwwproducts/en/ATSHA204A) which does SHA and HMAC only.
 * The deprecated [ATAES132](https://www.microchip.com/wwwproducts/en/ATAES132A), which does AES only.

As opposed to most companies which require signing a NDA for accesing the documentation, Microchip has shared all the required documentation to use them. They even have a public, open source cryptography library called [cryptoauthlib](https://github.com/MicrochipTech/cryptoauthlib).

Their availability, pricing and documentation make them a pretty nice device for securing critical information on a server or a PC, such as the HTTPS or SSH private keys.

However, while the chips are easy to come by, there seems to be no free, open-source design to use them on a PC. The only official solutions are large, bulky development kits which of course are not suitable for end usage.

This dongle attempts to solve that problem, by providing a small, easy to build USB dongle made using dirty common and cheap off-the-shelf parts. While it uses SMD parts, I've intentionally used relatively large parts whereas possible so it can be easily assembled and soldered by hand.

**WARNING: This project requires a CryptoAuthentication device that uses the SWI protocol (part number is ATxxx-xxxxZ), instead of I2C (part number is ATxxx-xxxA). An I2C device cannot be configured to use SWI, and vice-versa.**

Schematic
---------

![Dongle schematic]({{ 'schematic.png' | cachebuster }})

Circuit explanation
-------------------

The dongle is extremely simple, and has the bare minimum to work. It is designed around the CH340G USB-UART interface made by WCH (`U1`). Having a built-in voltage regulator, all it needs is a single 12MHz crystal (`X1`).

While the USB-UART IC has a full-duplex interface with separate `TXD` and `RXD` pins, the Crypto Authentication devices expect communication to happen over a single I/O pin called `SWI`.

The task of converting the full-duplex interface to the half-duplex interface is accomplished by the non-inverting buffer IC (`U3`) and a pull-up resistor (`R1`).

The board also provides an LED controllable by the secure element's GPIO pin (`LED2`). If the GPIO pin wants to be used as a sense pin and the LED interferes, it can be disabled without desoldering anything just by cutting the `LY` (**L**ED **Y**es) and bridging `LN` (**L**ED **N**o).

Finally, the `H1` header is a debug header which exposes the 5V, SWI, GPIO and ground signals.

Parts
-----

Most of the parts come from [LCSC](https://www.lcsc.com), except for the Crypto Authentication IC which is not available from them, and comes from [MicrochipDirect](https://www.microchipdirect.com/) instead.

| Des.  | Part               | Description          | Footprint | Supplier         | Supplier P/N      |
|-------|--------------------|----------------------|---------- |------------------|-------------------|
| U1    | CH340G             | USB-UART IC          | SOIC-16   | LCSC             | C14267            |
| U2    | ATECC608A          | Crypto  IC           | SOIC-8    | Microchip Direct | ATECC608A-SSHCZ-B |
| U3    | MC74VHC1G07DTT1G   | Non-inverting buffer | SOT-23-6  | LCSC             | C242266           |
| X1    | X49SD12MSD2SC      | 12MHz crystal        | ---       | LCSC             | C16369            |
| Q1    | S8050H             | NPN transistor       | SOT-23    | LCSC             | C111272           |
| C1,C2 | CL21C200JBANNNC    | 20pF MLC cap         | 0805      | LCSC             | C1798             |
| C3,C4 | CL21B104KBFWPNE    | 100nF MLC cap        | 0805      | LCSC             | C307360           |
| C5    | CL31A226KOHNNNE    | 22uF MLC cap         | 1206      | LCSC             | C90146            |
| R1,R4 | RMC08054.7K1%N     | 4.7K resistor        | 0805      | LCSC             | C269746           |
| R2,R3 | RMC08051501%N      | 150ohm resistor      | 0805      | LCSC             | C325766           |
| LED1  | NCD1206R1          | Red LED              | 1206      | LCSC             | C84270            |
| LED2  | NCD1206G1          | Green LED            | 1206      | LCSC             | C99881            |
| USB1  | SOFNG USB-05       | USB-A 2.0 male       | ---       | LCSC             | C112454           |
| H1    | MTB125-1104R1      | 4x1 male pin header  | ---       | LCSC             | C376122           |

The **total cost is about 3€ per dongle** in small quantities, including the cost of making the PCBs.

Downloads
---------

This project is [available at **EasyEDA**](https://easyeda.com/socram8888/atecc-usb-dongle) where you can freely look, modify and download the schematic, Gerber files or bill of materials.

Software
--------

For now, I have not yet had time to adapt the Microchip library to this dongle, which means there's zero software for it yet.
