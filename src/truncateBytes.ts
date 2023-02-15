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
  if (str.length < max) {
    if (str.charAt(0) === '\uFEFF') {
      // remove UTF-16 BOM
      str = str.slice(1);
    }
    return str;
  }
  let totalBytes = ellipsis.length;
  let strArray = [];
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
