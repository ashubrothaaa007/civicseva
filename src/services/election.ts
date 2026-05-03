/**
 * @fileoverview Election data service — fetches timeline, booths, and candidates.
 * In production these would query Firestore; currently uses mock data.
 * @module services/election
 */
import type { Candidate, PollingBooth, TimelineEvent } from '../types';

export const mockTimelineEvents: TimelineEvent[] = [
  { id: '1', title: 'Voter Registration Opens', date: '2026-08-01', description: 'Online and offline voter registration begins for the upcoming election.', category: 'registration' },
  { id: '2', title: 'Voter Registration Deadline', date: '2026-09-15', description: 'Last day to register or update your voter details. Do not miss this!', category: 'registration' },
  { id: '3', title: 'Candidate Nomination Period', date: '2026-09-20', description: 'Candidates file nomination papers with the Election Commission.', category: 'campaign' },
  { id: '4', title: 'Campaign Period Begins', date: '2026-09-25', description: 'Official election campaigning can now take place.', category: 'campaign' },
  { id: '5', title: 'Campaign Period Ends', date: '2026-10-30', description: 'Campaigning must stop 48 hours before polling day.', category: 'campaign' },
  { id: '6', title: 'Early Voting Begins', date: '2026-10-15', description: 'Eligible voters can cast their vote at designated early voting centers.', category: 'voting' },
  { id: '7', title: 'Election Day', date: '2026-11-03', description: 'Main polling day. Polls are open 7:00 AM to 6:00 PM.', category: 'voting' },
  { id: '8', title: 'Results Declaration', date: '2026-11-05', description: 'Official vote counting and results announcement begins.', category: 'results' },
];

/**
 * Fetches the election timeline events.
 * @returns Promise resolving to an array of TimelineEvent objects.
 */
export const fetchTimeline = async (): Promise<TimelineEvent[]> =>
  new Promise(resolve => setTimeout(() => resolve(mockTimelineEvents), 400));

const mockBooths: Record<string, PollingBooth[]> = {
  '110001': [
    { id: 'b1', name: 'Rajendra Bhavan Community Hall', address: '12 Janpath, New Delhi', pincode: '110001', timings: '7:00 AM – 6:00 PM', district: 'New Delhi' },
    { id: 'b2', name: 'Central Park Polling Center', address: '5 Connaught Place', pincode: '110001', timings: '7:00 AM – 6:00 PM', district: 'New Delhi' },
  ],
  '400001': [
    { id: 'b3', name: 'Azad Maidan Civic Center', address: 'Azad Maidan, Fort, Mumbai', pincode: '400001', timings: '7:00 AM – 6:00 PM', district: 'Mumbai City' },
  ],
  '600001': [
    { id: 'b4', name: 'Ripon Building Hall', address: 'Rippon Building, Park Town, Chennai', pincode: '600001', timings: '7:00 AM – 6:00 PM', district: 'Chennai' },
  ],
};

/**
 * Fetches polling booths for a given pincode.
 * @param pincode - The 6-digit Indian pincode.
 * @returns Promise resolving to an array of PollingBooth objects.
 */
export const fetchPollingBooths = async (pincode: string): Promise<PollingBooth[]> =>
  new Promise(resolve =>
    setTimeout(() => resolve(mockBooths[pincode] ?? []), 600)
  );

const mockCandidates: Candidate[] = [
  { id: 'c1', name: 'Arun Kumar', party: 'Progressive Alliance', symbol: '☀️ Sun', constituency: 'Downtown' },
  { id: 'c2', name: 'Meera Reddy', party: 'Civic Forward Party', symbol: '🌳 Tree', constituency: 'Downtown' },
  { id: 'c3', name: 'Sanjay Gupta', party: 'Independent', symbol: '🚲 Bicycle', constituency: 'Downtown' },
  { id: 'c4', name: 'Priya Sharma', party: 'National Unity', symbol: '⭐ Star', constituency: 'Uptown' },
  { id: 'c5', name: 'Rahul Mehta', party: 'Progressive Alliance', symbol: '☀️ Sun', constituency: 'Uptown' },
  { id: 'c6', name: 'Lakshmi Devi', party: 'Civic Forward Party', symbol: '🌳 Tree', constituency: 'Westside' },
  { id: 'c7', name: 'Vijay Nair', party: 'Independent', symbol: '🦁 Lion', constituency: 'Westside' },
];

/**
 * Fetches candidates for a given constituency.
 * @param constituency - The constituency name to filter by. Empty string returns all.
 * @returns Promise resolving to an array of Candidate objects.
 */
export const fetchCandidates = async (constituency: string): Promise<Candidate[]> =>
  new Promise(resolve =>
    setTimeout(() =>
      resolve(constituency ? mockCandidates.filter(c => c.constituency === constituency) : mockCandidates),
      500
    )
  );
