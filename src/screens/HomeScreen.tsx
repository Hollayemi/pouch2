import * as Clipboard from 'expo-clipboard';
import { Bell, Building2, Check, Copy, Plus, RefreshCw, ShieldCheck, ShoppingBasket, TrendingUp, Wifi } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { AddFundsModal } from '../components/AddFundsModal';
import { ActivityRow, PocketCard } from '../components/rows';
import { Divider, Page, QuickAction, Section, Stat } from '../components/ui';
import { walletAccount } from '../data/wallet';
import { colors } from '../theme/colors';
import type { Pocket } from '../types';
import { formatNaira } from '../utils/money';
import { getPocketCardStatus, getPocketIcon, getPocketProgress, getPocketTone } from '../utils/pockets';

export function HomeScreen({ pockets, walletBalanceKobo, kycVerified, onKycRequired, onNewPocket, onOpenPocket, onActivity }: { pockets: Pocket[]; walletBalanceKobo: number; kycVerified: boolean; onKycRequired: () => void; onNewPocket: () => void; onOpenPocket: (id: string) => void; onActivity: () => void }) {
  const [fundingVisible, setFundingVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const totalProtected = pockets.reduce((total, pocket) => total + pocket.protectedAmountKobo, 0);
  const unscheduledBalance = walletBalanceKobo;
  const totalPouchBalance = totalProtected + unscheduledBalance;
  const activeCount = pockets.filter((pocket) => pocket.status === 'active').length;
  const nextPocket = pockets
    .filter((pocket) => pocket.schedule.nextReleaseAt)
    .sort((left, right) => new Date(left.schedule.nextReleaseAt!).getTime() - new Date(right.schedule.nextReleaseAt!).getTime())[0];

  const copyAccountNumber = async () => {
    if (!kycVerified) return;
    await Clipboard.setStringAsync(walletAccount.accountNumber);
    setCopied(true);
  };

  return (
    <>
      <Page nav>
        <ScrollView contentContainerClassName="gap-4 px-[22px] pb-9 pt-3.5" showsVerticalScrollIndicator={false}>
          <View className="mb-1 flex-row items-center">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-navy"><Text className="font-extrabold text-white">TA</Text></View>
            <View className="ml-3 flex-1"><Text className="text-[11px] font-bold leading-[15px] text-muted">Good morning,</Text><Text className="text-[23px] font-extrabold leading-7 text-ink">Tunde</Text></View>
            <View className="h-11 w-11 items-center justify-center rounded-full bg-soft"><Bell size={21} color={colors.ink} /><View className="absolute right-2.5 top-[9px] h-[7px] w-[7px] rounded-full bg-danger" /></View>
          </View>

          <View className="min-h-[246px] justify-between rounded-[14px] bg-navy p-[20px] shadow">
            <View className="flex-row items-start gap-3">
              <View className="flex-1">
                <Text className="text-[11px] font-extrabold leading-4 text-[#8B96AD]">TOTAL POUCH BALANCE</Text>
                <Text className="mt-3 text-[34px] font-extrabold leading-[42px] text-white">{formatNaira(totalPouchBalance)}</Text>
              </View>
              <View className="w-[146px] rounded-xl bg-white/10 p-3">
                <View className="mb-2 flex-row items-center gap-1.5">
                  <Building2 size={14} color={colors.mint} />
                  <Text className="text-[9px] font-extrabold tracking-wide text-[#AAB4C7]">{kycVerified ? 'WALLET ACCOUNT' : 'KYC REQUIRED'}</Text>
                </View>
                {kycVerified ? <>
                  <Text className="text-[10px] leading-4 text-[#AAB4C7]">{walletAccount.bankName}</Text>
                  <Pressable accessibilityLabel="Copy wallet account number" onPress={copyAccountNumber} className="mt-1 flex-row items-center justify-between rounded-md active:opacity-70">
                    <Text className="text-[16px] font-extrabold tracking-wide text-white">{walletAccount.accountNumber}</Text>
                    {copied ? <Check size={15} color={colors.mint} /> : <Copy size={15} color={colors.mint} />}
                  </Pressable>
                  <Text className="mt-1 text-[9px] font-semibold text-[#AAB4C7]">{copied ? 'Copied' : 'Tap to copy'}</Text>
                </> : <>
                  <Text className="text-[11px] font-semibold leading-4 text-white">Verify your identity to activate your wallet account.</Text>
                  <Pressable onPress={onKycRequired} className="mt-2 self-start rounded-md bg-white/15 px-2 py-1"><Text className="text-[9px] font-bold text-mint">Verify now</Text></Pressable>
                </>}
              </View>
            </View>
            <View className="flex-row items-end justify-between gap-4 border-t border-white/10 pt-4">
              <View className="flex-1">
                <View className="flex-row items-center gap-2"><ShieldCheck size={16} color="#8B96AD" /><Text className="text-[10px] font-bold tracking-wide text-[#8B96AD]">PROTECTED IN POCKETS</Text></View>
                <Text className="mt-1.5 text-[22px] font-extrabold leading-7 text-white">{formatNaira(totalProtected)}</Text>
                <Text className="mt-0.5 text-[10px] text-[#8B96AD]">Across {activeCount} active Pockets</Text>
              </View>
              <View className="min-w-[146px] rounded-xl border border-mint/30 bg-white/10 px-4 py-3">
                <Text className="text-[10px] font-extrabold text-mint">UNSCHEDULED BALANCE</Text>
                <Text className="mt-1.5 text-[22px] font-extrabold leading-7 text-white">{formatNaira(unscheduledBalance)}</Text>
                <Text className="mt-1 text-[10px] font-semibold text-[#AAB4C7]">Available for a Pocket</Text>
              </View>
            </View>
          </View>

          <View className="flex-row gap-3.5"><Stat label="Available Today" value="₦4,500" /><Stat label="Next Release" value={nextPocket ? formatNaira(nextPocket.schedule.releaseAmountKobo) : 'None'} detail={nextPocket ? `${nextPocket.category} upcoming` : 'No release scheduled'} accent /></View>
          <View className="my-1 flex-row gap-2.5"><QuickAction label="Add Funds" icon={Plus} primary onPress={() => setFundingVisible(true)} /><QuickAction label="Transfer" icon={RefreshCw} /><QuickAction label="Insights" icon={TrendingUp} onPress={onActivity} /></View>
          <Section title="Essentials Pockets" action="Manage All" />
          {pockets.slice(0, 3).map((pocket) => <PocketCard key={pocket.id} title={pocket.name} icon={getPocketIcon(pocket.category)} amount={formatNaira(pocket.protectedAmountKobo)} total={formatNaira(pocket.targetAmountKobo)} status={getPocketCardStatus(pocket)} progress={getPocketProgress(pocket)} tone={getPocketTone(pocket)} onPress={() => onOpenPocket(pocket.id)} />)}
          <Pressable onPress={onNewPocket} className="min-h-[104px] items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed border-border"><Plus size={24} color={colors.blue} /><Text className="text-[13px] font-semibold text-ink">Create New Pocket</Text></Pressable>
          <Section title="Recent Activity" action="View All" onAction={onActivity} />
          <View className="overflow-hidden rounded-xl border border-[#E7EAF0] bg-white shadow"><ActivityRow icon={ShoppingBasket} title="Groceries (Spar)" time="Today, 10:24 AM" amount="- ₦4,200" category="Feeding" /><Divider /><ActivityRow icon={Wifi} title="Data Bundle" time="Yesterday, 8:15 PM" amount="- ₦2,500" category="Essentials" /></View>
        </ScrollView>
      </Page>

      <AddFundsModal visible={fundingVisible} kycVerified={kycVerified} onClose={() => setFundingVisible(false)} onKycRequired={onKycRequired} />
    </>
  );
}
