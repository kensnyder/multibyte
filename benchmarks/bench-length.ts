import { bench, group, run } from "mitata";

const strings = {
  ascii: "Hello, world!",
  emoji: "🏃‍♂️‍➡️😎⛅️🧅🚀🎸🎉",
  combo: "Run🏃‍♂️‍Bun🧅 Run🚀",
};
const repeats = [1, 1_000, 1_000_000];

const forWithIncrement = (input: string): number => {
  let i = 0;
  for (const _ of input) {
    i++;
  }
  if (input[0] === '\uFEFF') {
    i--;
  }
  return i;
};

const arrayFromLength = (input: string): number => {
  const strArr = Array.from(input);
  if (strArr[0] === '\uFEFF') {
    return strArr.length - 1;
  }
  return strArr.length;
};

for (const [name, string] of Object.entries(strings)) {
  for (const n of repeats) {
    const stringToTest = string.repeat(n);
    const byteLen = new TextEncoder().encode(stringToTest).length;
    group(`${name} string length=${byteLen.toLocaleString()} bytes`, () => {
      bench("for with increment", () => forWithIncrement(stringToTest));
      bench("array from length", () => arrayFromLength(stringToTest));
    });
  }
}

await run();
