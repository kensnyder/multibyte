import { bench, group, run } from "mitata";

const strings = {
  ascii: "Hello, world!",
  emoji: "🏃‍♂️‍➡️😎⛅️🧅🚀🎸🎉",
  combo: "Run🏃‍♂️‍Bun🧅 Run🚀",
};
const repeats = [1, 1_000, 1_000_000];

const arrayPush = (str: string,  start: number = 0): string => {
  const collection = [];
  let i = 0;
  for (const char of str) {
    if (++i > start) {
      collection.push(char);
    }
  }
  return collection.join('');
};

const stringConcat = (str: string,  start: number = 0): string => {
  let collection = '';
  let i = 0;
  for (const char of str) {
    if (++i > start) {
      collection += char;
    }
  }
  return collection;
};

const arraySlice = (str: string,  start: number = 0): string => {
  const strArr = Array.from(str);
  return strArr.slice(start).join('');
};

for (const [name, string] of Object.entries(strings)) {
  for (const n of repeats) {
    const stringToTest = string.repeat(n);
    const byteLen = new TextEncoder().encode(stringToTest).length;
    group(`${name} string length=${byteLen.toLocaleString()} bytes`, () => {
      bench("array push", () => arrayPush(stringToTest, 4));
      bench("string concat", () => stringConcat(stringToTest, 4));
      bench("array slice", () => arraySlice(stringToTest, 4));
    });
  }
}

await run();
