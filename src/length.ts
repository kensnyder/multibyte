export default function length(str: string): number {
  if (typeof str !== 'string') {
    throw new TypeError('length(str) must receive a string');
  }
  const strArr = [...str];
  if (strArr[0] === '\uFEFF') {
    strArr.shift();
  }
  return strArr.length;
}
