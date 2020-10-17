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

The dongle is extremely simple, and has the bare minimum to work. It is designed around the CH340G USB-UART interface made by WCH (U1). Having a built-in voltage regulator, all it needs is a single 12MHz crystal (X1).

While the USB-UART IC has a full-duplex interface with separate TXD and RXD pins, the Crypto Authentication devices expect communication to happen over a single I/O pin called SWI.

The task of converting the full-duplex interface to the half-duplex interface is accomplished by the non-inverting buffer IC (U3) and a pull-up resistor (R1).

The board also provides an LED controllable by the secure element's GPIO pin (LED2). If the GPIO pin wants to be used as a sense pin and the LED interferes, it can be disabled without desoldering anything just by cutting the LY (**L**ED **Y**es) and bridging LN (**L**ED **N**o).

Finally, the H1 header is a debug header which exposes the 5V, SWI, GPIO and ground signals.

Parts
-----

Most of the parts come from [LCSC](https://www.lcsc.com), except for the Crypto Authentication IC which is not available from them, and comes from [MicrochipDirect](https://www.microchipdirect.com/) instead.

| Des.  | Description                                     |
|-------|-------------------------------------------------|
| U1    | USB-UART IC                                     |
| U2    | ATECC608A CryptoAuthentication  IC              |
| U3    | MC74VHC1G07 Non-inverting open-collector buffer |
| X1    | 12MHz crystal                                   |
| Q1    | Generic NPN transistor                          |
| C1,C2 | 20pF ceramic capacitor                          |
| C3,C4 | 100nF MLC capacitor                             |
| C5    | 22uF MLC capacitor                              |
| R1,R4 | 4.7KΩ resistor                                  |
| R2,R3 | 150Ω resistor                                   |
| LED1  | Red LED                                         |
| LED2  | Green LED                                       |
| USB1  | USB-A 2.0 male                                  |
| H1    | 4x1 male pin header                             |

The **total cost is about 3€ per dongle** in small quantities, including the cost of making the PCBs. The complete part list with LCSC and MicrochipDirect part numbers can be downloaded from the EasyEDA project below.

Downloads
---------

This project is [available at **EasyEDA**](https://easyeda.com/socram8888/atecc-usb-dongle) where you can freely look, modify and download the schematic, Gerber files or bill of materials.

Software
--------

For now, I have not yet had time to adapt the Microchip library to this dongle, which means there's zero software for it. Sorry.
