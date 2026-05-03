/**
 * @fileoverview Central type definitions for CivicSeva.
 * @module types
 */

/** Authenticated user profile. */
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  registered: boolean;
  constituency?: string;
  state?: string;
  voterId?: string;
}

/** Candidate standing in an election. */
export interface Candidate {
  id: string;
  name: string;
  party: string;
  symbol: string;
  constituency: string;
  manifesto?: string;
  imageUrl?: string;
}

/** Physical polling booth. */
export interface PollingBooth {
  id: string;
  name: string;
  address: string;
  pincode: string;
  lat?: number;
  lng?: number;
  timings: string;
  district?: string;
}

/** Key election timeline event. */
export interface TimelineEvent {
  id: string;
  title: string;
  date: string;      // ISO 8601
  description: string;
  category?: 'registration' | 'campaign' | 'voting' | 'results';
}

/** AI chat message. */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

/** Election Guide Wizard step. */
export interface WizardStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

/** Firestore notification document. */
export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt: number;
  read: boolean;
  type: 'reminder' | 'alert' | 'info';
}

/** Eligibility check input. */
export interface EligibilityInput {
  age: number;
  citizenship: 'citizen' | 'permanent_resident' | 'other';
  state: string;
}

/** Eligibility check result. */
export interface EligibilityResult {
  eligible: boolean;
  message: string;
  details?: string[];
}
