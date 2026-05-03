/**
 * @fileoverview useElection hook — wraps election data services with loading/error states.
 * @module hooks/useElection
 */
import { useState, useEffect } from 'react';
import { fetchTimeline, fetchCandidates, fetchPollingBooths } from '../services/election';
import type { TimelineEvent, Candidate, PollingBooth } from '../types';

interface UseTimelineReturn {
  events: TimelineEvent[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook to fetch and subscribe to election timeline events.
 * @returns Object containing events, loading state, and error.
 */
export const useTimeline = (): UseTimelineReturn => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchTimeline()
      .then(data => { if (!cancelled) setEvents(data); })
      .catch(() => { if (!cancelled) setError('Failed to load election timeline.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { events, loading, error };
};

interface UseCandidatesReturn {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook to fetch candidates for a given constituency.
 * @param constituency - The constituency name to filter by.
 * @returns Object containing candidates, loading state, and error.
 */
export const useCandidates = (constituency: string): UseCandidatesReturn => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchCandidates(constituency)
      .then(data => { if (!cancelled) setCandidates(data); })
      .catch(() => { if (!cancelled) setError('Failed to load candidates.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [constituency]);

  return { candidates, loading, error };
};

interface UseBoothsReturn {
  booths: PollingBooth[];
  loading: boolean;
  error: string | null;
  search: (pincode: string) => void;
}

/**
 * Hook to search for polling booths by pincode.
 * @returns Object with booths, loading state, error, and a search trigger function.
 */
export const useBooths = (): UseBoothsReturn => {
  const [booths, setBooths] = useState<PollingBooth[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = (pincode: string): void => {
    setLoading(true);
    setError(null);
    fetchPollingBooths(pincode)
      .then(setBooths)
      .catch(() => setError('Failed to find booths. Please try again.'))
      .finally(() => setLoading(false));
  };

  return { booths, loading, error, search };
};
