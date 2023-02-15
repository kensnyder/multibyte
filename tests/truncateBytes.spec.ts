import { describe, it, expect } from 'vitest';
import truncateBytes from '../src/truncateBytes';

describe('truncateBytes()', () => {
  it('should work on ascii strings', () => {
    const result = truncateBytes('abc', 2);
    expect(result).toBe('ab');
  });
  it('should work on ascii strings', () => {
    const result = truncateBytes('abc', 1);
    expect(result).toBe('a');
  });
  it('should omit emoji that puts it over the limit', () => {
    const result = truncateBytes('a🚀c', 1);
    expect(result).toBe('a');
  });
  it('should keep emoji if possible', () => {
    const result = truncateBytes('a🚀c', 3);
    expect(result).toBe('a🚀');
  });
  it('should return empty string if max is 0', () => {
    const result = truncateBytes('a🚀c', 0);
    expect(result).toBe('');
  });
  it('should return empty string if max is less than 0', () => {
    const result = truncateBytes('a🚀c', -5);
    expect(result).toBe('');
  });
  it('should respect ellipsis', () => {
    const result = truncateBytes('rocket 🚀 to the moon!', 15, '...');
    expect(result).toBe('rocket 🚀 to...');
  });
  it('should strip BOM', () => {
    const result = truncateBytes('\uFEFFa🚀c', 3);
    expect(result).toBe('a🚀');
  });
  it('should strip BOM on high max', () => {
    const result = truncateBytes('\uFEFFa🚀c', 38);
    expect(result).toBe('a🚀c');
  });
  it('should throw if arg is not a string', () => {
    const thrower = () => {
      // @ts-ignore
      truncateBytes(55, 2);
    };
    expect(thrower).toThrow(TypeError);
  });
});
