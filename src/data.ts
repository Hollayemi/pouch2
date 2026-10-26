import {
  BookOpen,
  Bus,
  House,
  Plus,
  ReceiptText,
  Smartphone,
  Utensils,
  Wifi,
} from 'lucide-react-native';
import type { IconType, PocketDraft } from './types';
import { tomorrowDateKey } from './utils/date';

export const initialDraft: PocketDraft = {
  category: 'Feeding',
  name: 'Monthly Feeding',
  amount: '30000',
  releaseAmount: '1000',
  frequency: 'Daily',
  startDate: tomorrowDateKey(),
  releaseTime: '08:00',
  fundingSource: 'unfunded',
};

export const pocketCategories: Array<[string, IconType]> = [
  ['Feeding', Utensils],
  ['Transport', Bus],
  ['Rent', House],
  ['Data', Wifi],
  ['Bills', ReceiptText],
  ['Subscriptions', Smartphone],
  ['School', BookOpen],
  ['Others', Plus],
];
