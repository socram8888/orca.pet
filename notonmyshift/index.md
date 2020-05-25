---
---

Not on my shift!
================

This is a domain list for blocking phishing and malware sites that I have encountered through the internet. Normally I'd collect these domains from spam mails that manage to slip through my email spam filter.

**TL;DR: [Click here to subscribe for uBlock Origin / AdBlock Plus](abp:subscribe?location=https://orca.pet/notonmyshift/abp.txt&title=Not on my shift!)**

There are three different versions:

<dl>
	<dt>AdBlock</dt>
	<dd><a href="https://orca.pet/notonmyshift/abp.txt"><tt>https://orca.pet/notonmyshift/abp.txt</tt></a></dd>
	<dt>Domain list</dt>
	<dd><a href="https://orca.pet/notonmyshift/domains.txt"><tt>https://orca.pet/notonmyshift/domains.txt</tt></a></dd>
	<dt>Hosts</dt>
	<dd><a href="https://orca.pet/notonmyshift/hosts.txt"><tt>https://orca.pet/notonmyshift/hosts.txt</tt></a></dd>
</dl>

Which version should I use?
---------------------------

**TL;DR: use AdBlock version for a browser, or domain list for DNS filtering**.

If you are using a modern web browser capable of using extensions and [uBlock Origin](https://github.com/gorhill/uBlock) or [AdBlock Plus](https://adblockplus.org/) installed, you'd want to use the AdBlock version.

It is the most flexible one and will block all website-based annoyances I've found, including blocking only certain URLs rather than entire domains which is not doable with other the other two.

If you are looking at a DNS-based blocking solution and you are using something modern such as [Pi-hole](https://pi-hole.net/) or [simple-adblock](https://openwrt.org/packages/pkgdata/simple-adblock), you'd want to use the domain list version, which blocks all subdomains for a known bad domain.

This is recommended to protect devices or applications which can't use the AdBlock version, such as video game consoles or cell phones. Personally, I have this running on my WiFi router to block hosts on all devices connected to it, with no manual configuration required on the devices themselves.

Lastly, there is the hosts version - it the least effective list, and is only recommended as last resort. It is however the most standard and widely supported one.

Why not use Malware Domain List or Malware domains?
---------------------------------------------------

Both current built-in lists in uBlock are completely abandoned and seemingly no longer updated.

The first list, [Malware Domains List](https://www.malwaredomainlist.com/), seems not to have received any update [since 2017](https://www.malwaredomainlist.com/mdl.php), as of the writing of this page. None of the websites reported after that year on [the forums](https://www.malwaredomainlist.com/forums/index.php?board=16.0) seem to have been added to said list.

The second one, [Malware Domains](https://www.malwaredomains.com/) seems not to be doing much better either, and the last update on their website seems to be from 2018. Most of the domains listed in said list are long gone.

Isn't there already a built-in anti-phishing in my browser?
-----------------------------------------------------------

While it is true that Google Chrome, Firefox and other mainstream browsers already have built in protection through the [Google Safe Browsing](https://safebrowsing.google.com/) service, this service in my own experience has proven to be slow, which is incredibly frustrating given that every minute that passes the hackers running said phishing websites could be gathering valuable personal data from unsuspecting victims.

The idea of this hosts list is to serve as a temporary measure to block these addresses as soon as possible, within minutes after they're discovered, before they're accepted into the Safe Browsing list.

Can I contribute?
-----------------

Yes, sure. Open an issue [at the GitHub repository](https://github.com/socram8888/not-on-my-shift) or [send me an email](/#contact).

Where does the name come from?
------------------------------

The name, if you're curious, comes from [a certain scene of The Simpsons](https://www.youtube.com/watch?v=SQMeYdrt5LQ).
