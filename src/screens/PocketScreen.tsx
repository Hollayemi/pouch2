import { CalendarDays, CreditCard, LockKeyhole, MoreHorizontal, RefreshCw, Zap } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { DetailRow, ReleaseRow } from '../components/rows';
import { Divider, Page, Pill, Section, TopBar } from '../components/ui';
import { colors } from '../theme/colors';
import type { Pocket } from '../types';
import { formatNaira } from '../utils/money';
import { formatReleaseDate, getPocketIcon, getPocketProgress, getPocketStatusLabel } from '../utils/pockets';

export function PocketScreen({ pocket, onBack }: { pocket: Pocket; onBack: () => void }) {
  const Icon = getPocketIcon(pocket.category);
  const progress = getPocketProgress(pocket);
  const statusColor = pocket.status === 'active' ? colors.mint : pocket.status === 'paused' ? colors.red : colors.blue;
  const statusBackground = pocket.status === 'active' ? 'rgba(111,251,190,0.18)' : pocket.status === 'paused' ? colors.redSoft : colors.softBlue;
  const nextRelease = pocket.schedule.nextReleaseAt;

  return <Page><TopBar title={pocket.name} back={onBack} right={MoreHorizontal} /><ScrollView contentContainerClassName="gap-6 px-[22px] pb-8 pt-[22px]">
    <View className="min-h-[250px] rounded-[14px] bg-navy p-[22px] shadow"><View className="flex-row items-center justify-between gap-3"><View className="h-12 w-12 items-center justify-center rounded-[10px] bg-mint"><Icon size={25} color={colors.ink} /></View><Pill text={getPocketStatusLabel(pocket.status)} color={statusBackground} textColor={statusColor} /></View><Text className="mt-7 text-[11px] font-bold text-[#8B96AD]">PROTECTED BALANCE</Text><Text className="mb-5 mt-[3px] text-[38px] font-extrabold text-white">{formatNaira(pocket.protectedAmountKobo)}</Text><View className="h-[7px] overflow-hidden rounded bg-[#334057]"><View className="h-full rounded bg-mint" style={{ width: `${progress}%` }} /></View><View className="flex-row items-center justify-between gap-3"><Text className="mt-2 text-[11px] text-[#A9B4C9]">{formatNaira(pocket.releasedAmountKobo)} released</Text><Text className="mt-2 text-[11px] text-[#A9B4C9]">{formatNaira(pocket.targetAmountKobo)} total</Text></View></View>
    <View className="min-h-[94px] flex-row items-center gap-3.5 rounded-xl border border-border bg-white p-4 shadow"><View className="h-12 w-12 items-center justify-center rounded-full bg-soft"><Zap size={22} color={colors.blue} /></View><View className="flex-1"><Text className="text-[11px] font-bold leading-[15px] text-muted">NEXT RELEASE</Text><Text className="mt-0.5 text-lg font-bold text-ink">{nextRelease ? `${formatNaira(pocket.schedule.releaseAmountKobo)} · ${formatReleaseDate(nextRelease)}` : 'Fund this Pocket to begin'}</Text><Text className="mt-[3px] text-[11px] text-muted">{nextRelease ? pocket.schedule.destinationLabel : 'Your schedule starts after funding'}</Text></View></View>
    <Section title="Pocket Schedule" /><View className="overflow-hidden rounded-xl border border-[#E7EAF0] bg-white shadow"><DetailRow icon={RefreshCw} label="Release frequency" value={pocket.schedule.frequency} /><DetailRow icon={CalendarDays} label="Duration" value={pocket.schedule.durationLabel} /><DetailRow icon={CreditCard} label="Destination" value={pocket.schedule.destinationLabel} /></View>
    {pocket.releases.length > 0 && <><Section title="Recent Releases" action="See All" /><View className="overflow-hidden rounded-xl border border-[#E7EAF0] bg-white shadow">{pocket.releases.slice(0, 3).map((release, index) => <View key={release.id}>{index > 0 && <Divider />}<ReleaseRow date={formatReleaseDate(release.processedAt ?? release.scheduledFor)} amount={formatNaira(release.amountKobo)} status={release.status} /></View>)}</View></>}
    <Pressable className="min-h-[54px] flex-row items-center justify-center gap-[9px] rounded-[10px] border border-[#F7C48B] bg-amber-soft"><LockKeyhole size={19} color={colors.amber} /><Text className="text-sm font-bold text-amber">Request Early Release</Text></Pressable>
  </ScrollView></Page>;
}
