import { CalendarDays, Check, LockKeyhole, WalletCards } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { AddFundsModal } from '../components/AddFundsModal';
import { ReleaseDatePicker } from '../components/ReleaseDatePicker';
import { ReleaseTimePicker } from '../components/ReleaseTimePicker';
import { Field, Page, PrimaryButton, Subtitle, Title, TopBar } from '../components/ui';
import { pocketCategories } from '../data';
import { colors } from '../theme/colors';
import type { PocketDraft } from '../types';
import { normalizeReleaseDate } from '../utils/date';
import { formatNaira } from '../utils/money';
import { getDraftSchedule } from '../utils/schedule';

type CreatePocketScreenProps = {
  draft: PocketDraft;
  setDraft: (draft: PocketDraft) => void;
  walletBalanceKobo: number;
  kycVerified: boolean;
  onKycRequired: () => void;
  onClose: () => void;
  onCreate: () => void;
};

const frequencies = ['Daily', 'Weekdays', 'Weekly', 'Monthly'];

const formatAmountInput = (value: string) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function MoneyField({ label, value, placeholder, onChange }: { label: string; value: string; placeholder: string; onChange: (value: string) => void }) {
  return (
    <View>
      <Text className="mb-[7px] text-[13px] font-bold leading-[18px] text-ink">{label}</Text>
      <TextInput
        value={value ? `₦ ${formatAmountInput(value)}` : ''}
        onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
        placeholder={`₦ ${placeholder}`}
        placeholderTextColor="#98A2B3"
        keyboardType="number-pad"
        textAlignVertical="center"
        className="h-[54px] rounded-[9px] border border-border bg-white px-[15px] py-0 text-base leading-5 text-ink"
      />
    </View>
  );
}

export function CreatePocketScreen({ draft, setDraft, walletBalanceKobo, kycVerified, onKycRequired, onClose, onCreate }: CreatePocketScreenProps) {
  const [protectedPocket, setProtectedPocket] = useState(true);
  const [fundingVisible, setFundingVisible] = useState(false);
  const schedule = getDraftSchedule(draft);
  const invalidReleaseAmount = schedule.releaseAmountKobo > schedule.targetAmountKobo;
  const hasEnteredAmount = schedule.targetAmountKobo > 0;
  const walletHasEnough = hasEnteredAmount && walletBalanceKobo >= schedule.targetAmountKobo;
  const needsAdditionalFunds = hasEnteredAmount && !walletHasEnough;
  const shortfallKobo = Math.max(0, schedule.targetAmountKobo - walletBalanceKobo);
  const canCreate = Boolean(
    draft.category &&
    draft.name.trim() &&
    schedule.targetAmountKobo > 0 &&
    schedule.releaseAmountKobo > 0 &&
    !invalidReleaseAmount &&
    walletHasEnough &&
    kycVerified,
  );

  return (
    <Page>
      <TopBar title="Create a Pocket" back={onClose} close />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView
          contentContainerClassName="gap-5 px-[22px] pb-10 pt-5"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Title>Set up your Pocket</Title>
            <Subtitle>Choose what you’re protecting and how the money should be released.</Subtitle>
          </View>

          <View>
            <Text className="mb-2 text-[13px] font-bold text-ink">Category</Text>
            <View className="flex-row flex-wrap justify-between gap-y-2.5">
              {pocketCategories.map(([name, Icon]) => {
                const selected = draft.category === name;
                return (
                  <Pressable
                    key={name}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    onPress={() => setDraft({ ...draft, category: name })}
                    className={`min-h-[78px] w-[23%] items-center justify-center gap-1.5 rounded-xl border ${selected ? 'border-brand bg-soft-blue' : 'border-border bg-white'}`}
                  >
                    <View className={`h-9 w-9 items-center justify-center rounded-full ${selected ? 'bg-brand' : 'bg-soft'}`}>
                      <Icon size={18} color={selected ? '#FFFFFF' : colors.blue} />
                    </View>
                    <Text numberOfLines={1} className={`max-w-full px-1 text-[10px] font-semibold ${selected ? 'text-brand' : 'text-ink'}`}>{name}</Text>
                    {selected && <View className="absolute right-1.5 top-1.5 h-4 w-4 items-center justify-center rounded-full bg-brand"><Check size={10} color="#FFFFFF" /></View>}
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="gap-5 rounded-xl border border-border bg-white p-4 shadow">
            <Field label="Pocket name" value={draft.name} onChangeText={(name) => setDraft({ ...draft, name })} placeholder="e.g. Monthly Feeding" />
            <MoneyField label="Total amount to protect" value={draft.amount} onChange={(amount) => setDraft({ ...draft, amount, fundingSource: 'unfunded' })} placeholder="30,000" />
            <View>
              <MoneyField label="Released amount" value={draft.releaseAmount} onChange={(releaseAmount) => setDraft({ ...draft, releaseAmount })} placeholder="1,000" />
              <Text className={`mt-1.5 text-[11px] leading-4 ${invalidReleaseAmount ? 'text-danger' : 'text-muted'}`}>
                {invalidReleaseAmount ? 'Release amount cannot exceed the total protected amount.' : 'This amount becomes available on each scheduled release.'}
              </Text>
            </View>
          </View>

          <View className="gap-4 rounded-xl border border-border bg-white p-4 shadow">
            <View>
              <Text className="mb-2 text-[13px] font-bold text-ink">Release frequency</Text>
              <View className="flex-row flex-wrap gap-2">
                {frequencies.map((frequency) => {
                  const selected = draft.frequency === frequency;
                  return (
                    <Pressable
                      key={frequency}
                      onPress={() => setDraft({ ...draft, frequency, startDate: normalizeReleaseDate(draft.startDate, frequency) })}
                      className={`min-h-11 flex-1 basis-[46%] items-center justify-center rounded-lg border ${selected ? 'border-brand bg-soft-blue' : 'border-border bg-white'}`}
                    >
                      <Text className={`text-xs font-bold ${selected ? 'text-brand' : 'text-muted'}`}>{frequency}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
            <ReleaseDatePicker value={draft.startDate} frequency={draft.frequency} onChange={(startDate) => setDraft({ ...draft, startDate })} />
            <ReleaseTimePicker value={draft.releaseTime} onChange={(releaseTime) => setDraft({ ...draft, releaseTime })} />
          </View>

          <View className="flex-row items-center gap-3 rounded-xl border border-border bg-white p-4 shadow">
            <View className="h-11 w-11 items-center justify-center rounded-xl bg-soft-blue"><WalletCards size={21} color={colors.blue} /></View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-ink">Funding source</Text>
              <Text className="mt-0.5 text-xs leading-4 text-muted">Wallet balance: {formatNaira(walletBalanceKobo)}</Text>
              {!kycVerified && <Text className="mt-1 text-[11px] font-semibold text-danger">Complete KYC before funding a Pocket</Text>}
              {kycVerified && needsAdditionalFunds && <Text className="mt-1 text-[11px] font-semibold text-danger">Add {formatNaira(shortfallKobo)} to cover this Pocket</Text>}
              {kycVerified && walletHasEnough && <Text className="mt-1 text-[11px] font-semibold text-success">Funds available for this Pocket</Text>}
            </View>
            {!kycVerified ? (
              <Pressable onPress={onKycRequired} className="min-h-10 items-center justify-center rounded-lg bg-danger-soft px-3 active:opacity-70">
                <Text className="text-xs font-bold text-danger">Verify KYC</Text>
              </Pressable>
            ) : !hasEnteredAmount ? (
              <Text className="max-w-[90px] text-right text-[11px] leading-4 text-muted">Enter an amount</Text>
            ) : needsAdditionalFunds ? (
              <Pressable onPress={() => setFundingVisible(true)} className="min-h-10 items-center justify-center rounded-lg bg-soft-blue px-3 active:opacity-70">
                <Text className="text-xs font-bold text-brand">Add funds</Text>
              </Pressable>
            ) : (
              <View className="min-h-10 flex-row items-center justify-center gap-1.5 rounded-lg bg-success px-3">
                <Check size={14} color="#FFFFFF" />
                <Text className="text-xs font-bold text-white">Ready</Text>
              </View>
            )}
          </View>

          <View className="flex-row items-center gap-3 rounded-xl border border-border bg-white p-4 shadow">
            <View className="h-11 w-11 items-center justify-center rounded-xl bg-soft"><LockKeyhole size={21} color={colors.blue} /></View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-ink">Protect this Pocket</Text>
              <Text className="mt-0.5 text-xs leading-4 text-muted">Add friction before accessing money early.</Text>
            </View>
            <Switch value={protectedPocket} onValueChange={setProtectedPocket} trackColor={{ false: '#D0D5DD', true: colors.blue }} />
          </View>

          <View className="flex-row gap-3 rounded-xl bg-soft p-4">
            <CalendarDays size={20} color={colors.blue} />
            <View className="flex-1">
              <Text className="text-sm font-bold text-ink">Schedule summary</Text>
              <Text className="mt-1 text-xs leading-5 text-muted">
                {schedule.releaseCount > 0
                  ? `${formatNaira(schedule.releaseAmountKobo)} every ${schedule.intervalLabel} for about ${schedule.durationLabel} (${schedule.releaseCount} releases).`
                  : 'Enter your amounts to calculate the release schedule.'}
              </Text>
            </View>
          </View>

          {!canCreate && <Text className="text-center text-xs font-semibold leading-5 text-danger">{!kycVerified ? 'Complete KYC before creating and funding a Pocket.' : needsAdditionalFunds ? `Add ${formatNaira(shortfallKobo)} to your wallet before creating this Pocket.` : 'Choose a category and enter a valid Pocket name, total amount, and released amount.'}</Text>}
          <PrimaryButton label="Create Pocket" disabled={!canCreate} onPress={onCreate} />
        </ScrollView>
      </KeyboardAvoidingView>
      <AddFundsModal visible={fundingVisible} kycVerified={kycVerified} onClose={() => setFundingVisible(false)} onKycRequired={onKycRequired} />
    </Page>
  );
}
