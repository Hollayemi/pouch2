import type { PocketDraft } from '../types';
import { nairaInputToKobo } from './money';

const frequencyLabels: Record<string, string> = {
  Daily: 'day',
  Weekdays: 'weekday',
  Weekly: 'week',
  Monthly: 'month',
};

export function getDraftSchedule(draft: PocketDraft) {
  const targetAmountKobo = nairaInputToKobo(draft.amount);
  const releaseAmountKobo = nairaInputToKobo(draft.releaseAmount);
  const releaseCount = releaseAmountKobo > 0 ? Math.ceil(targetAmountKobo / releaseAmountKobo) : 0;

  return {
    targetAmountKobo,
    releaseAmountKobo,
    releaseCount,
    intervalLabel: frequencyLabels[draft.frequency] ?? 'day',
    durationLabel: getDurationLabel(draft.frequency, releaseCount),
  };
}

function getDurationLabel(frequency: string, releaseCount: number) {
  if (releaseCount === 0) return 'Not calculated';
  if (frequency === 'Daily') return `${releaseCount} day${releaseCount === 1 ? '' : 's'}`;
  if (frequency === 'Weekdays') {
    const weeks = Math.ceil(releaseCount / 5);
    return `${weeks} week${weeks === 1 ? '' : 's'}`;
  }
  if (frequency === 'Weekly') return `${releaseCount} week${releaseCount === 1 ? '' : 's'}`;
  return `${releaseCount} month${releaseCount === 1 ? '' : 's'}`;
}
