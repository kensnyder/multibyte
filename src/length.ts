export default function length(str: string): number {
  if (typeof str !== 'string') {
    throw new TypeError('length(str) must receive a string');
  }
  const strArr = Array.from(str);
  if (strArr[0] === '\uFEFF') {
    return strArr.length - 1;
  }
  return strArr.length;
}
