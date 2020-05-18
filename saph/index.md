---
---

Saph
====

The Stupid Algorithm for Password Hashing

Why?
----

At the dawn of the humanity, we all worked with passwords stored in plain in our databases. The easy and simple process of just storing the user's five letter, all lowercase password in a column called "password". If said user wanted to log in, you'd just do a SELECT comparing the user's input with the stored value (of course without checking for quotes, because we told users not to put them in!) and called it a day.

However, wise people thought, "it's easy, but it's not safe!". And thus we started hashing first the passwords using the almighty MD5 hash.

This kinda did the job, but then some people realized "this is bullshit, what if we just calculated all possible MD5s for short-length passwords". Thus, people started putting in extra, random data in the hash, to foil attacker's rainbow tables.

However, with the ever-growing power of CPUs and GPUs, plain old hashes proved to be ineffective, since you could feasibly bruteforce them in a matter of hours (mostly because they never were intended to be used for this - they're meant to be fast!).

Thus functions dedicated for hashing passwords securely were born.

[PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) is one of the first ones, and it's still used to this day. This employs a standard hashing algorithm as its basis, and works from that on. It is computationally intensive, but requires little memory, making it easier still to bruteforce using an ASIC. Besides, [there are known issues with collisions](https://mathiasbynens.be/notes/pbkdf2-hmac).

Then, two other algorithms came along.

[Bcrypt](https://en.wikipedia.org/wiki/Bcrypt) fixed the issues with memory requirements, but they relied on the availability of Blowfish, a AES-contender in practice no longer in use anywhere aside from this function. This means that there's a good chance that any implementation of Bcrypt would need its own shaded copy of Bcrypt, which increases code bloat for no good reason.

[scrypt](https://en.wikipedia.org/wiki/Scrypt) did away with Blowfish, but increases the complexity by depending on PBKDF2, which in turns depends in SHA256; and introduces a dependency on Salsa20/8, a very interesting stream cipher but that it's not available widely yet either.

From 2015 onwards, the so-called [Password Hashing Contest](https://password-hashing.net/), or PHC for short, published a recommendation on a new algorithm called Argon2. And this is when all went downhill.

From simply storing the password in plain in a database, we are being suddenly now recommended to use an algorithm with:

 - Four revisions of its own (1.0, 1.1, 1.2, 1.2.1 and 1.3)
 - Four different variants (2i, 2d, 2ds and 2di)
 - About four tweakable parameters (space and time complexity, parallelism and hash length)

Each variation, of course, giving a different hash. This is just insane, and IMHO suffers a lot from the [second system-effect](https://en.wikipedia.org/wiki/Second-system_effect).

I don't need parallelism in a password hashing algorithm - 99.99% of the time the hashing will be done in a single thread, be it the server or the client.

I don't need to have to choose between four different variations - we just care about having one that works, it does well, and we can trust that if we update the library suddenly our hashes aren't gonna change.

I just need a simple algorithm that increases the complexity of hashing a password for stopping bruteforce attempts, and uses primitives available in most systems, to reduce bloat and ensure the slowdown comes from the cryptographic primitives and not from executing our own function in a scripting language. Nothing else, nothing more.

Thus the Stupid Algorithm for Password Hashing was born.

The algorithm
-------------

The algorithm is heavily based on [battcrypt](https://password-hashing.net/wiki/doku.php/battcrypt), another PHC finalist. However, the cryptographic primitive Blowfish has been changed to AES.

The algorithm is defined as follow:

```
; Calculate starting hash
hash := sha256(sha256(part[1]) || sha256(part[2]) || ... sha256(part[n]))

; Initial memory with all zeros
mem := zeros(64 * memsize)

for iteration := 1 to iterations do
	; Encrypt memory using the current hash as key and IV
	key := hash[0 ~ 15]
	iv := hash[16 ~ 31]
	mem := aes128cbc_encrypt(mem, key, iv)

	; Calculate the order in which they have to be hashed
	order := [0, 1, ... memsize - 1, memsize]
	for a := 0 to memsize - 1 do
		; Parse lower 32-bits as little endian
		b :=
				enc[c * 64 + 0] * 1 +
				enc[c * 64 + 1] * 256 +
				enc[c * 64 + 2] * 65536 +
				enc[c * 64 + 3] * 16777216

		; Cap to memory size
		b := b mod memsize

		; Swap indexes
		swap(order[a], order[b])
	end

	; Build new byte array in correct order
	reordered := []
	for chunk in order do
		start := chunk * 64
		end := chunk * 64 + 63
		reordered := reordered || enc[start ~ end]
	end

	; Calculate new hash
	hash := sha256(reordered)
end

result := hash
```

Rationale
---------

I am no expert cryptographer, but I have been reading for years on the security and cryptography topic and I am pretty confident of the security of this construction.

This algorithm is pretty opinionated, but all decisions have a rationale behind them:

  - It uses SHA-256 for hashing data. It is available in [WebCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#SHA-256), in [Python's standard library](https://docs.python.org/3/library/hashlib.html) and is mandatory by all [Java 8 runtimes](https://docs.oracle.com/javase/8/docs/api/java/security/MessageDigest.html) and onwards.

  - It uses AES-128-CBC for generating the pseudo-random memory. This algorithm and mode is supported by [WebCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#AES-CBC), by Python's most used cryptographic libraries ([PyCryptodome](https://pycryptodome.readthedocs.io/en/latest/src/cipher/aes.html) and [Cryptography](https://cryptography.io/en/latest/hazmat/primitives/symmetric-encryption/)) and by [Java's runtime](https://docs.oracle.com/javase/8/docs/api/javax/crypto/Cipher.html).

  - Both AES-128-CBC and SHA-256 as of 2019, are widely used algorithms, well-tested, and still considered safe if properly used.

  - CBC mode has been chosen instead of CTR, the other widely available construction, due the impossibility to parallelize encryption. 

    Unlike CTR, CBC cannot be calculated for a given offset without having calculated all the previous blocks. This ensures all the memory has to be kept for calculating the resulting hash.

  - The CBC mode allows for calculating the previous block ciphertext having the key and the current block's cipher- and plaintext.

    If one were to use the layman approach of calculating the hash by hashing memory backwards from end to start, an attacker could reduce memory cost to one by calculating twice as many AES operations, by encrypting and discarding the output until the last AES block, and then decrypting and hashing backwards.

    The pseudo-random, ciphertext-dependant shuffling prevents this, by breaking the relation from previous hashed block to the current one.

  - In all other password-hashing algorithms, there is always a salt and a password.

    If doing the encryption in front-end, one could consider using the username as salt. This means however that common usernames, such as "admin", are more vulnerable against rainbow tables or pre-calculated hashes that could be floating on the internet.

    The option of requesting a salt from the backend could seem a good fix, but it introduces round trip delays, and leaks information about whether the username requested corresponds to an active user or not by checking if the salt is returned and is constant between calls.

    This algorithm introduces the possibility of having both a [pepper](https://en.wikipedia.org/wiki/Pepper_(cryptography)), hardcoded in the frontend, and username as salt. Any password received by the backend, will be exclusive for this username and application.

    Recommended is, however, that another secret pepper is used in the backend, for example by HMAC-ing the output from Saph, before storing. Should an attacker have access to the hashed credentials (for instance due to a database breach), this second secret pepper would prevent them from being useable as-is as input.

Implementations
---------------

  - [Python implementation](https://github.com/socram8888/saph-python), available in [PyPI](https://pypi.org/project/saph/).
  - [TS/JS implementation using WebCrypto](https://github.com/socram8888/saph-browser), also available in [npm](https://www.npmjs.com/package/saph-browser).
  - [Java implementation](https://github.com/socram8888/saph-java), also available in [Maven Central](https://mvnrepository.com/artifact/pet.orca/saph).

Test vectors
------------

To ensure my implementations were correct, I hand crafted the following test vectors, running the algorithm by hand step by step:

 * [Test vector 1](test-vector-1.html)
