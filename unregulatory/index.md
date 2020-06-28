Unregulatory
============

This is a OpenWRT repository which, **for testing purposes** (such as debugging DFT issues), lifts the software limitations implemented by the kernel and drivers, and allows using a router in every existing band with virtually no power limit.

Please note using this file allows transmitting in bands and with power levels that may not be legal where you live. As per [the license](/#license), I take no responsability.

How to use
----------



How this was built
------------------

This is mostly so I remember how I did it last time, you don't need to read or understand this part.

1. Get the `wireless-regdb.git` repository from its official repository: [https://git.kernel.org/pub/scm/linux/kernel/git/sforshee/wireless-regdb.git]().

2. Replace all country contents with a table allowing for transmitting at:
	* 1W for the 2.4GHz band
	* 1W for the 5GHz band
	* 10W for the 60GHz band

	Using sed:
	```
	sed -nr -e "s/^(country [^:]+:).*/\1\n\t(2402 - 2494 @ 20), (30)\n\t(5150 - 5835 @ 160), (30)\n\t(57000 - 66000 @ 2160), (40)\n/p" db.txt >db-mod.txt
	```

3. Build the regulatory file:

	```
	./db2fw.py regulatory-mod.db db-mod.txt
	```

4. Painstakingly build manually the `.ipk` file.
5. Update the packages list and sign it.
