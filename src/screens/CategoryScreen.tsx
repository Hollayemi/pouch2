import { ArrowRight, Check } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Page, PrimaryButton, Progress, Subtitle, Title, TopBar } from '../components/ui';
import { pocketCategories } from '../data';
import { colors } from '../theme/colors';
import type { PocketDraft } from '../types';

export function CategoryScreen({ draft, setDraft, onClose, onNext }: { draft: PocketDraft; setDraft: (draft: PocketDraft) => void; onClose: () => void; onNext: () => void }) {
  return <Page><TopBar title="Pouch" back={onClose} close /><ScrollView contentContainerClassName="gap-6 px-[22px] pb-8 pt-[22px]" showsVerticalScrollIndicator={false}>
    <Progress step={1} label="Category" /><View><Title>Choose a Category</Title><Subtitle>What are you protecting money for?</Subtitle></View>
    <View className="flex-row flex-wrap justify-between gap-y-3.5">{pocketCategories.map(([name, Icon]) => {
      const selected = draft.category === name;
      return <Pressable key={name} onPress={() => setDraft({ ...draft, category: name })} className={`w-[48%] aspect-[1.3] items-center justify-center gap-3 rounded-xl border-[1.5px] bg-white ${selected ? 'border-brand bg-soft' : 'border-[#C6CBD4]'}`}>
        <View className={`h-[54px] w-[54px] items-center justify-center rounded-full ${selected ? 'bg-brand' : 'bg-soft'}`}><Icon size={27} color={selected ? '#FFF' : colors.blue} /></View>
        <Text className={`pb-2 text-[15px] font-semibold text-ink ${selected ? 'font-bold text-brand' : ''}`}>{name}</Text>
        {selected && <View className="absolute right-2.5 top-2.5 h-[22px] w-[22px] items-center justify-center rounded-full bg-brand"><Check size={13} color="#FFF" /></View>}
      </Pressable>;
    })}</View>
  </ScrollView><View className="border-t border-border px-[22px] pb-2 pt-3.5"><PrimaryButton label="Continue" icon={ArrowRight} disabled={!draft.category} onPress={onNext} /></View></Page>;
}
