import { ArrowRight, Check } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { Divider, Page, PrimaryButton, SecondaryButton, Title } from '../components/ui';
import { styles } from '../theme/styles';
import type { PocketDraft } from '../types';
import { formatShortDateKey } from '../utils/date';
import { formatNaira, nairaInputToKobo } from '../utils/money';

export function SuccessScreen({ draft, onDone }: { draft: PocketDraft; onDone: () => void }) {
  return <Page><View style={styles.success}>
    <View style={styles.successHalo}><View style={styles.successIcon}><Check size={42} color="#FFF" /></View></View>
    <Title>Your Pocket is ready</Title><Text style={styles.successCopy}>{draft.name} is set up. Fund it now to start protecting your money.</Text>
    <View style={styles.successCard}><Text style={styles.overline}>AMOUNT TO PROTECT</Text><Text style={styles.successAmount}>{formatNaira(nairaInputToKobo(draft.amount))}</Text><Divider /><View style={styles.rowBetween}><Text style={styles.successFact}>{draft.frequency} · {formatNaira(nairaInputToKobo(draft.releaseAmount))} each</Text><Text style={styles.successFact}>Starts {formatShortDateKey(draft.startDate)}</Text></View></View>
    <View style={styles.successActions}><PrimaryButton label="Fund Pocket" icon={ArrowRight} onPress={onDone} /><SecondaryButton label="I’ll do this later" onPress={onDone} /></View>
  </View></Page>;
}
