export default function length(str: string): number {
  if (typeof str !== 'string') {
    throw new TypeError('length(str) must receive a string');
  }
  let i = 0;
  let hasBOM = str[0] === '\uFEFF';
  for (const _ of str) {
    i++;
  }
  if (hasBOM) {
    i--;
  }
  return i;
}
