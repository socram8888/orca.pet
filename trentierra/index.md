---
---

Tren-Tierra
===========

Tren-Tierra (literally, "train-ground" in Spanish) is an implementation of the UIC 751-3 radio communication system employed by several passenger and freight train companies through Spain. Its purpose is to serve as a means of contacting railroad personnel in case of an incidence, such as delays, train malfunction or an accident.

The system has two different operating modes: A and C. This document will explain thoroughly the mode A, which is used for contacting the CTC (centralized traffic control).

This document has been written using [OSINT](https://en.wikipedia.org/wiki/Open-source_intelligence), with both official [^uic-751-3] and unofficial [^afergodella] sources.

The radio layer
---------------

Before getting into technical details, it'll be useful to clarify briefly how the trains are run.

As the track networks are vast and need constant attention, they are split into multiple segments ("bandas de regulación") which are managed by generally a single person on the CTC.

The size of said segments depends on the frequency of the trains as well as the topology of the track section: shorter segments are used in zones with high usage (so there are less trains in a single segment to be managed at any given time), as well as single track segments (as they're harder to manage with the constant switching of directions).

Each segment gets assigned one of the X available radio channels (7 for Renfe, 2 for FGV), in a manner akin to a coloration map - they're arranged so that two close or contiguous different track sections never share the same channel.

The boundaries of each segment are indicated at the edges to the train drivers using trackside signs with the channel number in white over a black background. Once seen, the driver must manually type it in on the radio unit on the cab along with their train number.

Each channel represents a group of four different frequencies on the [UHF band](https://en.wikipedia.org/wiki/Ultra_high_frequency) (between 440MHz and 460MHz), which are used for wideband (25KHz) analog FM voice:

  - Three frequencies (here referrer to as A, B and C) are used for ground to train communications.
  
    They all contain exactly the same audio (relayed via a private optical fiber network) and are broadcasting 24:7 (so that when a trains is out of coverage the driver can get an indication, and to discourage anyone from illegally using the frequency).
  
    They are used in a repeating A-B-C-A-B-C... pattern through the track segment, to avoid destructive wave interference from adjacent transmitters that would cause blind spots on the coverage.

  - The remaining one (in this document, referred to as T) is used for train to ground, which is only occupied when a certain train needs to transmit.

The audio
---------

Although the system uses analog FM, the system is far from being a mere glorified walkie talkie-based system.

Originally, it used plain FM voice with a signaling system of superimposed sine waves (much like [CTCSS](https://en.wikipedia.org/wiki/Continuous_Tone-Coded_Squelch_System), except on the audible range), and it was later extended using a fully digital [AFSK](https://en.wikipedia.org/wiki/Frequency-shift_keying#Audio_frequency-shift_keying)-based packet system.

The system has support for two kind of calls:

  - **Selective** which are between a single train and the control center, for minor issues such as train breakage, delays, routing...

	Since they are not urgent, they have to be accepted by the personnel at the control center before the call can take place.

  - **Emergency** for situations where the circulation or life could be at risk (such as derailments).
  
    When such a call takes place, the handsfree loudspeakers of both the CTC and in the cab of _every train on the segment_ is automatically switched on and begins reproducing the voice of whoever initiated the call.

### The analog signaling system

The standard UIC 751-3 defines four frequencies, of which only three are used by tren-tierra.

  - 2280Hz: the channel free signal.
  - 2800Hz: the pilot signal.
  - 1520Hz: the warning signal.

At any given time, **at most** only one may be present, and are used as follows:

#### Ground to train

| Condition      | Signal                      |
|----------------|-----------------------------|
| Idle           | channel free (2280Hz) alone |
| Standard call  | voice alone                 |
| Emergency call | voice + warning (1520Hz)    |
| Digital packet | data alone                  |

#### Train to ground

| Condition      | Signal                   |
|----------------|--------------------------|
| Standard call  | voice + pilot (2800Hz)   |
| Emergency call | voice + warning (1520Hz) |
| Digital packet | data alone               |

### The digital signaling system

**TODO**

Mode C
------

The mode C is essentially using the on-board station as a normal walkie talkie:
 - It uses a single frequency, as it is half duplex, transmitting by means of a push-to-talk button.
 - It does not support any kind of analog signaling. The squelch opens by carrier detection.
 - No digital packets are supported.

This mode is used to talk to staff in stations or on board trains, as well as railside workers. They use standard, off-the-shelf UHF walkies - in fact, even though they're not legal for commercial usage, I've seen Renfe staff carrying the classic [Baofeng UV-5R](https://www.google.com/search?q=baofeng+uv-5r) in Valencia!

Companies
---------

To my knowledge, it is being used only by two Spanish companies - click on them for more information about their channel planning:

  - [Adif](adif.html)
  - [Ferrocarrils de la Generalitat Valenciana](fgv.html)

Downloads
---------

  - [CHIRP](https://chirp.danplanet.com/)-compatible CSV channel list: **[download](chirp.csv)**

References
----------

[^uic-751-3]: UIC code 751-3: Technical regulations for international analogue ground-train radio systems, 4th edition, Union Internationale des Chemins de fer, 2005, ISBN 2-7461-0441-5.
[^afergodella]: [El sistema Tren-Tierra en España](http://www.afergodella.es/el-sistema-tren-tierra-analogico-en-espana/), Asociación Ferroviaria de Godella, 2013.
