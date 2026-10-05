import { Check, ChevronRight, Clock3, X } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';
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
  return <Pressable onPress={onPress} style={styles.pocketCard}>
    <View style={styles.rowBetween}><View style={styles.inline}><View style={[styles.pocketIcon, { backgroundColor: palette[1] }]}><Icon size={22} color={palette[0]} /></View><Text style={styles.pocketTitle}>{title}</Text></View><Pill text={status} color={palette[1]} textColor={palette[0]} /></View>
    <View style={styles.pocketNumbers}><Text style={styles.pocketNumber}>{amount}</Text><Text style={styles.pocketNumber}>{total}</Text></View>
    <View style={styles.miniTrack}><View style={[styles.miniFill, { width: `${progress}%`, backgroundColor: palette[0] }]} /></View>
  </Pressable>;
}

export function ActivityRow({ icon: Icon, title, time, amount, category, positive }: { icon: IconType; title: string; time: string; amount: string; category: string; positive?: boolean }) {
  return <View style={styles.activityRow}><View style={[styles.activityIcon, positive && { backgroundColor: colors.greenSoft }]}><Icon size={21} color={positive ? colors.green : colors.ink} /></View><View style={{ flex: 1, marginLeft: 12 }}><Text style={styles.activityTitle}>{title}</Text><Text style={styles.activityTime}>{time}</Text></View><View style={{ alignItems: 'flex-end' }}><Text style={[styles.activityAmount, positive && { color: colors.green }]}>{amount}</Text><Text style={styles.activityTime}>{category}</Text></View></View>;
}

export function DetailRow({ icon: Icon, label, value }: { icon: IconType; label: string; value: string }) {
  return <View style={styles.detail}><View style={styles.detailIcon}><Icon size={20} color={colors.blue} /></View><Text style={styles.detailLabel}>{label}</Text><Text style={styles.detailValue}>{value}</Text></View>;
}

export function ReleaseRow({ date, amount, status = 'success' }: { date: string; amount: string; status?: ReleaseStatus }) {
  const StatusIcon = status === 'failed' ? X : status === 'success' ? Check : Clock3;
  const statusColor = status === 'failed' ? colors.red : status === 'success' ? colors.green : colors.blue;
  return <View style={styles.release}><View style={styles.releaseIcon}><StatusIcon size={16} color={statusColor} /></View><View style={{ flex: 1, marginLeft: 11 }}><Text style={styles.activityTitle}>{getReleaseStatusLabel(status)}</Text><Text style={styles.activityTime}>{date}</Text></View><Text style={styles.releaseAmount}>{amount}</Text></View>;
}

export function MenuRow({ icon: Icon, label, value }: { icon: IconType; label: string; value?: string }) {
  return <Pressable style={styles.menu}><View style={styles.detailIcon}><Icon size={20} color={colors.blue} /></View><Text style={styles.menuLabel}>{label}</Text>{value && <Text style={styles.menuValue}>{value}</Text>}<ChevronRight size={20} color="#98A2B3" /></Pressable>;
}
