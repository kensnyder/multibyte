import { describe, it, expect } from 'vitest';
import slice from '../src/slice';

describe('slice()', () => {
  it('should work on ascii strings', () => {
    const result = slice('abc', 1, 2);
    expect(result).toBe('b');
  });
  it('should slice to end', () => {
    const result = slice('a🚀c', 1);
    expect(result).toBe('🚀c');
  });
  it('should slice from the end', () => {
    const result = slice('a🚀c', -2);
    expect(result).toBe('🚀c');
  });
  it('should default "start" to 0', () => {
    const result = slice('a🚀c');
    expect(result).toBe('a🚀c');
  });
  it('should default "start" is more negative than length', () => {
    const result = slice('a🚀c', -10);
    expect(result).toBe('a🚀c');
  });
  it('should strip BOM', () => {
    const result = slice('\uFEFFa🚀c', 1, 2);
    expect(result).toBe('🚀');
  });
  it('should return empty string if start and end are the same', () => {
    const result = slice('a🚀c', 1, 1);
    expect(result).toBe('');
  });
  it('should return empty string if start is out of range', () => {
    const result = slice('a🚀c', 10);
    expect(result).toBe('');
  });
  it('should throw if arg is not a string', () => {
    const thrower = () => {
      // @ts-ignore
      slice(55, 0);
    };
    expect(thrower).toThrow(TypeError);
  });
});
