import { describe, expect, test } from 'vitest';
import { validateTitle, validateDuration } from './validation.ts';

describe('Validation Tests', () => {
  test('validateTitle should return true for non-empty title', () => {
    expect(validateTitle('Valid Title')).toBe(true);
  });

  test('validateTitle should return false for empty title', () => {
    expect(validateTitle('')).toBe(false);
  });

  test('validateDuration should return true for positive duration', () => {
    expect(validateDuration(10)).toBe(true);
  });

  test('validateDuration should return false for zero or negative duration', () => {
    expect(validateDuration(0)).toBe(false);
    expect(validateDuration(-5)).toBe(false);
  });
});