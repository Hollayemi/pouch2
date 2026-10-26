import { ArrowRight, Check } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { Divider, Page, PrimaryButton, Title } from '../components/ui';
import type { PocketDraft } from '../types';
import { formatShortDateKey, formatTimeKey } from '../utils/date';
import { formatNaira, nairaInputToKobo } from '../utils/money';

export function SuccessScreen({ draft, onDone }: { draft: PocketDraft; onDone: () => void }) {
  return <Page><View className="flex-1 items-center px-6 pb-6 pt-[70px]">
    <View className="mb-[30px] h-[126px] w-[126px] items-center justify-center rounded-full bg-success-soft"><View className="h-[78px] w-[78px] items-center justify-center rounded-full bg-success"><Check size={42} color="#FFF" /></View></View>
    <Title>Your Pocket is ready</Title><Text className="mt-2.5 max-w-[340px] text-center text-[15px] leading-[23px] text-muted">{draft.name} has been funded from your Pouch wallet and is now active.</Text>
    <View className="mt-[34px] w-full items-center gap-3.5 rounded-xl border border-border bg-white p-5 shadow"><Text className="text-[11px] font-bold leading-[15px] text-muted">AMOUNT TO PROTECT</Text><Text className="text-[32px] font-extrabold text-ink">{formatNaira(nairaInputToKobo(draft.amount))}</Text><Divider /><View className="flex-row items-center justify-between gap-3"><Text className="text-xs font-semibold text-muted">{draft.frequency} · {formatNaira(nairaInputToKobo(draft.releaseAmount))} each</Text><Text className="text-right text-xs font-semibold text-muted">Starts {formatShortDateKey(draft.startDate)}{`\n`}{formatTimeKey(draft.releaseTime)}</Text></View></View>
    <View className="mt-auto w-full"><PrimaryButton label="View Pockets" icon={ArrowRight} onPress={onDone} /></View>
  </View></Page>;
}
