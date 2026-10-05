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
  category: '',
  name: 'Monthly Feeding',
  amount: '30000',
  releaseAmount: '1000',
  frequency: 'Daily',
  startDate: tomorrowDateKey(),
};

export const onboardingSlides = [
  {
    eyebrow: 'SMART ALLOCATION',
    title: 'Give every naira a clear purpose.',
    body: 'Create Pockets for feeding, transport, rent, data, and everything essential.',
    image: require('../assets/onboarding-allocation.png'),
  },
  {
    eyebrow: 'BUILT-IN DISCIPLINE',
    title: 'Make your money last until it should.',
    body: "Set a release schedule and keep tomorrow's money protected from today's spending.",
    image: require('../assets/onboarding-protection.png'),
  },
  {
    eyebrow: 'FINANCIAL SECURITY',
    title: 'Sleep better knowing your bills are covered.',
    body: 'SafeGuard keeps essential money organized, protected, and released right on time.',
    image: require('../assets/onboarding-peace.png'),
  },
];

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
