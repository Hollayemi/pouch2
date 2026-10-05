import { CalendarDays, CreditCard, LockKeyhole, MoreHorizontal, RefreshCw, Zap } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { DetailRow, ReleaseRow } from '../components/rows';
import { Divider, Page, Pill, Section, TopBar } from '../components/ui';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';
import type { Pocket } from '../types';
import { formatNaira } from '../utils/money';
import { formatReleaseDate, getPocketIcon, getPocketProgress, getPocketStatusLabel } from '../utils/pockets';

export function PocketScreen({ pocket, onBack }: { pocket: Pocket; onBack: () => void }) {
  const Icon = getPocketIcon(pocket.category);
  const progress = getPocketProgress(pocket);
  const statusColor = pocket.status === 'active' ? colors.mint : pocket.status === 'paused' ? colors.red : colors.blue;
  const statusBackground = pocket.status === 'active' ? 'rgba(111,251,190,0.18)' : pocket.status === 'paused' ? colors.redSoft : colors.softBlue;
  const nextRelease = pocket.schedule.nextReleaseAt;

  return <Page><TopBar title={pocket.name} back={onBack} right={MoreHorizontal} /><ScrollView contentContainerStyle={styles.flow}>
    <View style={styles.pocketHero}><View style={styles.rowBetween}><View style={styles.pocketHeroIcon}><Icon size={25} color={colors.ink} /></View><Pill text={getPocketStatusLabel(pocket.status)} color={statusBackground} textColor={statusColor} /></View><Text style={styles.pocketLabel}>PROTECTED BALANCE</Text><Text style={styles.pocketAmount}>{formatNaira(pocket.protectedAmountKobo)}</Text><View style={styles.progressDark}><View style={[styles.progressDarkFill, { width: `${progress}%` }]} /></View><View style={styles.rowBetween}><Text style={styles.pocketMeta}>{formatNaira(pocket.releasedAmountKobo)} released</Text><Text style={styles.pocketMeta}>{formatNaira(pocket.targetAmountKobo)} total</Text></View></View>
    <View style={styles.nextRelease}><View style={styles.nextIcon}><Zap size={22} color={colors.blue} /></View><View style={{ flex: 1 }}><Text style={styles.overline}>NEXT RELEASE</Text><Text style={styles.nextTitle}>{nextRelease ? `${formatNaira(pocket.schedule.releaseAmountKobo)} · ${formatReleaseDate(nextRelease)}` : 'Fund this Pocket to begin'}</Text><Text style={styles.nextMeta}>{nextRelease ? pocket.schedule.destinationLabel : 'Your schedule starts after funding'}</Text></View></View>
    <Section title="Pocket Schedule" /><View style={styles.list}><DetailRow icon={RefreshCw} label="Release frequency" value={pocket.schedule.frequency} /><DetailRow icon={CalendarDays} label="Duration" value={pocket.schedule.durationLabel} /><DetailRow icon={CreditCard} label="Destination" value={pocket.schedule.destinationLabel} /></View>
    {pocket.releases.length > 0 && <><Section title="Recent Releases" action="See All" /><View style={styles.list}>{pocket.releases.slice(0, 3).map((release, index) => <View key={release.id}>{index > 0 && <Divider />}<ReleaseRow date={formatReleaseDate(release.processedAt ?? release.scheduledFor)} amount={formatNaira(release.amountKobo)} status={release.status} /></View>)}</View></>}
    <Pressable style={styles.early}><LockKeyhole size={19} color={colors.amber} /><Text style={styles.earlyText}>Request Early Release</Text></Pressable>
  </ScrollView></Page>;
}
