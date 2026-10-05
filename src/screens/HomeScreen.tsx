import { Bell, Plus, RefreshCw, ShieldCheck, ShoppingBasket, TrendingUp, Wifi } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { ActivityRow, PocketCard } from '../components/rows';
import { Divider, Page, Pill, QuickAction, Section, Stat } from '../components/ui';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';
import type { Pocket } from '../types';
import { formatNaira } from '../utils/money';
import { getPocketCardStatus, getPocketIcon, getPocketProgress, getPocketTone } from '../utils/pockets';

export function HomeScreen({ pockets, onNewPocket, onOpenPocket, onActivity }: { pockets: Pocket[]; onNewPocket: () => void; onOpenPocket: (id: string) => void; onActivity: () => void }) {
  const totalProtected = pockets.reduce((total, pocket) => total + pocket.protectedAmountKobo, 0);
  const activeCount = pockets.filter((pocket) => pocket.status === 'active').length;
  const nextPocket = pockets
    .filter((pocket) => pocket.schedule.nextReleaseAt)
    .sort((left, right) => new Date(left.schedule.nextReleaseAt!).getTime() - new Date(right.schedule.nextReleaseAt!).getTime())[0];

  return <Page nav><ScrollView contentContainerStyle={styles.dashboard} showsVerticalScrollIndicator={false}>
    <View style={styles.greetingRow}>
      <View style={styles.avatar}><Text style={styles.avatarText}>TA</Text></View>
      <View style={{ flex: 1, marginLeft: 12 }}><Text style={styles.overline}>Good morning,</Text><Text style={styles.greeting}>Tunde</Text></View>
      <View style={styles.roundButton}><Bell size={21} color={colors.ink} /><View style={styles.alertDot} /></View>
    </View>
    <View style={styles.balanceCard}>
      <View style={styles.rowBetween}><Text style={styles.balanceLabel}>TOTAL PROTECTED BALANCE</Text><Pill text="Locked for essentials" color={colors.mint} /></View>
      <Text style={styles.balanceAmount}>{formatNaira(totalProtected)}</Text>
      <View style={styles.inline}><ShieldCheck size={18} color="#8B96AD" /><Text style={styles.balanceFoot}>Protected across {activeCount} active Pockets</Text></View>
    </View>
    <View style={styles.statGrid}><Stat label="Available Today" value="₦4,500" /><Stat label="Next Release" value={nextPocket ? formatNaira(nextPocket.schedule.releaseAmountKobo) : 'None'} detail={nextPocket ? `${nextPocket.category} upcoming` : 'No release scheduled'} accent /></View>
    <View style={styles.quickRow}><QuickAction label="Add Funds" icon={Plus} primary onPress={onNewPocket} /><QuickAction label="Transfer" icon={RefreshCw} /><QuickAction label="Insights" icon={TrendingUp} onPress={onActivity} /></View>
    <Section title="Essentials Pockets" action="Manage All" />
    {pockets.slice(0, 3).map((pocket) => <PocketCard key={pocket.id} title={pocket.name} icon={getPocketIcon(pocket.category)} amount={formatNaira(pocket.protectedAmountKobo)} total={formatNaira(pocket.targetAmountKobo)} status={getPocketCardStatus(pocket)} progress={getPocketProgress(pocket)} tone={getPocketTone(pocket)} onPress={() => onOpenPocket(pocket.id)} />)}
    <Pressable onPress={onNewPocket} style={styles.newPocket}><Plus size={24} color={colors.blue} /><Text style={styles.newPocketText}>Create New Pocket</Text></Pressable>
    <Section title="Recent Activity" action="View All" onAction={onActivity} />
    <View style={styles.list}><ActivityRow icon={ShoppingBasket} title="Groceries (Spar)" time="Today, 10:24 AM" amount="- ₦4,200" category="Feeding" /><Divider /><ActivityRow icon={Wifi} title="Data Bundle" time="Yesterday, 8:15 PM" amount="- ₦2,500" category="Essentials" /></View>
  </ScrollView></Page>;
}
