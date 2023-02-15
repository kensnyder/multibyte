import { describe, it, expect } from 'vitest';
import length from '../src/length';

describe('length()', () => {
  it('should work on ascii strings', () => {
    const result = length('abc');
    expect(result).toBe(3);
  });
  it('should work on strings with emoji', () => {
    const result = length('a🚀c');
    expect(result).toBe(3);
  });
  it('should not count BOM', () => {
    const result = length('\uFEFFa🚀c');
    expect(result).toBe(3);
  });
  it('should return 0 for empty string', () => {
    const result = length('');
    expect(result).toBe(0);
  });
  it('should throw if arg is not a string', () => {
    const thrower = () => {
      // @ts-ignore
      length(55, 0);
    };
    expect(thrower).toThrow(TypeError);
  });
});
