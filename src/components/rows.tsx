import { Check, ChevronRight, Clock3, X } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import type { IconType } from '../types';
import type { ReleaseStatus } from '../types';
import { getReleaseStatusLabel } from '../utils/pockets';
import { Pill } from './ui';

export function PocketCard({ title, icon: Icon, amount, total, status, progress, tone, onPress }: { title: string; icon: IconType; amount: string; total: string; status: string; progress: number; tone: 'green' | 'red' | 'blue'; onPress?: () => void }) {
  const palette = {
    green: [colors.green, colors.greenSoft],
    red: [colors.red, colors.redSoft],
    blue: [colors.blue, colors.softBlue],
  }[tone];
  return <Pressable onPress={onPress} className="rounded-xl border border-[#E7EAF0] bg-white p-[17px] shadow">
    <View className="flex-row items-center justify-between gap-3"><View className="flex-row items-center gap-[9px]"><View className="h-11 w-11 items-center justify-center rounded-[9px]" style={{ backgroundColor: palette[1] }}><Icon size={22} color={palette[0]} /></View><Text className="text-[17px] font-bold text-ink">{title}</Text></View><Pill text={status} color={palette[1]} textColor={palette[0]} /></View>
    <View className="mb-[9px] mt-[18px] flex-row justify-between"><Text className="text-xs font-semibold text-ink">{amount}</Text><Text className="text-xs font-semibold text-ink">{total}</Text></View>
    <View className="h-1.5 overflow-hidden rounded-full bg-[#E8EDF5]"><View className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: palette[0] }} /></View>
  </Pressable>;
}

export function ActivityRow({ icon: Icon, title, time, amount, category, positive }: { icon: IconType; title: string; time: string; amount: string; category: string; positive?: boolean }) {
  return <View className="min-h-[78px] flex-row items-center px-4 py-3"><View className={`h-[42px] w-[42px] items-center justify-center rounded-full ${positive ? 'bg-success-soft' : 'bg-soft-blue'}`}><Icon size={21} color={positive ? colors.green : colors.ink} /></View><View className="ml-3 flex-1"><Text className="text-sm font-semibold leading-[19px] text-ink">{title}</Text><Text className="mt-0.5 text-[11px] leading-[15px] text-muted">{time}</Text></View><View className="items-end"><Text className={`text-sm font-bold ${positive ? 'text-success' : 'text-danger'}`}>{amount}</Text><Text className="mt-0.5 text-[11px] leading-[15px] text-muted">{category}</Text></View></View>;
}

export function DetailRow({ icon: Icon, label, value }: { icon: IconType; label: string; value: string }) {
  return <View className="min-h-[66px] flex-row items-center border-b border-[#EDF0F4] px-[15px]"><View className="h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-soft"><Icon size={20} color={colors.blue} /></View><Text className="ml-3 flex-1 text-[13px] text-muted">{label}</Text><Text className="text-[13px] font-bold text-ink">{value}</Text></View>;
}

export function ReleaseRow({ date, amount, status = 'success' }: { date: string; amount: string; status?: ReleaseStatus }) {
  const StatusIcon = status === 'failed' ? X : status === 'success' ? Check : Clock3;
  const statusColor = status === 'failed' ? colors.red : status === 'success' ? colors.green : colors.blue;
  return <View className="min-h-[72px] flex-row items-center px-4"><View className="h-[38px] w-[38px] items-center justify-center rounded-full bg-success-soft"><StatusIcon size={16} color={statusColor} /></View><View className="ml-[11px] flex-1"><Text className="text-sm font-semibold leading-[19px] text-ink">{getReleaseStatusLabel(status)}</Text><Text className="mt-0.5 text-[11px] leading-[15px] text-muted">{date}</Text></View><Text className="text-sm font-bold text-success">{amount}</Text></View>;
}

export function MenuRow({ icon: Icon, label, value }: { icon: IconType; label: string; value?: string }) {
  return <Pressable className="min-h-16 flex-row items-center border-b border-[#EDF0F4] px-3.5"><View className="h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-soft"><Icon size={20} color={colors.blue} /></View><Text className="ml-3 flex-1 text-[13px] font-semibold text-ink">{label}</Text>{value && <Text className="mr-[5px] text-xs text-muted">{value}</Text>}<ChevronRight size={20} color="#98A2B3" /></Pressable>;
}
