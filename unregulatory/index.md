Unregulatory
============

This is a OpenWRT repository which, **for experienced users and for testing purposes** (such as debugging DFT issues), lifts the software limitations implemented by the kernel and drivers, and allows using a router in every existing band with virtually no power limit.

Please note using this file allows transmitting in bands and with power levels that may not be legal where you live. As per [the license](/#license), I take no responsability.

Installation
------------

Configuring the repository is slightly convoluted but needs to be done just once per device, as it will survive reboots (and maybe upgrades? I'm not so sure):

1. Log into your OpenWRT device using the root account via SSH.
2. Fetch the package signing key:

	```
wget https://orca.pet/unregulatory/openwrt/unregulatory.pub
	```

	Alternatively, if you don't have HTTPS support on your or you prefer to create the file manually, you can do so with the command:

	```
cat <<'EOF' >unregulatory.pub
untrusted comment: orca.pet unregulatory public key
RWS99hsqblse+2wisfpZwUgGoZfNlNam401e8CXAoCfKN+kOlSv9OpfO
EOF
	```

3. Install the signing key:

	```
opkg-key add unregulatory.pub
	```

4. Append the repository to the custom feeds list:

	```
echo "src/gz unregulatory http://orca.pet/unregulatory/openwrt" >>/etc/opkg/customfeeds.conf
	```

	This configures fetching the package over plain old HTTP, which is totally fine as the entire repository contents are digitally signed. If you have HTTPS support, you can change the line to fetch it over HTTPS, too.

If you have Luci installed, the following actions may be done much more easily on the web interface.

1. Update the feeds list:

	```
opkg update
	```

2. Finally, upgrade the `wireless-regdb` package:

	```
opkg install wireless-regdb
	```

The new package version should read `9999.*`.

Usage
-----

After installing, reboot to ensure the wireless driver picks up the new, updated wireless registry. Once done, you may choose any country you want on the wireless configuration, and then configure the channel and power to your hearth's content.

**Warning**: just because the GUI lets you configure a certain frequency **doesn't mean it's going to work**. Also don't go nuts and set the transmission power too high - you might damage your device if it's not limited by hardware. It's unlikely, but not impossible.

How this was built
------------------

This is mostly a personal reminder so I know how I did it last time - _you don't need to read or understand this part_.

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
