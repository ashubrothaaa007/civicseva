/**
 * @fileoverview Shared helper utilities for CivicSeva.
 * @module utils/helpers
 */
import type { EligibilityInput, EligibilityResult } from '../types';

/**
 * Checks voter eligibility based on age and citizenship status.
 * @param input - The eligibility check input (age, citizenship, state).
 * @returns An EligibilityResult object with eligible flag and message.
 */
export const checkEligibility = (input: EligibilityInput): EligibilityResult => {
  const details: string[] = [];

  if (input.age < 18) {
    details.push(`You must be at least 18 years old. You are ${input.age}.`);
  }
  if (input.citizenship !== 'citizen') {
    details.push('You must be a citizen to vote in general elections.');
  }

  const eligible = input.age >= 18 && input.citizenship === 'citizen';

  return {
    eligible,
    message: eligible
      ? `You are eligible to vote${input.state ? ` in ${input.state}` : ''}! Ensure you are registered before the deadline.`
      : 'You do not meet the eligibility criteria. See details below.',
    details,
  };
};

/**
 * Formats an ISO date string into a human-readable localized date.
 * @param dateStr - ISO 8601 date string (e.g., "2026-09-15").
 * @param locale - BCP 47 locale code (default: 'en-IN').
 * @returns Formatted date string (e.g., "15 September 2026").
 */
export const formatDate = (dateStr: string, locale = 'en-IN'): string =>
  new Date(dateStr).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

/**
 * Determines if a given ISO date string is in the past.
 * @param dateStr - ISO 8601 date string.
 * @returns True if the date is before now.
 */
export const isPastDate = (dateStr: string): boolean =>
  new Date(dateStr) < new Date();

/**
 * Calculates how many days remain until a given date.
 * @param dateStr - ISO 8601 date string.
 * @returns Number of days remaining (negative if in the past).
 */
export const daysUntil = (dateStr: string): number => {
  const ms = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
};

/**
 * Truncates a string to a maximum length, adding an ellipsis.
 * @param text - The string to truncate.
 * @param max - Maximum number of characters.
 * @returns Truncated string.
 */
export const truncate = (text: string, max: number): string =>
  text.length > max ? `${text.slice(0, max)}…` : text;
