export default function slice(
  str: string,
  start: number = 0,
  end?: number
): string {
  if (typeof str !== 'string') {
    throw new TypeError('slice(str, start, end) must receive a string');
  }

  let len = 0;
  let hasBOM = str[0] === '\uFEFF';
  for (const _ of str) {
    len++;
  }
  if (hasBOM) {
    len--;
  }

  let effectiveStart = start ?? 0;
  let effectiveEnd = end ?? len;

  if (effectiveStart < 0) {
    effectiveStart = len + effectiveStart;
  }
  if (effectiveEnd < 0) {
    effectiveEnd = len + effectiveEnd;
  }

  if (effectiveStart < 0) {
    effectiveStart = 0;
  }
  if (effectiveEnd > len) {
    effectiveEnd = len;
  }

  if (effectiveStart >= effectiveEnd || effectiveStart >= len) {
    return '';
  }

  let result = '';
  let i = 0;
  let skip = hasBOM;
  for (const char of str) {
    if (skip) {
      skip = false;
      continue;
    }

    if (i >= effectiveStart && i < effectiveEnd) {
      result += char;
    }
    i++;
    if (i >= effectiveEnd) {
      break;
    }
  }

  return result;
}
