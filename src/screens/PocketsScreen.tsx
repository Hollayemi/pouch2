import { Plus } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { PocketCard } from '../components/rows';
import { Page, Subtitle, Title } from '../components/ui';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';
import type { Pocket } from '../types';
import { formatNaira } from '../utils/money';
import { formatReleaseDate, getPocketCardStatus, getPocketIcon, getPocketProgress, getPocketTone } from '../utils/pockets';

export function PocketsScreen({ pockets, onCreate, onOpenPocket }: { pockets: Pocket[]; onCreate: () => void; onOpenPocket: (id: string) => void }) {
  const totalProtected = pockets.reduce((total, pocket) => total + pocket.protectedAmountKobo, 0);
  const activeCount = pockets.filter((pocket) => pocket.status === 'active').length;
  const nextRelease = pockets
    .map((pocket) => pocket.schedule.nextReleaseAt)
    .filter((date): date is string => Boolean(date))
    .sort((left, right) => new Date(left).getTime() - new Date(right).getTime())[0];

  return (
    <Page nav>
      <ScrollView contentContainerStyle={styles.dashboard} showsVerticalScrollIndicator={false}>
        <View>
          <Title>Your Pockets</Title>
          <Subtitle>Money protected for the things that matter.</Subtitle>
        </View>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>TOTAL PROTECTED</Text>
          <Text style={styles.balanceAmount}>{formatNaira(totalProtected)}</Text>
          <Text style={styles.balanceFoot}>{activeCount} active Pockets · {nextRelease ? `Next release ${formatReleaseDate(nextRelease)}` : 'No release scheduled'}</Text>
        </View>
        {pockets.map((pocket) => <PocketCard key={pocket.id} title={pocket.name} icon={getPocketIcon(pocket.category)} amount={formatNaira(pocket.protectedAmountKobo)} total={formatNaira(pocket.targetAmountKobo)} status={getPocketCardStatus(pocket)} progress={getPocketProgress(pocket)} tone={getPocketTone(pocket)} onPress={() => onOpenPocket(pocket.id)} />)}
        <Pressable onPress={onCreate} style={styles.newPocket}>
          <Plus size={24} color={colors.blue} />
          <Text style={styles.newPocketText}>Create New Pocket</Text>
        </Pressable>
      </ScrollView>
    </Page>
  );
}
