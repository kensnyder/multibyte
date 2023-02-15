import { describe, it, expect } from 'vitest';
import split from '../src/split';

describe('split()', () => {
  it('should work on ascii strings', () => {
    const result = split('abcde', 'c');
    expect(result).toEqual(['ab', 'de']);
  });
  it('should work to split on emoji', () => {
    const result = split('ab🚀de', '🚀');
    expect(result).toEqual(['ab', 'de']);
  });
  it('should work on emoji string with empty string split', () => {
    const result = split('a🚀c', '');
    expect(result).toEqual(['a', '🚀', 'c']);
  });
  it('should default to empty string', () => {
    const result = split('a🚀c');
    expect(result).toEqual(['a', '🚀', 'c']);
  });
  it('should split an empty string', () => {
    const result = split('');
    expect(result).toEqual([]);
  });
  it('should strip BOM', () => {
    const result = split('\uFEFFa🚀c');
    expect(result).toEqual(['a', '🚀', 'c']);
  });
  it('should strip BOM', () => {
    const result = split('\uFEFFa🚀c', '🚀');
    expect(result).toEqual(['a', 'c']);
  });
  it('should throw if "str" arg is not a string', () => {
    const thrower = () => {
      // @ts-ignore
      split(55, '');
    };
    expect(thrower).toThrow(TypeError);
  });
  it('should throw if "on" arg is not a string', () => {
    const thrower = () => {
      // @ts-ignore
      split('abc', 8);
    };
    expect(thrower).toThrow(TypeError);
  });
});
