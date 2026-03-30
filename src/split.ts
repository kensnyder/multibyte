export default function split(str: string, on: string = ''): string[] {
  if (typeof str !== 'string' || typeof on !== 'string') {
    throw new TypeError('split(str, on) must receive strings');
  }
  const hasBOM = str[0] === '\uFEFF';
  if (on === '') {
    const result: string[] = [];
    let skip = hasBOM;
    for (const char of str) {
      if (skip) {
        skip = false;
        continue;
      }
      result.push(char);
    }
    return result;
  } else {
    if (hasBOM) {
      str = str.slice(1);
    }
    return str.split(on);
  }
}
