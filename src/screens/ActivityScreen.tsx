import { ArrowRight, FileText, ShieldCheck, ShoppingBasket, TrendingUp, Wifi } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { ActivityRow } from '../components/rows';
import { Divider, Page, Subtitle, Title } from '../components/ui';
import { colors } from '../theme/colors';

export function ActivityScreen() {
  return <Page nav><ScrollView contentContainerClassName="gap-4 px-[22px] pb-9 pt-3.5">
    <View className="flex-row items-center justify-between gap-3"><View><Title>Activity</Title><Subtitle>Your money, clearly accounted for.</Subtitle></View><View className="h-11 w-11 items-center justify-center rounded-full bg-soft"><FileText size={21} color={colors.ink} /></View></View>
    <View className="min-h-[120px] flex-row items-center justify-between rounded-[14px] bg-navy p-5"><View><Text className="text-[11px] font-bold text-[#8B96AD]">RELEASED THIS MONTH</Text><Text className="mt-[7px] text-[30px] font-extrabold text-white">₦52,500</Text></View><View className="h-[52px] w-[52px] items-center justify-center rounded-full bg-mint/[0.15]"><TrendingUp size={25} color={colors.green} /></View></View>
    <View className="flex-row gap-2">{['All', 'Releases', 'Funding'].map((item, index) => <View key={item} className={`min-h-10 items-center justify-center rounded-full border px-[18px] ${!index ? 'border-ink bg-ink' : 'border-border bg-white'}`}><Text className={`text-xs font-semibold ${!index ? 'text-white' : 'text-muted'}`}>{item}</Text></View>)}</View>
    <View className="overflow-hidden rounded-xl border border-[#E7EAF0] bg-white shadow">
      <ActivityRow icon={ArrowRight} title="Daily Feeding release" time="Today, 8:00 AM" amount="+ ₦1,000" category="Released" positive /><Divider />
      <ActivityRow icon={ShoppingBasket} title="Groceries (Spar)" time="Today, 10:24 AM" amount="- ₦4,200" category="Feeding" /><Divider />
      <ActivityRow icon={Wifi} title="Data Bundle" time="Yesterday, 8:15 PM" amount="- ₦2,500" category="Data" /><Divider />
      <ActivityRow icon={ShieldCheck} title="Rent Pocket funded" time="Sep 16, 4:32 PM" amount="+ ₦250,000" category="Protected" positive />
    </View>
  </ScrollView></Page>;
}
