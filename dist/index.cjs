var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var multibyte_exports = {};
__export(multibyte_exports, {
  charAt: () => charAt,
  codePointAt: () => codePointAt,
  length: () => length,
  slice: () => slice,
  split: () => split,
  truncateBytes: () => truncateBytes
});
module.exports = __toCommonJS(multibyte_exports);

// src/charAt.ts
function charAt(str, at = 0) {
  if (typeof str !== "string") {
    throw new TypeError("charAt(str, at) must receive a string");
  }
  if (at < 0) {
    return "";
  }
  if (str.charAt(0) === "\uFEFF") {
    at += 1;
  }
  for (const char of str) {
    if (at-- === 0) {
      return char;
    }
  }
  return "";
}

// src/codePointAt.ts
function codePointAt(str, at = 0) {
  if (typeof str !== "string") {
    throw new TypeError("codePointAt(str, at) must receive a string");
  }
  if (at < 0) {
    return void 0;
  }
  if (str.charAt(0) === "\uFEFF") {
    at++;
  }
  for (const char of str) {
    if (at-- === 0) {
      return char.codePointAt(0);
    }
  }
  return void 0;
}

// src/length.ts
function length(str) {
  if (typeof str !== "string") {
    throw new TypeError("length(str) must receive a string");
  }
  const strArr = Array.from(str);
  if (strArr[0] === "\uFEFF") {
    strArr.shift();
  }
  return strArr.length;
}

// src/slice.ts
function slice(str, start = 0, end = void 0) {
  if (typeof str !== "string") {
    throw new TypeError("slice(str, start, end) must receive a string");
  }
  const strArr = Array.from(str);
  if (strArr[0] === "\uFEFF") {
    strArr.shift();
  }
  return strArr.slice(start, end).join("");
}

// src/split.ts
function split(str, on = "") {
  if (typeof str !== "string" || typeof on !== "string") {
    throw new TypeError("split(str, on) must receive strings");
  }
  if (on === "") {
    const strArr = Array.from(str);
    if (strArr[0] === "\uFEFF") {
      strArr.shift();
    }
    return strArr;
  } else {
    if (str.charAt(0) === "\uFEFF") {
      str = str.slice(1);
    }
    return str.split(on);
  }
}

// src/truncateBytes.ts
function truncateBytes(str, max, ellipsis = "") {
  if (typeof str !== "string") {
    throw new TypeError(
      "truncateBytes(str, max, ellipsis) must receive a string"
    );
  }
  if (max <= 0) {
    return "";
  }
  if (str.length < max) {
    if (str.charAt(0) === "\uFEFF") {
      str = str.slice(1);
    }
    return str;
  }
  let totalBytes = ellipsis.length;
  let strArray = [];
  for (const char of str) {
    if (totalBytes === 0 && char === "\uFEFF") {
      continue;
    }
    totalBytes += char.length;
    if (totalBytes > max) {
      break;
    }
    strArray.push(char);
  }
  strArray.push(ellipsis);
  return strArray.join("");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  charAt,
  codePointAt,
  length,
  slice,
  split,
  truncateBytes
});
