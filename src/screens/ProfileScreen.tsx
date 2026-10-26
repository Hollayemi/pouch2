import { Bell, CreditCard, Fingerprint, LockKeyhole, LogOut, ShieldCheck, User } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { MenuRow } from '../components/rows';
import { Page, Section, Title } from '../components/ui';
import { colors } from '../theme/colors';

export function ProfileScreen({ kycVerified }: { kycVerified: boolean }) {
  return <Page nav><ScrollView contentContainerClassName="gap-4 px-[22px] pb-9 pt-3.5">
    <Title>Profile</Title>
    <View className="flex-row items-center gap-[15px] rounded-xl border border-border bg-white p-[18px]"><View className="h-[68px] w-[68px] items-center justify-center rounded-full bg-navy"><Text className="text-xl font-extrabold text-white">TA</Text></View><View><Text className="text-lg font-bold text-ink">Tunde Adebayo</Text><Text className="mt-0.5 text-xs text-muted">+234 801 234 5678</Text><View className={`mt-[7px] self-start flex-row items-center gap-[5px] rounded px-2 py-1 ${kycVerified ? 'bg-success-soft' : 'bg-danger-soft'}`}><ShieldCheck size={13} color={kycVerified ? colors.green : colors.red} /><Text className={`text-[10px] font-bold ${kycVerified ? 'text-success' : 'text-danger'}`}>{kycVerified ? 'Identity verified' : 'Verification required'}</Text></View></View></View>
    <Section title="Account" /><View className="overflow-hidden rounded-xl border border-[#E7EAF0] bg-white shadow"><MenuRow icon={ShieldCheck} label="Identity verification" value={kycVerified ? 'Verified' : 'Required'} /><MenuRow icon={User} label="Personal information" /><MenuRow icon={CreditCard} label="Release destination" value="•••• 1234" /><MenuRow icon={Bell} label="Notifications" /></View>
    <Section title="Security" /><View className="overflow-hidden rounded-xl border border-[#E7EAF0] bg-white shadow"><MenuRow icon={LockKeyhole} label="Change transaction PIN" /><MenuRow icon={Fingerprint} label="Biometric sign-in" value="On" /><MenuRow icon={ShieldCheck} label="Security & privacy" /></View>
    <Pressable className="min-h-[52px] flex-row items-center justify-center gap-[9px] rounded-[10px] bg-danger-soft"><LogOut size={19} color={colors.red} /><Text className="text-sm font-bold text-danger">Sign Out</Text></Pressable>
    <Text className="text-center text-[11px] text-[#98A2B3]">Pouch v1.0 prototype</Text>
  </ScrollView></Page>;
}
