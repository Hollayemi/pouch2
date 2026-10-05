import { Bell, CreditCard, Fingerprint, LockKeyhole, LogOut, ShieldCheck, User } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { MenuRow } from '../components/rows';
import { Page, Section, Title } from '../components/ui';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';

export function ProfileScreen() {
  return <Page nav><ScrollView contentContainerStyle={styles.dashboard}>
    <Title>Profile</Title>
    <View style={styles.profileHead}><View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>TA</Text></View><View><Text style={styles.profileName}>Tunde Adebayo</Text><Text style={styles.profilePhone}>+234 801 234 5678</Text><View style={styles.verified}><ShieldCheck size={13} color={colors.green} /><Text style={styles.verifiedText}>Identity verified</Text></View></View></View>
    <Section title="Account" /><View style={styles.list}><MenuRow icon={User} label="Personal information" /><MenuRow icon={CreditCard} label="Release destination" value="•••• 1234" /><MenuRow icon={Bell} label="Notifications" /></View>
    <Section title="Security" /><View style={styles.list}><MenuRow icon={LockKeyhole} label="Change transaction PIN" /><MenuRow icon={Fingerprint} label="Biometric sign-in" value="On" /><MenuRow icon={ShieldCheck} label="Security & privacy" /></View>
    <Pressable style={styles.logout}><LogOut size={19} color={colors.red} /><Text style={styles.logoutText}>Sign Out</Text></Pressable>
    <Text style={styles.version}>SafeGuard v1.0 prototype</Text>
  </ScrollView></Page>;
}
