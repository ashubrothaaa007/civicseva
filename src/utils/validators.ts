/**
 * @fileoverview Input validation utilities.
 * @module utils/validators
 */

/**
 * Validates that an age input is a real number within human range.
 * @param value - The raw age string from an input field.
 * @returns True if the age is a valid integer between 1 and 120.
 */
export const isValidAge = (value: string): boolean => {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 120;
};

/**
 * Validates that a pincode is exactly 6 digits (Indian standard).
 * @param pincode - The pincode string to validate.
 * @returns True if the pincode is exactly 6 numeric digits.
 */
export const isValidPincode = (pincode: string): boolean =>
  /^\d{6}$/.test(pincode);

/**
 * Validates an email address using a standard regex.
 * @param email - The email string to validate.
 * @returns True if the email format is valid.
 */
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Sanitizes a string by removing HTML tags and trimming whitespace.
 * Used to prevent XSS from user-provided text.
 * @param input - Raw user input string.
 * @returns Sanitized string safe for display.
 */
export const sanitizeInput = (input: string): string =>
  input
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();

/**
 * Validates a voter ID format (basic check — varies by state).
 * @param voterId - The voter ID string to check.
 * @returns True if the voter ID has at least 6 alphanumeric characters.
 */
export const isValidVoterId = (voterId: string): boolean =>
  /^[A-Z0-9]{6,12}$/i.test(voterId);
