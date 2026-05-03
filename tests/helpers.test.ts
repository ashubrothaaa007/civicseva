/**
 * @fileoverview Complete test suite for CivicSeva helpers and validators.
 * @module tests/helpers.test
 */
import { checkEligibility, formatDate, isPastDate, daysUntil, truncate } from '../src/utils/helpers';
import { isValidAge, isValidPincode, isValidEmail, sanitizeInput, isValidVoterId } from '../src/utils/validators';

describe('checkEligibility', () => {
  it('should return eligible for an adult citizen', () => {
    const result = checkEligibility({ age: 25, citizenship: 'citizen', state: 'Maharashtra' });
    expect(result.eligible).toBe(true);
    expect(result.message).toContain('eligible');
  });

  it('should return not eligible for under-18', () => {
    const result = checkEligibility({ age: 16, citizenship: 'citizen', state: '' });
    expect(result.eligible).toBe(false);
    expect(result.details).toContain('You must be at least 18 years old. You are 16.');
  });

  it('should return not eligible for non-citizen', () => {
    const result = checkEligibility({ age: 30, citizenship: 'permanent_resident', state: '' });
    expect(result.eligible).toBe(false);
    expect(result.details).toContain('You must be a citizen to vote in general elections.');
  });

  it('should include state in eligible message if provided', () => {
    const result = checkEligibility({ age: 20, citizenship: 'citizen', state: 'Tamil Nadu' });
    expect(result.message).toContain('Tamil Nadu');
  });

  it('should return not eligible for exactly age 17', () => {
    const result = checkEligibility({ age: 17, citizenship: 'citizen', state: '' });
    expect(result.eligible).toBe(false);
  });

  it('should return eligible for exactly age 18', () => {
    const result = checkEligibility({ age: 18, citizenship: 'citizen', state: '' });
    expect(result.eligible).toBe(true);
  });
});

describe('formatDate', () => {
  it('should format a valid ISO date correctly', () => {
    const formatted = formatDate('2026-11-03');
    expect(formatted).toContain('2026');
    expect(typeof formatted).toBe('string');
  });
});

describe('isPastDate', () => {
  it('should return true for a date in the past', () => {
    expect(isPastDate('2000-01-01')).toBe(true);
  });

  it('should return false for a date in the future', () => {
    expect(isPastDate('2099-12-31')).toBe(false);
  });
});

describe('daysUntil', () => {
  it('should return a negative number for past dates', () => {
    expect(daysUntil('2000-01-01')).toBeLessThan(0);
  });

  it('should return a positive number for future dates', () => {
    expect(daysUntil('2099-12-31')).toBeGreaterThan(0);
  });
});

describe('truncate', () => {
  it('should truncate long strings', () => {
    expect(truncate('Hello World', 5)).toBe('Hello…');
  });

  it('should not truncate short strings', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });
});

describe('isValidAge', () => {
  it('should validate a normal age', () => {
    expect(isValidAge('25')).toBe(true);
  });

  it('should reject non-numeric input', () => {
    expect(isValidAge('abc')).toBe(false);
  });

  it('should reject age 0', () => {
    expect(isValidAge('0')).toBe(false);
  });

  it('should reject age above 120', () => {
    expect(isValidAge('121')).toBe(false);
  });
});

describe('isValidPincode', () => {
  it('should validate a 6-digit pincode', () => {
    expect(isValidPincode('110001')).toBe(true);
  });

  it('should reject a 5-digit pincode', () => {
    expect(isValidPincode('11000')).toBe(false);
  });

  it('should reject alphanumeric input', () => {
    expect(isValidPincode('11000A')).toBe(false);
  });
});

describe('isValidEmail', () => {
  it('should validate a correct email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('should reject an email without @', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
  });
});

describe('sanitizeInput', () => {
  it('should strip HTML tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>hello')).toBe('hello');
  });

  it('should trim whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });
});

describe('isValidVoterId', () => {
  it('should validate a standard voter ID', () => {
    expect(isValidVoterId('ABC1234567')).toBe(true);
  });

  it('should reject too-short IDs', () => {
    expect(isValidVoterId('ABC1')).toBe(false);
  });
});
