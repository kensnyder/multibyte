export default function charAt(str: string, at: number = 0): string {
  if (typeof str !== 'string') {
    throw new TypeError('charAt(str, at) must receive a string');
  }
  if (at < 0) {
    return '';
  }
  if (str.charAt(0) === '\uFEFF') {
    at += 1;
  }
  for (const char of str) {
    if (at-- === 0) {
      return char;
    }
  }
  return '';
}
