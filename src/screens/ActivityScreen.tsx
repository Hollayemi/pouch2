import { ArrowRight, FileText, ShieldCheck, ShoppingBasket, TrendingUp, Wifi } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { ActivityRow } from '../components/rows';
import { Divider, Page, Subtitle, Title } from '../components/ui';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';

export function ActivityScreen() {
  return <Page nav><ScrollView contentContainerStyle={styles.dashboard}>
    <View style={styles.rowBetween}><View><Title>Activity</Title><Subtitle>Your money, clearly accounted for.</Subtitle></View><View style={styles.roundButton}><FileText size={21} color={colors.ink} /></View></View>
    <View style={styles.insight}><View><Text style={styles.insightLabel}>RELEASED THIS MONTH</Text><Text style={styles.insightAmount}>₦52,500</Text></View><View style={styles.insightIcon}><TrendingUp size={25} color={colors.green} /></View></View>
    <View style={styles.filterRow}>{['All', 'Releases', 'Funding'].map((item, index) => <View key={item} style={[styles.filter, !index && styles.filterActive]}><Text style={[styles.filterText, !index && { color: '#FFF' }]}>{item}</Text></View>)}</View>
    <View style={styles.list}>
      <ActivityRow icon={ArrowRight} title="Daily Feeding release" time="Today, 8:00 AM" amount="+ ₦1,000" category="Released" positive /><Divider />
      <ActivityRow icon={ShoppingBasket} title="Groceries (Spar)" time="Today, 10:24 AM" amount="- ₦4,200" category="Feeding" /><Divider />
      <ActivityRow icon={Wifi} title="Data Bundle" time="Yesterday, 8:15 PM" amount="- ₦2,500" category="Data" /><Divider />
      <ActivityRow icon={ShieldCheck} title="Rent Pocket funded" time="Sep 16, 4:32 PM" amount="+ ₦250,000" category="Protected" positive />
    </View>
  </ScrollView></Page>;
}
