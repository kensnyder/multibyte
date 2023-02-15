export default function split(str: string, on: string = ''): string[] {
  if (typeof str !== 'string' || typeof on !== 'string') {
    throw new TypeError('split(str, on) must receive strings');
  }
  if (on === '') {
    const strArr = [...str];
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
