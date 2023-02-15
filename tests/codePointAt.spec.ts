import { describe, it, expect } from 'vitest';
import codePointAt from '../src/codePointAt';

describe('codePointAt()', () => {
  it('should work on ascii strings', () => {
    const result = codePointAt('abc', 1);
    expect(result).toBe(98);
  });
  it('should work before emoji', () => {
    const result = codePointAt('a🚀c', 0);
    expect(result).toBe(97);
  });
  it('should default "at" to 0', () => {
    const result = codePointAt('a🚀c');
    expect(result).toBe(97);
  });
  it('should work on emoji', () => {
    const result = codePointAt('a🚀c', 1);
    expect(result).toBe(128640);
  });
  it('should work after emoji', () => {
    const result = codePointAt('a🚀c', 2);
    expect(result).toBe(99);
  });
  it('should strip BOM', () => {
    const result = codePointAt('\uFEFFa🚀c', 1);
    expect(result).toBe(128640);
  });
  it('should return undefined if number is less than 0', () => {
    const result = codePointAt('a🚀c', -1);
    expect(result).toBe(undefined);
  });
  it('should return empty string if number out of range', () => {
    const result = codePointAt('a🚀c', 3);
    expect(result).toBe(undefined);
  });
  it('should throw if arg is not a string', () => {
    const thrower = () => {
      // @ts-ignore
      codePointAt(55, 0);
    };
    expect(thrower).toThrow(TypeError);
  });
});
