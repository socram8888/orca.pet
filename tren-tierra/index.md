Tren-Tierra
===========

Tren-Tierra (literally, "train-ground" in Spanish) is a radio communication system employed by several passenger and freight train companies through Spain. Its purpose is to contact the control center (CTC) in case of an incidence, such as delays, train malfunction or an accident.

Companies using it include:

 - [Adif](http://www.adif.es/), through most of the state-owned Iberian gauge network, with trains run mainly (but not exclusively) by [Renfe](https://renfe.com/).

 - The suburban (metro) services of [Ferrocarrils de la Generalitat Valenciana](https://www.fgv.es/) (also known as FGV), in the province of Valencia with the commercial name of Metrovalencia. Trams, on the other hand, use standard GSM.

The 

The radio layer
---------------

Technically speaking, the system consists of a radio network on the UHF band with several full duplex radio channels, transmitted with highly directional antennas (usually Yagis) running next to the tracks.

The disposition of the channels are similar to that of a coloration map - there are only a handful of them, but they're distributed so that two close or contiguous different track sections never share the same channel.

Each track segment is controlled by a single person at the CTC. Thus, to better manage the network, the coverage of each channel is scaled depending on the frequency of the trains, as well as the topology and length of the track section. Shorter segments are used in zones with high usage to have a smaller granularity and reduce the stress of the operators.

Furthermore, each channel is divided into four frequencies: three for ground to train communications (herein refered to them as A, B and C), and one for train to ground (refered to as T).

The A, B and C channels are transmitting constantly during night and day, even when there is no activity, so that train drivers may get a warning when they are out of coverage.

These three channels are used in a repeating A-B-C-A-B-C... pattern through the track segment, to avoid destructive wave interference from adjacent transmitters that would cause blind spots of coverage.

