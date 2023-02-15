export default function slice(
  str: string,
  start: number = 0,
  end: number = undefined
): string {
  if (typeof str !== 'string') {
    throw new TypeError('slice(str, start, end) must receive a string');
  }
  const strArr = [...str];
  if (strArr[0] === '\uFEFF') {
    strArr.shift();
  }
  return strArr.slice(start, end).join('');
}
