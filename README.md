# multibyte

[![NPM Link](https://img.shields.io/npm/v/multibyte?v=1.0.1)](https://npmjs.com/package/multibyte)
[![Build Status](https://ci.appveyor.com/api/projects/status/nk7pd6u6p2hqpeac?svg=true&v=1.0.1)](https://ci.appveyor.com/project/kensnyder/multibyte)
[![Code Coverage](https://codecov.io/gh/kensnyder/multibyte/branch/main/graph/badge.svg?token=KW4PAS3KKM&v=1.0.1)](https://codecov.io/gh/kensnyder/multibyte)
[![ISC License](https://img.shields.io/npm/l/multibyte.svg?v=1.0.1)](https://opensource.org/licenses/ISC)

multibyte provides common string functions that respect multibyte Unicode characters.

```bash
npm install multibyte
```

## The problem and the solution

On one hand, JavaScript strings use UTF-16 encoding, and on the other hand,
JavaScript strings behave like an Array of code points. Unicode characters that
take more than 2 bytes (like newer emoji) get split into 2 code points in many
situations.

If you display Unicode text from a UTF-8 source, you need these multibyte
functions that take advantage of the fact that `Array.from()` is Unicode safe.

```js
import {
  charAt,
  codePointAt,
  length,
  slice,
  split,
  truncateBytes,
} from 'multibyte';

// JavaScript String.prototype.charAt() can return a UTF-16 surrogate
'a🚀c'.charAt(1); //  ❌ "\ud83d"
charAt('a🚀c', 1); // ✅ "🚀"

// JavaScript String.prototype.codePointAt() can return a UTF-16 surrogate
'🚀abc'.codePointAt(1); //  ❌ 56960 (surrogate pair of rocket emoji)
codePointAt('🚀abc', 1); // ✅ 97 (the letter a)

// JavaScript returns length in UTF-16, not Unicode characters
'a🚀c'.length; //  ❌ 4
length('a🚀c'); // ✅ 3

// JavaScript slices along UTF-16 boundaries, not Unicode characters
'a🚀cdef'.slice(2, 3); //  ❌ "\ude80"
slice('a🚀cdef', 2, 3); // ✅ "c"

// JavaScript splits along UTF-16 boundaries, not Unicode characters
'a🚀c'.split(''); //  ❌ ["a", "\ud83d", "\ude80", "c"]
split('a🚀c', ''); // ✅ ["a", "🚀", "c"] ✅

// JavaScript slices strings along UTF-16 boundaries, not Unicode characters
'a🚀cdef'.slice(0, 2); //       ❌ "a\ud83d"
truncateBytes('a🚀cdef', 2); // ✅ "a🚀"
```

## BOM (Byte order mark) - U+FEFF

Under the hood, all these functions strip a leading BOM if present.
