import { ArrowRight, CalendarDays, Utensils } from 'lucide-react-native';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { Field, Page, PrimaryButton, Progress, Subtitle, Title, TopBar } from '../components/ui';
import { ReleaseDatePicker } from '../components/ReleaseDatePicker';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';
import type { PocketDraft } from '../types';
import { normalizeReleaseDate } from '../utils/date';
import { formatNaira } from '../utils/money';
import { getDraftSchedule } from '../utils/schedule';

export function DetailsScreen({ draft, setDraft, onBack, onNext }: { draft: PocketDraft; setDraft: (draft: PocketDraft) => void; onBack: () => void; onNext: () => void }) {
  const schedule = getDraftSchedule(draft);
  const invalidReleaseAmount = schedule.releaseAmountKobo > schedule.targetAmountKobo;
  const canContinue = Boolean(draft.name && schedule.targetAmountKobo > 0 && schedule.releaseAmountKobo > 0 && !invalidReleaseAmount);

  return <Page><TopBar title="Create a Pocket" back={onBack} /><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.fill}><ScrollView contentContainerStyle={styles.flow} keyboardShouldPersistTaps="handled">
    <Progress step={2} label="Pocket Details" /><View><Title>Pocket Details</Title><Subtitle>Name your Pocket and choose how money should be released.</Subtitle></View>
    <View style={styles.formCard}>
      <Field label="Pocket name" value={draft.name} onChangeText={name => setDraft({ ...draft, name })} placeholder="e.g. Monthly Feeding" />
      <Field label="Amount to protect" prefix="₦" value={draft.amount} onChangeText={amount => setDraft({ ...draft, amount: amount.replace(/[^0-9]/g, '') })} keyboardType="number-pad" placeholder="30,000" />
      <View>
        <Field label="Amount released each time" prefix="₦" value={draft.releaseAmount} onChangeText={releaseAmount => setDraft({ ...draft, releaseAmount: releaseAmount.replace(/[^0-9]/g, '') })} keyboardType="number-pad" placeholder="1,000" />
        <Text style={invalidReleaseAmount ? styles.fieldError : styles.fieldHint}>{invalidReleaseAmount ? 'Release amount cannot be greater than the amount protected.' : 'This amount becomes available on every scheduled release.'}</Text>
      </View>
      <View><Text style={styles.fieldLabel}>Release frequency</Text><View style={styles.chipRow}>{['Daily', 'Weekdays', 'Weekly', 'Monthly'].map(frequency => <Pressable key={frequency} onPress={() => setDraft({ ...draft, frequency, startDate: normalizeReleaseDate(draft.startDate, frequency) })} style={[styles.choice, draft.frequency === frequency && styles.choiceActive]}><Text style={[styles.choiceText, draft.frequency === frequency && styles.choiceTextActive]}>{frequency}</Text></Pressable>)}</View></View>
      <ReleaseDatePicker value={draft.startDate} frequency={draft.frequency} onChange={startDate => setDraft({ ...draft, startDate })} />
    </View>
    <View style={styles.preview}><View style={styles.rowBetween}><View><Text style={styles.previewEyebrow}>NEW POCKET PREVIEW</Text><Text style={styles.previewTitle}>{draft.name || 'Your Pocket'}</Text></View><View style={styles.previewIcon}><Utensils size={24} color="#FFF" /></View></View><View><Text style={styles.previewAmount}>{formatNaira(schedule.targetAmountKobo)}</Text><Text style={styles.previewMeta}>{formatNaira(schedule.releaseAmountKobo)} every {schedule.intervalLabel}</Text></View></View>
    <View style={styles.info}><CalendarDays size={20} color={colors.blue} /><Text style={styles.infoText}>{schedule.releaseCount > 0 ? `${schedule.releaseCount} scheduled releases over ${schedule.durationLabel}. The final release may be smaller.` : 'Enter a release amount to calculate your schedule.'}</Text></View>
    <PrimaryButton label="Review Pocket" icon={ArrowRight} disabled={!canContinue} onPress={onNext} />
  </ScrollView></KeyboardAvoidingView></Page>;
}
