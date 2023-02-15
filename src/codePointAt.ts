export default function codePointAt(str: string, at: number = 0): number {
  if (typeof str !== 'string') {
    throw new TypeError('codePointAt(str, at) must receive a string');
  }
  if (at < 0) {
    return undefined;
  }
  if (str.charAt(0) === '\uFEFF') {
    at++;
  }
  for (const char of str) {
    if (at-- === 0) {
      return char.codePointAt(0);
    }
  }
  return undefined;
}
