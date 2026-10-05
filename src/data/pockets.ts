import type { Pocket, PocketDraft } from '../types';
import { dateKeyToISO, toDateKey } from '../utils/date';
import { getDraftSchedule } from '../utils/schedule';

const atFutureDay = (daysFromNow: number, hour = 8) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
};

export const initialPockets: Pocket[] = [
  {
    id: 'feeding',
    name: 'Monthly Feeding',
    category: 'Feeding',
    currency: 'NGN',
    status: 'active',
    targetAmountKobo: 5_000_000,
    protectedAmountKobo: 3_500_000,
    releasedAmountKobo: 1_500_000,
    createdAt: atFutureDay(-15),
    schedule: {
      frequency: 'Daily',
      releaseAmountKobo: 100_000,
      releaseCount: 30,
      durationLabel: '30 days',
      startDate: toDateKey(new Date(atFutureDay(1))),
      nextReleaseAt: atFutureDay(1),
      destinationLabel: 'Bank •••• 1234',
    },
    releases: [
      { id: 'feeding-release-2', amountKobo: 100_000, scheduledFor: atFutureDay(0), processedAt: atFutureDay(0), status: 'success' },
      { id: 'feeding-release-1', amountKobo: 100_000, scheduledFor: atFutureDay(-1), processedAt: atFutureDay(-1), status: 'success' },
    ],
  },
  {
    id: 'transport',
    name: 'Work Transport',
    category: 'Transport',
    currency: 'NGN',
    status: 'active',
    targetAmountKobo: 1_500_000,
    protectedAmountKobo: 650_000,
    releasedAmountKobo: 850_000,
    createdAt: atFutureDay(-12),
    schedule: {
      frequency: 'Weekdays',
      releaseAmountKobo: 75_000,
      releaseCount: 20,
      durationLabel: '4 weeks',
      startDate: toDateKey(new Date(atFutureDay(1, 7))),
      nextReleaseAt: atFutureDay(1, 7),
      destinationLabel: 'Bank •••• 1234',
    },
    releases: [
      { id: 'transport-release-1', amountKobo: 75_000, scheduledFor: atFutureDay(0, 7), processedAt: atFutureDay(0, 7), status: 'success' },
    ],
  },
  {
    id: 'rent',
    name: 'Monthly Rent',
    category: 'Rent',
    currency: 'NGN',
    status: 'active',
    targetAmountKobo: 25_000_000,
    protectedAmountKobo: 25_000_000,
    releasedAmountKobo: 0,
    createdAt: atFutureDay(-20),
    schedule: {
      frequency: 'Monthly',
      releaseAmountKobo: 25_000_000,
      releaseCount: 1,
      durationLabel: '1 month',
      startDate: toDateKey(new Date(atFutureDay(1, 9))),
      nextReleaseAt: atFutureDay(1, 9),
      destinationLabel: 'Bank •••• 1234',
    },
    releases: [],
  },
];

export function pocketFromDraft(draft: PocketDraft): Pocket {
  const { targetAmountKobo, releaseAmountKobo, releaseCount, durationLabel } = getDraftSchedule(draft);
  const idBase = (draft.name || draft.category || 'pocket')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    id: `${idBase || 'pocket'}-${Date.now()}`,
    name: draft.name.trim() || `${draft.category} Pocket`,
    category: draft.category || 'Others',
    currency: 'NGN',
    status: 'awaiting_funding',
    targetAmountKobo,
    protectedAmountKobo: 0,
    releasedAmountKobo: 0,
    createdAt: new Date().toISOString(),
    schedule: {
      frequency: draft.frequency,
      releaseAmountKobo,
      releaseCount,
      durationLabel,
      startDate: draft.startDate,
      nextReleaseAt: dateKeyToISO(draft.startDate),
      destinationLabel: 'Bank •••• 1234',
    },
    releases: [],
  };
}
