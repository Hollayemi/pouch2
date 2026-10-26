import { Plus } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { PocketCard } from '../components/rows';
import { Page, Subtitle, Title } from '../components/ui';
import { colors } from '../theme/colors';
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
      <ScrollView contentContainerClassName="gap-4 px-[22px] pb-9 pt-3.5" showsVerticalScrollIndicator={false}>
        <View>
          <Title>Your Pockets</Title>
          <Subtitle>Money protected for the things that matter.</Subtitle>
        </View>
        <View className="min-h-[220px] justify-between rounded-[14px] bg-navy p-[22px] shadow">
          <Text className="w-[135px] text-xs font-extrabold leading-4 text-[#8B96AD]">TOTAL PROTECTED</Text>
          <Text className="text-[42px] font-extrabold leading-[50px] text-white">{formatNaira(totalProtected)}</Text>
          <Text className="text-sm text-[#8B96AD]">{activeCount} active Pockets · {nextRelease ? `Next release ${formatReleaseDate(nextRelease)}` : 'No release scheduled'}</Text>
        </View>
        {pockets.map((pocket) => <PocketCard key={pocket.id} title={pocket.name} icon={getPocketIcon(pocket.category)} amount={formatNaira(pocket.protectedAmountKobo)} total={formatNaira(pocket.targetAmountKobo)} status={getPocketCardStatus(pocket)} progress={getPocketProgress(pocket)} tone={getPocketTone(pocket)} onPress={() => onOpenPocket(pocket.id)} />)}
        <Pressable onPress={onCreate} className="min-h-[104px] items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed border-border">
          <Plus size={24} color={colors.blue} />
          <Text className="text-[13px] font-semibold text-ink">Create New Pocket</Text>
        </Pressable>
      </ScrollView>
    </Page>
  );
}
