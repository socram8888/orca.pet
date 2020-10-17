---
---

Nintendo gigaleaks DB
=====================

This is a database of all the leaks I've seen, along with hashes for validation. For legal reasons, I will not be linking them here, but you should be able to find them by the file names.

Checksum files
--------------

* [MD5 hash file](checksums.md5)
* [SHA1 hash file](checksums.sha1)
* [SHA256 hash file](checksums.sha256)

List of leaks
-------------

{% for day in site.data.gigaleaks %}
### {{ day[0] }}
{% for file in day[1] %}
#### {{ file.file }}

* Size: {{ file.size }} bytes
* MD5: `{{ file.md5 }}`
* SHA1: `{{ file.sha1 }}`
* SHA256: `{{ file.sha256 }}`
* Contents: {{ file.contents }}
* [Search online](https://www.google.com/search?q="{{ file.file | url_encode }}")

{% endfor %}
{% endfor %}
