import { describe, it, expect } from 'vitest';
import charAt from '../src/charAt';

describe('charAt()', () => {
  it('should work on ascii strings', () => {
    const result = charAt('abc', 1);
    expect(result).toBe('b');
  });
  it('should work before emoji', () => {
    const result = charAt('a🚀c', 0);
    expect(result).toBe('a');
  });
  it('should default "at" to 0', () => {
    const result = charAt('a🚀c');
    expect(result).toBe('a');
  });
  it('should work on emoji', () => {
    const result = charAt('a🚀c', 1);
    expect(result).toBe('🚀');
  });
  it('should work after emoji', () => {
    const result = charAt('a🚀c', 2);
    expect(result).toBe('c');
  });
  it('should strip BOM', () => {
    const result = charAt('\uFEFFa🚀c', 1);
    expect(result).toBe('🚀');
  });
  it('should return empty string if number is less than 0', () => {
    const result = charAt('a🚀c', -1);
    expect(result).toBe('');
  });
  it('should return empty string if number out of range', () => {
    const result = charAt('a🚀c', 3);
    expect(result).toBe('');
  });
  it('should throw if arg is not a string', () => {
    const thrower = () => {
      // @ts-ignore
      charAt(55, 0);
    };
    expect(thrower).toThrow(TypeError);
  });
});
