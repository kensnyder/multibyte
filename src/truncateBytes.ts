export default function truncateBytes(
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
  const hasBOM = str[0] === '\uFEFF';
  // Early exit if the string is definitely short enough
  // Note: str.length is code units, which is always >= actual character count
  if (str.length <= max) {
    if (hasBOM) {
      return str.slice(1);
    }
    return str;
  }

  let result = '';
  let totalBytes = ellipsis.length;
  let skip = hasBOM;

  for (const char of str) {
    if (skip) {
      skip = false;
      continue;
    }

    totalBytes += char.length;
    if (totalBytes > max) {
      break;
    }
    result += char;
  }

  return result + ellipsis;
}
