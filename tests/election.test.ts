/**
 * @fileoverview Test suite for election data service.
 * @module tests/election.test
 */
import { fetchTimeline, fetchPollingBooths, fetchCandidates } from '../src/services/election';

describe('fetchTimeline', () => {
  it('should return an array of timeline events', async () => {
    const events = await fetchTimeline();
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  it('should have events with required fields', async () => {
    const events = await fetchTimeline();
    const first = events[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('title');
    expect(first).toHaveProperty('date');
    expect(first).toHaveProperty('description');
  });

  it('should have dates in ISO 8601 format', async () => {
    const events = await fetchTimeline();
    for (const e of events) {
      expect(() => new Date(e.date)).not.toThrow();
    }
  });
});

describe('fetchPollingBooths', () => {
  it('should return booths for known pincode 110001', async () => {
    const booths = await fetchPollingBooths('110001');
    expect(booths.length).toBeGreaterThan(0);
    expect(booths[0]).toHaveProperty('name');
    expect(booths[0]).toHaveProperty('address');
    expect(booths[0]).toHaveProperty('timings');
  });

  it('should return empty array for unknown pincode', async () => {
    const booths = await fetchPollingBooths('999999');
    expect(booths).toEqual([]);
  });

  it('should return booths for pincode 400001', async () => {
    const booths = await fetchPollingBooths('400001');
    expect(booths.length).toBeGreaterThan(0);
  });
});

describe('fetchCandidates', () => {
  it('should return candidates for Downtown constituency', async () => {
    const candidates = await fetchCandidates('Downtown');
    expect(candidates.length).toBeGreaterThan(0);
    expect(candidates.every(c => c.constituency === 'Downtown')).toBe(true);
  });

  it('should return all candidates when constituency is empty string', async () => {
    const all = await fetchCandidates('');
    const downtown = await fetchCandidates('Downtown');
    expect(all.length).toBeGreaterThan(downtown.length);
  });

  it('should return candidates with required fields', async () => {
    const candidates = await fetchCandidates('Downtown');
    const first = candidates[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
    expect(first).toHaveProperty('party');
    expect(first).toHaveProperty('symbol');
  });
});
