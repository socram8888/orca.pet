---
---

Saph Test Vector 1
==================

Parameters
----------

 - Memory: 4
 - Iterations: 2
 - Parts: "just" "a" "test"

Initial status
--------------

  - `SHA-256("just")` = `b2c66dfd45dd07f58d2246b695660b220ee429c6a8ba95f27e4c57f02e9d6ac8`
  - `SHA-256("a")` = `ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb`
  - `SHA-256("test")` = `9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08`
  - `SHA-256(SHA-256("just") || SHA-256("a") || SHA-256("test")` = `1e6e6b13170866205deecb238203b49cdebd149e4f4aa01f80733e357abe5a78`

Memory:

```
000000 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
000010 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
000020 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
000030 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
000040 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
000050 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
000060 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
000070 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
000080 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
000090 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0000a0 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0000b0 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0000c0 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0000d0 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0000e0 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0000f0 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
```

First iteration
---------------

### Encryption

  - AES key = `1e6e6b13170866205deecb238203b49c`
  - AES IV = `debd149e4f4aa01f80733e357abe5a78`

AES-128-CBC(memory) =
```
000000 dc 6f da 22 60 ae e6 21 65 0b 32 b0 5d 8d d8 fb
000010 ba 4d 74 f9 61 0a aa 77 12 48 92 7d 78 5c 49 0d
000020 c8 04 b9 bb e2 68 c0 21 a6 f1 d9 7d 41 2d e0 56
000030 74 2c e3 9c 0f 29 6c d6 c2 c6 ab f8 27 2c 78 c3
000040 14 75 25 38 0b 47 bc d1 ab 22 f4 2f c7 e3 3e 20
000050 5a 43 75 a6 0b 01 c2 32 a2 db c0 47 52 ce 73 27
000060 d7 10 65 e2 8f ca b5 a5 c8 ae 94 64 0b 00 a6 13
000070 48 f6 b1 3a 07 be 91 79 fd e6 fb 18 cf 5b ab 1d
000080 0e d2 9a 73 c5 cc 28 1e 09 68 8d 2b 3d 41 df a2
000090 f2 05 94 d7 51 d2 99 16 9a 4c 1b 06 14 b1 7e f8
0000a0 2c 1a a4 71 ae 9a a7 46 8d 7b 2a c5 2e cd 19 72
0000b0 86 20 5b 8a 13 31 7f 74 93 75 99 4a 15 70 21 0e
0000c0 44 62 cd 34 f4 37 f8 ce 12 51 c6 b1 f1 ef 18 be
0000d0 00 cc 36 fe 93 cc 9b 34 ce ba 3f a0 fe 20 ab fe
0000e0 77 72 4f fe 16 01 25 0d d0 88 d1 ed b3 f2 f5 fa
0000f0 f5 d8 21 4f fa 8b 11 a4 58 a0 45 28 60 33 6c 59
```

Index array = `[0, 1, 2, 3]`

### Block 0

  - Index: `0x22DA6FDC` modulo 4 = 0
  - Swap 0 with 0
  - Index array = `[0, 1, 2, 3]`

### Block 1

  - Index: `0x38257514` modulo 4 = 0
  - Swap 1 with 0
  - Index array = `[1, 0, 2, 3]`

### Block 2

  - Index: `0x739AD20E` modulo 4 = 2
  - Swap 2 with 2
  - Index array = `[1, 0, 2, 3]`

### Block 3

  - Index: `0x34CD6244` modulo 4 = 0
  - Swap 3 with 0
  - Index array = `[3, 0, 2, 1]`

### Memory hashing

Sorted memory:
```
000000 44 62 cd 34 f4 37 f8 ce 12 51 c6 b1 f1 ef 18 be
000010 00 cc 36 fe 93 cc 9b 34 ce ba 3f a0 fe 20 ab fe
000020 77 72 4f fe 16 01 25 0d d0 88 d1 ed b3 f2 f5 fa
000030 f5 d8 21 4f fa 8b 11 a4 58 a0 45 28 60 33 6c 59
000040 dc 6f da 22 60 ae e6 21 65 0b 32 b0 5d 8d d8 fb
000050 ba 4d 74 f9 61 0a aa 77 12 48 92 7d 78 5c 49 0d
000060 c8 04 b9 bb e2 68 c0 21 a6 f1 d9 7d 41 2d e0 56
000070 74 2c e3 9c 0f 29 6c d6 c2 c6 ab f8 27 2c 78 c3
000080 0e d2 9a 73 c5 cc 28 1e 09 68 8d 2b 3d 41 df a2
000090 f2 05 94 d7 51 d2 99 16 9a 4c 1b 06 14 b1 7e f8
0000a0 2c 1a a4 71 ae 9a a7 46 8d 7b 2a c5 2e cd 19 72
0000b0 86 20 5b 8a 13 31 7f 74 93 75 99 4a 15 70 21 0e
0000c0 14 75 25 38 0b 47 bc d1 ab 22 f4 2f c7 e3 3e 20
0000d0 5a 43 75 a6 0b 01 c2 32 a2 db c0 47 52 ce 73 27
0000e0 d7 10 65 e2 8f ca b5 a5 c8 ae 94 64 0b 00 a6 13
0000f0 48 f6 b1 3a 07 be 91 79 fd e6 fb 18 cf 5b ab 1d
```

SHA-256(sorted) = `5853c17b63e5f8f37b54077d20adf7818048f1c975ab7f00e1347815ac286c75`


Second iteration
----------------

### Encryption

  - AES key = `5853c17b63e5f8f37b54077d20adf781`
  - AES IV = `8048f1c975ab7f00e1347815ac286c75`

AES-128-CBC(memory) =
```
000000 e5 19 70 5b d3 f2 48 1e e1 e8 af 26 c2 86 24 5b
000010 ed 68 0c f2 4c e4 92 30 b6 23 49 70 17 92 c3 e1
000020 7b 09 b4 b0 75 83 8e 60 34 e4 c3 b9 5d 4e 31 7b
000030 e4 db 40 ae 34 07 75 81 94 30 b2 e4 cb 83 d2 b9
000040 e0 47 d3 35 65 ad f3 1e 47 49 a7 d4 cd 32 2a 7f
000050 be c3 bc e3 d4 60 6c 2f 1f 92 20 e2 6e f7 2d 33
000060 34 43 db ac 49 48 ea 05 fe 38 39 40 d1 e8 32 b1
000070 0e 76 b8 c7 19 98 33 6e a5 83 5a 2b dc a7 cd 94
000080 de 6e 00 d2 34 5f ef 97 50 1d 05 5b 3d e3 c4 5c
000090 ca 40 81 83 09 ab 5f 64 4d 59 ec ab 89 98 f9 3e
0000a0 e9 30 95 b6 c4 c1 5b 6c c2 77 4e 9e 52 53 ff 3d
0000b0 be 16 2a 1a e8 94 37 42 b0 9a a7 72 5c cb be 02
0000c0 59 e6 33 11 9c 58 3d be ad 2a 61 0c b9 e7 72 00
0000d0 64 e3 d3 e3 0b 6c 30 2e 8b 8c 9d 6e 8b c6 35 cf
0000e0 9c af ee a8 89 39 14 b6 05 ec da 3a c4 03 40 bc
0000f0 4d 6d 65 67 d4 4e 40 2d f6 17 9b 5f ab 62 0c 93
```

Index array = `[0, 1, 2, 3]`

### Block 0

  - Index: `0x5B7019E5` modulo 4 = 1
  - Swap 0 with 1
  - Index array = `[1, 0, 2, 3]`

### Block 1

  - Index: `0x35D347E0` modulo 4 = 0
  - Swap 1 with 0
  - Index array = `[0, 1, 2, 3]`

### Block 2

  - Index: `0xD2006EDE` modulo 4 = 2
  - Swap 2 with 2
  - Index array = `[0, 1, 2, 3]`

### Block 3

  - Index: `0x1133E659` modulo 4 = 1
  - Swap 3 with 1
  - Index array = `[0, 3, 2, 1]`

### Memory hashing

Sorted memory:
```
000000 e5 19 70 5b d3 f2 48 1e e1 e8 af 26 c2 86 24 5b
000010 ed 68 0c f2 4c e4 92 30 b6 23 49 70 17 92 c3 e1
000020 7b 09 b4 b0 75 83 8e 60 34 e4 c3 b9 5d 4e 31 7b
000030 e4 db 40 ae 34 07 75 81 94 30 b2 e4 cb 83 d2 b9
000040 59 e6 33 11 9c 58 3d be ad 2a 61 0c b9 e7 72 00
000050 64 e3 d3 e3 0b 6c 30 2e 8b 8c 9d 6e 8b c6 35 cf
000060 9c af ee a8 89 39 14 b6 05 ec da 3a c4 03 40 bc
000070 4d 6d 65 67 d4 4e 40 2d f6 17 9b 5f ab 62 0c 93
000080 de 6e 00 d2 34 5f ef 97 50 1d 05 5b 3d e3 c4 5c
000090 ca 40 81 83 09 ab 5f 64 4d 59 ec ab 89 98 f9 3e
0000a0 e9 30 95 b6 c4 c1 5b 6c c2 77 4e 9e 52 53 ff 3d
0000b0 be 16 2a 1a e8 94 37 42 b0 9a a7 72 5c cb be 02
0000c0 e0 47 d3 35 65 ad f3 1e 47 49 a7 d4 cd 32 2a 7f
0000d0 be c3 bc e3 d4 60 6c 2f 1f 92 20 e2 6e f7 2d 33
0000e0 34 43 db ac 49 48 ea 05 fe 38 39 40 d1 e8 32 b1
0000f0 0e 76 b8 c7 19 98 33 6e a5 83 5a 2b dc a7 cd 94
```

SHA-256(sorted) = `8a6d4f4a170929f264dae967748bf9f8f63ac732093ed439c444b044730109ff`

Result
------
Saph hash = `8a6d4f4a170929f264dae967748bf9f8f63ac732093ed439c444b044730109ff`
