import { bench, group, run } from "mitata";
import { default as length } from '../src/length';
import { default as slice } from '../src/slice';
import { default as split } from '../src/split';
import { default as truncateBytes } from '../src/truncateBytes';

const string = "Run🏃‍♂️‍Bun🧅 Run🚀".repeat(4_000_000);

group('implementation of length', () => {
  bench("old", () => oldLength(string));
  bench("new", () => length(string));
});
group('implementation of slice', () => {
  bench("old", () => oldSlice(string, 67, 420));
  bench("new", () => slice(string, 67, 420));
});
group('implementation of split', () => {
  bench("old", () => oldSplit(string, 'n'));
  bench("new", () => split(string, 'n'));
});
group('implementation of truncateBytes', () => {
  bench("old", () => oldTruncateBytes(string, 200));
  bench("new", () => truncateBytes(string, 200));
});

await run();



function oldLength(str: string): number {
  if (typeof str !== 'string') {
    throw new TypeError('length(str) must receive a string');
  }
  const strArr = Array.from(str);
  if (strArr[0] === '\uFEFF') {
    return strArr.length - 1;
  }
  return strArr.length;
}
function oldSlice(
  str: string,
  start: number = 0,
  end?: number
): string {
  if (typeof str !== 'string') {
    throw new TypeError('slice(str, start, end) must receive a string');
  }
  const strArr = Array.from(str);
  if (strArr[0] === '\uFEFF') {
    strArr.shift();
  }
  return strArr.slice(start, end).join('');
}
function oldSplit(str: string, on: string = ''): string[] {
  if (typeof str !== 'string' || typeof on !== 'string') {
    throw new TypeError('split(str, on) must receive strings');
  }
  if (on === '') {
    const strArr = Array.from(str);
    if (strArr[0] === '\uFEFF') {
      strArr.shift();
    }
    return strArr;
  } else {
    if (str.charAt(0) === '\uFEFF') {
      str = str.slice(1);
    }
    return str.split(on);
  }
}
function oldTruncateBytes(
  str: string,
  max: number,
  ellipsis: string = ''
): string {
  if (typeof str !== 'string') {
    throw new TypeError(
      'truncateBytes(str, max, ellipsis) must receive a string'
    );
  }
  if (max <= 0) {
    return '';
  }
  if (str.length <= max) {
    if (str.charAt(0) === '\uFEFF') {
      // remove UTF-16 BOM
      return str.slice(1);
    }
    return str;
  }
  let totalBytes = ellipsis.length;
  const strArray = [];
  for (const char of str) {
    if (totalBytes === 0 && char === '\uFEFF') {
      // skip UTF-16 BOM
      continue;
    }
    totalBytes += char.length;
    if (totalBytes > max) {
      break;
    }
    strArray.push(char);
  }
  strArray.push(ellipsis);
  return strArray.join('');
}
