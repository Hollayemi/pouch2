import type { Home } from 'lucide-react-native';

export type Screen =
  | 'onboarding'
  | 'auth'
  | 'home'
  | 'activity'
  | 'profile'
  | 'category'
  | 'details'
  | 'review'
  | 'success'
  | 'pocket';

export type IconType = typeof Home;

export type PocketDraft = {
  category: string;
  name: string;
  amount: string;
  releaseAmount: string;
  frequency: string;
  startDate: string;
};

export type PocketStatus = 'awaiting_funding' | 'active' | 'paused' | 'completed';

export type ReleaseStatus = 'scheduled' | 'pending' | 'success' | 'failed';

export type PocketRelease = {
  id: string;
  amountKobo: number;
  scheduledFor: string;
  processedAt?: string;
  status: ReleaseStatus;
};

export type PocketSchedule = {
  frequency: PocketDraft['frequency'];
  releaseAmountKobo: number;
  releaseCount: number;
  durationLabel: string;
  startDate: string;
  nextReleaseAt: string | null;
  destinationLabel: string;
};

export type Pocket = {
  id: string;
  name: string;
  category: string;
  currency: 'NGN';
  status: PocketStatus;
  targetAmountKobo: number;
  protectedAmountKobo: number;
  releasedAmountKobo: number;
  createdAt: string;
  schedule: PocketSchedule;
  releases: PocketRelease[];
};

export type Navigate = (screen: Screen) => void;
