import { useRouter } from 'expo-router';
import { usePocketDraft } from '@/context/PocketDraftContext';
import { usePockets } from '@/context/PocketsContext';
import { useUser } from '@/context/UserContext';
import { HomeScreen } from '@/screens/HomeScreen';

export default function HomeRoute() {
  const router = useRouter();
  const { resetDraft } = usePocketDraft();
  const { pockets, walletBalanceKobo } = usePockets();
  const { isKycVerified } = useUser();
  const createPocket = () => {
    resetDraft();
    router.push('/pockets/create');
  };
  return <HomeScreen pockets={pockets} walletBalanceKobo={walletBalanceKobo} kycVerified={isKycVerified} onKycRequired={() => router.navigate('/(tabs)/profile')} onNewPocket={createPocket} onOpenPocket={(id) => router.push({ pathname: '/pockets/[id]', params: { id } })} onActivity={() => router.navigate('/activity')} />;
}
