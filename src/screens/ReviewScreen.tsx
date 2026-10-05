import { ArrowRight, CalendarDays, CreditCard, LockKeyhole, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import { Divider, Fact, Page, Pill, PrimaryButton, Progress, SecondaryButton, SecureNote, Subtitle, Title, TopBar } from '../components/ui';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';
import type { PocketDraft } from '../types';
import { formatShortDateKey } from '../utils/date';
import { formatNaira, nairaInputToKobo } from '../utils/money';

export function ReviewScreen({ draft, onClose, onBack, onNext }: { draft: PocketDraft; onClose: () => void; onBack: () => void; onNext: () => void }) {
  const [locked, setLocked] = useState(true);
  return <Page><TopBar title="Review Pocket" back={onClose} close /><ScrollView contentContainerStyle={styles.flow}>
    <Progress step={6} label="Review" /><View><Title>Review Pocket</Title><Subtitle>Double-check your settings before creating your Pocket.</Subtitle></View>
    <View style={styles.reviewCard}>
      <View style={styles.reviewArt}><Pill text={draft.category.toUpperCase()} color={colors.mint} /><Sparkles size={35} color="#FFF" /></View>
      <View style={styles.reviewBody}><View style={styles.rowBetween}><View style={{ flex: 1 }}><Text style={styles.reviewName}>{draft.name}</Text><Text style={styles.reviewMeta}>{draft.frequency} · {formatNaira(nairaInputToKobo(draft.releaseAmount))} each release</Text></View><View style={{ alignItems: 'flex-end' }}><Text style={styles.overline}>GOAL AMOUNT</Text><Text style={styles.reviewAmount}>{formatNaira(nairaInputToKobo(draft.amount))}</Text></View></View><Divider /><View style={styles.reviewFacts}><Fact icon={CreditCard} label="DESTINATION" value="My bank account" /><Fact icon={CalendarDays} label="FIRST RELEASE" value={formatShortDateKey(draft.startDate)} /></View></View>
    </View>
    <View style={styles.setting}><View style={styles.settingIcon}><LockKeyhole size={23} color={colors.blue} /></View><View style={{ flex: 1 }}><Text style={styles.settingTitle}>Protect this Pocket</Text><Text style={styles.settingBody}>Add friction before accessing scheduled money early.</Text></View><Switch value={locked} onValueChange={setLocked} trackColor={{ false: '#D0D5DD', true: colors.blue }} /></View>
    <SecureNote text="Encrypted and protected by SafeGuard Security" />
    <PrimaryButton label="Create Pocket" icon={ArrowRight} dark onPress={onNext} /><SecondaryButton label="Go Back" onPress={onBack} />
  </ScrollView></Page>;
}
