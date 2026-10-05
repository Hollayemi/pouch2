import { WalletCards } from 'lucide-react-native';
import { pocketCategories } from '../data';
import type { Pocket, PocketStatus, ReleaseStatus } from '../types';

export function getPocketIcon(category: string) {
  return pocketCategories.find(([name]) => name === category)?.[1] ?? WalletCards;
}

export function getPocketProgress(pocket: Pocket) {
  if (pocket.targetAmountKobo <= 0) return 0;
  return Math.min(100, Math.round((pocket.protectedAmountKobo / pocket.targetAmountKobo) * 100));
}

export function getPocketCardStatus(pocket: Pocket) {
  if (pocket.status === 'awaiting_funding') return 'FUNDING NEEDED';
  if (pocket.status === 'paused') return 'PAUSED';
  if (pocket.status === 'completed' || pocket.protectedAmountKobo >= pocket.targetAmountKobo) {
    return 'FULLY PROTECTED';
  }
  return `${100 - getPocketProgress(pocket)}% LEFT`;
}

export function getPocketTone(pocket: Pocket): 'green' | 'red' | 'blue' {
  if (pocket.status === 'paused') return 'red';
  if (pocket.status === 'active' && pocket.protectedAmountKobo < pocket.targetAmountKobo) return 'green';
  return 'blue';
}

export function getPocketStatusLabel(status: PocketStatus) {
  return {
    awaiting_funding: 'AWAITING FUNDING',
    active: 'ACTIVE',
    paused: 'PAUSED',
    completed: 'COMPLETED',
  }[status];
}

export function getReleaseStatusLabel(status: ReleaseStatus) {
  return {
    scheduled: 'Release scheduled',
    pending: 'Release processing',
    success: 'Release completed',
    failed: 'Release failed',
  }[status];
}

export function formatReleaseDate(value: string) {
  const date = new Date(value);
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const sameDay = (left: Date, right: Date) =>
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate();

  const day = sameDay(date, now) ? 'Today' : sameDay(date, tomorrow) ? 'Tomorrow' : date.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
  return `${day}, ${date.toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' })}`;
}
