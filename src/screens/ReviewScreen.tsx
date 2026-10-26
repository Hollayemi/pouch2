import { ArrowRight, CalendarDays, CreditCard, LockKeyhole, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { Divider, Fact, Page, Pill, PrimaryButton, Progress, SecondaryButton, SecureNote, Subtitle, Title, TopBar } from '../components/ui';
import { colors } from '../theme/colors';
import type { PocketDraft } from '../types';
import { formatShortDateKey } from '../utils/date';
import { formatNaira, nairaInputToKobo } from '../utils/money';

export function ReviewScreen({ draft, onClose, onBack, onNext }: { draft: PocketDraft; onClose: () => void; onBack: () => void; onNext: () => void }) {
  const [locked, setLocked] = useState(true);
  return <Page><TopBar title="Review Pocket" back={onClose} close /><ScrollView contentContainerClassName="gap-6 px-[22px] pb-8 pt-[22px]">
    <Progress step={6} label="Review" /><View><Title>Review Pocket</Title><Subtitle>Double-check your settings before creating your Pocket.</Subtitle></View>
    <View className="overflow-hidden rounded-[14px] border border-[#C8CDD6] bg-white shadow">
      <View className="h-[150px] flex-row items-end justify-between bg-[#3C8C7A] p-[18px]"><Pill text={draft.category.toUpperCase()} color={colors.mint} /><Sparkles size={35} color="#FFF" /></View>
      <View className="gap-5 p-5"><View className="flex-row items-center justify-between gap-3"><View className="flex-1"><Text className="text-xl font-bold text-ink">{draft.name}</Text><Text className="mt-1.5 text-sm text-muted">{draft.frequency} · {formatNaira(nairaInputToKobo(draft.releaseAmount))} each release</Text></View><View className="items-end"><Text className="text-[11px] font-bold leading-[15px] text-muted">GOAL AMOUNT</Text><Text className="mt-[3px] text-2xl font-extrabold text-ink">{formatNaira(nairaInputToKobo(draft.amount))}</Text></View></View><Divider /><View className="flex-row gap-3"><Fact icon={CreditCard} label="DESTINATION" value="My bank account" /><Fact icon={CalendarDays} label="FIRST RELEASE" value={formatShortDateKey(draft.startDate)} /></View></View>
    </View>
    <View className="min-h-28 flex-row items-center gap-[13px] rounded-xl border border-border bg-white p-4 shadow"><View className="h-12 w-12 items-center justify-center rounded-[10px] bg-soft"><LockKeyhole size={23} color={colors.blue} /></View><View className="flex-1"><Text className="text-base font-bold text-ink">Protect this Pocket</Text><Text className="mt-[3px] text-xs leading-[17px] text-muted">Add friction before accessing scheduled money early.</Text></View><Switch value={locked} onValueChange={setLocked} trackColor={{ false: '#D0D5DD', true: colors.blue }} /></View>
    <SecureNote text="Encrypted and protected by Pouch Security" />
    <PrimaryButton label="Create Pocket" icon={ArrowRight} dark onPress={onNext} /><SecondaryButton label="Go Back" onPress={onBack} />
  </ScrollView></Page>;
}
