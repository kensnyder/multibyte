# multibyte

[![NPM Link](https://img.shields.io/npm/v/multibyte?v=1.0.0-beta.1)](https://npmjs.com/package/multibyte)
[![Build Status](https://ci.appveyor.com/api/projects/status/nk7pd6u6p2hqpeac?svg=true&v=1.0.0-beta.1)](https://ci.appveyor.com/project/kensnyder/multibyte)
[![Code Coverage](https://codecov.io/gh/kensnyder/multibyte/branch/main/graph/badge.svg?token=KW4PAS3KKM&v=1.0.0-beta.1)](https://codecov.io/gh/kensnyder/multibyte)
[![ISC License](https://img.shields.io/npm/l/multibyte.svg?v=1.0.0-beta.1)](https://opensource.org/licenses/ISC)

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

// JavaScript String.prototype.charAt() is not Unicode aware
'a🚀c'.charAt(1); // "\ud83d" ❌
charAt('a🚀c', 1); // "🚀" ✅

// JavaScript String.prototype.codePointAt() does not ignore the UTF-8 BOM
'\uFEFFa🚀c'.codePointAt(1); // 97 ❌
codePointAt('\uFEFFa🚀c', 1); // 128640 ✅

// JavaScript returns length in bytes, not Unicode characters
'a🚀c'.length; // 4 ❌
length('a🚀c'); // 3 ✅

// JavaScript slices along bytes, not Unicode characters
'a🚀cdef'.slice(2, 3); // "\ude80" ❌
slice('a🚀cdef', 2, 3); // "c" ✅

// JavaScript slices along bytes, not Unicode characters
'a🚀c'.split(''); // ["a", "\ud83d", "\ude80", "c"] ❌
split('a🚀c', ''); // ["a", "🚀", "c"] ✅

// JavaScript String length is not related to UTF-8 character length
'a🚀cdef'.slice(0, 2); // "a\ud83d" ❌
truncateBytes('a🚀cdef', 2); // "a" ✅
```

## BOM (Byte order mark) - U+FEFF

Under the hood, all these function strip a leading BOM if present.
