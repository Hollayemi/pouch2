import { ArrowRight, CalendarDays, Utensils } from 'lucide-react-native';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { Field, Page, PrimaryButton, Progress, Subtitle, Title, TopBar } from '../components/ui';
import { ReleaseDatePicker } from '../components/ReleaseDatePicker';
import { colors } from '../theme/colors';
import type { PocketDraft } from '../types';
import { normalizeReleaseDate } from '../utils/date';
import { formatNaira } from '../utils/money';
import { getDraftSchedule } from '../utils/schedule';

export function DetailsScreen({ draft, setDraft, onBack, onNext }: { draft: PocketDraft; setDraft: (draft: PocketDraft) => void; onBack: () => void; onNext: () => void }) {
  const schedule = getDraftSchedule(draft);
  const invalidReleaseAmount = schedule.releaseAmountKobo > schedule.targetAmountKobo;
  const canContinue = Boolean(draft.name && schedule.targetAmountKobo > 0 && schedule.releaseAmountKobo > 0 && !invalidReleaseAmount);

  return <Page><TopBar title="Create a Pocket" back={onBack} /><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1"><ScrollView contentContainerClassName="gap-6 px-[22px] pb-8 pt-[22px]" keyboardShouldPersistTaps="handled">
    <Progress step={2} label="Pocket Details" /><View><Title>Pocket Details</Title><Subtitle>Name your Pocket and choose how money should be released.</Subtitle></View>
    <View className="gap-5 rounded-xl border border-border bg-white p-5 shadow">
      <Field label="Pocket name" value={draft.name} onChangeText={name => setDraft({ ...draft, name })} placeholder="e.g. Monthly Feeding" />
      <Field label="Amount to protect" prefix="₦" value={draft.amount} onChangeText={amount => setDraft({ ...draft, amount: amount.replace(/[^0-9]/g, '') })} keyboardType="number-pad" placeholder="30,000" />
      <View>
        <Field label="Amount released each time" prefix="₦" value={draft.releaseAmount} onChangeText={releaseAmount => setDraft({ ...draft, releaseAmount: releaseAmount.replace(/[^0-9]/g, '') })} keyboardType="number-pad" placeholder="1,000" />
        <Text className={`mt-1.5 text-[11px] leading-4 ${invalidReleaseAmount ? 'text-danger' : 'text-muted'}`}>{invalidReleaseAmount ? 'Release amount cannot be greater than the amount protected.' : 'This amount becomes available on every scheduled release.'}</Text>
      </View>
      <View><Text className="mb-[7px] text-[13px] font-bold leading-[18px] text-ink">Release frequency</Text><View className="flex-row gap-2">{['Daily', 'Weekdays', 'Weekly', 'Monthly'].map(frequency => <Pressable key={frequency} onPress={() => setDraft({ ...draft, frequency, startDate: normalizeReleaseDate(draft.startDate, frequency) })} className={`min-h-11 flex-1 items-center justify-center rounded-lg border ${draft.frequency === frequency ? 'border-brand bg-soft-blue' : 'border-border'}`}><Text className={`text-xs font-semibold ${draft.frequency === frequency ? 'font-bold text-brand' : 'text-muted'}`}>{frequency}</Text></Pressable>)}</View></View>
      <ReleaseDatePicker value={draft.startDate} frequency={draft.frequency} onChange={startDate => setDraft({ ...draft, startDate })} />
    </View>
    <View className="min-h-[190px] justify-between rounded-[14px] bg-navy p-5 shadow"><View className="flex-row items-center justify-between gap-3"><View><Text className="text-[10px] font-bold text-[#8B96AD]">NEW POCKET PREVIEW</Text><Text className="mt-1 text-xl font-bold text-white">{draft.name || 'Your Pocket'}</Text></View><View className="h-12 w-12 items-center justify-center rounded-[10px] bg-white/10"><Utensils size={24} color="#FFF" /></View></View><View><Text className="text-[30px] font-extrabold text-white">{formatNaira(schedule.targetAmountKobo)}</Text><Text className="mt-1 text-xs text-[#A9B4C9]">{formatNaira(schedule.releaseAmountKobo)} every {schedule.intervalLabel}</Text></View></View>
    <View className="flex-row gap-2.5 rounded-[10px] bg-soft p-4"><CalendarDays size={20} color={colors.blue} /><Text className="flex-1 text-[13px] leading-[19px] text-ink">{schedule.releaseCount > 0 ? `${schedule.releaseCount} scheduled releases over ${schedule.durationLabel}. The final release may be smaller.` : 'Enter a release amount to calculate your schedule.'}</Text></View>
    <PrimaryButton label="Review Pocket" icon={ArrowRight} disabled={!canContinue} onPress={onNext} />
  </ScrollView></KeyboardAvoidingView></Page>;
}
